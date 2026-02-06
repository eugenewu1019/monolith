
import { notFound } from "next/navigation";
import { COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import MobileCollaborationHighlight from "@/components/mobile/mobile-collaboration-highlight";

// Generate static params for all collaborations
export async function generateStaticParams() {
    return COLLABORATIONS_DATA.map((collab) => ({
        id: collab.id.toString(),
    }));
}

export default async function MobileCollaborationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const collabId = parseInt(id);
    const collab = COLLABORATIONS_DATA.find((c) => c.id === collabId);

    if (!collab) {
        notFound();
    }

    return <MobileCollaborationHighlight collab={collab} />;
}
