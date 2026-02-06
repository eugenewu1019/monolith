export interface GalleryItem {
    id: number;
    image: string;
    title: string;
    zhTitle: string;
    description: string;
    zhDescription: string;
    type: "image" | "video";
    videoUrl?: string;
}

export const GALLERY_DATA: GalleryItem[] = [
    {
        id: 1,
        image: "/images/bts-hands.png",
        title: "The Hands",
        zhTitle: "匠人之手",
        description: "Precision measured in millimeters. Each layer assembled by hand.",
        zhDescription: "以毫米衡量精準度。每一層都由手工組裝。",
        type: "image",
    },
    {
        id: 2,
        image: "/images/bts-tempering.png",
        title: "Tempering",
        zhTitle: "調溫",
        description: "Chocolate at exactly 31.5°C. The science of perfect snap.",
        zhDescription: "巧克力精準控制在 31.5°C。完美脆裂的科學。",
        type: "image",
    },
    {
        id: 3,
        image: "/images/bts-plating.png",
        title: "Final Composition",
        zhTitle: "最終構圖",
        description: "Every placement is intentional. Negative space is a flavor.",
        zhDescription: "每個放置都是刻意的。留白也是一種風味。",
        type: "image",
    },
    {
        id: 4,
        image: "/images/bts-ingredients.png",
        title: "Raw Materials",
        zhTitle: "原材料",
        description: "Single-origin. Traceable. Uncompromising quality.",
        zhDescription: "單一產區。可追溯。毫不妥協的品質。",
        type: "image",
    },
    {
        id: 5,
        image: "/images/bts-lab.png",
        title: "The Lab",
        zhTitle: "實驗室",
        description: "Temperature-controlled. Humidity-monitored. Silence mandatory.",
        zhDescription: "恆溫控制。濕度監測。靜默必須。",
        type: "image",
    },
    {
        id: 6,
        image: "/images/bts-hands.png",
        title: "The Details",
        zhTitle: "細節之眼",
        description: "Every placement is measured. Every texture is intentional.",
        zhDescription: "每個位置都經過測量。每種紋理都是刻意的。",
        type: "image",
    },
];
