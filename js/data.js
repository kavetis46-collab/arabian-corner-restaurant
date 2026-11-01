/**
 * Arabian Corner Restaurant - Skylounge (Gachibowli, Hyderabad)
 * Official Business Details & Menu Configuration
 */

const RESTAURANT_CONFIG = {
    name: "Arabian Corner Restaurant - Skylounge",
    shortName: "Arabian Corner",
    tagline: "Authentic Arabian Flavors & Late-Night Skylounge Dining",
    subtitle: "Experience authentic slow-cooked Mandi, charcoal-grilled tandoori kebabs, rich Mughlai gravies, and artisan desserts under the stars at Gachibowli, Hyderabad.",
    arabicName: "مطعم الركن العربي - سكاي لاونج",
    
    // Official WhatsApp & Phone Number (from Google Maps: 098851 96008)
    whatsappNumber: "919885196008", 
    phone: "+91 98851 96008",
    displayPhone: "098851 96008",
    email: "contact@arabiancornerskylounge.com",
    
    // Official Google Maps Address & Location
    address: "2-48/6, Sri Shyam Nagar, Telecom Nagar Extension, Gachibowli, Hyderabad, Telangana 500032",
    landmark: "Located in: Venkat Sai's Ganapathi Gold",
    plusCode: "C9P8+9M Hyderabad, Telangana",
    area: "Gachibowli, Telecom Nagar",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500032",
    
    // Operating Hours & Pricing (from Google Maps)
    timing: "Open Daily · Closes 5:00 AM (Late Night Skylounge & Midnight Dining)",
    timingShort: "Open Daily till 5 AM",
    priceRange: "₹400–1,600 per person",
    priceReported: "Reported by 79+ patrons on Google Maps",
    
    // Business Features & Badges
    services: [
        "No-contact delivery",
        "Rooftop Skylounge",
        "Dine-in & Majlis",
        "Takeaway",
        "Late Night Dining (till 5 AM)",
        "LGBTQ+ friendly",
        "100% Halal Certified"
    ],
    
    currency: "₹",
    deliveryFee: 40,
    freeDeliveryThreshold: 500,
    halalCertified: true
};

const MENU_CATEGORIES = [
    { id: "all", name: "Full Royal Menu", icon: "fa-utensils", count: 14 },
    { id: "mandi", name: "Mandi & Arabian Specialties", icon: "fa-crown", count: 4 },
    { id: "tandoori", name: "Tandoori & Kebabs", icon: "fa-fire", count: 3 },
    { id: "curries", name: "Main Course & Mughlai", icon: "fa-bowl-rice", count: 3 },
    { id: "breads", name: "Artisan Tandoori Breads", icon: "fa-bread-slice", count: 4 },
    { id: "desserts", name: "Desserts & Beverages", icon: "fa-ice-cream", count: 4 }
];

