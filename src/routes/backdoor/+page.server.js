import { getArticles } from '$lib/services/firebase.services';  // This should be the function you created for Firestore queries

export async function load() {
    // Query Firestore for articles in the 'Technology' category
    const articles = await getArticles('All');

    // Pass articles to the frontend
    return {
        articles,
    };
}