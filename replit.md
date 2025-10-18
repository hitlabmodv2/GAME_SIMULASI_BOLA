# Simulasi Sepak Bola AI

Aplikasi simulasi pertandingan sepak bola dengan AI yang lengkap dan interaktif.

## Overview
Proyek ini adalah aplikasi simulasi sepak bola berbasis web yang memungkinkan pengguna untuk:
- Menyaksikan pertandingan AI vs AI
- Menjalankan tournament dengan 8 tim
- Melihat statistik dan log pertandingan real-time
- Mengatur tingkat kesulitan tim dan durasi pertandingan

## Fitur Utama

### 1. Mode AI vs AI
- Setup 2 tim dengan nama custom
- Atur tingkat kesulitan (1-7) untuk setiap tim
- Simulasi pertandingan lengkap dengan:
  - Log pertandingan real-time
  - Statistik lengkap (possession, shots, passes, fouls, cards)
  - Animasi dan highlight event penting

### 2. Mode Tournament
**Fitur Terbaru - Flexible Tournament dengan Penalty Akurat!**

- **Jumlah Tim Fleksibel**: Pilih jumlah tim tournament
  - **4 Tim**: Semi Finals → Final → Champion
  - **8 Tim**: Quarter Finals → Semi Finals → Final → Champion
  - **16 Tim**: Round of 16 → Quarter Finals → Semi Finals → Final → Champion

- **Setup Mode**: Pilih antara Manual atau Auto
  - **Manual**: Input tim sesuai jumlah dengan nama dan tingkat kesulitan custom (1-7)
  - **Auto**: Generate otomatis dari database 32 tim terkenal dunia
  
- **Database Tim Lengkap** (32 tim):
  - Premier League: Manchester United, Liverpool, Chelsea, Arsenal, Man City, Tottenham, Newcastle, West Ham, Leicester
  - La Liga: Real Madrid, Barcelona, Atletico Madrid, Sevilla, Valencia
  - Serie A: Juventus, AC Milan, Inter Milan, Napoli, AS Roma
  - Bundesliga: Bayern Munich, Borussia Dortmund, RB Leipzig, Bayer Leverkusen
  - Ligue 1: PSG, Olympique Lyon, Marseille, Monaco
  - Lainnya: Ajax Amsterdam, Benfica, FC Porto, Sporting CP, Shakhtar Donetsk
  
- **Auto Play**: Pertandingan berjalan otomatis tanpa perlu klik tombol
  - Setiap pertandingan selesai langsung lanjut ke pertandingan berikutnya
  - Kecepatan simulasi 400ms per menit (lebih lambat untuk viewing yang nyaman)
  - Transisi otomatis antar babak dengan delay
  - Tidak ada bentrok - satu pertandingan selesai baru mulai berikutnya
  
- **Penalty Shootout Akurat**:
  - Sistem adu penalti detail saat pertandingan seri
  - 5 ronde penalti alternating (Tim A → Tim B)
  - Success rate berdasarkan tingkat kesulitan tim (60% + difficulty*5%)
  - Sudden Death mode jika masih seri setelah 5 ronde
  - Log detail setiap penalti (GOOL/GAGAL)
  - Update skor real-time dengan format: 2 (4) - 2 (3)
  
- **Live Display Real-time**:
  - Scoreboard live dengan animasi
  - Timer pertandingan yang berjalan
  - Event log lengkap (gol, kartu, save, corner, half-time, penalti)
  - Update skor real-time termasuk skor penalti
  
- **Statistik Pertandingan Lengkap**:
  - Tampil setelah setiap pertandingan selesai
  - Penguasaan bola dengan bar visual
  - Tembakan dan tembakan on target
  - Operan, tendangan pojok, pelanggaran
  - Kartu kuning
  - Auto-hide setelah 4.5 detik
  
- **Tournament Bracket**:
  - Visualisasi bracket lengkap dari awal sampai Champion
  - Status pertandingan (Menunggu/Berlangsung/Selesai)
  - Highlight tim pemenang
  - Skor final setiap pertandingan
  
- **Log Battle Lengkap**:
  - Log setiap pertandingan dengan timestamp
  - Highlight perubahan babak
  - Detail penalty shootout lengkap
  - Hasil pertandingan dan pemenang
  - Scroll otomatis ke event terbaru

### 3. Pengaturan
- Durasi pertandingan (5/45/90 menit)
- Kecepatan simulasi (Lambat/Normal/Cepat/Sangat Cepat)
- Mode tampilan (Terang/Gelap)
- Pengaturan tersimpan di localStorage

