export interface Dessert {
    id: number;
    name: string;
    zhName: string;
    price: number;
    image: string;
    stock: number;
    description: string;
    zhDescription: string;
    ingredients: string[];
    zhIngredients: string[];
    chefNote: string;
    zhChefNote: string;
    pairing: string;
    zhPairing: string;
    profile: {
        sweetness: number;
        acidity: number;
        texture: number;
    };
    isChefChoice?: boolean;
}

export const DESSERTS: Dessert[] = [
    {
        id: 1,
        name: "Obsidian Tart",
        zhName: "黑曜石塔",
        price: 280,
        image: "/images/obsidian-tart.png",
        stock: 12,
        description: "70% Ecuador dark chocolate ganache, bamboo charcoal tart shell, smoked sea salt. An exploration of absolute darkness.",
        zhDescription: "70% 厄瓜多黑巧克力甘納許，竹炭塔殼，煙燻海鹽。一場關於絕對黑暗的探索。",
        ingredients: ["Ecuador Cacao 70%", "Bamboo Charcoal", "Smoked Sea Salt", "Tahitian Vanilla"],
        zhIngredients: ["厄瓜多 70% 可可", "竹炭", "煙燻海鹽", "大溪地香草"],
        chefNote: "We wanted to create a dessert that absorbs light. Smoked sea salt is the only glimmer in this void.",
        zhChefNote: "我們想創造一個吸收光線的甜點。煙燻海鹽是這片虛空中的唯一微光。",
        pairing: "Islay Whisky or Dark Roast Coffee",
        zhPairing: "艾雷島威士忌 或 深焙咖啡",
        profile: { sweetness: 2, acidity: 1, texture: 4 },
        isChefChoice: true
    },
    {
        id: 2,
        name: "Lunar Mousse",
        zhName: "月相慕斯",
        price: 320,
        image: "/images/lunar-mousse.png",
        stock: 3, // Low Stock
        description: "Cold brew Earl Grey mousse, lychee insert, white velvet spray. Inspired by the silence and gravity of the moon.",
        zhDescription: "冷萃伯爵茶慕斯，荔枝內餡，白色絨面噴飾。靈感來自月球的寂靜與引力。",
        ingredients: ["Earl Grey Tea", "Lychee", "White Chocolate", "Mascarpone"],
        zhIngredients: ["伯爵茶", "荔枝", "白巧克力", "馬斯卡彭起司"],
        chefNote: "Light as zero gravity. The lychee core brings a hidden bright acidity, like a crater on the moon.",
        zhChefNote: "輕盈如零重力。荔枝核心帶來隱藏的明亮酸度，如同月球上的隕石坑。",
        pairing: "Cold Brew Oolong or Champagne",
        zhPairing: "冷萃烏龍茶 或 香檳",
        profile: { sweetness: 3, acidity: 3, texture: 5 }
    },
    {
        id: 3,
        name: "Nebula Eclair",
        zhName: "星雲閃電",
        price: 250,
        image: "/images/nebula-eclair.png",
        stock: 0, // Sold Out
        description: "Blackberry and violet glaze, Tahitian vanilla custard. A linear explosion of floral notes.",
        zhDescription: "黑莓與紫羅蘭淋面，大溪地香草卡士達。花香調的線性爆發。",
        ingredients: ["Blackberry", "Violet Extract", "Tahitian Vanilla", "Butter Pâte à Choux"],
        zhIngredients: ["黑莓", "紫羅蘭萃取", "大溪地香草", "奶油泡芙皮"],
        chefNote: "The glaze mimics the chaotic beauty of a nebula. Consume quickly, as its flavor evolves with every second.",
        zhChefNote: "淋面模仿星雲的混沌之美。請盡快享用，因為風味隨秒變幻。",
        pairing: "Floral Gin Tonic or Rosé",
        zhPairing: "花香琴通寧 或 粉紅酒",
        profile: { sweetness: 4, acidity: 4, texture: 3 }
    },
    {
        id: 4,
        name: "Concrete Matcha",
        zhName: "水泥抹茶",
        price: 290,
        image: "/images/concrete-matcha.png",
        stock: 8,
        description: "Heavy cheesecake, Koyamaen matcha, black sesame crumble. Solid, architectural, bitter.",
        zhDescription: "重乳酪蛋糕，小山園抹茶，黑芝麻酥粒。堅實、建築感、苦澀。",
        ingredients: ["Uji Matcha", "Cream Cheese", "Black Sesame", "Butter Crumble"],
        zhIngredients: ["宇治抹茶", "奶油乳酪", "黑芝麻", "奶油酥粒"],
        chefNote: "Not for everyone. It is solid, bitter, and uncompromising. Like brutalist architecture on a plate.",
        zhChefNote: "不適合所有人。它堅實、苦澀且不妥協。就像盤子上的野獸派建築。",
        pairing: "Fresh Matcha or Sake",
        zhPairing: "現刷抹茶 或 清酒",
        profile: { sweetness: 2, acidity: 1, texture: 5 }
    },
    {
        id: 5,
        name: "Amber Saint",
        zhName: "琥珀聖道",
        price: 300,
        image: "/images/amber-saint.png",
        stock: 2, // Low Stock
        description: "Mille-feuille, caramel whiskey apple, amber sugar shards. A crystal of time.",
        zhDescription: "千層酥，焦糖威士忌蘋果，琥珀糖片。時間的結晶。",
        ingredients: ["Whiskey", "Granny Smith Apple", "Caramel", "Puff Pastry"],
        zhIngredients: ["威士忌", "青蘋果", "焦糖", "千層酥皮"],
        chefNote: "Time is its main ingredient. A thousand layers of patience, caramelized to the edge of bitterness.",
        zhChefNote: "時間是主要原料。千層的耐心，焦糖化至苦澀的邊緣。",
        pairing: "Aged Rum or Calvados",
        zhPairing: "陳年蘭姆酒 或 蘋果白蘭地",
        profile: { sweetness: 4, acidity: 3, texture: 4 }
    },
    {
        id: 6,
        name: "Eclipse Macaron",
        zhName: "蝕日馬卡龍",
        price: 120,
        image: "/images/eclipse-macaron.png",
        stock: 20,
        description: "Black sesame shell, salted egg yolk buttercream. A celestial alignment of savory and sweet.",
        zhDescription: "黑芝麻外殼，鹹蛋黃奶油霜。鹹甜風味的天體排列。",
        ingredients: ["Black Sesame", "Salted Egg Yolk", "Almond Flour", "Swiss Meringue"],
        zhIngredients: ["黑芝麻", "鹹蛋黃", "杏仁粉", "瑞士蛋白霜"],
        chefNote: "A savory surprise disguised as a dessert. Salted egg yolk brings an umami depth that lingers.",
        zhChefNote: "偽裝成甜點的鹹味驚喜。鹹蛋黃帶來縈繞不去的鮮味深度。",
        pairing: "Tie Guan Yin Tea",
        zhPairing: "鐵觀音",
        profile: { sweetness: 3, acidity: 1, texture: 2 }
    },
];
