# Finance Dashboard UI

A clean, interactive finance dashboard built for the assignment brief.

It focuses on frontend decision-making: data modeling, role-based UI behavior, insights computation, and clear user experience with responsive layouts.

## Project Overview

The dashboard helps users:

- View a financial summary (balance, income, expenses)
- Analyze trends over time
- Explore and filter transactions
- Switch roles between `viewer` and `admin`
- Read data-driven insights (highest spending category, month-over-month changes, savings signal)

## Stack Decisions

- `React + Vite` for fast iteration and clean component architecture
- `Context API` for centralized state and predictable state updates without over-engineering
- `Recharts` for time-series and category visualizations
- `lucide-react` for lightweight, readable UI icons
- Plain CSS with design tokens for a white/grey/black visual system and explicit income/expense colors

## Folder Structure

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
	data/
		mockData.js
	hooks/
		usePermissions.js
		useTransactions.js
	views/
		Dashboard.jsx
		Insights.jsx
		Transactions.jsx
	App.jsx
	index.css
	main.jsx
```

## Core Requirements Coverage

### 1) Dashboard Overview

- Summary cards: `Total Balance`, `Income`, `Expenses`
- Time-based visualization: trend chart (monthly income, expense, running balance)
- Categorical visualization: multi-color donut chart for spending categories

### 2) Transactions Section

- Transaction list includes date, amount, category, and type
- Features implemented:
	- Search by description/category
	- Filter by type
	- Filter by category
	- Sort by date or amount

### 3) Basic Role Based UI

- Role switcher in header (`viewer` / `admin`)
- `viewer`: read-only UI
- `admin`: can add and edit transactions

### 4) Insights Section

Insights are dynamically calculated from current transaction data:

- Highest spending category
- Monthly income and expense comparison vs previous month
- Savings rate for latest month
- Generated observation message based on spending behavior

### 5) State Management

State is managed using two contexts:

- `UserContext`: selected role
- `TransactionContext`: transactions, filters, derived dashboard metrics, chart datasets, and insights

Includes local storage persistence for:

- Selected role
- Transactions data

### 6) UI/UX Expectations

- Responsive layout for desktop and mobile
- Clean card-based information hierarchy
- Empty states for no data and no matching filters
- Consistent color semantics:
	- Income: green
	- Expenses: red
	- Base UI: white/grey/black

## RBAC Architecture

- `usePermissions` hook centralizes role checks (`canAddTransaction`, `canEditTransaction`)
- Views consume permission booleans instead of spreading role conditionals everywhere
- This keeps role logic scalable and easy to audit

## How Insights Work

- Transactions are grouped by month (`YYYY-MM`)
- Monthly income/expense totals are computed
- Current month is compared with previous month using percent delta
- Spending categories are aggregated to determine highest expense category
- Observation text is derived from calculated conditions, not hardcoded static claims

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Assumptions

- Data is mock/static and persisted locally in browser storage
- Currency shown as USD for demo consistency
- This submission is frontend-only and intentionally excludes backend/auth services
