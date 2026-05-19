import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// Static product data (replaces the DB/API layer for a pure frontend build)
export const PRODUCTS = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    description: "Eco-friendly bamboo toothbrush with soft bristles, biodegradable handle, and a natural feel for a guilt-free clean.",
    price: "299",
    imageUrl: "/images/products/toothbrush.jpg",
  },
  {
    id: 2,
    name: "Bamboo Cutting Board",
    description: "Durable, naturally antimicrobial cutting board crafted from premium bamboo. Perfect for every kitchen.",
    price: "899",
    imageUrl: "/images/products/cutting board.jpg",
  },
  {
    id: 3,
    name: "Bamboo Water Bottle",
    description: "Stylish and sustainable bamboo-wrapped water bottle. Keep drinks fresh while reducing plastic waste.",
    price: "699",
    imageUrl: "/images/products/bottle.jpg",
  },
  {
    id: 4,
    name: "Bamboo Cutlery Set",
    description: "Complete set of bamboo utensils including fork, spoon, knife and chopsticks. Ideal for on-the-go dining.",
    price: "499",
    imageUrl: "/images/products/cutlery set bamboo.jpg",
  },
  {
    id: 5,
    name: "Bamboo Plant Stand",
    description: "Elegant multi-tier bamboo plant stand to display your indoor plants beautifully and sustainably.",
    price: "1299",
    imageUrl: "/images/products/plant stand.jpg",
  },
  {
    id: 6,
    name: "Crafting Bamboo",
    description: "Premium quality raw bamboo sticks for DIY crafts, home décor, and creative projects.",
    price: "399",
    imageUrl: "/images/products/crafting bamboo.jpg",
  },
];
