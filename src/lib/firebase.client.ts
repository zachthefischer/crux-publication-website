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
import type { Article         } from './article.types';

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

export async function addArticle(article : Article) {
    console.log('article:', article);

    const slug = slugifyTitle(article.title);

    // Add title image to Storage
    const fileRef = ref(storage, `files/${article.image.fileName}`);

    try {
        const snapshot = await uploadBytes(fileRef, article.image.file as File);
        console.log('File uploaded successfully', snapshot);

        // Remove the file property so it can be stored in the database
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sanitizedContent = article.content.map(({ file, ...rest }) => ({
            ...rest,
        }));
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { file, ...sanitizedImage } = article.image;

        // Add doc to Firestore
        const articleData = {
            slug: slug,
            title: article.title,
            author: article.author,
            date: article.date,
            category: article.categories,
            description: article.description,
            image: sanitizedImage,
            content: sanitizedContent,
        };

        await setDoc(doc(db, "articles", slug), articleData);
        console.log("Document successfully added");

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