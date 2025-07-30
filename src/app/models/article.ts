export default interface Article {
    name: string;
    title: string;
    mainParagraph: string;
    paragraphs: { title: string; text: string }[];
    location: string;
    images: string[];
    link: string;
}
