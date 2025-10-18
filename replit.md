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
**Fitur Terbaru - Auto Play Tournament!**
- **Setup Mode**: Pilih antara Manual atau Auto
  - **Manual**: Input 8 tim dengan nama dan tingkat kesulitan custom
  - **Auto**: Generate otomatis 8 tim dari database tim terkenal
  
- **Sistem Babak**:
  - **Babak 1**: Quarter Finals (4 pertandingan) → Semi Finals (2 pertandingan)
  - **Babak 2**: Final (1 pertandingan) → Champion
  
- **Auto Play**: Pertandingan berjalan otomatis tanpa perlu klik tombol
  - Setiap pertandingan selesai langsung lanjut ke pertandingan berikutnya
  - Transisi otomatis antar babak dengan delay
  - Tidak ada bentrok - satu pertandingan selesai baru mulai berikutnya
  
- **Live Display Real-time**:
  - Scoreboard live dengan animasi
  - Timer pertandingan yang berjalan
  - Event log untuk gol dan kartu kuning
  - Update skor real-time saat pertandingan berlangsung
  
- **Tournament Bracket**:
  - Visualisasi bracket lengkap dari Quarter Finals sampai Champion
  - Status pertandingan (Menunggu/Berlangsung/Selesai)
  - Highlight tim pemenang
  - Skor final setiap pertandingan
  
- **Log Battle Lengkap**:
  - Log setiap pertandingan dengan timestamp
  - Highlight perubahan babak
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

### Tournament Mode Enhancement
1. **Added Auto/Manual Setup Mode**
   - Manual: User input 8 tim custom
   - Auto: Random generate dari 16 tim terkenal

2. **Implemented Auto Play System**
   - Pertandingan otomatis tanpa perlu klik tombol
   - Auto lanjut ke pertandingan berikutnya setelah selesai
   - Sistem queue untuk mencegah bentrokan pertandingan

3. **Added Live Match Display**
   - Real-time scoreboard dengan animasi pulse
   - Live timer dan event log
   - Event highlighting untuk gol dan kartu

4. **Enhanced Tournament Bracket**
   - Visual feedback untuk pertandingan aktif
   - Status indicator (Menunggu/Berlangsung/Selesai)
   - Winner highlighting

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
2. Pilih mode setup:
   - **Manual Setup**: Input nama dan tingkat kesulitan 8 tim
   - **Auto Setup**: Klik untuk generate otomatis
3. Klik **Mulai Tournament**
4. Duduk santai dan tonton pertandingan berjalan otomatis!
5. Tournament akan berlangsung dari Quarter Finals → Semi Finals → Final → Champion
6. Lihat hasil di bracket dan log pertandingan

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
- **Non-blocking**: Menggunakan setInterval dengan speed 100ms untuk simulasi cepat
- **Event-driven**: Callbacks dan setTimeout untuk transisi antar babak
- **Real-time updates**: DOM manipulation untuk live display
- **State management**: tournamentData object menyimpan semua state tournament

## Performance Optimization
- Tournament match speed: 100ms per minute (lebih cepat dari regular match)
- Auto cleanup: Live events limited to 5 terbaru
- Efficient rendering: Update only changed elements
