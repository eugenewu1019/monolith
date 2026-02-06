export interface JournalArticle {
    id: number;
    slug: string;
    title: string;
    zhTitle: string;
    excerpt: string;
    zhExcerpt: string;
    content: string;
    zhContent: string;
    date: string;
    readTime: number;
    image: string;
    category: string;
    zhCategory: string;
}

export const JOURNAL_DATA: JournalArticle[] = [
    {
        id: 1,
        slug: "the-silence-of-tempering",
        title: "The Silence of Tempering",
        zhTitle: "調溫的寂靜",
        excerpt: "Why I work in complete silence when tempering chocolate, and what it taught me about listening to ingredients.",
        zhExcerpt: "為什麼我在調溫巧克力時堅持完全的靜默，以及這教會我如何傾聽食材。",
        content: `Tempering chocolate is not about temperature. It's about listening.

When I first arrived in Belgium at 22, my mentor would make me stand in silence for the first hour of each day. No music. No conversation. Just the sound of cocoa butter crystallizing.

At 31.5°C, chocolate speaks. There's a subtle change in viscosity, a shift in how light reflects off the surface. You cannot hear this with noise in the room. You cannot feel this if your mind is elsewhere.

Now, at MONOLITH, we maintain silence in the tempering room. Not as a rule, but as a philosophy. The best desserts are made when we remove ourselves from the equation and simply... listen.`,
        zhContent: `調溫巧克力不是關於溫度。而是關於傾聽。

當我 22 歲初到比利時時，我的導師會讓我每天的第一個小時站在靜默中。沒有音樂。沒有交談。只有可可脂結晶的聲音。

在 31.5°C 時，巧克力會說話。黏度有微妙的變化，光線在表面反射的方式也在改變。你無法在嘈雜中聽到這些。你無法在心不在焉時感受到這些。

現在，在 MONOLITH，我們在調溫室保持靜默。不是作為規定，而是作為哲學。最好的甜點是在我們將自己從方程式中移除，然後單純地……傾聽時做出來的。`,
        date: "2025-01-15",
        readTime: 4,
        image: "/images/journal-tempering.png",
        category: "Philosophy",
        zhCategory: "哲學",
    },
    {
        id: 2,
        slug: "why-imperfection-matters",
        title: "Why Imperfection Matters",
        zhTitle: "為何不完美很重要",
        excerpt: "The Japanese concept of wabi-sabi and how it shaped my approach to plating.",
        zhExcerpt: "侘寂的日本美學概念，以及它如何塑造我的擺盤理念。",
        content: `Perfect circles are boring.

I spent years trying to achieve geometric perfection in my pastry. Every quenelle identical. Every line razor-straight. Then I visited Kyoto and saw a 400-year-old tea bowl deliberately made uneven by its creator.

That bowl was more beautiful than any precision I had achieved. Because it had character. It had intention in its imperfection.

Now, when I plate, I leave room for the accidental. A slightly off-center placement. A crumble that falls naturally. These are not mistakes. They are moments of truth.`,
        zhContent: `完美的圓很無聊。

我花了好幾年試圖在甜點中達到幾何完美。每個橢圓勺型都一模一樣。每條線都筆直如剃刀。然後我去了京都，看到了一個 400 年歷史的茶碗，被它的創作者刻意做成不均勻的。

那個碗比我達到的任何精準都更美。因為它有性格。它在不完美中有意圖。

現在，當我擺盤時，我為意外留出空間。稍微偏離中心的放置。自然落下的酥粒。這些不是錯誤。這些是真實的瞬間。`,
        date: "2025-01-08",
        readTime: 3,
        image: "/images/journal-wabisabi.png",
        category: "Technique",
        zhCategory: "技法",
    },
    {
        id: 3,
        slug: "the-72-hour-rule",
        title: "The 72-Hour Rule",
        zhTitle: "72 小時法則",
        excerpt: "Good desserts take time. Great desserts take patience. Here's why we never rush.",
        zhExcerpt: "好的甜點需要時間。偉大的甜點需要耐心。這就是為什麼我們從不趕時間。",
        content: `Every dessert at MONOLITH takes at least 72 hours to create.

This is not a marketing claim. It's a necessity.

Day 1: We prep the base components. Infusions begin. Custards are churned and rested. Fruit is dehydrated.

Day 2: Assembly happens in stages. Each layer needs time to set before the next is added. Temperature fluctuations are monitored.

Day 3: Final glazes. Quality check. Rest period before service.

Could we do it faster? Technically, yes. Would it taste the same? Absolutely not. Flavor develops over time. Textures mature. What leaves our kitchen has had 72 hours to become what it was meant to be.`,
        zhContent: `MONOLITH 的每件甜點至少需要 72 小時來創作。

這不是行銷話術。這是必要的。

第一天：我們準備基礎組件。開始浸漬。卡士達被攪打並靜置。水果被脫水。

第二天：分階段組裝。每一層都需要時間凝固才能加入下一層。溫度波動被監控。

第三天：最後的淋面。品質檢查。出餐前的靜置期。

我們可以做得更快嗎？技術上可以。味道會一樣嗎？絕對不會。風味隨時間發展。質感會成熟。離開我們廚房的東西，已經經過 72 小時成為它應該成為的樣子。`,
        date: "2024-12-20",
        readTime: 5,
        image: "/images/journal-72hours.png",
        category: "Process",
        zhCategory: "製程",
    },
];
