# Persona 5 Themed Portfolio

A highly stylized personal portfolio website heavily inspired by the UI and aesthetics of **Persona 5** (originally started as a Persona 3 theme and recently evolved). Built with React and Vite.

## 🌟 Highlights

- **Persona 5 UI/UX Aesthetics**: Features custom "wiggle polygon" animations, dynamic text strokes, and the iconic red, black, white, and cyan color palette.
- **Immersive Experience**: Runs a continuous ambient background video (`main1.mp4`) and features a persistent, toggleable Background Music (BGM) player with volume control.
- **Authentic SFX**: UI interactions, such as navigating menus or entering pages, trigger authentic sound effects (`select.mp3`).
- **Keyboard Navigation**: Fully supports traversing the main menu and certain overlays using keyboard arrow keys and `Enter/Escape`, mimicking the actual game controls.
- **Custom Page Transitions**: Smooth, multi-layered "stripe" transition animations when navigating between routes.

## 🛠️ Tech Stack & Dependencies

This project runs on a modern React ecosystem.

**Core Dependencies:**
- `react` (^19.2.4) - Core UI library.
- `react-dom` (^19.2.4) - React DOM bindings.
- `react-router-dom` (^7.14.0) - Manages client-side routing (Home, About, Resume, Socials, Side Projects).
- `framer-motion` (^12.38.0) - Handles complex layout animations and route transition lifecycles.

**Development Dependencies:**
- `vite` (^8.0.1) - Blazing fast development server and bundler.
- `@vitejs/plugin-react` - Vite plugin for React fast refresh.
- `eslint` (^9.39.4) & plugins - Code quality and linting.

## 🚀 How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure Overview

- `src/App.jsx`: The root component managing the React Router, background video layering, and global Background Music player.
- `src/P5Menu.jsx`: The main interactive menu with the signature CSS polygon wiggle keyframes and SFX logic.
- `src/PageTransition.jsx`: Handles the animated stripe overlays when unmounting and mounting different pages.
- `src/AboutMe.jsx`, `src/ResumePage.jsx`, `src/Socials.jsx`, `src/SideProjectsPage.jsx`: Content pages, all styled with specific overlays, transitions, and character portraits matching the Persona vibe.
