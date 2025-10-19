# Fitur Logo Tim dan Data Pemain - Simulasi Sepak Bola AI

## 📋 Ringkasan Fitur Baru

Sistem simulasi sepak bola AI sekarang dilengkapi dengan:
- **Logo Tim**: 32 logo tim sepak bola Eropa yang telah di-generate
- **Data Pemain**: Skuad lengkap untuk setiap tim (Starting XI + pemain cadangan)
- **Sistem Substitusi**: Pergantian pemain otomatis dengan nama pemain real
- **Informasi Tim**: Data negara, stadion, warna tim, dan tahun didirikan

## 🗂️ Struktur File

```
project/
├── team-logos/              # 32 logo tim (PNG files)
│   ├── manchester-city.png
│   ├── real-madrid.png
│   ├── bayern-munich.png
│   └── ... (29 tim lainnya)
│
├── players-data/           # Data pemain dan tim
│   ├── teams-info.js      # Info tim (logo, negara, stadion, warna)
│   ├── squads.js          # Skuad pemain lengkap (Starting XI + cadangan)
│   └── substitutions.js   # Sistem manajemen substitusi
│
├── index.html             # File HTML utama (updated)
├── script.js              # File JavaScript utama (updated)
└── style.css              # File CSS
```

## ⚽ Daftar 32 Tim

### Liga Inggris (England) - 9 Tim
1. Manchester City (Level 7) - Logo: Sky blue
2. Liverpool FC (Level 6) - Logo: Red
3. Arsenal FC (Level 6) - Logo: Red & white
4. Manchester United (Level 5) - Logo: Red & yellow
5. Chelsea FC (Level 5) - Logo: Royal blue
6. Tottenham (Level 5) - Logo: Navy blue & white
7. Newcastle United (Level 5) - Logo: Black & white
8. West Ham United (Level 4) - Logo: Claret & blue
9. Leicester City (Level 4) - Logo: Blue & gold

### La Liga (Spain) - 5 Tim
1. Real Madrid (Level 7) - Logo: White & gold
2. Barcelona FC (Level 6) - Logo: Blue & red
3. Atletico Madrid (Level 5) - Logo: Red & white
4. Sevilla FC (Level 4) - Logo: Red & white
5. Valencia CF (Level 4) - Logo: White & black

### Serie A (Italy) - 6 Tim
1. Inter Milan (Level 6) - Logo: Blue & black
2. AC Milan (Level 5) - Logo: Red & black
3. Juventus (Level 5) - Logo: Black & white
4. Napoli (Level 5) - Logo: Light blue
5. AS Roma (Level 4) - Logo: Dark red & yellow

### Bundesliga (Germany) - 5 Tim
1. Bayern Munich (Level 7) - Logo: Red & blue
2. Bayer Leverkusen (Level 6) - Logo: Red & black
3. Borussia Dortmund (Level 5) - Logo: Yellow & black
4. RB Leipzig (Level 5) - Logo: Red & white

### Ligue 1 (France) - 4 Tim
1. PSG (Level 6) - Logo: Navy blue & red
2. Olympique Lyon (Level 4) - Logo: White & red
3. Marseille (Level 4) - Logo: Light blue & white
4. Monaco (Level 4) - Logo: Red & white

### Liga Portugal - 3 Tim
1. Benfica (Level 5) - Logo: Red & white
2. FC Porto (Level 5) - Logo: Blue & white
3. Sporting CP (Level 5) - Logo: Green & white

### Lainnya
1. Ajax Amsterdam - Netherlands (Level 4) - Logo: Red & white
2. Shakhtar Donetsk - Ukraine (Level 3) - Logo: Orange & black

## 👥 Data Pemain

Setiap tim memiliki:
- **Starting XI**: 11 pemain utama dengan posisi dan nomor punggung
- **Substitutes**: 7 pemain cadangan
- **Formasi**: Formasi taktik (contoh: 4-3-3, 3-5-2, 4-2-3-1)
- **Total**: 18 pemain per tim

### Contoh Skuad Manchester City (4-3-3):

