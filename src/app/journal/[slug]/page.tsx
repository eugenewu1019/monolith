import { JOURNAL_DATA } from "@/lib/journal-data";
import JournalArticleContent from "./article-content";

export function generateStaticParams() {
    return JOURNAL_DATA.map((article) => ({
        slug: article.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function JournalArticlePage({ params }: PageProps) {
    const { slug } = await params;
    return <JournalArticleContent slug={slug} />;
}
