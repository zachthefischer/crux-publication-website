export interface Article {
    title       : string,
    author      : string,
    date        : string,
    category    : string,
    description : string,
    image       : ArticleContent
    content     : ArticleContent[]
}

export interface ArticleContent {
    type      : string,
    src      ?: string,  // Images
    file     ?: File,    // Images
    fileName ?: string   // Images
    content  ?: string   // Paragraph
}