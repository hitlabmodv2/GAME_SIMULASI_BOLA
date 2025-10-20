# Simulasi Sepak Bola AI

Aplikasi simulasi pertandingan sepak bola dengan AI yang lengkap dan interaktif.

## Overview
Proyek ini adalah aplikasi simulasi sepak bola berbasis web yang memungkinkan pengguna untuk:
- Menyaksikan pertandingan AI vs AI
- Menjalankan tournament dengan 4, 8, atau 16 tim
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
-   **Bracket Initialization (16 Teams):** Tournament bracket placeholders for Quarter Finals, Semi Finals, and Final are initialized at tournament start, displaying "TBD" for teams yet to be determined. Winners from previous rounds are populated automatically after each match completion.
-   **Stats Display:** Match statistics appear automatically after each match completes, with auto-expand enabled and mobile-optimized smooth scrolling for better visibility.
-   **Input Validation:** Comprehensive validation prevents tournament matches from starting with null/undefined teams, with error logging for debugging.

## Recent Changes (October 2025)
**Tournament Logo Size Optimization & Setup Notifications (20 Oktober 2025):**
- **Logo Size Reduction di Tournament Mode:**
  - Logo tim di bracket tournament dikecilkan dari 20px (desktop) menjadi 14px untuk tampilan lebih compact
  - Responsive sizes: 14px (desktop), 12px (tablet), 12px (mobile) - lebih kecil seperti tampilan awal
  - Match card lebih rapih dan tidak terlalu ramai dengan logo yang lebih kecil
- **Setup Mode Notifications dengan Logo Tim:**
  - Notifikasi interaktif saat switch antara Manual Setup dan Auto Setup
  - Auto Setup notification menampilkan 4 logo tim pertama yang dipilih secara otomatis
  - Logo berukuran 24px dalam notifikasi dengan border radius dan styling yang bagus
  - Manual Setup notification dengan icon ⚙️ dan deskripsi yang jelas
  - Notifikasi menggunakan actual team logos (img tags) bukan hanya emoji

**Logo Accuracy Fix - Random & Auto Setup (20 Oktober 2025):**
- **Fixed Logo Mismatch Issue:** Logo sekarang akurat dan sesuai dengan tim yang dipilih
- **randomizeTeams() Fix:** Menambahkan updateTeamLogo(i) setelah random tim real agar logo update dengan benar
- **autoGenerateTeams() Fix:** Menambahkan updateTeamLogo(i) setelah auto setup agar logo akurat
- **Button Redesign:** Button toggle logo dikecilkan dari "🖼️ Lihat Logo Tim" menjadi "👁️ Logo" (show) dan "✖️ Hide" (hide)
- **Logo Size Reduction:** Logo di setup screen dikecilkan dari 60x60px menjadi 32x32px untuk desain yang lebih compact dan simple
- **Consistent Updates:** Semua fungsi yang mengisi nama tim (random, auto, select) sekarang memanggil updateTeamLogo() untuk akurasi logo

**Logo Tim Compact & Responsive Design (20 Oktober 2025):**
- **Tournament Bracket Logos:** 
  - Logo tim berukuran 14px ditampilkan di samping nama tim di setiap match card (updated)
  - Desain compact dan rapih dengan flex layout yang tidak saling bentrok
  - Fully responsive: 14px (desktop), 12px (tablet), 12px (mobile) - optimized for better space
  - Error handling otomatis menyembunyikan logo jika tidak ditemukan (onerror handler)
- **Live Match Display Logos:**
  - Logo tim muncul secara realtime saat pertandingan berlangsung
  - Ukuran responsive: 24px (desktop), 20px (tablet), 18px (mobile) - optimized for compact display
  - Logo update otomatis sesuai tim yang bermain
  - Enhanced styling: subtle background, border, dan box shadow untuk tampilan lebih bagus
  - Desain kecil dan pas dengan box untuk mobile optimization
- **Champion Display:** Logo juara berukuran 80x80px dengan box shadow
- **CSS Improvements:**
  - Match card styling lebih compact dengan padding 10px (desktop), 8px (mobile)
  - Team name dengan text ellipsis untuk nama tim panjang
  - Semua logo menggunakan border-radius 50% dan object-fit cover
  - Background subtle untuk logo dengan box shadow
- **Scoring Accuracy:**
  - Bracket render dipanggil setelah score update untuk akurasi realtime
  - Validasi winner sebelum proceed untuk mencegah error
  - Error logging untuk debugging match completion issues

**Logo Tim dengan Button Toggle (20 Oktober 2025):**
- Logo tim ditampilkan di semua mode dengan desain interaktif menggunakan button toggle
- **Tournament Setup Screen:** 
  - Button "🖼️ Lihat Logo Tim" di bawah input nama tim untuk toggle show/hide logo
  - Button aktif/enabled jika tim memiliki logo, disabled jika tidak
  - Logo berukuran 60x60px dalam lingkaran dengan shadow, muncul dengan smooth animation (opacity + scale transform)
  - Logo hidden otomatis saat nama tim diubah, user harus klik button lagi untuk melihat logo tim baru
  - Button text berubah jadi "❌ Sembunyikan Logo" saat logo ditampilkan
- Mendukung 4, 8, dan 16 tim tournament dengan button toggle yang ditampilkan secara dinamis
- Semua 32 tim predefined memiliki logo lengkap yang tersimpan di folder `team-logos/`
- Real-time update: button state dan logo langsung update saat tim dipilih atau nama diketik

**Tournament 16 Tim - Bracket & Stats Improvements:**
- Fixed bracket initialization for 16-team tournaments - Quarter Finals, Semi Finals, and Final now properly display "TBD" placeholders before teams are determined
- Improved real-time bracket updates - winning teams immediately appear in the next round after match completion
- Enhanced statistics display - match stats now appear automatically after each match and remain visible (no longer auto-hide after 5.5 seconds)
- Added mobile optimization - stats section auto-scrolls into view on mobile devices for better accessibility
- Implemented validation checks - prevents tournament errors by validating team existence before match simulation
- Battle log maintains real-time auto-scroll enabled by default for continuous event tracking

## External Dependencies
-   **Storage:** `localStorage` for persisting user preferences and settings.
-   **Server:** A simple Python HTTP Server (port 5000) is used to serve the static files locally.