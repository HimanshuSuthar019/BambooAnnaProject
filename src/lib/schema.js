import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const PRODUCTS = [
  {
    id: 1,
    name: "Bamboo Speaker",
    category: "Corporate Gifting",
    price: "2499",
    description:
      "Wireless bamboo speaker for premium corporate gifting and executive welcome kits. Natural acoustics with modern Bluetooth technology.",
    imageUrl: "/images/products/speaker.jpg",
  },
  {
    id: 2,
    name: "Bamboo Travel Mug",
    category: "Corporate Gifting",
    price: "999",
    description:
      "Classic bamboo travel mug for daily commutes, office use and corporate gifting. Keeps beverages warm and looks premium.",
    imageUrl: "/images/products/bamboo-travel-mug.jpg",
  },
  {
    id: 3,
    name: "Bamboo Water Bottle",
    category: "Corporate Gifting",
    price: "799",
    description:
      "Bamboo water bottle for corporate giveaways, event kits, and employee onboarding. Stylish, sustainable and long-lasting.",
    imageUrl: "/images/products/bamboo-water-bottel.jpg",
  },
  {
    id: 4,
    name: "Bamboo Plant Stand",
    category: "Lifestyle",
    price: "1299",
    description:
      "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably. Sturdy and stylish.",
    imageUrl: "/images/products/bamboo-plant-stand.jpg",
  },
  {
    id: 5,
    name: "Bamboo Cutting Board",
    category: "Kitchen",
    price: "899",
    description:
      "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen and eco-conscious home.",
    imageUrl: "/images/products/bamboo-cutting-board.jpg",
  },
  {
    id: 6,
    name: "Bamboo Diary",
    category: "Stationery",
    price: "599",
    description:
      "Bamboo cover diary for corporate gifting, events and daily journaling. Premium feel with eco-conscious construction.",
    imageUrl: "/images/products/diary.jpg",
  },
  {
    id: 7,
    name: "Bamboo Sipper",
    category: "Corporate Gifting",
    price: "699",
    description:
      "Bamboo sipper built for office desks, event welcome kits, and repeat brand recall. A premium sustainable gifting option.",
    imageUrl: "/images/products/bamboo-sipper.jpg",
  },
  {
    id: 8,
    name: "Bamboo Cup",
    category: "Corporate Gifting",
    price: "599",
    description:
      "Premium bamboo cup variant for corporate gifting and event welcome kits. Elegant, reusable and eco-friendly.",
    imageUrl: "/images/products/bamboo-cup.jpg",
  },
  {
    id: 9,
    name: "Bamboo Cutlery Set",
    category: "Kitchen",
    price: "499",
    description:
      "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining and zero-waste living.",
    imageUrl: "/images/products/bamboo-cutlery-set.jpg",
  },
  {
    id: 10,
    name: "Bamboo Pen",
    category: "Stationery",
    price: "199",
    description:
      "Bamboo pen for events, corporate gifting and stationery kits. Smooth writing experience with a sustainable bamboo barrel.",
    imageUrl: "/images/products/bamboo-pen.png",
  },
  {
    id: 11,
    name: "Paddle Hair Brush",
    category: "Personal Care",
    price: "449",
    description:
      "Bamboo paddle hair brush with natural bristles. Reduces frizz, adds shine and is gentle on the scalp for daily grooming.",
    imageUrl: "/images/products/bamboo-paddle-hair-brushes.jpg",
  },
  {
    id: 12,
    name: "Bathroom Slipper",
    category: "Hospitality",
    price: "499",
    description:
      "Eco-friendly jute and terry bathroom slipper perfect for hotel guest amenities, spas and wellness retreats.",
    imageUrl: "/images/products/slippers.jpg",
  },
  {
    id: 13,
    name: "Eco Friendly Straws",
    category: "Hospitality",
    price: "299",
    description:
      "Reusable bamboo and coconut drinking straws for cafes, events, and low-waste living. Durable, washable and fully biodegradable.",
    imageUrl: "/images/products/bamboo-straw.jpg",
  },
  {
    id: 14,
    name: "Shaving Kit",
    category: "Hospitality",
    price: "799",
    description:
      "Complete bamboo shaving kit for hospitality amenity sets. Includes razor and accessories in sustainable packaging.",
    imageUrl: "/images/products/bamboo-shaving-kit.jpg",
  },
  {
    id: 15,
    name: "Dental Kit",
    category: "Hospitality",
    price: "599",
    description:
      "Hospitality dental kit that combines oral-care basics in a clean, guest-ready format. Perfect for hotels, spas and wellness centres.",
    imageUrl: "/images/products/bamboo-dental-kit.jpg",
  },
  {
    id: 16,
    name: "Loofah",
    category: "Personal Care",
    price: "199",
    description:
      "Natural loofah sponge for gentle exfoliation. Biodegradable, plastic-free and perfect for eco-conscious bathroom routines.",
    imageUrl: "/images/products/loofah.jpg",
  },
  {
    id: 17,
    name: "Neem Comb",
    category: "Personal Care",
    price: "249",
    description:
      "Classic neem wood comb that detangles hair naturally while stimulating the scalp. Anti-static and gentle on all hair types.",
    imageUrl: "/images/products/WoodenComb.jpg",
  },
  {
    id: 18,
    name: "Bamboo Razor",
    category: "Personal Care",
    price: "399",
    description:
      "Reusable wooden-handle razor made for hospitality shaving kits and sustainable grooming routines. Plastic-free and long-lasting.",
    imageUrl: "/images/products/bamboo-razor.jpg",
  },
  {
    id: 19,
    name: "Bamboo Tongue Cleaner",
    category: "Personal Care",
    price: "199",
    description:
      "Reusable bamboo tongue cleaner suitable for oral-care routines and hotel dental kits. Natural alternative to plastic tongue scrapers.",
    imageUrl: "/images/products/bamboo-tongue-cleaner.jpeg",
  },
  {
    id: 20,
    name: "Bamboo Toothbrush",
    category: "Personal Care",
    price: "299",
    description:
      "Daily-use bamboo toothbrush crafted for hotels, wellness kits, and conscious retail. Biodegradable handle with soft bristles for a guilt-free clean.",
    imageUrl: "/images/products/bamboo-toothBrush.jpg",
  },
];

