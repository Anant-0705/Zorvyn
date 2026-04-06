# Zorvyn

Zorvyn is a modern personal and shared-finance frontend built with React and Vite.

It includes:

- A marketing-style landing page
- A full dashboard workspace for financial tracking
- Role-aware UI behavior (`viewer` and `admin`)
- Interactive insights and charts from transaction data

## Routes

- `/` -> Landing page
- `/dashboard` -> Finance dashboard app

Routing is handled in `src/App.jsx` by checking `window.location.pathname`.

## Features

### Dashboard

- Summary cards for total balance, income, and expenses
- Trend analysis with monthly charting
- Category breakdown with donut chart
- Recent activity and workspace layout optimized for desktop + mobile

### Transactions

- Transaction listing with date, description, category, type, and amount
- Search and filter support
- Sort options (for example by date/amount)
- Empty states for no results

### Insights

- Highest spending category detection
- Month-over-month comparisons
- Savings/behavior signal generation from live transaction data

### Role-Based UX

- Role switch support through user context
- `viewer`: read-only interaction
- `admin`: add/edit transaction capabilities (where enabled in UI)

### Landing Page

- Distinct branded landing experience
- Mobile menu for small screens
- Direct call-to-action to open dashboard

## Tech Stack

- React 19
- Vite 8
- Context API for app state
- Recharts for data visualization
- lucide-react for icons
- Custom CSS token system in `src/index.css`

## Project Structure

```text
src/
  components/
    charts/
      DonutChart.jsx
      TrendChart.jsx
    layout/
      Header.jsx
    ui/
      Badge.jsx
      Card.jsx
      EmptyState.jsx
  context/
    TransactionContext.jsx
    UserContext.jsx
    user-context.js
  data/
    mockData.js
  hooks/
    usePermissions.js
    useTransactionContext.js
    useTransactions.js
    useUser.js
  views/
    Dashboard.jsx
    Insights.jsx
    LandingPage.jsx
    Transactions.jsx
  App.jsx
  index.css
  main.jsx
```

## State and Data Notes

- Transaction and role state are handled via context providers.
- Data is currently mock/local and intended for frontend demonstration.
- Local persistence is used for key user-facing state (such as selected role and transactions).

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start local development

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - run Vite development server
- `npm run build` - create production build
- `npm run preview` - preview production bundle
- `npm run lint` - run ESLint
