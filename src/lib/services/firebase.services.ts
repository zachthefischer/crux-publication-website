import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import type { Content, Category, ArticlePreview, Article } from "./article.types";
import { db, storage } from "./firebase.client";
import { getDownloadURL, ref } from "firebase/storage";

// Cache for author name to ID mapping
let authorNameToIdCache: Map<string, string> | null = null;

/**
 * Get author ID by name, with caching for performance
 */
async function getAuthorIdByName(authorName: string): Promise<string | null> {
    if (!authorNameToIdCache) {
        // Load all authors into cache
        const authorsRef = collection(db, 'authors');
        const authorsSnap = await getDocs(authorsRef);
        authorNameToIdCache = new Map();
        
        authorsSnap.docs.forEach(doc => {
            const authorData = doc.data();
            authorNameToIdCache!.set(authorData.name.toLowerCase(), doc.id);
        });
    }
    
    return authorNameToIdCache.get(authorName.toLowerCase()) || null;
}

export async function getArticles(category : Category) {    
    let articles: ArticlePreview[] = [];

    let q;
    if (category == 'All') {
        q = query(collection(db, 'article-preview'));
    } else {
        q = query(
            collection(db, 'article-preview'),
            where('categories', 'array-contains', category),
        );
    }
        
    const querySnapshot = await getDocs(q);
    articles = await Promise.all (querySnapshot.docs.map(async (doc) => {
        const docData = doc.data()

        const image: Content = await getImage(docData.image as Content);

        // Handle legacy author field - if authors array is empty but author field exists,
        // we'll try to find the author ID by name
        let authors = docData.authors || [];
        if (authors.length === 0 && docData.author) {
            const authorId = await getAuthorIdByName(docData.author);
            if (authorId) {
                authors = [authorId];
            }
        }

        const article = {
            slug        : docData.slug,
            title       : docData.title,
            author      : docData.author,
            authors     : authors,
            date        : docData.date.toDate(),
            categories  : docData.categories,
            description : docData.description,
            image       : image,
        };
        
        return article;
    }));
    

    // Sort articles by date in descending order after fetching
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return articles;
}


export async function getImage(image : Content) : Promise<Content> {
    const imageRef = ref(storage, `files/${image.fileName}`); // Path to your image in Firebase Storage
    try {
        image.src = await getDownloadURL(imageRef); // Generate the image download URL
    } catch (error) {
        console.error('Error fetching image:', error);
    }

    return image
}


// Load selected article and populate the images
export async function loadArticle(slug : string){
    const docRef = doc(db, 'article-content', slug);
    const docSnap = await getDoc(docRef);

    let articleContent : Article;

    if (docSnap.exists()) {
        const docData = docSnap.data()

        // Load main image
        const mainImage: Content = await getImage(docData.preview.image as Content);

        // Handle legacy author field for individual article loading
        let authors = docData.preview.authors || [];
        if (authors.length === 0 && docData.preview.author) {
            const authorId = await getAuthorIdByName(docData.preview.author);
            if (authorId) {
                authors = [authorId];
            }
        }

        const preview = {
            slug        : docData.preview.slug,
            title       : docData.preview.title,
            author      : docData.preview.author,
            authors     : authors,
            date        : docData.preview.date.toDate(), // Firebase returns Dates as timestamp
            categories  : docData.preview.categories,
            description : docData.preview.description,
            image       : mainImage,
        };

        articleContent = { 
            preview     : preview,
            content     : docData.content
        };


        // Load all images
        articleContent.content = await Promise.all(articleContent.content.map(async (segment: Content) => {
            if (segment.type === 'image') {
                segment = await getImage(segment);
            }
            return segment;
        }));
        
        // console.log('Article:' , articleContent);
    } else {
        console.error('No such document!');
        return null;
    }

    return articleContent;
}

