# NimGra — Job Application Portal

This project is a technical challenge for the Junior Fullstack Developer role at **Nimble Gravity**. It is a modern React application built with **Next.js 16** and **TanStack Query**, connecting to the Nimble Gravity Bot Filter API to browse and apply for open positions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Feerdus95/NimGra.git
   cd NimGra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the example file and fill in the values:
   ```bash
   cp .env.example .env.local
   ```
   Or manually create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_API_URL=https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
   ```

### Running the App

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architecture

The project follows a **Clean Architecture (simplified)** approach to ensure separation of concerns, maintainability, and scalability:

- **UI Components (`/src/components`):** Purely presentational components. They handle user interaction and display states (loading, error, success) but don't know about the API implementation details.
- **Custom Hooks (`/src/hooks`):** Application logic layer. Consumes TanStack Query to manage asynchronous states and connects the UI with the data layer.
- **Repositories (`/src/services`):** Data access layer. Handles raw `fetch` calls, API contract matching, and error body parsing.
- **Types (`/src/types`):** Centralized TypeScript interfaces for domain entities.

### Key Decisions

- **TanStack Query:** Used for robust server-state management, providing out-of-the-box caching, loading states, and error handling.
- **Tailwind CSS:** Used for a fast, responsive, and consistent design system without the overhead of custom CSS modules.
- **Layered Error Handling:** Errors are caught at the repository level, parsed from JSON bodies provided by the API, and propagated through hooks to the UI for descriptive user feedback.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **State Management:** [TanStack Query v5](https://tanstack.com/query)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
