import { getArticles } from '$lib/services/firebase.services';  // This should be the function you created for Firestore queries

export async function load() {
    // Query Firestore for articles in the 'Technology' category
    const articles = await getArticles('Technology');
    const featuredArticle = articles[0];
    const featuredSubarticle = articles[1] ? articles[1] : articles[0];

    // Pass articles to the frontend
    return {
        articles,
        featuredArticle,
        featuredSubarticle
    };
}
