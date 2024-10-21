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
    type      : 'image' | 'paragraph' | 'header',
    src      ?: string,  // Images
    file     ?: File,    // Images
    fileName ?: string   // Images
    text     ?: string   // Paragraph
}

export type Category = 'Business' | 'Technology' | 'Science' | 'All' | 'OpEd' | 'Creative' | 'Commentary'; 