// ১. ভেতরের অ্যারের প্রতিটি আইটেমের (Article) টাইপ
export interface Article {
    id: string;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    type: string;
    isLive: boolean;
    firstPublished: string | null; // কিছু ডেটাতে null আছে
    lastPublished: string | null;  // কিছু ডেটাতে null আছে
    source: string;
}

// ২. মেইন অবজেক্টের (Curation) টাইপ
export interface CurationData {
    title: string;
    curationId: string;
    curationType: string;
    link: string | null;  // এখানে null আছে
    count: number;
    articles: Article[];  // এখানে Article টাইপের অ্যারে
}