**Starting XI:**
1. Ederson (GK) #31
2. Walker (RB) #2
3. Dias (CB) #3
4. Akanji (CB) #25
5. Gvardiol (LB) #24
6. Rodri (CDM) #16
7. De Bruyne (CM) #17
8. Bernardo Silva (CM) #20
9. Foden (RW) #47
10. Haaland (ST) #9
11. Grealish (LW) #10

**Substitutes:**
- Ortega (GK) #18
- Stones (DF) #5
- Ake (DF) #6
- Kovacic (MF) #8
- Nunes (MF) #27
- Doku (FW) #11
- Alvarez (FW) #19

## 🔄 Sistem Pergantian Pemain

### Fitur Substitusi:
- **Maksimal 5 pergantian** per tim per pertandingan
- **Waktu pergantian otomatis**: Menit 60, 70, dan 80
- **Nama pemain real** dari data skuad
- **Nomor punggung** ditampilkan
- **Log pergantian** tercatat di history

### Contoh Log Pergantian:
```
60' - Pergantian pemain Manchester City:
      Grealish (#10) ↔ Doku (#11)

75' - Pergantian pemain Real Madrid:
      Rodrygo (#11) ↔ Brahim (#21)
```

## 🎨 Integrasi UI

### 1. Logo Tim di Match Header
- Logo tim ditampilkan di samping nama tim
- Ukuran: 30x30 px
- Posisi: Kiri untuk Tim A, Kanan untuk Tim B

### 2. Info Tim di Dropdown
Format: `[Nama Tim] - [Negara] ([Level Kesulitan])`
Contoh: `Manchester City - England (Sangat Kuat)`

### 3. Formasi & Skuad di Log Pertandingan
Ditampilkan saat pertandingan dimulai:
```
📋 Formasi & Skuad
Manchester City: Formasi 4-3-3 | 18 Pemain
Real Madrid: Formasi 4-3-3 | 18 Pemain
```

## 📊 Fungsi JavaScript yang Ditambahkan

### Helper Functions:
```javascript
getTeamLogo(teamName)        // Mendapatkan path logo tim
getTeamCountry(teamName)     // Mendapatkan negara tim
getTeamColors(teamName)      // Mendapatkan warna tim
getFullSquad(teamName)       // Mendapatkan skuad lengkap
getTeamFormation(teamName)   // Mendapatkan formasi tim
```

### Display Functions:
```javascript
displayTeamLogos()           // Menampilkan logo tim di UI
displayTeamSquads()          // Menampilkan info skuad di log
```

### Substitution Manager:
```javascript
substitutionManager.reset()                              // Reset untuk pertandingan baru
substitutionManager.addSubstitution(team, out, in, min)  // Tambah substitusi manual
substitutionManager.generateAutoSubstitution(team, min)  // Generate substitusi otomatis
substitutionManager.getRemainingSubstitutions(team)      // Cek sisa jatah substitusi
```

## 🚀 Cara Menggunakan

### Dalam Pertandingan AI vs AI:
1. Pilih tim dari dropdown atau ketik manual
2. Logo tim akan otomatis muncul saat pertandingan dimulai
3. Info formasi dan skuad ditampilkan di log
4. Pergantian pemain otomatis terjadi pada menit 60, 70, dan 80
5. Nama pemain real dengan nomor punggung ditampilkan

### Dalam Mode Tournament:
1. Semua fitur sama berlaku
2. Logo tim ditampilkan di bracket tournament
3. Setiap pertandingan menggunakan data pemain yang akurat

## 📝 Catatan Pengembangan

- Logo tim di-generate menggunakan AI dengan karakteristik warna masing-masing klub
- Data pemain menggunakan skuad musim 2024/2025
- Formasi disesuaikan dengan taktik real dari masing-masing tim
- Sistem substitusi dirancang realistis (maksimal 5, timing strategis)

## 🎯 Keakuratan Data

- ✅ 32 tim dengan logo unik
- ✅ Data negara akurat
- ✅ Formasi sesuai tren taktik 2024/2025
- ✅ Nama pemain real (mayoritas pemain kunci)
- ✅ Nomor punggung sesuai skuad asli
- ✅ Warna tim sesuai identitas klub

---

**Dibuat**: Oktober 2025
**Versi**: 1.0
**Status**: ✅ Semua fitur aktif dan terintegrasi
