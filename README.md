# BambooAnna — React JS Project (No TypeScript)

This is the full BambooAnna brand website converted from TypeScript to plain JavaScript + React.

## What changed from the original
- All `.tsx` files → `.jsx`
- All `.ts` files → `.js`
- Removed all TypeScript type annotations (`interface`, `type`, `: string`, etc.)
- Removed `tsconfig.json`
- Removed server/database dependencies (Drizzle, PostgreSQL, Express)
- Product data is now static in `src/lib/schema.js` (no backend needed)
- Contact form simulates a successful send (add your own backend if needed)
- Simplified `package.json` — only frontend dependencies

## Project Structure
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── Navigation.jsx
│   ├── ProductCard.jsx
│   ├── ContactForm.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── textarea.jsx
│       ├── label.jsx
│       ├── table.jsx
│       ├── tooltip.jsx
│       ├── toast.jsx
│       └── toaster.jsx
├── hooks/
│   ├── use-products.js
│   ├── use-messages.js
│   └── use-toast.js
├── lib/
│   ├── utils.js
│   ├── queryClient.js
│   └── schema.js       ← product data lives here
└── pages/
    ├── Home.jsx
    └── NotFound.jsx
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Copy your product images to:
public/images/products/
  - toothbrush.jpg
  - cutting board.jpg
  - bottle.jpg
  - cutlery set bamboo.jpg
  - plant stand.jpg
  - crafting bamboo.jpg

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

## Add Products
Edit `src/lib/schema.js` → update the `PRODUCTS` array.

## Connect a Real Backend
Replace the `mutationFn` in `src/hooks/use-messages.js` with a real `fetch()` call to your API.
