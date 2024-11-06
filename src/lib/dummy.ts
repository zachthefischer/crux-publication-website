import LoadingGif from '$lib/assets/Loading.gif';
import type { Article } from './article.types';

export const dummyArticle : Article = {
    slug            : undefined,
    title           : '',
    categories      : ['All'],
    description     : 'Loading',
    image           : { type: 'image', fileName: 'Loading.gif', src: LoadingGif },
    author          : '',
    date            : 'Jan 1, 2022',
    content         : []
};
