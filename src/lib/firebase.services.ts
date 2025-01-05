import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import type { Article, ArticleContent, Category } from "./article.types";
import { db, storage } from "./firebase.client";
import { getDownloadURL, ref } from "firebase/storage";

export async function getArticles(category : Category) {    
    let articles: Article[] = [];

    let q;
    if (category == 'All') {
        q = query(collection(db, 'articles'));
    } else {
        q = query(
            collection(db, 'articles'),
            where('categories', 'array-contains', category),
        );
    }
        
    const querySnapshot = await getDocs(q);
    articles = await Promise.all (querySnapshot.docs.map(async (doc) => {
        const image: ArticleContent = await getImage(doc.data()?.image as ArticleContent);
    
        const article = {
            slug        : doc.data()?.slug,
            title       : doc.data()?.title,
            author      : doc.data()?.author,
            date        : doc.data()?.date,
            categories  : doc.data()?.categories,
            description : doc.data()?.description,
            image       : image,
            content     : doc.data()?.content
        };
        
        article.content = await Promise.all(article.content.map(async (segment: ArticleContent) => {
            if (segment.type === 'image') {
                segment = await getImage(segment);
            }
            return segment;
        }));

        return article;
    
    }));
    

    // Sort articles by date in descending order after fetching
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
    return articles;
}


export async function getImage(image : ArticleContent) : Promise<ArticleContent> {
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
    const docRef = doc(db, 'articles', slug);
    const docSnap = await getDoc(docRef);

    let article : Article;

    if (docSnap.exists()) {
        const mainImage: ArticleContent = await getImage(docSnap.data()?.image as ArticleContent);

        article = { 
            slug        : docSnap.data()?.slug,
            title       : docSnap.data()?.title,
            author      : docSnap.data()?.author,
            date        : docSnap.data()?.date,
            categories  : docSnap.data()?.categories,
            description : docSnap.data()?.description,
            image       : mainImage,
            content     : docSnap.data()?.content
         };

        article.content = await Promise.all(article.content.map(async (segment: ArticleContent) => {
            if (segment.type === 'image') {
                segment = await getImage(segment);
            }
            return segment;
        }));
        
        console.log('Article:' , article);
    } else {
        console.error('No such document!');
        return null;
    }

    return article;
}