const MENU_ITEMS = [
    // -------------------------------------------------------------------------
    // MANDI & ARABIAN SPECIALTIES
    // -------------------------------------------------------------------------
    {
        id: "chicken-faham-mandi",
        name: "Chicken Faham Mandi",
        arabicName: "فحم مندي دجاج",
        category: "mandi",
        categoryName: "Mandi & Arabian Specialties",
        description: "Charcoal-grilled Arabian-spiced chicken served over flavorful, slow-cooked aromatic rice.",
        longDescription: "A legendary Arabian classic. Succulent chicken steeped in a secret 14-spice blend, slow-grilled over natural charcoal embers to smoky perfection, and laid over long-grain sella basmati rice steamed with lamb bone broth, saffron, and whole spices. Served with Dakkoos (spicy tomato salsa) and toum garlic dip.",
        price: 360,
        portions: [
            { name: "Quarter (1 Pc + Rice)", price: 230 },
            { name: "Half (2 Pcs + Rice)", price: 420 },
            { name: "Full Platter (4 Pcs + Rice)", price: 780 }
        ],
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        badge: "Chef's Signature • Charcoal Smoked",
        isVeg: false,
        spiceLevel: 2,
        featured: true,
        rating: 4.9,
        reviewCount: 384
    },
    {
        id: "raan-e-huzoor",
        name: "Raan E Huzoor (Serves 3)",
        arabicName: "ران الحضور الملكي",
        category: "mandi",
        categoryName: "Mandi & Arabian Specialties",
        description: "A grand platter featuring slow-cooked, tender mutton leg seasoned with rich spices.",
        longDescription: "The jewel of royal Arabian feasts! A whole tender baby mutton leg marinated for 24 hours in saffron, crushed cardamom, roasted cumin, and royal herbs. Slow-braised in a sealed dum pot for over 6 hours until the meat slips effortlessly off the bone. Served over an opulent mountain of fragrant Mandi rice garnished with roasted cashews, fried onions, and raisins.",
        price: 1599,
        portions: [
            { name: "Grand Platter (Serves 3-4 People)", price: 1599 }
        ],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        badge: "Royal Special • Serves 3",
        isVeg: false,
        spiceLevel: 2,
        featured: true,
        rating: 5.0,
        reviewCount: 290
    },
    {
        id: "mutton-juicy-mandi",
        name: "Mutton Juicy Mandi",
        arabicName: "مندي لحم جوسي",
        category: "mandi",
        categoryName: "Mandi & Arabian Specialties",
        description: "Extra tender pieces of mutton served with stock-infused traditional Mandi rice.",
        longDescription: "Prime cuts of premium tender mutton, pressure-steamed in its own natural juices until melt-in-the-mouth soft. The savory bone marrow jus is then used to cook our golden long-grain Mandi rice, guaranteeing incredible depth of flavor in every spoonful.",
        price: 490,
        portions: [
            { name: "Single Portion", price: 490 },
            { name: "Double Portion", price: 920 },
            { name: "Family Platter (Serves 4)", price: 1750 }
        ],
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
        badge: "Melt In Mouth • Bestseller",
        isVeg: false,
        spiceLevel: 2,
        featured: true,
        rating: 4.9,
        reviewCount: 412
    },
    {
        id: "murgh-lebanese-tikka",
        name: "Murgh Lebanese Tikka",
        arabicName: "شيش طاووق لبناني",
        category: "mandi",
        categoryName: "Mandi & Arabian Specialties",
        description: "Juicy chicken pieces marinated in yogurt, lemon, garlic, and Middle Eastern spices before grilling.",
        longDescription: "Authentic Lebanese Shish Tawook style! Supreme cuts of boneless chicken thighs bathed in strained yogurt, fresh lemon zest, sumac, garlic cloves, oregano, and cold-pressed olive oil. Skewered and grilled over scorching coals for that irresistible char and juiciness.",
        price: 340,
        portions: [
            { name: "Regular (6 Pieces)", price: 340 },
            { name: "Large Platter (12 Pieces)", price: 620 }
        ],
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
        badge: "Authentic Middle Eastern",
        isVeg: false,
        spiceLevel: 1,
        featured: true,
        rating: 4.8,
        reviewCount: 245
    },

    // -------------------------------------------------------------------------
    // TANDOORI & KEBABS
    // -------------------------------------------------------------------------
    {
        id: "seekh-kebabs",
        name: "Seekh Kebabs (Mutton / Chicken)",
        arabicName: "كباب سيخ عربي",
        category: "tandoori",
        categoryName: "Tandoori & Kebabs",
        description: "Finely minced mutton or chicken seasoned with fresh herbs and grilled on skewers.",
        longDescription: "Hand-pounded lean meat blended with crushed green chilies, fresh mint, coriander leaves, browned onions, and roasted garam masala. Molded onto long iron skewers and roasted in a traditional earthen tandoor until smoky and succulent.",
        price: 320,
        portions: [
            { name: "Chicken Seekh (4 Skewers)", price: 320 },
            { name: "Mutton Seekh (4 Skewers)", price: 390 },
            { name: "Assorted Mix Platter (8 Skewers)", price: 690 }
        ],
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
        badge: "Smoky Charcoal Grill",
        isVeg: false,
        spiceLevel: 3,
        featured: true,
        rating: 4.8,
        reviewCount: 310
    },
    {
        id: "malai-tikka",
        name: "Murgh Malai Tikka",
        arabicName: "تكا دجاج بالكريمة",
        category: "tandoori",
        categoryName: "Tandoori & Kebabs",
        description: "Creamy, mildly spiced boneless chicken chunks grilled to perfection.",
        longDescription: "Velvety chicken breast morsels steeped in rich clotted malai cream, cashew paste, green cardamom dust, and mild white pepper. Grilled gently over slow embers to preserve its tender, melt-on-the-tongue texture. Served with mint chutney and pickled onions.",
        price: 350,
        portions: [
            { name: "Regular (6 Pieces)", price: 350 },
            { name: "Special Platter (10 Pieces)", price: 580 }
        ],
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80",
        badge: "Mild & Creamy Favorite",
        isVeg: false,
        spiceLevel: 1,
        featured: false,
        rating: 4.9,
        reviewCount: 278
    },
    {
        id: "arabian-mixed-grill",
        name: "Arabian Corner Royal Mixed Grill",
        arabicName: "مشاوي مشكلة ملكية",
        category: "tandoori",
        categoryName: "Tandoori & Kebabs",
        description: "A combination feast of Seekh Kebabs, Murgh Malai Tikka, Lebanese Tikka, and grilled spiced wings.",
        longDescription: "The ultimate charcoal grill experience for meat connoisseurs. Includes 2 pcs Chicken Seekh, 2 pcs Mutton Seekh, 3 pcs Malai Tikka, 3 pcs Lebanese Tikka, grilled tomatoes, charbroiled chilies, hummus, and freshly baked pita breads.",
        price: 790,
        portions: [
            { name: "Mixed Grill Platter (Serves 2-3)", price: 790 }
        ],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        badge: "Grill Master Selection",
        isVeg: false,
        spiceLevel: 2,
        featured: false,
        rating: 4.9,
        reviewCount: 195
    },

    // -------------------------------------------------------------------------
    // MAIN COURSE & MUGHLAI GRAVIES
    // -------------------------------------------------------------------------
    {
        id: "mughlai-butter-chicken",
        name: "Mughlai Butter Chicken (Murgh Makhani)",
        arabicName: "دجاج بالزبدة مغولي",
        category: "curries",
        categoryName: "Main Course & Sides",
        description: "A variety of rich curries including Butter Chicken, Chicken Masala, and Mutton Rogan Josh.",
        longDescription: "Authentic Old Delhi & Mughlai heritage recipe. Tandoor-roasted shredded chicken simmered gently in a silky, strained sauce of sun-ripened tomatoes, dairy butter, cashew cream, and dried fenugreek leaves (kasoori methi). Mildly sweet, tangy, and deeply aromatic.",
        price: 360,
        portions: [
            { name: "Half Bowl", price: 240 },
            { name: "Full Handi", price: 390 }
        ],
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        badge: "Rich & Velvety",
        isVeg: false,
        spiceLevel: 1,
        featured: true,
        rating: 4.9,
        reviewCount: 520
    },
    {
        id: "chicken-masala-gravy",
        name: "Special Chicken Masala",
        arabicName: "دجاج ماسالا حار",
        category: "curries",
        categoryName: "Main Course & Sides",
        description: "Tender chicken pieces simmered in a robust, spiced onion-tomato gravy with roasted whole spices.",
        longDescription: "A fiery, full-flavored Mughlai curry crafted with caramelized sliced onions, crushed ginger-garlic, freshly ground coriander seeds, and Kashmiri red chillies simmered on low heat until the aromatic oil rises to the top.",
        price: 340,
        portions: [
            { name: "Half Bowl", price: 230 },
            { name: "Full Handi", price: 370 }
        ],
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
        badge: "Spiced & Hearty",
        isVeg: false,
        spiceLevel: 2,
        featured: false,
        rating: 4.7,
        reviewCount: 210
    },
    {
        id: "mutton-rogan-josh",
        name: "Mutton Rogan Josh (Royal Kashmiri)",
        arabicName: "روغان جوش كشميري",
        category: "curries",
        categoryName: "Main Course & Sides",
        description: "Tender chunks of bone-in mutton braised in an opulent crimson gravy perfumed with saffron and fennel.",
        longDescription: "A hallmark of royal banquets. Slow-braised baby lamb cooked with browned shallots, Kashmiri chillies, dried ginger powder, crushed fennel seeds, and ratanjot herb for an authentic crimson hue and heavenly aroma.",
        price: 460,
        portions: [
            { name: "Half Handi", price: 310 },
            { name: "Full Royal Handi", price: 490 }
        ],
        image: "https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80",
        badge: "Royal Kashmiri Heritage",
        isVeg: false,
        spiceLevel: 2,
        featured: false,
        rating: 4.9,
        reviewCount: 332
    },

    // -------------------------------------------------------------------------
    // BREADS
    // -------------------------------------------------------------------------
    {
        id: "garlic-butter-naan",
        name: "Artisan Garlic Naan",
        arabicName: "نان بالثوم والزبدة",
        category: "breads",
        categoryName: "Fresh Artisan Breads",
        description: "Butter Naan, Garlic Naan, Rumali Roti, and traditional Tandoori Roti options.",
        longDescription: "Hand-stretched leavened flatbread slapped onto the fiery walls of a clay tandoor oven, blistered to golden perfection, and generously brushed with melted farm butter, minced garlic, and fresh coriander.",
        price: 60,
        portions: [
            { name: "1 Piece", price: 60 },
            { name: "Basket of 3 Naans", price: 160 }
        ],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        badge: "Clay Tandoor Fresh",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.8,
        reviewCount: 410
    },
    {
        id: "butter-naan-special",
        name: "Classic Butter Naan",
        arabicName: "نان كلاسيك بالزبدة",
        category: "breads",
        categoryName: "Fresh Artisan Breads",
        description: "Crispy yet pillow-soft leavened bread generously layered with pure dairy butter.",
        longDescription: "Traditional tandoor-baked flatbread, soft in the center with golden crisp bubbles on the surface, drenched in luscious warm butter.",
        price: 50,
        portions: [
            { name: "1 Piece", price: 50 },
            { name: "Basket of 3 Naans", price: 140 }
        ],
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
        badge: "Pure Dairy Butter",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.8,
        reviewCount: 320
    },
    {
        id: "rumali-roti",
        name: "Handkerchief Rumali Roti",
        arabicName: "خبز رومالي رقيق",
        category: "breads",
        categoryName: "Fresh Artisan Breads",
        description: "Paper-thin, ultra-soft flatbread spun in the air and baked on an inverted domed tawa.",
        longDescription: "An artful delicacy! Stretched to translucent thinness by our master ustad and baked in seconds on an inverted cast iron dome. Incredibly light and perfect with rich Mughlai gravies.",
        price: 30,
        portions: [
            { name: "1 Piece", price: 30 },
            { name: "Set of 3 Rotis", price: 80 }
        ],
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        badge: "Ultra Thin & Soft",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.7,
        reviewCount: 190
    },
    {
        id: "tandoori-roti",
        name: "Traditional Tandoori Roti",
        arabicName: "خبز تنور تقليدي",
        category: "breads",
        categoryName: "Fresh Artisan Breads",
        description: "Whole wheat healthy roti baked crisp on clay tandoor walls, with or without butter.",
        longDescription: "Wholesome stone-ground wheat flour kneaded with water and salt, baked directly against clay tandoor coals for a wholesome earthy bite.",
        price: 25,
        portions: [
            { name: "Plain Tandoori Roti", price: 25 },
            { name: "Butter Tandoori Roti", price: 30 }
        ],
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        badge: "100% Whole Wheat",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.6,
        reviewCount: 140
    },

    // -------------------------------------------------------------------------
    // DESSERTS & BEVERAGES
    // -------------------------------------------------------------------------
    {
        id: "kunafah-signature",
        name: "Signature Cheese Kunafah",
        arabicName: "كنافة جبنة نابلسية",
        category: "desserts",
        categoryName: "Desserts & Beverages",
        description: "Their signature Middle Eastern pastry made with shredded phyllo dough, soaked in sweet syrup, and layered with melted cheese.",
        longDescription: "The undisputed queen of Middle Eastern desserts! Prepared live to order with crisp, golden kataifi shredded pastry crust, filled with authentic stretchy sweet Nabulsi and mozzarella cheeses, baked till bubbling, and soaked in warm cardamom and rose-water scented sugar syrup. Crowned with crushed emerald pistachios and dried rose petals.",
        price: 290,
        portions: [
            { name: "Classic Cheese (Single / Couple)", price: 290 },
            { name: "Nutella & Cream Cheese Kunafah", price: 340 },
            { name: "Grand Royal Feast Platter (Serves 4)", price: 580 }
        ],
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
        badge: "Star Dessert • Freshly Baked",
        isVeg: true,
        spiceLevel: 0,
        featured: true,
        rating: 5.0,
        reviewCount: 640
    },
    {
        id: "umali-om-ali",
        name: "Umali (Om Ali - Egyptian Bread Pudding)",
        arabicName: "أم علي التقليدية",
        category: "desserts",
        categoryName: "Desserts & Beverages",
        description: "A traditional Egyptian bread pudding dessert filled with nuts and raisins.",
        longDescription: "A centuries-old comforting Egyptian dessert. Flaky layers of baked puff pastry soaked in sweetened vanilla-infused hot milk and rich clotted cream, baked until golden brown on top and studded with toasted pistachios, almonds, pine nuts, shredded coconut, and golden sultanas.",
        price: 240,
        portions: [
            { name: "Clay Pot Single Serving", price: 240 },
            { name: "Family Sharing Bowl", price: 440 }
        ],
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
        badge: "Authentic Egyptian Dessert",
        isVeg: true,
        spiceLevel: 0,
        featured: true,
        rating: 4.9,
        reviewCount: 285
    },
    {
        id: "arabian-mint-lemonade",
        name: "Arabian Limonana (Fresh Mint Lemonade)",
        arabicName: "عصير ليمون ونعناع مثلج",
        category: "desserts",
        categoryName: "Desserts & Beverages",
        description: "Chilled crushed ice beverage blended with freshly squeezed lemons, crisp spearmint, and orange blossom mist.",
        longDescription: "The iconic Middle Eastern refresher! Crushed ice frappe whipped with garden fresh mint leaves, tart lemon juice, and a whisper of orange blossom water. The ultimate palate cleanser after rich Mandi.",
        price: 130,
        portions: [
            { name: "Tall Chilled Glass", price: 130 },
            { name: "Pitcher (Serves 3-4)", price: 340 }
        ],
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        badge: "Refreshing Signature Drink",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.8,
        reviewCount: 310
    },
    {
        id: "royal-karak-chai",
        name: "Royal Saffron Karak Chai",
        arabicName: "شاي كرك بالزعفران",
        category: "desserts",
        categoryName: "Desserts & Beverages",
        description: "Slow-brewed spiced black tea simmered with evaporated milk, crushed green cardamom pods, and Kashmiri saffron.",
        longDescription: "Rich, aromatic, and deeply comforting. Strong Assam tea leaves simmered for hours with caramelized milk, crushed whole cardamom, clove, and saffron threads. Served piping hot in authentic earthen cups.",
        price: 80,
        portions: [
            { name: "1 Earthen Kulhad", price: 80 },
            { name: "Pot for Two", price: 140 }
        ],
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        badge: "Slow Brewed Traditional",
        isVeg: true,
        spiceLevel: 0,
        featured: false,
        rating: 4.9,
        reviewCount: 420
    }
];

