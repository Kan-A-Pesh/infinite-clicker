# Milk Clicker

A modern idle clicker game built with React, TypeScript, and Vite. Inspired by popular idle games and internet meme culture.

## Features

- Click anywhere on the screen to earn units
- Purchase various generators to automate unit production
- Different generators with unique abilities and production rates
- Persistent game state using local storage
- Modern UI with Tailwind CSS
- **Forge**: Create new unique generators by combining existing ones using AI

## Generators

The game includes various generators that produce units automatically:

- 👀 Watcher: Auto-watches brainrot videos (1 unit/sec)
- 🤬 Screamer: Screams "Hawk Tuah" for you (2 units/sec)
- 💸 Investor: Invests in the $SKIBIDI token (4 units/sec)
- 🦈 Tralala: Spams the "Tralalero Tralala" meme (4 units/sec)
- 🎥 Video Editor: Generates brainrot videos (6 units/sec)

## Forge Feature

The Forge allows players to create new, unique generators by combining two existing generators using AI. This feature:

- Uses OpenAI to generate creative combinations of existing generators
- Creates generators with balanced stats based on parent generators
- Requires running the API server (see [Server Setup](#server-setup))
- Costs in-game units to use (based on the cost of generators being combined)

## Technologies Used

- React 19
- TypeScript
- Vite
- Zustand (for state management)
- TailwindCSS 4
- Motion (for animations)
- OpenAI API (for generator creation)

## Development

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn
- OpenAI API key (for the Forge feature)

### Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 in your browser

### Server Setup

The Forge feature requires running the API server located in the `server` directory.
For detailed setup instructions, see the [Server README](server/README.md).

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## License

[MIT](LICENSE)
