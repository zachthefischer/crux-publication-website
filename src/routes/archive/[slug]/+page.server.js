import { articleData } from '../../../data.js'
// import { error } from '@sveltejs/kit';

export function load({ params }) {
	console.log("PARAMS", params)

    return {
		articles: articleData.map((article) => ({
			slug: article.slug,
			title: article.title,
			category: article.category,
			description: article.description,
			img: article.img,
			author: article.author,
			date: article.date,
		})),
        slug: params.slug,
	}
}