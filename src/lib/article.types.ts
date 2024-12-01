export interface Article {
    slug        : string | undefined,
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
    text        ?: string   // Paragraph
    custom_html ?: string   // Custom HTML
}

export type Category = 'Business' | 'Technology' | 'Science' | 'All' | 'OpEd' | 'Creative' | 'Commentary'; 