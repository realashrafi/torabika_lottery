# Torabika Lottery

Torabika Lottery is a modern web application for managing and running lottery or raffle draws. It allows organizers to import participant data from an Excel file, display participants in a table, and randomly select winners with a visually engaging interface.

The project is built using **Next.js**, **React**, and **TypeScript**, with a focus on smooth UI interactions and simple management of participants and winners.

---

## Features

- Import participant data from an **Excel file**
- Manage participant entries in a dynamic table
- Enter lottery digits or prefixes to filter participants
- Randomly select winners
- Animated winner reveal
- Winner history tracking
- Reset individual draws or the entire lottery
- Modern and responsive UI

---

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Zustand**
- **XLSX**
- **Framer Motion**
- **TanStack Table**
- **Tailwind CSS**

---

## Project Structure

```text
torabika_lottery/
│
├── app/
│   ├── components/        # UI components
│   ├── random/            # Random lottery page
│   ├── winners/           # Winners history page
│   ├── layout.tsx         # App layout
│   └── page.tsx           # Main lottery page
│
├── lib/
│   └── excel.ts           # Excel parsing logic
│
├── store/
│   └── lottery-store.ts   # Global state management
│
├── types/
│   └── index.ts           # Shared TypeScript types
│
└── public/
    └── fonts/             # Custom fonts
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/realashrafi/torabika_lottery.git
cd torabika_lottery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open the application

Open your browser and visit:

```
http://localhost:3000
```

---

## Usage

1. Start the application.
2. Import an Excel file containing participant data.
3. Enter the lottery digits or prefix if required.
4. Start the draw process.
5. The system randomly selects a winner.
6. The winner is displayed with animation.
7. All selected winners can be viewed on the winners page.

---

## Available Scripts

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

---

## Customization

You can customize the application by:

- Modifying UI components inside `app/components`
- Adjusting lottery logic in `store/lottery-store.ts`
- Changing Excel parsing behavior in `lib/excel.ts`
- Updating styles in `app/globals.css`

---

## Deployment

The project can be easily deployed using **Vercel**, the platform created by the Next.js team.

Deployment steps:

1. Push the project to GitHub
2. Import the repository into Vercel
3. Deploy with default settings

---

## License

This project is licensed under the **MIT License**.

---

## Author

Developed by **Ashrafi**  
GitHub: https://github.com/realashrafi
