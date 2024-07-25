import { error } from '@sveltejs/kit';
import { articleData } from '../../../data.js';

export function load({ params }) {
	const article = articleData.find((article) => article.slug === params.slug);

	if (!article) throw error(404);

	return {
		article
	};
}