const RESTAURANT_REVIEWS = [
    {
        name: "Mohammed Irfan (Gachibowli)",
        date: "2 days ago",
        rating: 5,
        review: "The Chicken Faham Mandi is hands down the best in Gachibowli, Hyderabad! Charcoal smoked to perfection, and the skylounge rooftop atmosphere under the stars is unmatched. Ordered on WhatsApp at 1:30 AM and got piping hot food delivered via no-contact delivery!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        dish: "Chicken Faham Mandi"
    },
    {
        name: "Sneha & Salman Rao",
        date: "Last week",
        rating: 5,
        review: "Celebrated a family feast at Ganapathi Gold, Telecom Nagar. We ordered the Raan E Huzoor grand platter for 3 and it was glorious! The mutton leg fell right off the bone. Plus, the hot Cheese Kunafah was freshly baked and stretchy. 10/10 dining!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        dish: "Raan E Huzoor & Kunafah"
    },
    {
        name: "Vikram Reddy (HITEC City)",
        date: "3 weeks ago",
        rating: 5,
        review: "Finding authentic Mandi and kebabs open until 5 AM in Hyderabad is a lifesaver! The WhatsApp ordering system is so smooth—sent our table order right from the phone and owner confirmed instantly. Murgh Lebanese Tikka is incredible.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        dish: "Lebanese Tikka & Kebabs"
    }
];

