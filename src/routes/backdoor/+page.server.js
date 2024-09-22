import { articleData } from '../../data.js'

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
	}
}