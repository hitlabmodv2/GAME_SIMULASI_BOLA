// Sistem manajemen pergantian pemain untuk setiap pertandingan
class SubstitutionManager {
    constructor() {
        this.substitutions = {
            teamA: [],
            teamB: []
        };
        this.maxSubstitutions = 5; // Maksimal 5 pergantian per tim
    }

    // Reset substitusi untuk pertandingan baru
    reset() {
        this.substitutions.teamA = [];
        this.substitutions.teamB = [];
    }

    // Tambah pergantian pemain
    addSubstitution(team, playerOut, playerIn, minute) {
        const teamKey = team === 'A' ? 'teamA' : 'teamB';
        
        if (this.substitutions[teamKey].length >= this.maxSubstitutions) {
            return {
                success: false,
                message: `Tim sudah melakukan ${this.maxSubstitutions} pergantian!`
            };
        }

        const substitution = {
            minute: minute,
            playerOut: playerOut,
            playerIn: playerIn,
            timestamp: new Date().toISOString()
        };

        this.substitutions[teamKey].push(substitution);

        return {
            success: true,
            message: `${minute}' - Pergantian pemain: ${playerOut.name} ↔ ${playerIn.name}`,
            substitution: substitution
        };
    }

    // Dapatkan jumlah pergantian yang tersisa
    getRemainingSubstitutions(team) {
        const teamKey = team === 'A' ? 'teamA' : 'teamB';
        return this.maxSubstitutions - this.substitutions[teamKey].length;
    }

    // Dapatkan riwayat pergantian
    getHistory(team) {
        const teamKey = team === 'A' ? 'teamA' : 'teamB';
        return this.substitutions[teamKey];
    }

    // Generate pergantian otomatis berdasarkan strategi
    generateAutoSubstitution(teamName, minute, strategy = 'balanced') {
        const squad = teamSquads[teamName];
        if (!squad || squad.substitutes.length === 0) return null;

        const team = teamName === matchData.teamA.name ? 'A' : 'B';
        const remaining = this.getRemainingSubstitutions(team);
        
        if (remaining === 0) return null;

        // Strategi pergantian berdasarkan menit pertandingan
        let playerOutIndex, playerInIndex;

        if (minute >= 60 && minute < 75) {
            // Menit 60-75: Ganti pemain tengah atau penyerang
            playerOutIndex = Math.floor(Math.random() * 3) + 8; // CM/FW
            playerInIndex = Math.floor(Math.random() * Math.min(3, squad.substitutes.length));
        } else if (minute >= 75) {
            // Menit 75+: Ganti pemain bertahan atau tambah fresh legs
            playerOutIndex = Math.floor(Math.random() * squad.startingXI.length);
            playerInIndex = Math.floor(Math.random() * squad.substitutes.length);
        } else {
            return null; // Terlalu awal untuk pergantian
        }

        const playerOut = squad.startingXI[playerOutIndex];
        const availableSubs = squad.substitutes.filter(sub => {
            // Cek apakah pemain belum masuk
            const teamKey = team === 'A' ? 'teamA' : 'teamB';
            return !this.substitutions[teamKey].some(s => s.playerIn.number === sub.number);
        });

        if (availableSubs.length === 0) return null;

        const playerIn = availableSubs[Math.floor(Math.random() * availableSubs.length)];

        return this.addSubstitution(team, playerOut, playerIn, minute);
    }

    // Format riwayat pergantian untuk ditampilkan
    formatHistory(team) {
        const history = this.getHistory(team);
        if (history.length === 0) return 'Belum ada pergantian pemain';

        return history.map((sub, index) => {
            return `${index + 1}. ${sub.minute}' - ${sub.playerOut.name} (#${sub.playerOut.number}) ↔ ${sub.playerIn.name} (#${sub.playerIn.number})`;
        }).join('\n');
    }
}

// Instance global untuk digunakan di pertandingan
const substitutionManager = new SubstitutionManager();

// Fungsi helper untuk mendapatkan pemain berdasarkan posisi
function getPlayersByPosition(teamName, position) {
    const squad = teamSquads[teamName];
    if (!squad) return [];

    return squad.startingXI.filter(player => player.position === position);
}

// Fungsi helper untuk mendapatkan formasi tim
function getTeamFormation(teamName) {
    const squad = teamSquads[teamName];
    return squad ? squad.formation : '4-4-2';
}

// Fungsi untuk mendapatkan skuad lengkap (starting XI + substitutes)
function getFullSquad(teamName) {
    const squad = teamSquads[teamName];
    if (!squad) return null;

    return {
        formation: squad.formation,
        startingXI: squad.startingXI,
        substitutes: squad.substitutes,
        totalPlayers: squad.startingXI.length + squad.substitutes.length
    };
}
