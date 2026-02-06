export interface Testimonial {
    id: number;
    name: string;
    zhName: string;
    role: string;
    zhRole: string;
    content: string;
    zhContent: string;
    rating: number;
    avatar?: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        id: 1,
        name: "Michelle T.",
        zhName: "蜜雪兒 T.",
        role: "Food Critic, Taipei Times",
        zhRole: "美食評論家，台北時報",
        content: "MONOLITH redefines what a dessert can be. The Obsidian Tart is a meditation — bitter, smoky, and hauntingly beautiful. This is not sweetness for sweetness's sake; this is art.",
        zhContent: "MONOLITH 重新定義了甜點的可能。黑曜石塔是一場冥想——苦澀、煙燻、美得令人難忘。這不是為了甜而甜，這是藝術。",
        rating: 5,
    },
    {
        id: 2,
        name: "Jonathan Liu",
        zhName: "劉博文",
        role: "Chef Owner, Ember & Ash",
        zhRole: "主廚兼店主，餘燼之灰",
        content: "Rarely do I encounter a patissier who treats texture with such reverence. Renzo's Lunar Mousse is impossibly light — as if eating a whisper.",
        zhContent: "很少遇到一位甜點師能如此敬畏地對待質感。Renzo 的月相慕斯輕盈得不可思議——彷彿在品嚐一聲低語。",
        rating: 5,
    },
    {
        id: 3,
        name: "Vivian Chang",
        zhName: "張薇安",
        role: "Luxury Lifestyle Blogger",
        zhRole: "精品生活部落客",
        content: "The attention to detail is unparalleled. From the minimalist packaging to the flavor profiles that evolve with every bite. MONOLITH is an experience, not just a dessert.",
        zhContent: "細節的講究無可比擬。從極簡包裝到每一口都在變化的風味層次。MONOLITH 是一種體驗，不只是甜點。",
        rating: 5,
    },
    {
        id: 4,
        name: "Dr. Kevin Wu",
        zhName: "吳凱文醫師",
        role: "Regular Customer",
        zhRole: "常客",
        content: "I've been coming here weekly for two years. The Concrete Matcha is my ritual — unapologetically bitter, deeply grounding. It's the only dessert that matches my coffee.",
        zhContent: "我每週來這裡已經兩年了。水泥抹茶是我的儀式——毫不妥協的苦澀，讓人沉靜。這是唯一能配得上我咖啡的甜點。",
        rating: 5,
    },
    {
        id: 5,
        name: "Sarah Lin",
        zhName: "林思妤",
        role: "Architect",
        zhRole: "建築師",
        content: "As someone who appreciates structure and form, MONOLITH speaks my language. Each piece looks like it could be exhibited in a gallery. The Amber Saint is sculptural perfection.",
        zhContent: "作為一個欣賞結構與形式的人，MONOLITH 說的是我的語言。每件作品看起來都能在美術館展出。琥珀聖道是雕塑般的完美。",
        rating: 5,
    },
];
