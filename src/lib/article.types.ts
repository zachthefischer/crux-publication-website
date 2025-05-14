export interface ArticlePreview {
    slug        : string,
    title       : string,
    author      : string, // Change to author eventually
    date        : Date,
    categories  : Category[],
    description : string,
    image       : Content,
    likes      ?: number,
}

export interface Article {
    preview     : ArticlePreview
    comments   ?: Comment[],
    content     : Content[]
}

export interface Author {
    name         : string,
    title        : string,
    pfp         ?: string,
    linkedin    ?: string
}

export interface Content {
    type         : 'image' | 'paragraph' | 'header' | 'video' | 'custom_html',
    src         ?: string,  // Image
    file        ?: File,    // Image
    fileName    ?: string   // Image
    text        ?: string   // Paragraph, Custom HTML
}

export interface Comment {
    username    : string,
    text        : string,
}

export type Category = 'Business' | 'Technology' | 'Science' | 'All' | 'OpEd' | 'Creative' | 'Commentary'; 
