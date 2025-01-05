export interface Article {
    slug        : string,
    title       : string,
    author      : string,
    date        : string,
    categories  : Category[],
    description : string,
    image       : ArticleContent
    content     : ArticleContent[]
}

export interface ArticleContent {
    type         : 'image' | 'paragraph' | 'header' | 'video' | 'custom_html',
    src         ?: string,  // Images
    file        ?: File,    // Images
    fileName    ?: string   // Images
    text        ?: string   // Paragraph, Custom HTML
}

export type Category = 'Business' | 'Technology' | 'Science' | 'All' | 'OpEd' | 'Creative' | 'Commentary'; 