## Teknologi
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: CSS Variables untuk theming, CSS Grid & Flexbox
- **Storage**: localStorage untuk pengaturan pengguna
- **Animasi**: CSS animations dan transitions
- **Server**: Python HTTP Server (port 5000)

## Struktur Project
```
.
├── index.html          # Struktur HTML utama
├── style.css           # Styling lengkap dengan animasi
├── script.js           # Logika simulasi dan tournament
├── README.md           # Dokumentasi project
└── replit.md          # Dokumentasi teknis (file ini)
```

## Recent Changes (October 18, 2025)

### Tournament Mode Enhancement - MASSIVE UPDATE! 🎉

#### 1. **Interactive Commentary System** 🎙️
   - Sistem komentator interaktif seperti komentator sepak bola sungguhan!
   - 13+ dialog berbeda untuk berbagai situasi:
     - Match start commentary (4 variasi)
     - Goal commentary (4 variasi)
     - Save commentary (4 variasi)
     - Miss commentary (4 variasi)
     - Halftime commentary (3 variasi)
   - Komentator memberikan reaksi real-time untuk event penting
   - Ditampilkan dengan styling khusus (pink, italic, border tebal)

#### 2. **Enhanced Event Logging System** 📋
   - **13+ jenis log entry** dengan warna dan animasi berbeda:
     - ⚽ **GOAL** - Hijau, bold, animasi pulse
     - 🧤 **SAVE** - Cyan, highlight penyelamatan kiper
     - ⚠️ **CHANCE** - Orange, peluang yang terlewat
     - 🔄 **PASS** - Purple, operan beruntun
     - 🟨 **YELLOW CARD** - Kuning, bold, pelanggaran keras
     - 🟥 **RED CARD** - Merah, bold, border extra tebal!
     - ⚽ **FOUL** - Orange, pelanggaran biasa
     - ⛳ **CORNER** - Teal, tendangan pojok
     - 🚩 **OFFSIDE** - Purple, caught offside
     - 🔄 **SUBSTITUTION** - Blue, pergantian pemain
     - ⏸️ **HALFTIME** - Orange, centered, turun minum
     - 🎙️ **COMMENTARY** - Pink, italic, border tebal
     - Plus: match-start, match-end, round-change
   - Setiap event punya warna, style, dan animasi unik
   - Log lebih hidup dan menarik untuk diikuti!

#### 3. **Expanded Match Statistics** 📊
   - Statistik baru yang ditambahkan:
     - 🅰️ **Assists** - Tracking assist untuk setiap gol
     - 🚩 **Offsides** - Menghitung offside yang terjadi
     - 🟥 **Red Cards** - Kartu merah dan pengusiran
   - Total statistik lengkap sekarang:
     - Penguasaan Bola (dengan bar visual)
     - Tembakan & Tembakan On Target
     - Assists (NEW!)
     - Operan Sukses
     - Tendangan Pojok
     - Offsides (NEW!)
     - Pelanggaran
     - Kartu Kuning
     - Kartu Merah (NEW!)
   - Ditampilkan untuk regular match dan tournament match
   - Auto-display 5.5 detik setelah pertandingan

#### 4. **Mobile Responsive Optimization** 📱
   - **Desain mobile yang sangat optimal:**
     - Base font size: 14px (lebih kecil untuk mobile)
     - Spacing lebih efisien (padding & margin dikurangi)
     - Tournament bracket: Stack vertical di mobile
     - Log entries: Font 0.9rem, padding lebih kecil
     - Live match display: Compact layout untuk mobile
     - Stats display: Grid 1 column di mobile
     - Action buttons: Stack vertical, full width
     - Footer: Font 0.8rem
   - **Responsive breakpoints:**
     - Desktop: Layout normal dengan multi-column
     - Mobile (<768px): Single column, compact spacing
   - Semua element ter-optimize untuk viewing di HP

#### 5. **Enhanced Event Simulation**
   - Goal dengan assist (70% chance ada assister)
   - Offside detection (random occurrences)
   - Red card ejections (2% chance dari foul)
   - Player substitutions (setelah menit 60)
   - Lebih realistic dan immersive!

### Previous Tournament Updates

1. **Flexible Team Count**
   - Dropdown selector untuk jumlah tim (4, 8, atau 16 tim)
   - Dynamic team input generation sesuai jumlah yang dipilih
   - Bracket otomatis adjust sesuai jumlah tim

