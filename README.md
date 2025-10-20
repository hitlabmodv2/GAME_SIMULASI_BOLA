# Simulasi Sepak Bola AI

## Overview
This project is a web-based AI soccer simulation application. It allows users to:
- Watch AI vs. AI matches.
- Run tournaments with 4, 8, or 16 teams.
- View real-time match statistics and logs.
- Customize team difficulty and match duration.

**Business Vision & Market Potential:**
The application aims to deliver an engaging and realistic soccer simulation with dynamic AI-driven match outcomes. Its interactive tournament mode and detailed statistics cater to both sports enthusiasts and casual gamers, offering a comprehensive and entertaining platform for virtual soccer management and viewing. The ambition is to create a highly customizable and immersive web-browser-based football simulation.

## User Preferences
- Preferensi durasi: 90 menit (dapat diubah)
- Kecepatan simulasi: Normal (dapat diubah)
- Mode tampilan: Dark mode (default)

## System Architecture

**UI/UX Decisions:**
- **Theming:** CSS Variables for light/dark mode.
- **Layout:** CSS Grid and Flexbox for responsive designs, especially for tournament brackets and mobile.
- **Visual Feedback:** Animated scoreboards, event highlighting (goals, cards), and dynamic bracket updates.
- **Commentary System:** Interactive commentary with distinct styling.
- **Log Management:** Match and Tournament logs feature auto-scroll toggles, clear, and download functionality with mobile-friendly positioning.
- **On-Screen Animations:** Full-screen animations for critical events (goals, round advancements) with auto-removal.
- **Collapsible Stats:** Tournament statistics can be collapsed/expanded, starting collapsed by default.

**Technical Implementations & Feature Specifications:**

1.  **AI vs AI Mode:**
    *   **Team Selector with Logos:** Interactive team selection grid with 32 predefined teams, displaying team logos, names, and country badges. Users can click "🏆 Pilih Tim" button to browse and select teams visually.
    *   Customizable teams with adjustable difficulty (1-7).
    *   Real-time match logs with auto-scroll, clear, and download.
    *   Comprehensive statistics (possession, shots, passes, fouls, cards) and animated event highlights.
    *   Interactive commentary system with Indonesian lines.
    *   On-screen goal animations with scorer names.
    *   **Mobile Optimized:** Team selector grid automatically adjusts for mobile screens with responsive layout.

2.  **Tournament Mode:**
    *   **Flexible Team Count:** Supports 4, 8, or 16 teams with dynamic bracket generation.
    *   **Setup Modes:** Manual (custom input with team selection) and Auto (auto-generates from 32 predefined teams).
    *   **Team Logo Display:** Modern toggle button with smooth animations (scale + fade effect) to show/hide team logos.
    *   **Smart Button Visibility:** Random Team and Update Data buttons only appear in Manual Setup mode (hidden in Auto mode).
    *   **Auto Play:** Matches proceed automatically, with slowed simulation speed for viewing.
    *   **Realistic Penalty Shootout:** Detailed system with 4 outcomes, success rates based on difficulty, 5 alternating rounds, and sudden death.
    *   **Live Display:** Real-time animated scoreboard, timer, and event log, including penalty scores.
    *   **Comprehensive Match Statistics:** Displays possession, shots, assists, passes, corners, offsides, fouls, and cards. Collapsible panel.
    *   **View Stats Buttons:** Each completed match card includes a "📊 view stats" button.
    *   **Tournament Bracket:** Visual representation of progression with status indicators and winner highlighting.
    *   **Tournament Log:** Timestamped entries for all events, round changes, and results. Features auto-scroll, clear, and download.
    *   **On-Screen Animations:** Full-screen animations for goals, Semi Finals, Final, and Champion announcements.
    *   **Injury Time:** Randomly generated (1-4 mins for first half, 2-6 mins for second).
    *   **Tactical Formations:** Randomly assigned and displayed (e.g., 4-4-2, 4-3-3).
    *   **Man of the Match:** Rating system based on player performance displayed with a golden gradient.
    *   **Enhanced Event Logging:** 13+ types of log entries with unique colors, styles, and animations.
    *   **Expanded Match Statistics:** Includes Assists, Offsides, and Red Cards.
    *   **Enhanced Event Simulation:** More realistic goal events with assist tracking, offside detection, red card chances, and player substitutions.

3.  **Settings:**
    *   **Match Configuration:** Adjustable match duration (5/45/90 minutes) and simulation speed.
    *   **Display Options:** Light/Dark mode, Auto scroll log, and statistics display preferences.
    *   **Statistics Dashboard:** Real-time dashboard showing total teams (32), total players (576), and countries represented (8).
    *   **Data Persistence:** All settings saved to `localStorage` for user convenience.
    *   **Mobile Responsive:** Optimized layout for mobile devices with adjusted card sizes and spacing.

**System Design Choices:**
-   **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript for a lightweight and performant web application.
-   **State Management:** The `tournamentData` object centrally manages all tournament-related states.
-   **Asynchronous Operations:** Utilizes `setTimeout` for non-blocking simulations and smooth transitions.
-   **DOM Manipulation:** Direct and efficient DOM updates for real-time display.
-   **Responsive Design:** Optimized for mobile viewing.
-   **Tournament Flow:** Managed by a sequential and recursive flow of functions.
-   **Penalty Shootout:** Implemented with a recursive function for alternating kicks and sudden death.
-   **Performance:** Optimized with controlled simulation speeds and efficient rendering.
-   **Event Animations:** Simplified system for critical events with auto-removal.
-   **Footer Design:** Fixed positioning at the viewport bottom.
-   **Bracket Initialization (16 Teams):** Placeholders for later rounds display "TBD" and populate dynamically.
-   **Stats Display:** Match statistics appear automatically after each match, with auto-expand and mobile-optimized scrolling.
-   **Input Validation:** Prevents tournament errors by validating team existence.
-   **Logo Integration:** Team logos are displayed across various modes (setup, bracket, live match, champion) with toggle buttons for visibility, responsive sizing, and fallbacks.

## External Dependencies
-   **Storage:** `localStorage` for persisting user preferences and settings.
-   **Server:** Node.js serve package on port 5000 for static file hosting.
-   **Assets:** Custom favicon.png for browser tab icon (AI-generated soccer ball).
