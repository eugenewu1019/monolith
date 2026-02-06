import { JOURNAL_DATA } from "@/lib/journal-data";
import MobileJournalArticleContent from "./article-content";

export function generateStaticParams() {
    return JOURNAL_DATA.map((article) => ({
        slug: article.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function MobileJournalArticlePage({ params }: PageProps) {
    const { slug } = await params;
    return <MobileJournalArticleContent slug={slug} />;
}
