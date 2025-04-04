# Generator API Server

A simple HTTP API with an endpoint at `/generate` that uses OpenAI to create new unit generators by combining existing ones.

## Technical Details

This API uses:

- Express.js for the server
- Zod for request validation
- OpenAI's function calling feature for reliable, structured responses
- TypeScript for type safety

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Add your OpenAI API key to the `.env` file:

```
PORT=3001
OPENAI_API_KEY=your_actual_api_key
```

## Running the server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start at http://localhost:3001

## API Usage

### POST /generate

Creates a new generator by combining characteristics of two existing generators.

#### Request Body

```json
{
  "existingGeneratorsNames": ["Generator1", "Generator2", "Generator3"],
  "firstGenerator": {
    "emojiIcon": "🐄",
    "name": "Cow",
    "description": "A standard milk cow",
    "unitPerSecond": 1,
    "cost": 100
  },
  "secondGenerator": {
    "emojiIcon": "🤖",
    "name": "Robot",
    "description": "An automated milk machine",
    "unitPerSecond": 5,
    "cost": 500
  }
}
```

#### Response

```json
{
  "success": true,
  "generator": {
    "emojiIcon": "🥛",
    "name": "CyberCow",
    "description": "A robotic cow with enhanced milk production",
    "unitPerSecond": 7.5,
    "cost": 1200
  }
}
```
