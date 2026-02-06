export interface Product {
    name: string;
    zhName: string;
    description: string;
    zhDescription: string;
    price?: string;
}

export interface Collaboration {
    id: number;
    brand: string;
    zhBrand: string;
    logo: string;
    year: number;
    title: string;
    zhTitle: string;
    description: string;
    zhDescription: string;
    story: string;
    zhStory: string;
    quote: string;
    zhQuote: string;
    quoteAuthor: string;
    quoteAuthorTitle: string;
    zhQuoteAuthorTitle: string;
    image: string;
    gallery: string[];
    products: Product[];
}

export const COLLABORATIONS_DATA: Collaboration[] = [
    {
        id: 1,
        brand: "Kyoto Ceramics",
        zhBrand: "京都陶藝",
        logo: "/images/collab-logo-kyoto.png",
        year: 2025,
        title: "Earth & Sugar",
        zhTitle: "土與糖",
        description: "A limited collection where each dessert is served on hand-thrown Shigaraki-yaki vessels. The imperfect beauty of wabi-sabi meets structural pastry.",
        zhDescription: "限量系列，每件甜點皆以手拉信樂燒器皿盛裝。侘寂的不完美之美與結構甜點的相遇。",
        story: "In the mountains of Shigaraki, time moves differently. The clay here breathes. Our collaboration with Master potter Hayato investigates the parallel between firing clay and caramelizing sugar. Both require intense heat to find their final form, yet both rely on the hands that shape them before the fire takes over. We designed three desserts that mirror the textures of unglazed clay—rough, tactile, yet holding something incredibly delicate within.",
        zhStory: "在信樂的山中，時間的流動截然不同。這裡的陶土會呼吸。我們與陶藝大師 Hayato 的合作，探索了燒製陶土與焦糖化糖分之間的平行關係。兩者都需要高溫才能轉化為最終形態，但也都依賴於火之試煉前的雙手塑形。我們設計了三款甜點，呼應未上釉陶器的質地——粗獷、具手感，卻包覆著極其細膩的內在。",
        quote: "We are not making plates for food; we are making landscapes for flavor to inhabit.",
        zhQuote: "我們不是在製作盛裝食物的盤子；我們是在為風味創造棲息的地景。",
        quoteAuthor: "Hayato Tanaka",
        quoteAuthorTitle: "Master Potter",
        zhQuoteAuthorTitle: "陶藝大師",
        image: "/images/collab-kyoto.png",
        gallery: [
            "/images/collab-kyoto-1.png",
            "/images/collab-kyoto-2.png",
            "/images/collab-kyoto-3.png"
        ],
        products: [
            {
                name: "The Moss",
                zhName: "苔",
                description: "Matcha mousse with smoked clay-infused ganache.",
                zhDescription: "抹茶慕斯佐煙燻陶土風味甘納許。",
                price: "NT$ 420"
            },
            {
                name: "Scorched Earth",
                zhName: "焦土",
                description: "Burnt caramel tart with sea salt from the Seto Inland Sea.",
                zhDescription: "焦糖塔佐瀨戶內海海鹽。",
                price: "NT$ 380"
            }
        ]
    },
    {
        id: 2,
        brand: "Oolong Lab",
        zhBrand: "烏龍實驗室",
        logo: "/images/collab-logo-oolong.png",
        year: 2024,
        title: "Fermented Futures",
        zhTitle: "發酵未來",
        description: "A pairing menu exploring aged oolong alongside desserts featuring kombucha gel and tea-infused ganache.",
        zhDescription: "探索陳年烏龍與甜點的配對菜單，包含康普茶凝膠與茶浸甘納許。",
        story: "Fermentation is controlled decay, a beautiful paradox where time adds value rather than taking it away. Working with Oolong Lab's 30-year aged teas, we realized that sugar can also be aged. This menus explores the funk, the acid, and the deep umami notes found in both aged tea and fermented cacao. It is a dialogue effectively spanning three decades.",
        zhStory: "發酵是受控的衰變，一個美麗的悖論——時間在此是增值而非減損。使用烏龍實驗室珍藏的30年老茶，我們意識到糖也可以被陳釀。這份菜單探索了陳年茶與發酵可可中共同存在的酸度、陳韻與深層鮮味。這是一場跨越三十年的對話。",
        quote: "Tea captures the sunlight of the past; pastry captures the mood of the present.",
        zhQuote: "茶捕捉了過去的陽光；甜點捕捉了當下的情緒。",
        quoteAuthor: "Dr. Chen",
        quoteAuthorTitle: "Tea Master",
        zhQuoteAuthorTitle: "首席茶師",
        image: "/images/collab-oolong.png",
        gallery: [
            "/images/collab-oolong-1.png",
            "/images/collab-oolong-2.png",
            "/images/collab-oolong-3.png"
        ],
        products: [
            {
                name: "Vintage 1994",
                zhName: "1994 陳釀",
                description: "Oolong tea opera cake with fermented tea jelly.",
                zhDescription: "烏龍茶歐培拉蛋糕佐發酵茶凍。",
                price: "NT$ 450"
            },
            {
                name: "Amber Cloud",
                zhName: "琥珀雲",
                description: "Tea-smoked meringue with citrus curd.",
                zhDescription: "茶燻蛋白霜佐柑橘凝乳。",
                price: "NT$ 320"
            }
        ]
    },
    {
        id: 3,
        brand: "Atelier Noir",
        zhBrand: "黑工坊",
        logo: "/images/collab-logo-noir.png",
        year: 2024,
        title: "Scent of Darkness",
        zhTitle: "黑暗之香",
        description: "Collaboration with the niche fragrance house. Each dessert paired with a matching scent diffuser for a multi-sensory experience.",
        zhDescription: "與小眾香氛品牌合作。每件甜點搭配相應的香氛擴香，帶來多重感官體驗。",
        story: "Flavor is 80% smell. By manipulating the olfactory environment, we change the taste of the dessert without touching the recipe. Atelier Noir created three bespoke atmospheric scents—'Petrichor', 'Old Book', and 'Burnt Wood'. Our challenge was to create pastries that would complete the scent profile, turning the air itself into an ingredient.",
        zhStory: "風味有 80% 來自嗅覺。透過操控嗅覺環境，我們在不改變食譜的情況下改變了甜點的味道。黑工坊創造了三款專屬情境香氛——「雨後泥土」、「舊書」與「燒焦木頭」。我們的挑戰是創造能補完這些香氣輪廓的甜點，將空氣本身轉化為一種食材。",
        quote: "We paint with invisible ink. The pastry chef makes it visible.",
        zhQuote: "我們用隱形墨水作畫。甜點主廚讓它顯影。",
        quoteAuthor: "Sophie L.",
        quoteAuthorTitle: "Perfumer",
        zhQuoteAuthorTitle: "調香師",
        image: "/images/collab-noir.png",
        gallery: [
            "/images/collab-noir-1.png",
            "/images/collab-noir-2.png",
            "/images/collab-noir-3.png"
        ],
        products: [
            {
                name: "Petrichor",
                zhName: "雨後",
                description: "Beetroot and dark chocolate architecture.",
                zhDescription: "甜菜根與黑巧克力結構。",
                price: "NT$ 400"
            },
            {
                name: "Old Library",
                zhName: "舊圖書館",
                description: "Vanilla, leather smoke, and old paper essence.",
                zhDescription: "香草、皮革煙燻與舊紙張精華。",
                price: "NT$ 480"
            }
        ]
    },
];
