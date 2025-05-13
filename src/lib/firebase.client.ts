import { initializeApp        } from 'firebase/app';
import { getAuth              } from 'firebase/auth';
import { browser              } from '$app/environment';
import { getFirestore         } from 'firebase/firestore';
import { doc                  } from "firebase/firestore"; 
import { setDoc               } from "firebase/firestore"; 
import { getStorage           } from "firebase/storage";
import { ref                  } from "firebase/storage"; 
import { uploadBytes          } from "firebase/storage"; 
import type { FirebaseApp     } from 'firebase/app';
import type { FirebaseStorage } from 'firebase/storage';
import type { Firestore       } from 'firebase/firestore';
import type { Auth            } from 'firebase/auth';
import type { ArticlePreview, Content         } from './article.types';

const FIREBASE_CONFIG = {
    apiKey            : import.meta.env.VITE_FIREBASE_API_KEY,
    appId             : import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain        : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId         : "crux-publication",
    storageBucket     : "crux-publication.appspot.com",
    messagingSenderId : "926866903206",
    measurementId     : "G-3QPPFXM22C"
};

export const app     : FirebaseApp     = initializeApp(FIREBASE_CONFIG);
export const db      : Firestore       = getFirestore(app);
export const storage : FirebaseStorage = getStorage(app);

export let auth    : Auth;


export const initializeFirebase = () => {
    console.log("Initialize firebase");
    if (!browser) {
        throw new Error("Can't use the Firebase client on the server.");
    }
    if (!auth) {
        auth = getAuth(app);
    }

    console.log("After firebase is initialized", db);
};

export async function addArticle(articlePreview : ArticlePreview, content : Content[]) {
    console.log('article:', articlePreview);

    const slug = (articlePreview.slug === '' ? slugifyTitle(articlePreview.title) : articlePreview.slug);

    // Add title image to Storage
    const fileRef = ref(storage, `files/${articlePreview.image.fileName}`);

    try {
        const snapshot = await uploadBytes(fileRef, articlePreview.image.file as File);
        console.log('File uploaded successfully', snapshot);

        // Remove the file property so it can be stored in the database
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sanitizedContent = content.map(({ file, ...rest }) => ({
            ...rest,
        }));
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { file, ...sanitizedImage } = articlePreview.image;

        // Add doc to Firestore
        const sanitizedPreview = {
            slug: slug,
            title: articlePreview.title,
            author: articlePreview.author,
            date: articlePreview.date,
            categories: articlePreview.categories,
            description: articlePreview.description,
            image: sanitizedImage,
        };

        const sanitizedArticle = {
            preview : sanitizedPreview,
            content : sanitizedContent,
        }

        await setDoc(doc(db, "article-preview", slug), sanitizedPreview);
        console.log("Preview successfully added");

        await setDoc(doc(db, "article-content", slug), sanitizedArticle);
        console.log("Content successfully added");
    } catch (error) {
        console.error('Error occurred while adding the article:', error);
    }
}

function slugifyTitle(title : string) : string {
    return title
        .toLowerCase()               // Convert to lowercase
        .trim()                      // Remove leading/trailing spaces
        .replace(/[^\w\s-]/g, '')    // Remove all non-word characters (punctuation, etc.)
        .replace(/\s+/g, '-')        // Replace spaces with hyphens
        .replace(/-+/g, '-');        // Ensure no repeated hyphens
}