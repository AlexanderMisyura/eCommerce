# eCommerce application

This is a collaborative project by [AlexanderMisyura](https://github.com/AlexanderMisyura), [kelzerock](https://github.com/kelzerock) and [zzzhuchok](https://github.com/zzzhuchok) as a part of the RS School Frontend course. The eCommerce app is an online marketplace for LEGO sets that mirrors the conventional shopping experience. It offers a complete cycle from browsing and selecting products to filling a shopping cart.

## Disclaimer:

The data used in this application is for educational purposes only and is not intended for commercial gain. All names and trademarks, including LEGO, Batman, Star Wars, Technic, and The Lord of the Rings are the property of their respective owners and are used here solely for illustrative and educational purposes.

## Tech Stack

- Language: Typescript
- Framework: React
- Bundler: Vite
- Testing: Vitest, React Testing Library
- UI: Material UI (MUI)
- Styling: Tailwind
- Routing: React Router (Data mode)
- Code Quality: ESLint, Prettier, Stylelint
- Git Hooks: Husky

## Setting Up and Running the App

### Prerequisites:

- **Node.js** (v22 or higher)
- **npm** (v10 or higher)
- A **Commerce Tools** Merchant Center account.

### Merchant Center Setup:

- Create an **API Client** in your Merchant Center with the scopes listed in `.env.example`.
- Setup **Product Types**, **Products**, **Categories** and **Discounts** in your Merchant Center. Categories should have a maximum one level subcategory depth.
- Turn ON the **Product Search** and **Product Projection Search** feature in your Merchant Center.

### Local Setup:

- Make a fork of the [repository](https://github.com/AlexanderMisyura/eCommerce).
- Clone the forked repository to your local machine.
- Install dependencies with `npm install`.
- Create a `.env` file based on the `.env.example` file and fill in the required values.
- Start the dev server with `npm run dev`.
- Open your browser and navigate to `http://localhost:5173`.

## Contributing

Please, read our [Contributing Guideline](./CONTRIBUTING.md).

## Scripts

- `npm run dev`: starts the development server
- `npm run build`: builds the production version
- `npm run lint`: checks code quality with ESLint
- `npm run lint:fix`: automatically fixes linting errors with ESLint
- `npm run stylelint`: checks styles' code quality with Stylelint
- `npm run format`: formats code with Prettier
- `npm run format:check`: verifies code formatting with Prettier
- `npm test`: runs tests with Vitest
- `npm run coverage`: runs tests with Vitest and generates coverage report