const RESTAURANT_FAQS = [
    {
        q: "Where is Arabian Corner Restaurant - Skylounge located?",
        a: "We are located at 2-48/6, Sri Shyam Nagar, Telecom Nagar Extension, Gachibowli, Hyderabad, Telangana 500032 (Located in Venkat Sai's Ganapathi Gold). Our Plus Code on Google Maps is C9P8+9M Hyderabad."
    },
    {
        q: "What are your operating hours?",
        a: "We are open daily and serve until 5:00 AM! Perfect for evening dinners, midnight cravings, and late-night skylounge dining in Gachibowli."
    },
    {
        q: "How does the WhatsApp ordering process work?",
        a: "Simply browse our menu, select your favorite dishes and portions, choose No-Contact Delivery, Takeaway, or Table Dine-in, and click 'Place Order via WhatsApp'. Your order is automatically sent directly to our hotline at 098851 96008, where the owner confirms it right away!"
    },
    {
        q: "What is the typical price range per person?",
        a: "Our dishes range from ₹400 to ₹1,600 per person (as reported by 79+ patrons on Google Maps), offering great value for premium royal Arabian Mandi, Tandoori kebabs, and authentic platters."
    },
    {
        q: "Do you offer No-Contact Delivery and are you Halal certified & inclusive?",
        a: "Yes! We provide safe No-Contact Delivery across Gachibowli, Kondapur, and nearby Hyderabad areas. 100% of our meats are certified Halal, and our skylounge is proudly LGBTQ+ friendly and welcoming to all families and groups."
    }
];

// Node.js module export compatibility (for testing/bundling)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RESTAURANT_CONFIG,
        MENU_CATEGORIES,
        MENU_ITEMS,
        RESTAURANT_REVIEWS,
        RESTAURANT_FAQS
    };
}

