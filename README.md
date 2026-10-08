# 🛒 Fredrik's Angels

Fredrik's Angels är en webbshop byggd med React, TypeScript och Vite.

## 🚀 Tech stack

- React
- TypeScript
- Vite
- React Router
- CSS / Tailwind / MUI / Lucide / React icons
- Vitest
- react-error-boundary
- React hook form
- Zod
- TanStack Query

## 📋 Funktioner

- Visa produkter
- Visa produktdetaljer
- Lägga produkter i varukorg
- Filtrera produkter
- Ändra antal i varukorgen
- Ta bort produkter från varukorgen
- Lagersaldo
- Checkout
- Valideringsform
- Visa orderbekräftelse

## 🛠️ Installation

Klona repositoryt:

```bash
git clone <repository-url>
```

Installera dependencies:

```bash
npm install
```

Starta utvecklingsservern:

```bash
npm start
```

Applikationen körs sedan på:

```bash
http://localhost:5173
```

## 📦 Scripts

```bash
npm run start     # Starta utvecklingsservern samt servern
npm run build     # Bygg projektet för produktion
npm run preview   # Förhandsvisa production build
npm run test      # Kör tester
```

## 📁 Projektstruktur

```bash
src/
├── components/
│   ├── cart/
│   ├── context/
│   ├── fallbacks/
│   ├── forms/
│   ├── layout/
│   ├── pages/
│   └── product/
├── api/
├── assets/
├── hooks/
├── schemas/
├── test/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## 🔌 API

Projektet använder en lokal JSON-fil för produktdata.

Produktinformationen används bland annat för att visa produkter, produktdetaljer, priser och lagersaldo.

## 👥 Team

Diana Paragina
Nicole Arezo Sadeghi
Saga Engström Lundgren