// export const PRODUCTS = [
//   // ⭐ Most attractive first — Corporate Gifting & Lifestyle
//   {
//     id: 1,
//     name: "Bamboo Speaker",
//     category: "Corporate Gifting",
//     price: "2499",
//     description:
//       "Wireless bamboo speaker for premium corporate gifting and executive welcome kits. Natural acoustics with modern Bluetooth technology.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Bamboo Travel Mug",
//     category: "Corporate Gifting",
//     price: "999",
//     description:
//       "Classic bamboo travel mug for daily commutes, office use and corporate gifting. Keeps beverages warm and looks premium.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Bamboo Water Bottle",
//     category: "Corporate Gifting",
//     price: "799",
//     description:
//       "Bamboo water bottle for corporate giveaways, event kits, and employee onboarding. Stylish, sustainable and long-lasting.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Bamboo Plant Stand",
//     category: "Lifestyle",
//     price: "1299",
//     description:
//       "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably. Sturdy and stylish.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     name: "Bamboo Cutting Board",
//     category: "Kitchen",
//     price: "899",
//     description:
//       "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen and eco-conscious home.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe9?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     name: "Bamboo Diary",
//     category: "Stationery",
//     price: "599",
//     description:
//       "Bamboo cover diary for corporate gifting, events and daily journaling. Premium feel with eco-conscious construction.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop",
//   },

//   // 🟡 Mid tier — Kitchen & Stationery
//   {
//     id: 7,
//     name: "Bamboo Sipper",
//     category: "Corporate Gifting",
//     price: "699",
//     description:
//       "Bamboo sipper built for office desks, event welcome kits, and repeat brand recall. A premium sustainable gifting option.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1571788104673-6873e1f9e6da?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 8,
//     name: "Bamboo Cup",
//     category: "Corporate Gifting",
//     price: "599",
//     description:
//       "Premium bamboo cup variant for corporate gifting and event welcome kits. Elegant, reusable and eco-friendly.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 9,
//     name: "Bamboo Cutlery Set",
//     category: "Kitchen",
//     price: "499",
//     description:
//       "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining and zero-waste living.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1571788104673-6873e1f9e6da?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 10,
//     name: "Bamboo Pen",
//     category: "Stationery",
//     price: "199",
//     description:
//       "Bamboo pen for events, corporate gifting and stationery kits. Smooth writing experience with a sustainable bamboo barrel.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 11,
//     name: "Paddle Hair Brush",
//     category: "Personal Care",
//     price: "449",
//     description:
//       "Bamboo paddle hair brush with natural bristles. Reduces frizz, adds shine and is gentle on the scalp for daily grooming.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 12,
//     name: "Bathroom Slipper",
//     category: "Hospitality",
//     price: "499",
//     description:
//       "Eco-friendly jute and terry bathroom slipper perfect for hotel guest amenities, spas and wellness retreats.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop",
//   },

