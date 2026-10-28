# Highlander Gold & Silver — Admin Console

A production-ready, high-performance Admin Console designed and engineered for **Highlander Gold & Silver** ([https://highlander-goldandsilver.vercel.app/](https://highlander-goldandsilver.vercel.app/)), Bigfork, Montana's premier precious metals, sovereign gold, and rare numismatics marketplace.

The admin console layout, sidebar, header, and data table architecture are inspired by the **Gardner Auction Admin Console** reference design, paired with Highlander Gold & Silver's distinct brand identity: deep aubergine navy (`#01214A`), bullion gold accents (`#D4AF37`), Cinzel typography, and a seamless right-hand content outlet navigation flow.

---

## 🏛️ Business Overview & Actual Entities

Highlander Gold & Silver is a physical & digital rare coin and precious metals marketplace located at:
- **Vault & Storefront:** 119 Jewel Basin Ct. B3, Bigfork, MT 59911
- **Direct Phone:** (406) 407-0281
- **Settlement Email:** Stratford1955@icloud.com
- **PayPal Direct:** https://paypal.me/HighlanderGoldSilver
- **Terms:** Standard 15% Numismatic Buyer's Premium (`totalSettlement = basePrice * 1.15`)

### Managed Entities:
1. **Inventory & Certified Lots (`/inventory`):**
   - Individual catalog lots (e.g., Lot #1: *1876 George T. Morgan Proposed $100 Gold Union™*, Lot #153: *1897 Morgan Silver Dollar MS-65 PL*, Lot #170: *10 oz Scottsdale .999 Silver Stacker® Bar*).
   - Fields: Lot #, Title, Lead Subtitle, Numismatic Description, Category, Metal Composition, Purity/Weight, Certified Grade (PCGS, NGC, CAC, PCI), Mintage, Base Hammer Price, 15% Buyer's Premium, Total Settlement, Availability Status (`Available`, `Reserved`, `Sold`, `Unavailable`), Featured status, and High-Resolution Photography.
2. **Categories & Metals (`/categories`):**
   - Manages collection segments: *Gold*, *Morgan Dollars*, *Silver Bullion*, *Commemorative*, *Ancient*.
   - Dynamic real-time calculation of catalog valuation and active items per category.
3. **Orders & Settlements (`/orders`):**
   - Manages collector purchases and wire settlements.
   - Calculates base subtotal, 15% Buyer's Premium, and total settlement.
   - Tracks payment status (`Pending Wire`, `Settled`, `Refunded`, `Cancelled`) and fulfillment status (`Vault Dispatch`, `Dispatched`, `Awaiting Payment`, `Delivered`).
4. **Collectors & VIP Directory (`/customers`):**
   - Client records with focus areas (e.g., pre-1933 gold, Morgan dollars, silver stackers, Hellenistic coinage), VIP tiers, order counts, and total acquisition expenditures.
5. **Acquisition Inquiries & Buybacks (`/inquiries`):**
   - Tracks incoming inquiries generated from the storefront acquisition form and email requests.
   - One-click mail dispatch reply with prefilled context.
6. **Precious Metals Spot Ticker & Melt Calculator (`/spot-prices`):**
   - Live benchmark market prices for Gold (XAU), Silver (XAG), and Platinum (XPT).
   - Built-in melt value and 15% premium calculator for US Morgan silver dollars, $20 Saint-Gaudens, and bullion bars.
7. **Storefront & Database Settings (`/settings`):**
   - Storefront operational configuration, 15% Buyer's Premium rate adjustment, bank wire routing details, and Supabase connection diagnostics.

---

## ⚡ Tech Stack

- **Framework:** React.js (JavaScript ES6+, strict no TypeScript)
- **Bundler:** Vite
- **Styling:** Tailwind CSS (custom brand theme: Aubergine `#01214A`, Gold `#D4AF37`, Warm Cream `#FAF9F6`)
- **Routing:** React Router DOM (v6) with single-page layout outlet
- **Database:** Supabase (`@supabase/supabase-js`)
- **Icons:** Lucide React
- **Analytics:** Recharts

---

## 🚀 Getting Started

### 1. Development Server

Start the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build

Verify the production build and code-splitting:

```bash
npm run build
```

---

## 🗄️ Supabase Integration & Egress Optimization

The dashboard is engineered with a **zero-rewrite Supabase architecture**. You do **not** need to touch any UI components or rewrite pages when connecting Supabase.

### How to Connect Supabase:

1. **Run the Database Schema Migration:**
   Open the Supabase SQL Editor and execute the contents of:
   ```
   src/lib/schema.sql
   ```
   This creates all tables (`inventory`, `categories`, `orders`, `customers`, `inquiries`, `store_settings`), performance indexes, and RLS policies.

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Provide your Supabase URL and public anonymous key:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Restart the Dev Server:**
   ```bash
   npm run dev
   ```
   The dashboard will automatically detect the connection, show the green **"Supabase: Live Connected"** badge, and route all queries directly through Supabase!

### Strict Egress Optimizations Applied:

- **Selective Column Queries:** Table views use targeted column projections (e.g., `id, lot_number, title, lead, category, metal, purity, grade, price, is_featured, status, stock_quantity, featured_image`) instead of `select('*')`.
- **Server-Side Range Pagination:** Uses Supabase `.range(from, to)` to fetch only the requested page size (10, 25, 50).
- **Debounced Network Search (350ms):** Prevents egress spam on keystrokes.
- **Combined Dashboard Metrics:** Single parallel fetch aggregation (`dashboardService.getDashboardSummary()`) to prevent duplicate requests across components.
- **Optimistic State Management:** Local React state updates immediately on CRUD operations, eliminating unnecessary full-table refetches.
- **Clean Empty & Development State:** If Supabase is not connected yet, the dashboard operates seamlessly using local persistence pre-seeded with the exact catalog from the live website.

---

## 📱 Responsive Layout & Gardner Auction Admin Structure

- **Desktop:** Fixed left dark navy sidebar (`#01214A`), collapsible to icon-only rail, with main content rendering exclusively on the right side via `<Outlet />`.
- **Mobile & Tablet:** Responsive sliding navigation drawer with touch targets, sticky top header with spot price pill, responsive cards, and horizontal scroll containment on data tables.
- **No External Tab Redirects:** Navigation strictly remains within the dashboard SPA.

