# Shoporia

**Shoporia** is a modern eCommerce web app built with cutting-edge technologies like **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **MongoDB Atlas**. It supports smooth product discovery, category filtering, and a fully customizable storefront experience.

**Live Site**: [https://shoporia-five.vercel.app](https://shoporia-five.vercel.app)

---

## Preview

![Shoporia Preview](https://github.com/user-attachments/assets/cb8d5560-de22-49d5-96fb-784b0737824d)

---

## Features

- Product search with smart category filtering
- Static + dynamic banners, brand showcases, and categories
- Checkout-ready design (Stripe compatible)
- Authentication (NextAuth + social login ready)
- Shopping cart flow with persistent state
- Modular, scalable file structure with App Router
- Fully responsive & accessible UI

---

## Built With

| Frontend             | Backend             | Utilities               |
|----------------------|---------------------|--------------------------|
| Next.js 15 (App Router) | MongoDB Atlas        | TypeScript, ESLint       |
| Tailwind CSS         | NextAuth.js         | Unsplash & eBay APIs     |
| React + Framer Motion | Stripe-ready (optional) | Vercel-hosted         |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/B-Acharekar/shoporia.git
cd shoporia
npm install
````

### 2. Setup Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

NEXT_PUBLIC_UNSPLASH_KEY=your-unsplash-key

EBAY_ENV=production
EBAY_CLIENT_ID=your-client-id
EBAY_CLIENT_SECRET=your-client-secret
EBAY_DEV_ID=your-dev-id
EBAY_OAUTH_TOKEN=your-oauth-token
```

### 3. Run Dev Server

```bash
npm run dev
```

---

## Folder Overview

```
src/
├── app/             # Pages (App Router structure)
│   ├── shop/        # Category/product search
│   ├── dashboard/   # Admin interface
│   └── api/         # Route handlers (eBay/Unsplash/etc)
├── components/      # Shared UI and logic
├── lib/             # Database, utils, auth logic
├── styles/          # Tailwind and globals
```

---

## Planned Features

* Order tracking dashboard
* Admin inventory controls
* Reviews and rating system
* Internationalization (i18n)
* Multi-vendor support
* SEO enhancements

---

## Contributing

Feel free to **fork** the repo, suggest changes via **pull requests**, or open **issues** for bugs and feature requests.

```bash
# Initialize Git
git init
git remote add origin https://github.com/B-Acharekar/shoporia.git
```

While you're here, check out other projects on my GitHub:
[https://github.com/B-Acharekar](https://github.com/B-Acharekar)

---

## License

This project is licensed under the **MIT License** — free to use and modify.

---

## Credits

Built by [B-Acharekar](https://github.com/B-Acharekar)

