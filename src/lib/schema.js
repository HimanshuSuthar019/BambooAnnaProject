import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// export const PRODUCTS = [
//   {
//     id: 1,
//     name: "Bamboo Toothbrush",
//     category: "Bathroom",
//     description:
//       "Eco-friendly bamboo toothbrush with soft bristles, biodegradable handle, and a natural feel for a guilt-free clean.",
//     price: "299",
//     imageUrl: "/images/products/toothbrush.jpg",
//   },
//   {
//     id: 2,
//     name: "Bamboo Cutting Board",
//     category: "Kitchen",
//     description:
//       "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen.",
//     price: "899",
//     imageUrl: "/images/products/cutting board.jpg",
//   },
//   {
//     id: 3,
//     name: "Bamboo Water Bottle",
//     category: "Lifestyle",
//     description:
//       "Stylish and sustainable bamboo-wrapped water bottle. Keep drinks fresh while reducing plastic waste.",
//     price: "699",
//     imageUrl: "/images/products/bottle.jpg",
//   },
//   {
//     id: 4,
//     name: "Bamboo Cutlery Set",
//     category: "Kitchen",
//     description:
//       "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining.",
//     price: "499",
//     imageUrl: "/images/products/cutlery set bamboo.jpg",
//   },
//   {
//     id: 5,
//     name: "Bamboo Plant Stand",
//     category: "Lifestyle",
//     description:
//       "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably.",
//     price: "1299",
//     imageUrl: "/images/products/plant stand.jpg",
//   },
//   {
//     id: 6,
//     name: "Crafting Bamboo",
//     category: "Accessories",
//     description:
//       "Premium quality raw bamboo sticks for DIY crafts, home décor, and creative projects.",
//     price: "399",
//     imageUrl: "/images/products/crafting bamboo.jpg",
//   },
//   {
//     id: 7,
//     name: "Bamboo Hair Brush",
//     category: "Bathroom",
//     description:
//       "Gentle on hair and scalp, this bamboo-handle brush reduces static and breakage naturally.",
//     price: "449",
//     imageUrl:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 8,
//     name: "Bamboo Soap Dish",
//     category: "Bathroom",
//     description:
//       "Slatted bamboo soap dish with natural drainage. Keeps your soap dry and your bathroom plastic-free.",
//     price: "249",
//     imageUrl:
//       "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 9,
//     name: "Bamboo Serving Tray",
//     category: "Kitchen",
//     description:
//       "Versatile bamboo serving tray with handles — perfect for breakfast in bed, parties, or everyday use.",
//     price: "749",
//     imageUrl:
//       "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe9?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 10,
//     name: "Bamboo Desk Organizer",
//     category: "Accessories",
//     description:
//       "Keep your workspace tidy with this multi-compartment bamboo organizer for pens, cards, and stationery.",
//     price: "599",
//     imageUrl:
//       "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 11,
//     name: "Bamboo Floor Mat",
//     category: "Lifestyle",
//     description:
//       "Non-slip bamboo floor mat with smooth finish. Ideal for bathroom, kitchen, or entryway use.",
//     price: "1099",
//     imageUrl:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
//   },
//   {
//     id: 12,
//     name: "Bamboo Photo Frame",
//     category: "Accessories",
//     description:
//       "Minimalist bamboo photo frame for a 4x6 print. A sustainable way to display your favourite memories.",
//     price: "349",
//     imageUrl:
//       "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop",
//   },
// ];

// Static product data (replaces the DB/API layer for a pure frontend build)
export const PRODUCTS = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    description:
      "Eco-friendly bamboo toothbrush with soft bristles, biodegradable handle, and a natural feel for a guilt-free clean.",
    price: "299",
    imageUrl: "/images/products/toothbrush.jpg",
  },
  {
    id: 2,
    name: "Bamboo Cutting Board",
    description:
      "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen.",
    price: "899",
    imageUrl: "/images/products/cutting board.jpg",
  },
  {
    id: 3,
    name: "Bamboo Water Bottle",
    description:
      "Stylish and sustainable bamboo-wrapped water bottle. Keep drinks fresh while reducing plastic waste.",
    price: "699",
    imageUrl: "/images/products/bottle.jpg",
  },
  {
    id: 4,
    name: "Bamboo Cutlery Set",
    description:
      "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining.",
    price: "499",
    imageUrl: "/images/products/cutlery set bamboo.jpg",
  },
  {
    id: 5,
    name: "Bamboo Plant Stand",
    description:
      "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably.",
    price: "1299",
    imageUrl: "/images/products/plant stand.jpg",
  },
  {
    id: 6,
    name: "Crafting Bamboo",
    description:
      "Premium quality raw bamboo sticks for DIY crafts, home décor, and creative projects.",
    price: "399",
    imageUrl: "/images/products/crafting bamboo.jpg",
  },
];