2. **Extended Team Database**
   - Expanded dari 16 tim menjadi 32 tim terkenal dunia
   - Coverage liga top Eropa (EPL, La Liga, Serie A, Bundesliga, Ligue 1)
   - Auto-generate support sampai 16 tim tournament

3. **Slowed Match Simulation**
   - Tournament match speed dari 100ms menjadi 400ms per menit
   - Lebih nyaman untuk viewing dan follow the action
   - Log events lebih mudah dibaca

4. **Accurate Penalty Shootout System**
   - Detail simulation setiap tendangan penalti
   - Success rate based on team difficulty (60% + difficulty*5%)
   - 5 rounds alternating (Team A → Team B)
   - True sudden death mode jika masih seri
   - Sudden death continues alternating sampai ada pemenang
   - Live score update dengan format: 2 (4) - 2 (3)
   - Log lengkap setiap penalti dengan status GOOL/GAGAL

### Previous Enhancements
1. **Auto/Manual Setup Mode**
   - Manual: User input tim custom dengan difficulty 1-7
   - Auto: Random generate dari database tim terkenal

2. **Auto Play System**
   - Pertandingan otomatis tanpa perlu klik tombol
   - Auto lanjut ke pertandingan berikutnya setelah selesai
   - Sistem queue untuk mencegah bentrokan pertandingan

3. **Live Match Display**
   - Real-time scoreboard dengan animasi pulse
   - Live timer dan event log
   - Event highlighting untuk gol, kartu, save, corner

4. **Tournament Bracket**
   - Visual feedback untuk pertandingan aktif
   - Status indicator (Menunggu/Berlangsung/Selesai)
   - Winner highlighting dengan warna hijau

5. **Tournament Log System**
   - Comprehensive battle log dengan timestamp
   - Color-coded entries (match start/end, round changes)
   - Auto-scroll ke entry terbaru

## User Preferences
- Preferensi durasi: 90 menit (dapat diubah)
- Kecepatan simulasi: Normal (dapat diubah)
- Mode tampilan: Dark mode (default)

## Cara Menggunakan Tournament

1. Klik **Tournament** dari menu utama
2. Pilih **jumlah tim** yang diinginkan (4, 8, atau 16 tim)
3. Pilih mode setup:
   - **Manual Setup**: Input nama dan tingkat kesulitan tim (1-7, max bisa sama semua)
   - **Auto Setup**: Klik untuk generate otomatis dari database
4. Klik **Mulai Tournament**
5. Duduk santai dan tonton pertandingan berjalan otomatis!
6. Jika ada pertandingan seri, tonton adu penalti detail dengan sudden death
7. Lihat statistik lengkap setelah setiap pertandingan
8. Tournament berlangsung otomatis sampai keluar juara!
9. Lihat hasil di bracket dan log pertandingan

## Architecture Notes

### Tournament Flow
```
initializeTournament()
  → setupQuarterFinals()
  → playNextMatch() [auto loop]
    → playTournamentMatch()
    → simulateTournamentMatch()
    → finishTournamentMatch()
    → playNextMatch() [next match]
  → setupSemiFinals()
  → playNextMatch() [auto loop]
  → setupFinal()
  → playNextMatch()
  → displayChampion()
```

### Key Features
- **Non-blocking**: Menggunakan recursive setTimeout untuk penalty shootout
- **Event-driven**: Callbacks dan setTimeout untuk transisi antar babak
- **Real-time updates**: DOM manipulation untuk live display
- **State management**: tournamentData object menyimpan semua state tournament
- **Penalty Logic**: Recursive takePenalty() function dengan sudden death support

### Penalty Shootout Architecture
```
simulatePenaltyShootout()
  → takePenalty() [recursive]
    → Team A shoots (success based on difficulty)
    → Team B shoots (success based on difficulty)
    → Update scores and live display
    → Check winner:
      - If round >= 5 and scoreA > scoreB → Team A wins
      - If round >= 5 and scoreB > scoreA → Team B wins
      - If round === 5 and tied → Enter sudden death mode
      - If sudden death and tied → Continue next round
    → setTimeout(takePenalty, 3000) [next round]
```

## Performance Optimization
- Tournament match speed: 400ms per minute (optimal viewing speed)
- Penalty timing: 3000ms per round, 1500ms between Team A and Team B
- Auto cleanup: Live events limited to 5 terbaru
- Efficient rendering: Update only changed elements
- Stats display: Auto-hide after 4500ms
