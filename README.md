# Quotator Project

**My role:** Developer

**Project description:**
Sample Template for a quotation system

**Skills and deliverables:**
- React Bootstrap
- JavaScript
- Vercel
- GitHub

---

## Overview

A professional, React-based application for generating, managing, and sending price quotations to clients. Built with a clean **Swiss Style** design system using Bootstrap.

![Quotator Dashboard](https://raw.githubusercontent.com/manus-ai/quotator/main/screenshot.png)

## Features

- **Dashboard**: Overview of all quotations with status filtering (Draft, Sent, Accepted, Rejected).
- **Quote Builder**: 
  - Add/Edit line items with automatic calculations.
  - Client selection and management.
  - Tax rate configuration.
  - Custom notes and terms.
- **Print Preview**: Professional, printable view of quotations ready for client delivery.
- **Responsive Design**: Fully responsive interface that works on desktop and mobile.
- **Swiss Design System**: High-contrast, typography-focused UI for clarity and professionalism.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Bootstrap 5, React Bootstrap, Custom CSS (Swiss Style)
- **Icons**: React Bootstrap Icons
- **State Management**: React Hooks (Local State)
- **Utilities**: nanoid (ID generation), sonner (Toast notifications)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Package Manager: `npm`, `yarn`, or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lfoliveira317/quotator.git
   cd quotator
   ```

2. Install dependencies (choose one):
   ```bash
   # using npm
   npm install

   # using yarn
   yarn install

   # using pnpm
   pnpm install
   ```

3. Start the development server:
   ```bash
   # using npm
   npm run dev

   # using yarn
   yarn dev

   # using pnpm
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
quotator/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components (QuotationForm, QuotationList, etc.)
│   │   ├── lib/           # Data models and initial mock data
│   │   ├── pages/         # Main application pages
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Entry point
│   └── index.html
├── server/                # Backend placeholder (not used in static version)
└── package.json
```

## Usage

1. **Create a Quote**: Click "New Quotation" on the dashboard.
2. **Add Items**: Fill in client details, add line items, and set tax rates.
3. **Save**: Save the quotation as a Draft or mark it as Sent.
4. **Preview/Print**: Click the eye icon to view the printable version and use the browser's print function to save as PDF.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
