import { getArticles } from '$lib/firebase.services'; // This should be the function you created for Firestore queries
// import { convertDates } from '$lib/firebase.services'; 
// import { copyArticles } from '$lib/firebase.services';
// import { copyPreviews } from '$lib/firebase.services';

export async function load() {
    // Query Firestore for articles in the 'Technology' category
	// copyArticles()
	// convertDates();
	// copyPreviews()
	
    const featuredArticles = await getArticles('All');
	// const featuredArticle     = articles[0]
	// const featuredSubarticle1 = articles[1]
	// const featuredSubarticle2 = articles[2]
	// const listArticle1	      = articles[3]
	// const listArticle2        = articles[4]
	// const listArticle3        = articles[5]

    // Pass articles to the frontend
    return {
		featuredArticles
	};
}