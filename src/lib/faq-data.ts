export interface FAQItem {
    id: number;
    question: string;
    zhQuestion: string;
    answer: string;
    zhAnswer: string;
    category: "reservation" | "pickup" | "allergy" | "general";
}

export const FAQ_DATA: FAQItem[] = [
    // Reservation Category
    {
        id: 1,
        question: "How far in advance should I make a reservation?",
        zhQuestion: "需要提前多久預約？",
        answer: "We recommend reserving at least 3 days in advance for regular items, and 7 days for seasonal or limited edition pieces. Walk-in availability is subject to daily stock.",
        zhAnswer: "一般品項建議提前 3 天預約，季節限定或限量款建議提前 7 天。現場取貨依當日庫存狀況而定。",
        category: "reservation"
    },
    {
        id: 2,
        question: "Can I modify or cancel my reservation?",
        zhQuestion: "可以修改或取消預約嗎？",
        answer: "Modifications can be made up to 48 hours before your pickup time. Cancellations within 24 hours may incur a 50% fee for limited edition items.",
        zhAnswer: "可在取貨時間 48 小時前修改訂單。限量款項目若於 24 小時內取消，將收取 50% 費用。",
        category: "reservation"
    },
    {
        id: 3,
        question: "What payment methods do you accept?",
        zhQuestion: "接受哪些付款方式？",
        answer: "We accept Apple Pay, credit cards (Visa, Mastercard, JCB), LINE Pay, and cash on pickup.",
        zhAnswer: "接受 Apple Pay、信用卡（Visa、Mastercard、JCB）、LINE Pay，以及現場現金付款。",
        category: "reservation"
    },

    // Pickup Category
    {
        id: 4,
        question: "What are your pickup hours?",
        zhQuestion: "取貨時間是什麼時候？",
        answer: "Pickup is available Tuesday to Sunday, 13:00-19:00. We are closed on Mondays. Please arrive within 30 minutes of your reserved time slot.",
        zhAnswer: "取貨時間為週二至週日 13:00-19:00，週一公休。請於預約時段 30 分鐘內到場取貨。",
        category: "pickup"
    },
    {
        id: 5,
        question: "Do you offer delivery?",
        zhQuestion: "有提供外送服務嗎？",
        answer: "Currently, we only offer in-store pickup to ensure the highest quality presentation. Our desserts are crafted to be enjoyed within hours of pickup.",
        zhAnswer: "目前僅提供店內取貨，以確保最佳呈現品質。我們的甜點建議於取貨後數小時內享用。",
        category: "pickup"
    },
    {
        id: 6,
        question: "How should I store my desserts?",
        zhQuestion: "甜點該如何保存？",
        answer: "Most items should be refrigerated at 4-6°C and consumed within 3 days. Macarons can be stored at room temperature for 2 days. Specific instructions are provided with each order.",
        zhAnswer: "大部分品項建議冷藏於 4-6°C，並於 3 天內食用完畢。馬卡龍可室溫保存 2 天。每份訂單附有詳細保存說明。",
        category: "pickup"
    },

    // Allergy Category
    {
        id: 7,
        question: "Do you accommodate dietary restrictions?",
        zhQuestion: "可以配合飲食限制嗎？",
        answer: "Our kitchen handles nuts, dairy, eggs, and gluten. While we take precautions, cross-contamination is possible. Please inform us of severe allergies when ordering.",
        zhAnswer: "我們的廚房處理堅果、乳製品、蛋類及麩質。雖然我們會採取預防措施，但仍可能有交叉污染。若有嚴重過敏，請於訂購時告知。",
        category: "allergy"
    },
    {
        id: 8,
        question: "Do you have vegan options?",
        zhQuestion: "有純素選項嗎？",
        answer: "We occasionally feature plant-based creations. Please check our seasonal menu or contact us directly for current vegan offerings.",
        zhAnswer: "我們偶爾會推出植物性甜點。請查看季節菜單或直接聯繫我們了解目前的純素選項。",
        category: "allergy"
    },

    // General Category
    {
        id: 9,
        question: "Can I visit without a reservation?",
        zhQuestion: "可以不預約直接到訪嗎？",
        answer: "Our atelier is a production space, not a traditional retail store. Walk-ins are welcome on a limited basis, subject to availability.",
        zhAnswer: "我們的工作室是生產空間，非傳統零售店面。歡迎現場到訪，但需視當日庫存情況而定。",
        category: "general"
    },
    {
        id: 10,
        question: "Do you offer gift wrapping?",
        zhQuestion: "有禮盒包裝服務嗎？",
        answer: "Yes, we offer signature gift packaging for an additional fee. Our minimalist black boxes with gold foil embossing reflect the MONOLITH aesthetic.",
        zhAnswer: "有的，我們提供招牌禮盒包裝服務（需額外收費）。極簡黑盒搭配金箔壓印，彰顯 MONOLITH 美學。",
        category: "general"
    },
];

export const FAQ_CATEGORIES = {
    reservation: { en: "Reservation", zh: "預約相關" },
    pickup: { en: "Pickup & Storage", zh: "取貨與保存" },
    allergy: { en: "Dietary & Allergies", zh: "飲食與過敏" },
    general: { en: "General", zh: "一般問題" },
};
