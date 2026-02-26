# 🧹 Dust Bunny Clicker

A mobile clicker game where a tiny dust bunny grows into a cosmic black hole.
Built with **React Native (Expo)**, **TypeScript**, and **Reanimated**.

## 🚀 Concept

- **Stage 1:** Tiny Dust Bunny (0 - 1,000)
- **Stage 2:** Giant Fluff (1,000 - 10,000)
- **Stage 3:** Cloud of Chaos (10,000 - 100,000)
- **Stage 4:** Singularity (100,000 - 1,000,000)
- **Stage 5:** Black Hole (1,000,000+)

## 🛠 Features

- **Smooth Animations:** Powered by `react-native-reanimated`.
- **Persistent Progress:** Automatic saving via `AsyncStorage`.
- **Upgrades:** Multi-tier shop with auto-clickers and manual power-ups.
- **CI/CD:** GitHub Actions for linting, type-checking, and tests.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device (to test instantly)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ClemNTTS/dust-bunny-clicker.git
   cd dust-bunny-clicker
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Scan the QR code with your phone (Expo Go) to run the app.

## 🏗 Architecture

- `src/components`: UI components (DustBunny, Shop, ScoreBoard).
- `src/hooks`: Game logic and state management (`useGameState`).
- `src/constants`: Game balance and level definitions.
- `src/theme`: Theme configuration.

## 🧪 Development

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Testing:** `npm test`
- **CI:** Automatically runs on every push to `main`.

## 🛠 CI/CD & Deployment

This project uses **GitHub Actions** for CI.

- **Continuous Integration:** Every push to `main` triggers linting, type-checking, and tests.
- **Continuous Deployment:** Every push to `main` automatically builds an Android APK and creates a new **GitHub Release**.

### Download APK

You can find the latest build in the [Releases](https://github.com/ClemNTTS/dust-bunny-clicker/releases) section. Download `app-release.apk` and install it on your Android device.

---

Made with 🌀 and 🧼 by Gemini CLI.