export async function searchArticles(search: string, category: Category, sortBy: string) {
	let articles: ArticlePreview[] = [];

	let q;
	if (category === 'All') {
		q = query(collection(db, 'article-preview'));
	} else {
		q = query(
			collection(db, 'article-preview'),
			where('categories', 'array-contains', category)
		);
	}

	const querySnapshot = await getDocs(q);
	const lowerSearch = search.toLowerCase().trim();

	articles = await Promise.all(
		querySnapshot.docs.map(async (doc) => {
			const docData = doc.data();

			const image: Content = await getImage(docData.image as Content);

			// Handle legacy author field for search results
			let authors = docData.authors || [];
			if (authors.length === 0 && docData.author) {
				const authorId = await getAuthorIdByName(docData.author);
				if (authorId) {
					authors = [authorId];
				}
			}

			const article = {
				slug: docData.slug,
				title: docData.title,
				author: docData.author,
				authors: authors,
				date: docData.date.toDate(),
				categories: docData.categories,
				description: docData.description,
				image: image
			};

			return article;
		})
	);

	// 🔍 Filter by search string
	if (search) {
		// First, try to find if this is an author search by looking up the author ID
		const searchAuthorId = await getAuthorIdByName(search);
		
		articles = articles.filter(
			(article) => {
				// Check if it's a title or description match
				const titleMatch = article.title.toLowerCase().includes(lowerSearch);
				const descriptionMatch = article.description.toLowerCase().includes(lowerSearch);
				
				// Check if it's an author match (either legacy author field or authors array)
				const legacyAuthorMatch = article.author.toLowerCase().includes(lowerSearch);
				const authorIdMatch = searchAuthorId && article.authors && article.authors.includes(searchAuthorId);
				
				return titleMatch || descriptionMatch || legacyAuthorMatch || authorIdMatch;
			}
		);
	}

	// 📅 Sort by date
    switch (sortBy) {
        case 'date':
            articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
        case 'author':
            articles.sort((a, b) => a.author.localeCompare(b.author));
            break;
        case 'a-z':
            articles.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }
    console.log(articles);
    
	return articles;
}

// Copy all articles from articles to article-preview and article-content
// export async function copyArticles(){
//     const sourceCollection = collection(db, 'articles');
//     const previewCollection = collection(db, 'article-preview');
//     const contentCollection = collection(db, 'article-content');

//     try {
//         const snapshot = await getDocs(sourceCollection);

//         if (snapshot.empty) {
//             console.log('No documents found in the source collection.');
//             return;
//         }

//         for (const docSnap of snapshot.docs) {
//             const docData = docSnap.data();
//             const docId = docSnap.id;

//             // const newArticleRef = doc(contentCollection);
//             // const newArticleId = newArticleRef.id;

//             const articlePreview : ArticlePreview = { 
//                 slug        : docData.slug,
//                 title       : docData.title,
//                 author      : docData.author,
//                 date        : docData.date,
//                 categories  : docData.categories,
//                 description : docData.description,
//                 image       : docData.image,
//             };

//             const articleContent : Article = { 
//                 preview    : articlePreview,
//                 content    : docSnap.data()?.content,
//             };


//             // Copy to previewCollection
//             await setDoc(doc(previewCollection, docId), articlePreview);
//             console.log(`Document ${docId} copied to article-preview successfully.`);

//             // Copy to contentCollection
//             await setDoc(doc(contentCollection, docId), articleContent);
//             console.log(`Document ${docId} copied to article-content successfully.`);
//         }
//     } catch (error) {
//         console.error('Error copying documents:', error);
//     }
// }


export async function copyPreviews(){
    const previewCollection = collection(db, 'article-preview');
    const contentCollection = collection(db, 'article-content');

    try {
        const snapshot = await getDocs(contentCollection);

        if (snapshot.empty) {
            console.log('No documents found in the source collection.');
            return;
        }

        for (const docSnap of snapshot.docs) {
            const docData = docSnap.data();
            const docId = docSnap.id;

            const previewDoc = await getDoc(doc(previewCollection, docId))
            const previewData = previewDoc.data();


            // const newArticleRef = doc(contentCollection);
            // const newArticleId = newArticleRef.id;

            const articlePreview : ArticlePreview = { 
                slug        : previewData?.slug,
                title       : previewData?.title,
                author      : previewData?.author,
                date        : previewData?.date,
                categories  : previewData?.categories,
                description : previewData?.description,
                image       : previewData?.image,
            };

            const articleContent : Article = { 
                preview    : articlePreview,
                content    : docData?.content,
            };

            // Copy to previewCollection
            // await setDoc(doc(previewCollection, docId), articlePreview);
            // console.log(`Document ${docId} copied to article-preview successfully.`);

            // Copy to contentCollection
            await setDoc(doc(contentCollection, docId), articleContent);
            console.log(`Document ${docId} copied to article-content successfully.`);
        }
    } catch (error) {
        console.error('Error copying documents:', error);
    }
}