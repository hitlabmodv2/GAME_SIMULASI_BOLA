# Simulasi Sepak Bola AI

Aplikasi simulasi pertandingan sepak bola dengan AI yang lengkap dan interaktif.

## Overview
Proyek ini adalah aplikasi simulasi sepak bola berbasis web yang memungkinkan pengguna untuk:
- Menyaksikan pertandingan AI vs AI
- Menjalankan tournament dengan 8 tim
- Melihat statistik dan log pertandingan real-time
- Mengatur tingkat kesulitan tim dan durasi pertandingan

**Business Vision & Market Potential:**
This application aims to provide an engaging and realistic soccer simulation experience, leveraging AI for dynamic match outcomes. Its interactive tournament mode and detailed statistics cater to sports enthusiasts and casual gamers alike, offering a comprehensive and entertaining platform for virtual soccer management and viewing. The project's ambition is to create a highly customizable and immersive football simulation accessible directly from a web browser.

## User Preferences
- Preferensi durasi: 90 menit (dapat diubah)
- Kecepatan simulasi: Normal (dapat diubah)
- Mode tampilan: Dark mode (default)

## System Architecture

**UI/UX Decisions:**
- **Theming:** Utilizes CSS Variables for easy light/dark mode switching.
- **Layout:** Employs CSS Grid and Flexbox for responsive and adaptive designs, especially for tournament brackets and mobile views.
- **Visual Feedback:** Animated scoreboards, event highlighting (goals, cards), and dynamic bracket updates enhance user engagement.
- **Commentary System:** Interactive commentary with distinct styling (pink background, italic text, thick borders) provides real-time match narration.
- **Log Management:** Both Match Log and Tournament Log feature auto-scroll toggles, clear buttons, and download functionality with mobile-friendly positioning.
- **On-Screen Animations:** Critical events (goals and round advancements) display as full-screen animations with auto-remove after 3 seconds.
- **Collapsible Stats:** Tournament statistics can be collapsed/expanded with a spoiler button, starting collapsed by default to save space.

**Technical Implementations & Feature Specifications:**

1.  **AI vs AI Mode:**
    *   Setup custom teams with adjustable difficulty (1-7).
    *   Real-time match logs with auto-scroll toggle, clear, and download buttons.
    *   Comprehensive statistics (possession, shots, passes, fouls, cards), and animated event highlights.
    *   Interactive commentary system with 13+ Indonesian commentary lines for various match events.
    *   On-screen goal animations with scorer names.

2.  **Tournament Mode:**
    *   **Flexible Team Count:** Supports 4, 8, or 16 teams with dynamic bracket generation.
    *   **Setup Modes:** Manual (custom team input) and Auto (generates from a database of 32 famous teams).
    *   **Auto Play:** Matches proceed automatically, queuing up sequentially, with a slowed simulation speed (400ms per minute) for better viewing.
    *   **Realistic Penalty Shootout:** Detailed system with 4 outcomes (GOAL, SAVE, MISS, BLUNDER), success rates based on difficulty, 5 alternating rounds, and sudden death.
    *   **Live Display:** Real-time animated scoreboard, timer, and event log, including penalty scores.
    *   **Live Events Panel:** Auto-scrolling feed showing the 8 most recent match events with color-coded styling.
    *   **Comprehensive Match Statistics:** Displays possession, shots, assists, passes, corners, offsides, fouls, and cards. Collapsible panel with spoiler button for space management.
    *   **View Stats Buttons:** Each completed match card includes a "📊 view stats" button to display that match's detailed statistics.
    *   **Tournament Bracket:** Visual representation of the tournament progression from start to champion, with status indicators and winner highlighting.
    *   **Tournament Log:** Timestamped entries for every event, round changes, penalty shootouts, and match results. Features auto-scroll toggle, clear, and download buttons.
    *   **On-Screen Animations:** Full-screen animations for goals (with scorer), Semi Finals, Final, and Champion announcements.
    *   **Injury Time:** Randomly generated injury time for both halves (1-4 mins for first, 2-6 mins for second) where events can still occur.
    *   **Tactical Formations:** Randomly assigned and displayed formations (e.g., 4-4-2, 4-3-3).
    *   **Man of the Match:** A comprehensive rating system based on player performance (goals, assists, shots, possession, fouls, cards) displayed with a golden gradient.
    *   **Enhanced Event Logging:** 13+ types of log entries with unique colors, styles, and animations for goals, saves, chances, fouls, cards, etc.
    *   **Expanded Match Statistics:** Includes Assists, Offsides, and Red Cards.
    *   **Enhanced Event Simulation:** More realistic goal events with assist tracking, offside detection, red card chances, and player substitutions.

3.  **Settings:** Adjustable match duration (5/45/90 minutes), simulation speed, and display mode (light/dark) saved to `localStorage`.

**System Design Choices:**
-   **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript for a lightweight and performant web application.
-   **State Management:** The `tournamentData` object centrally manages all tournament-related states.
-   **Asynchronous Operations:** Utilizes `setTimeout` for non-blocking match simulations, penalty shootouts, and smooth transitions between rounds.
-   **DOM Manipulation:** Direct and efficient DOM updates for real-time display.
-   **Responsive Design:** Optimized for mobile viewing with adjusted font sizes, spacing, and stacked layouts for smaller screens.

**Architecture Notes:**
-   **Tournament Flow:** Managed by a sequential and recursive flow of functions (`initializeTournament`, `playNextMatch`, `playTournamentMatch`, `simulateTournamentMatch`, `finishTournamentMatch`, `setupSemiFinals`, `setupFinal`, `displayChampion`).
-   **Penalty Shootout:** Implemented with a recursive `takePenalty()` function that handles alternating kicks, score updates, winner checks, and sudden death logic.
-   **Performance:** Optimized with controlled simulation speeds, specific penalty timings, and efficient rendering by updating only changed DOM elements. Auto-cleanup limits live events to the 8 most recent.
-   **Event Animations:** Simplified system showing only critical events (goals and round progressions) using absolute positioning with auto-removal after 3 seconds.
-   **Footer Design:** Fixed positioning at viewport bottom, ensuring visibility during scrolling without overlap issues.

## External Dependencies
-   **Storage:** `localStorage` for persisting user preferences and settings.
-   **Server:** A simple Python HTTP Server (port 5000) is used to serve the static files locally.