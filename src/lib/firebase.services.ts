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
        q = query(collection(db, 'articles'), where('category', '==', category));
    }
    
    const querySnapshot = await getDocs(q);
    articles = await Promise.all (querySnapshot.docs.map(async (doc) => {
        const image: ArticleContent = await getImage(doc.data()?.image as ArticleContent);
    
        return {
            slug        : doc.data()?.slug,
            title       : doc.data()?.title,
            author      : doc.data()?.author,
            date        : doc.data()?.date,
            category    : doc.data()?.category,
            description : doc.data()?.description,
            image       : image,
            content     : []
        };
    }));
        
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


// Load selected articl and populate the images
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
            category    : docSnap.data()?.category,
            description : docSnap.data()?.description,
            image       : mainImage,
            content     : docSnap.data()?.content
         };

        await article.content.forEach(async (segment : ArticleContent) => {
            if (segment.type === 'image') {
                segment = await getImage(segment);
            }
        })

        console.log('Article:' , article);
    } else {
        console.error('No such document!');
        return null;
    }

    return article;
}