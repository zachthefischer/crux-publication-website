import LoadingGif from '$lib/static/Loading.gif';
import type { Article, ArticlePreview, Author } from './article.types';

export const dummyAuthor : Author = {
    name    : 'Zach Fischer',
    title   : 'Webmaster',
}

export const dummyPreview : ArticlePreview = {
    slug            : 'test-slug',
    title           : '',
    categories      : ['All'],
    description     : 'Loading',
    image           : { type: 'image', fileName: 'Loading.gif', src: LoadingGif },
    author          : "Zach Fischer", //dummyAuthor
    date            : new Date(),
};


export const dummyArticle : Article = {
    preview    : dummyPreview,
    content    : []
};
