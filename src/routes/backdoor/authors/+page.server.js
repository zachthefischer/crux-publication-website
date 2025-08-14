import { getArticles } from '$lib/services/firebase.services';

export async function load() {
    // Query Firestore for articles
    const articles = await getArticles('All');

    // Pass articles to the frontend
    return {
        articles,
    };
}