//   // 🔵 Last — Personal Care & Hospitality basics
//   {
//     id: 13,
//     name: "Eco Friendly Straws",
//     category: "Hospitality",
//     price: "299",
//     description:
//       "Reusable bamboo and coconut drinking straws for cafes, events, and low-waste living. Durable, washable and fully biodegradable.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1571788104673-6873e1f9e6da?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 14,
//     name: "Shaving Kit",
//     category: "Hospitality",
//     price: "799",
//     description:
//       "Complete bamboo shaving kit for hospitality amenity sets. Includes razor and accessories in sustainable packaging.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 15,
//     name: "Dental Kit",
//     category: "Hospitality",
//     price: "599",
//     description:
//       "Hospitality dental kit that combines oral-care basics in a clean, guest-ready format. Perfect for hotels, spas and wellness centres.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1606206591513-adbfbdd4e1c0?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 16,
//     name: "Loofah",
//     category: "Personal Care",
//     price: "199",
//     description:
//       "Natural loofah sponge for gentle exfoliation. Biodegradable, plastic-free and perfect for eco-conscious bathroom routines.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 17,
//     name: "Neem Comb",
//     category: "Personal Care",
//     price: "249",
//     description:
//       "Classic neem wood comb that detangles hair naturally while stimulating the scalp. Anti-static and gentle on all hair types.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1590159763121-7c9fd312190d?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 18,
//     name: "Bamboo Razor",
//     category: "Personal Care",
//     price: "399",
//     description:
//       "Reusable wooden-handle razor made for hospitality shaving kits and sustainable grooming routines. Plastic-free and long-lasting.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 19,
//     name: "Bamboo Tongue Cleaner",
//     category: "Personal Care",
//     price: "199",
//     description:
//       "Reusable bamboo tongue cleaner suitable for oral-care routines and hotel dental kits. Natural alternative to plastic tongue scrapers.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 20,
//     name: "Bamboo Toothbrush",
//     category: "Personal Care",
//     price: "299",
//     description:
//       "Daily-use bamboo toothbrush crafted for hotels, wellness kits, and conscious retail. Biodegradable handle with soft bristles for a guilt-free clean.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop",
//   },
// ];

// export const PRODUCTS = [
//   {
//     id: 1,
//     name: "Bamboo Toothbrush",
//     category: "Bathroom",
//     description: "Eco-friendly bamboo toothbrush with soft bristles, biodegradable handle, and a natural feel for a guilt-free clean.",
//     price: "299",
//     imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "Bamboo Cutting Board",
//     category: "Kitchen",
//     description: "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen.",
//     price: "899",
//     imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "Bamboo Water Bottle",
//     category: "Lifestyle",
//     description: "Stylish and sustainable bamboo-wrapped water bottle. Keep drinks fresh while reducing plastic waste.",
//     price: "699",
//     imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "Bamboo Cutlery Set",
//     category: "Kitchen",
//     description: "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining.",
//     price: "499",
//     imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd1a06f65?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     name: "Bamboo Plant Stand",
//     category: "Lifestyle",
//     description: "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably.",
//     price: "1299",
//     imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     name: "Crafting Bamboo",
//     category: "Accessories",
//     description: "Premium quality raw bamboo sticks for DIY crafts, home décor, and creative projects.",
//     price: "399",
//     imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 7,
//     name: "Bamboo Wooden Combs",
//     category: "Bathroom",
//     description: "Gentle on hair and scalp, this bamboo-handle brush reduces static and breakage naturally.",
//     price: "449",
//     imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 8,
//     name: "Bamboo Soap Dish",
//     category: "Bathroom",
//     description: "Slatted bamboo soap dish with natural drainage. Keeps your soap dry and bathroom plastic-free.",
//     price: "249",
//     imageUrl: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 9,
//     name: "Bamboo Serving Tray",
//     category: "Kitchen",
//     description: "Versatile bamboo serving tray with handles — perfect for breakfast in bed or everyday use.",
//     price: "749",
//     imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe9?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 10,
//     name: "Bamboo Desk Organizer",
//     category: "Accessories",
//     description: "Keep your workspace tidy with this multi-compartment bamboo organizer for pens and stationery.",
//     price: "599",
//     imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 11,
//     name: "Bamboo Floor Mat",
//     category: "Lifestyle",
//     description: "Non-slip bamboo floor mat with smooth finish. Ideal for bathroom, kitchen, or entryway.",
//     price: "1099",
//     imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 12,
//     name: "Bamboo Photo Frame",
//     category: "Accessories",
//     description: "Minimalist bamboo photo frame for a 4x6 print. A sustainable way to display your memories.",
//     price: "349",
//     imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
//   },
// ];

// export const PRODUCTS = [
//   {
//     id: 1,
//     name: "Bamboo Toothbrush",
//     description:
//       "Eco-friendly bamboo toothbrush with soft bristles, biodegradable handle, and a natural feel for a guilt-free clean.",
//     price: "299",
//     imageUrl: "/images/products/toothbrush.jpg",
//   },
//   {
//     id: 2,
//     name: "Bamboo Cutting Board",
//     description:
//       "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen.",
//     price: "899",
//     imageUrl: "/images/products/cutting board.jpg",
//   },
//   {
//     id: 3,
//     name: "Bamboo Water Bottle",
//     description:
//       "Stylish and sustainable bamboo-wrapped water bottle. Keep drinks fresh while reducing plastic waste.",
//     price: "699",
//     imageUrl: "/images/products/bottle.jpg",
//   },
//   {
//     id: 4,
//     name: "Bamboo Cutlery Set",
//     description:
//       "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining.",
//     price: "499",
//     imageUrl: "/images/products/cutlery set bamboo.jpg",
//   },
//   {
//     id: 5,
//     name: "Bamboo Plant Stand",
//     description:
//       "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably.",
//     price: "1299",
//     imageUrl: "/images/products/plant stand.jpg",
//   },
//   {
//     id: 6,
//     name: "Crafting Bamboo",
//     description:
//       "Premium quality raw bamboo sticks for DIY crafts, home décor, and creative projects.",
//     price: "399",
//     imageUrl: "/images/products/crafting bamboo.jpg",
//   },
// ];
