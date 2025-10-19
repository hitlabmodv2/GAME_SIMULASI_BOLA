// Global Variables
let currentScreen = 'mainMenu';
let matchData = {
    teamA: { name: 'Barcelona FC', difficulty: 5, score: 0, formation: '4-4-2' },
    teamB: { name: 'Real Madrid', difficulty: 5, score: 0, formation: '4-3-3' },
    currentMinute: 0,
    duration: 90,
    speed: 200,
    logs: [],
    stats: {
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 }
    },
    injuryTime: { firstHalf: 0, secondHalf: 0, currentHalf: 1 },
    isRunning: false,
    interval: null,
    autoScrollEnabled: true
};

let tournamentData = {
    teams: [],
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    final: null,
    champion: null,
    isRunning: false,
    currentRound: 'round16',
    matchQueue: [],
    currentMatchIndex: 0,
    matchLogs: [],
    setupMode: 'manual',
    autoPlayEnabled: true,
    teamCount: 8,
    autoScrollEnabled: true,
    statsCollapsed: true
};

const predefinedTeams = [
    { name: 'Manchester United', difficulty: 6 },
    { name: 'Liverpool FC', difficulty: 6 },
    { name: 'Chelsea FC', difficulty: 5 },
    { name: 'Arsenal FC', difficulty: 5 },
    { name: 'Bayern Munich', difficulty: 7 },
    { name: 'Real Madrid', difficulty: 7 },
    { name: 'Barcelona FC', difficulty: 6 },
    { name: 'PSG', difficulty: 6 },
    { name: 'Manchester City', difficulty: 7 },
    { name: 'Juventus', difficulty: 5 },
    { name: 'AC Milan', difficulty: 5 },
    { name: 'Inter Milan', difficulty: 5 },
    { name: 'Borussia Dortmund', difficulty: 5 },
    { name: 'Atletico Madrid', difficulty: 5 },
    { name: 'Tottenham', difficulty: 4 },
    { name: 'Ajax Amsterdam', difficulty: 4 },
    { name: 'Napoli', difficulty: 5 },
    { name: 'AS Roma', difficulty: 4 },
    { name: 'Sevilla FC', difficulty: 4 },
    { name: 'Valencia CF', difficulty: 4 },
    { name: 'Benfica', difficulty: 5 },
    { name: 'FC Porto', difficulty: 5 },
    { name: 'Sporting CP', difficulty: 4 },
    { name: 'RB Leipzig', difficulty: 5 },
    { name: 'Bayer Leverkusen', difficulty: 5 },
    { name: 'Newcastle United', difficulty: 4 },
    { name: 'West Ham United', difficulty: 4 },
    { name: 'Leicester City', difficulty: 4 },
    { name: 'Olympique Lyon', difficulty: 4 },
    { name: 'Marseille', difficulty: 4 },
    { name: 'Monaco', difficulty: 4 },
    { name: 'Shakhtar Donetsk', difficulty: 4 }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadSettings();
});

// Update Date Time
function updateDateTime() {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const dateTimeString = `${day}, ${date} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// Screen Navigation
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName).classList.add('active');
    currentScreen = screenName;
}

function updateTeamInputs() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const teamsGrid = document.getElementById('teamsGrid');
    teamsGrid.innerHTML = '';
    
    for (let i = 1; i <= teamCount; i++) {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'tournament-team-input';
        teamDiv.innerHTML = `
            <h3>Tim ${i}</h3>
            <input type="text" id="tournamentTeam${i}" placeholder="Nama Tim ${i}" maxlength="20" value="">
            <div class="difficulty-selector">
                <label style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 5px;">Tingkat Kesulitan:</label>
                <div class="difficulty-slider-container">
                    <input type="range" id="tournamentSlider${i}" class="difficulty-slider" min="1" max="7" value="5" oninput="updateTournamentSlider(${i})">
                    <div class="difficulty-value" id="tournamentDiff${i}">5</div>
                </div>
            </div>
            <div class="difficulty-bar">
                <div id="tournamentDiffBar${i}" class="difficulty-fill" style="width: 71.4%"></div>
            </div>
        `;
        teamsGrid.appendChild(teamDiv);
    }
    
    if (tournamentData.setupMode === 'auto') {
        autoGenerateTeams();
    }
}

function updateTournamentSlider(teamNum) {
    const sliderElement = document.getElementById('tournamentSlider' + teamNum);
    const difficultyElement = document.getElementById('tournamentDiff' + teamNum);
    const barElement = document.getElementById('tournamentDiffBar' + teamNum);
    
    const difficulty = parseInt(sliderElement.value);
    difficultyElement.textContent = difficulty;
    const percentage = (difficulty / 7) * 100;
    barElement.style.width = percentage + '%';
}

function setSetupMode(mode) {
    tournamentData.setupMode = mode;
    
    document.getElementById('manualModeBtn').classList.remove('active');
    document.getElementById('autoModeBtn').classList.remove('active');
    
    if (mode === 'manual') {
        document.getElementById('manualModeBtn').classList.add('active');
        document.querySelector('.tournament-teams-setup').style.display = 'block';
    } else {
        document.getElementById('autoModeBtn').classList.add('active');
        document.querySelector('.tournament-teams-setup').style.display = 'none';
        autoGenerateTeams();
    }
}

function autoGenerateTeams() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const shuffled = [...predefinedTeams].sort(() => Math.random() - 0.5);
    
    for (let i = 1; i <= teamCount; i++) {
        const team = shuffled[i - 1];
        document.getElementById('tournamentTeam' + i).value = team.name;
        
        const sliderElement = document.getElementById('tournamentSlider' + i);
        if (sliderElement) {
            sliderElement.value = team.difficulty;
        }
        
        document.getElementById('tournamentDiff' + i).textContent = team.difficulty;
        const percentage = (team.difficulty / 7) * 100;
        document.getElementById('tournamentDiffBar' + i).style.width = percentage + '%';
    }
}

function changeTournamentDifficulty(teamNum, delta) {
    const difficultyElement = document.getElementById('tournamentDiff' + teamNum);
    const barElement = document.getElementById('tournamentDiffBar' + teamNum);
    let currentDifficulty = parseInt(difficultyElement.textContent);
    
    currentDifficulty += delta;
    if (currentDifficulty < 1) currentDifficulty = 1;
    if (currentDifficulty > 7) currentDifficulty = 7;
    
    difficultyElement.textContent = currentDifficulty;
    const percentage = (currentDifficulty / 7) * 100;
    barElement.style.width = percentage + '%';
}

function initializeTournament() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    tournamentData.teams = [];
    tournamentData.teamCount = teamCount;
    
    for (let i = 1; i <= teamCount; i++) {
        const teamName = document.getElementById('tournamentTeam' + i).value || 'Tim ' + i;
        const sliderElement = document.getElementById('tournamentSlider' + i);
        const difficulty = sliderElement ? parseInt(sliderElement.value) : parseInt(document.getElementById('tournamentDiff' + i).textContent);
        tournamentData.teams.push({ name: teamName, difficulty: difficulty });
    }
    
    tournamentData.roundOf16 = [];
    tournamentData.quarterFinals = [];
    tournamentData.semiFinals = [];
    tournamentData.final = null;
    tournamentData.champion = null;
    tournamentData.matchQueue = [];
    tournamentData.currentMatchIndex = 0;
    tournamentData.matchLogs = [];
    tournamentData.isRunning = true;
    
    document.getElementById('tournamentLog').innerHTML = '';
    
    showScreen('tournament');
    
    tournamentData.semiFinals = [
        { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' }
    ];
    tournamentData.final = { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' };
    
    if (teamCount === 4) {
        tournamentData.currentRound = 'semi';
        setupSemiFinals();
        document.getElementById('tournamentRoundTitle').textContent = 'Semi Finals & Final';
        addTournamentLog('🏆 Tournament dimulai! 4 tim siap berkompetisi untuk menjadi juara!', 'round-change');
    } else if (teamCount === 8) {
        tournamentData.currentRound = 'quarter';
        setupQuarterFinals();
        document.getElementById('tournamentRoundTitle').textContent = 'Babak 1: Quarter Finals & Semi Finals';
        addTournamentLog('🏆 Tournament dimulai! 8 tim siap berkompetisi untuk menjadi juara!', 'round-change');
    } else if (teamCount === 16) {
        tournamentData.currentRound = 'round16';
        setupRoundOf16();
        document.getElementById('tournamentRoundTitle').textContent = 'Babak 1: Round of 16';
        addTournamentLog('🏆 Tournament dimulai! 16 tim siap berkompetisi untuk menjadi juara!', 'round-change');
    }
    
    renderBracket();
    
    setTimeout(() => {
        playNextMatch();
    }, 2000);
}

function setupRoundOf16() {
    tournamentData.roundOf16 = [
        { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[4], teamB: tournamentData.teams[5], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[6], teamB: tournamentData.teams[7], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[8], teamB: tournamentData.teams[9], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[10], teamB: tournamentData.teams[11], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[12], teamB: tournamentData.teams[13], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[14], teamB: tournamentData.teams[15], scoreA: null, scoreB: null, winner: null, status: 'pending' }
    ];
    
    tournamentData.matchQueue = [...tournamentData.roundOf16];
    renderBracket();
}

function setupQuarterFinals() {
    // Setup Quarter Finals berdasarkan sumber tim
    if (tournamentData.teamCount === 8) {
        // Langsung dari teams untuk 8 tim
        tournamentData.quarterFinals = [
            { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.teams[4], teamB: tournamentData.teams[5], scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.teams[6], teamB: tournamentData.teams[7], scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    } else if (tournamentData.teamCount === 16) {
        // Dari Round of 16 winners untuk 16 tim
        tournamentData.quarterFinals = [
            { teamA: tournamentData.roundOf16[0].winner, teamB: tournamentData.roundOf16[1].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.roundOf16[2].winner, teamB: tournamentData.roundOf16[3].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.roundOf16[4].winner, teamB: tournamentData.roundOf16[5].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.roundOf16[6].winner, teamB: tournamentData.roundOf16[7].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    }
    
    tournamentData.currentRound = 'quarter';
    tournamentData.matchQueue = [...tournamentData.quarterFinals];
    tournamentData.currentMatchIndex = 0;
    renderBracket();
}

function playNextMatch() {
    if (tournamentData.currentMatchIndex < tournamentData.matchQueue.length) {
        const match = tournamentData.matchQueue[tournamentData.currentMatchIndex];
        playTournamentMatch(match);
    } else {
        if (tournamentData.currentRound === 'round16') {
            addTournamentLog('✅ Round of 16 selesai! Mempersiapkan Quarter Finals...', 'round-change');
            document.getElementById('tournamentRoundTitle').textContent = 'Babak 2: Quarter Finals';
            setTimeout(() => {
                setupQuarterFinals();
                addTournamentLog('🔥 Quarter Finals dimulai! 8 tim tersisa!', 'round-change');
                setTimeout(() => playNextMatch(), 2000);
            }, 2000);
        } else if (tournamentData.currentRound === 'quarter') {
            addTournamentLog('✅ Quarter Finals selesai! Mempersiapkan Semi Finals...', 'round-change');
            const nextTitle = tournamentData.teamCount === 16 ? 'Babak 3: Semi Finals' : 'Babak 2: Semi Finals';
            document.getElementById('tournamentRoundTitle').textContent = nextTitle;
            setTimeout(() => {
                setupSemiFinals();
                setTimeout(() => playNextMatch(), 2000);
            }, 2000);
        } else if (tournamentData.currentRound === 'semi') {
            const roundLabel = tournamentData.teamCount === 16 ? 'Babak 4: Final' : 
                              tournamentData.teamCount === 8 ? 'Babak 2: Final' : 'Final';
            addTournamentLog('🎯 Semi Finals selesai! Memulai Final!', 'round-change');
            document.getElementById('tournamentRoundTitle').textContent = roundLabel;
            setTimeout(() => {
                setupFinal();
                setTimeout(() => playNextMatch(), 2000);
            }, 2000);
        } else if (tournamentData.currentRound === 'final') {
            addTournamentLog('🏆 Tournament selesai! Juara telah ditentukan!', 'round-change');
            displayChampion();
            tournamentData.isRunning = false;
        }
    }
}

function playTournamentMatch(match) {
    match.status = 'playing';
    
    const roundName = tournamentData.currentRound === 'round16' ? 'Round of 16' :
                      tournamentData.currentRound === 'quarter' ? 'Quarter Final' : 
                      tournamentData.currentRound === 'semi' ? 'Semi Final' : 'Final';
    
    const formations = ['4-4-2', '4-3-3', '3-5-2', '4-2-3-1', '3-4-3', '5-3-2'];
    const formationA = formations[Math.floor(Math.random() * formations.length)];
    const formationB = formations[Math.floor(Math.random() * formations.length)];
    
    addTournamentLog(`⚽ ${roundName}: ${match.teamA.name} vs ${match.teamB.name} - Pertandingan dimulai!`, 'match-start');
    addTournamentLog(`📋 Formasi: ${match.teamA.name} (${formationA}) vs ${match.teamB.name} (${formationB})`, 'important');
    addCommentary(getRandomComment('matchStart'));
    updateTournamentStatus(`Sedang berlangsung: ${match.teamA.name} vs ${match.teamB.name}`);
    
    document.getElementById('liveMatchDisplay').style.display = 'block';
    document.getElementById('liveTeamA').textContent = match.teamA.name;
    document.getElementById('liveTeamB').textContent = match.teamB.name;
    document.getElementById('liveScoreA').textContent = '0';
    document.getElementById('liveScoreB').textContent = '0';
    document.getElementById('liveMinute').textContent = "0'";
    document.getElementById('liveEvents').innerHTML = '';
    
    renderBracket();
    
    matchData.teamA = { name: match.teamA.name, difficulty: match.teamA.difficulty, score: 0, formation: formationA };
    matchData.teamB = { name: match.teamB.name, difficulty: match.teamB.difficulty, score: 0, formation: formationB };
    matchData.currentMinute = 0;
    matchData.logs = [];
    matchData.stats = {
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 }
    };
    matchData.injuryTime = { firstHalf: 0, secondHalf: 0, currentHalf: 1 };
    
    simulateTournamentMatch(match);
}

function simulateTournamentMatch(match) {
    const duration = matchData.duration;
    const simulationSpeed = 400;
    const halfTime = Math.floor(duration / 2);
    
    const interval = setInterval(() => {
        matchData.currentMinute++;
        let displayText = matchData.currentMinute + "'";
        
        if (matchData.currentMinute > halfTime && matchData.currentMinute <= halfTime + matchData.injuryTime.firstHalf) {
            const addedMin = matchData.currentMinute - halfTime;
            displayText = `${halfTime}+${addedMin}'`;
        } else if (matchData.currentMinute > duration && matchData.currentMinute <= duration + matchData.injuryTime.firstHalf + matchData.injuryTime.secondHalf) {
            const addedMin = matchData.currentMinute - duration - matchData.injuryTime.firstHalf;
            displayText = `${duration}+${addedMin}'`;
        }
        
        document.getElementById('liveMinute').textContent = displayText;
        
        simulateTournamentMinute();
        
        document.getElementById('liveScoreA').textContent = matchData.teamA.score;
        document.getElementById('liveScoreB').textContent = matchData.teamB.score;
        
        if (matchData.currentMinute === halfTime) {
            const injuryMins = Math.floor(Math.random() * 4) + 1;
            matchData.injuryTime.firstHalf = injuryMins;
            addTournamentLog(`⏸️ Turun minum! Babak pertama selesai. Waktu tambahan: ${injuryMins} menit.`, 'halftime');
            addCommentary(getRandomComment('halftime'));
            matchData.injuryTime.currentHalf = 2;
        } else if (matchData.currentMinute === halfTime + matchData.injuryTime.firstHalf + 1) {
            addTournamentLog('▶️ Babak kedua dimulai!', 'halftime');
        } else if (matchData.currentMinute === duration) {
            const injuryMins = Math.floor(Math.random() * 5) + 2;
            matchData.injuryTime.secondHalf = injuryMins;
            addTournamentLog(`⏱️ Waktu tambahan babak kedua: ${injuryMins} menit`, 'important');
        }
        
        if (matchData.currentMinute >= duration + matchData.injuryTime.firstHalf + matchData.injuryTime.secondHalf) {
            clearInterval(interval);
            finishTournamentMatch(match);
        }
    }, simulationSpeed);
}

function simulateTournamentMinute() {
    updatePossession();
    
    const eventChance = Math.random() * 100;
    
    if (eventChance < 12) {
        simulateTournamentAttack();
    } else if (eventChance < 18) {
        simulateTournamentPassSequence();
    } else if (eventChance < 21) {
        simulateTournamentFoul();
    } else if (eventChance < 23) {
        simulateTournamentCorner();
    } else if (eventChance < 24) {
        simulateTournamentOffside();
    } else if (eventChance < 24.5 && matchData.currentMinute > 60) {
        simulateTournamentSubstitution();
    }
}

function simulateTournamentAttack() {
    const attackingTeam = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const defendingTeam = attackingTeam === 'teamA' ? 'teamB' : 'teamA';
    const attackTeamName = matchData[attackingTeam].name;
    const defendTeamName = matchData[defendingTeam].name;
    const attackDiff = matchData[attackingTeam].difficulty;
    const defendDiff = matchData[defendingTeam].difficulty;
    
    const shotAccuracy = 18 + (attackDiff * 9) - (defendDiff * 2);
    const shootChance = Math.random() * 100;
    
    matchData.stats[attackingTeam].shots++;
    
    if (shootChance < shotAccuracy) {
        matchData.stats[attackingTeam].shotsOnTarget++;
        
        const baseGoalChance = 12 + (attackDiff * 6);
        const defenseReduction = defendDiff * 3.5;
        const goalChance = baseGoalChance - defenseReduction;
        const finalGoalChance = Math.max(8, Math.min(50, goalChance));
        const goalRoll = Math.random() * 100;
        
        if (goalRoll < finalGoalChance) {
            matchData[attackingTeam].score++;
            const scorer = generatePlayerName();
            const assister = Math.random() < 0.7 ? generatePlayerName() : null;
            
            if (assister) {
                matchData.stats[attackingTeam].assists++;
                addTournamentLog(`⚽ GOOOL! ${scorer} mencetak gol untuk ${attackTeamName}! Assist dari ${assister}! Skor: ${matchData.teamA.score}-${matchData.teamB.score}`, 'goal');
                addCommentary(getRandomComment('goal'));
                addLiveEvent(`⚽ ${scorer} - Assist: ${assister}`, 'goal');
                showEventAnimation(`⚽ GOOOL!<br>${scorer}<br><small>Assist: ${assister}</small>`, 'goal');
            } else {
                addTournamentLog(`⚽ GOOOL! ${scorer} mencetak gol untuk ${attackTeamName}! Skor: ${matchData.teamA.score}-${matchData.teamB.score}`, 'goal');
                addCommentary(getRandomComment('goal'));
                addLiveEvent(`⚽ ${scorer} (${attackTeamName})`, 'goal');
                showEventAnimation(`⚽ GOOOL!<br>${scorer}`, 'goal');
            }
        } else {
            const saveType = ['refleks cemerlang', 'menangkap dengan aman', 'memukul ke pojok', 'menepis sempurna'];
            const saveMessage = saveType[Math.floor(Math.random() * saveType.length)];
            addTournamentLog(`🧤 Tembakan ke gawang ${defendTeamName}! Kiper ${saveMessage}!`, 'save');
            addCommentary(getRandomComment('save'));
            addLiveEvent(`🧤 Kiper ${defendTeamName} ${saveMessage}`);
        }
    } else {
        const missType = ['melebar', 'melambung tinggi', 'mengenai tiang', 'diblok'];
        const miss = missType[Math.floor(Math.random() * missType.length)];
        addTournamentLog(`⚠️ Peluang ${attackTeamName}! Tembakan ${miss}!`, 'chance');
        if (miss === 'mengenai tiang') {
            addCommentary(getRandomComment('miss'));
            addLiveEvent(`⚠️ ${attackTeamName} mengenai tiang!`, 'warning');
        }
    }
}

function simulateTournamentPassSequence() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const passCount = Math.floor(Math.random() * 10) + 5;
    
    matchData.stats[team].passes += passCount;
    addTournamentLog(`🔄 ${teamName} membangun serangan dengan ${passCount} operan beruntun.`, 'pass');
}

function simulateTournamentFoul() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const playerName = generatePlayerName();
    
    matchData.stats[team].fouls++;
    
    const cardChance = Math.random() * 100;
    if (cardChance < 15) {
        matchData.stats[team].yellowCards++;
        addTournamentLog(`🟨 Kartu kuning untuk ${playerName} (${teamName})! Pelanggaran keras!`, 'yellow-card');
        addLiveEvent(`🟨 ${playerName} (${teamName})`, 'warning');
    } else if (cardChance < 17) {
        matchData.stats[team].redCards++;
        addTournamentLog(`🟥 KARTU MERAH! ${playerName} (${teamName}) diusir! ${teamName} main dengan 10 pemain!`, 'red-card');
        addLiveEvent(`🟥 ${playerName} diusir!`, 'red-card');
    } else {
        addTournamentLog(`⚽ Pelanggaran oleh ${playerName} (${teamName}). Tendangan bebas!`, 'foul');
    }
}

function simulateTournamentCorner() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    
    matchData.stats[team].corners++;
    addTournamentLog(`⛳ Tendangan pojok untuk ${teamName}!`, 'corner');
    addLiveEvent(`⛳ Corner ${teamName}`);
}

function simulateTournamentOffside() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const playerName = generatePlayerName();
    
    matchData.stats[team].offsides++;
    addTournamentLog(`🚩 Offside! ${playerName} (${teamName}) tertangkap offside!`, 'offside');
}

function simulateTournamentSubstitution() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const playerOut = generatePlayerName();
    const playerIn = generatePlayerName();
    
    addTournamentLog(`🔄 Substitusi ${teamName}: ${playerOut} keluar, ${playerIn} masuk!`, 'substitution');
    addLiveEvent(`🔄 ${teamName}: ${playerIn} masuk`);
}

function addLiveEvent(message, type = 'normal') {
    const liveEvents = document.getElementById('liveEvents');
    if (!liveEvents || liveEvents.parentElement.style.display === 'none') return;
    
    const eventDiv = document.createElement('div');
    eventDiv.className = 'live-event' + (type !== 'normal' ? ' ' + type : '');
    eventDiv.textContent = `${matchData.currentMinute}' - ${message}`;
    
    liveEvents.appendChild(eventDiv);
    liveEvents.scrollTop = liveEvents.scrollHeight;
    
    while (liveEvents.children.length > 8) {
        liveEvents.removeChild(liveEvents.firstChild);
    }
}

function finishTournamentMatch(match) {
    match.scoreA = matchData.teamA.score;
    match.scoreB = matchData.teamB.score;
    match.stats = JSON.parse(JSON.stringify(matchData.stats));
    
    if (match.scoreA > match.scoreB) {
        match.winner = match.teamA;
        addTournamentLog(`🎉 ${match.teamA.name} menang ${match.scoreA}-${match.scoreB} melawan ${match.teamB.name}!`, 'match-end');
        proceedAfterMatch(match);
    } else if (match.scoreB > match.scoreA) {
        match.winner = match.teamB;
        addTournamentLog(`🎉 ${match.teamB.name} menang ${match.scoreB}-${match.scoreA} melawan ${match.teamA.name}!`, 'match-end');
        proceedAfterMatch(match);
    } else {
        addTournamentLog(`⚖️ Pertandingan berakhir imbang ${match.scoreA}-${match.scoreB}! Adu penalti dimulai!`, 'match-end');
        addLiveEvent('⚽ Adu Penalti!', 'goal');
        setTimeout(() => {
            simulatePenaltyShootout(match);
        }, 2000);
    }
}

function simulatePenaltyShootout(match) {
    addTournamentLog('🎯 Adu Penalti dimulai!', 'important');
    
    let penaltyScoreA = 0;
    let penaltyScoreB = 0;
    let round = 1;
    let suddenDeathMode = false;
    
    function executePenalty(team, opponentDifficulty) {
        const rand = Math.random() * 100;
        const diff = team.difficulty;
        const oppDiff = opponentDifficulty;
        
        const baseGoalChance = 76;
        const kickerBonus = (diff - 4) * 1.0;
        const keeperPenalty = Math.max(0, (oppDiff - 4)) * 0.8;
        const goalChance = baseGoalChance + kickerBonus - keeperPenalty;
        
        const remaining = 100 - goalChance;
        const saveWeight = 1.8 + (oppDiff * 0.15);
        const missWeight = 0.8 + Math.max(0, (4 - diff) * 0.15);
        const totalWeight = saveWeight + missWeight + 0.2;
        
        const saveRate = (remaining * saveWeight / totalWeight);
        const missRate = (remaining * missWeight / totalWeight);
        
        const saveChance = goalChance + saveRate;
        const missChance = saveChance + missRate;
        
        if (rand < goalChance) {
            return { result: 'GOOL', scored: true, icon: '⚽', message: 'masuk dengan sempurna!', type: 'goal' };
        } else if (rand < saveChance) {
            return { result: 'SAVE', scored: false, icon: '🧤', message: 'ditangkap kiper!', type: 'save' };
        } else if (rand < missChance) {
            return { result: 'MISS', scored: false, icon: '❌', message: 'meleset ke luar gawang!', type: 'chance' };
        } else {
            return { result: 'BLUNDER', scored: false, icon: '💥', message: 'tendangan lemah dan gagal total!', type: 'foul' };
        }
    }
    
    function takePenalty() {
        const roundLabel = suddenDeathMode ? `SD${round - 5}` : `${round}`;
        
        const penaltyA = executePenalty(match.teamA, match.teamB.difficulty);
        if (penaltyA.scored) {
            penaltyScoreA++;
            addTournamentLog(`${penaltyA.icon} ${match.teamA.name} - ${penaltyA.result}! Penalti ${roundLabel} ${penaltyA.message} (${penaltyScoreA}-${penaltyScoreB})`, penaltyA.type);
            addLiveEvent(`⚽ ${match.teamA.name} skor!`, 'goal');
        } else {
            addTournamentLog(`${penaltyA.icon} ${match.teamA.name} - ${penaltyA.result}! Penalti ${roundLabel} ${penaltyA.message}`, penaltyA.type);
            addLiveEvent(`${penaltyA.icon} ${match.teamA.name} gagal!`, penaltyA.type);
        }
        
        document.getElementById('liveScoreA').textContent = `${match.scoreA} (${penaltyScoreA})`;
        document.getElementById('liveScoreB').textContent = `${match.scoreB} (${penaltyScoreB})`;
        
        setTimeout(() => {
            const penaltyB = executePenalty(match.teamB, match.teamA.difficulty);
            if (penaltyB.scored) {
                penaltyScoreB++;
                addTournamentLog(`${penaltyB.icon} ${match.teamB.name} - ${penaltyB.result}! Penalti ${roundLabel} ${penaltyB.message} (${penaltyScoreA}-${penaltyScoreB})`, penaltyB.type);
                addLiveEvent(`⚽ ${match.teamB.name} skor!`, 'goal');
            } else {
                addTournamentLog(`${penaltyB.icon} ${match.teamB.name} - ${penaltyB.result}! Penalti ${roundLabel} ${penaltyB.message}`, penaltyB.type);
                addLiveEvent(`${penaltyB.icon} ${match.teamB.name} gagal!`, penaltyB.type);
            }
            
            document.getElementById('liveScoreA').textContent = `${match.scoreA} (${penaltyScoreA})`;
            document.getElementById('liveScoreB').textContent = `${match.scoreB} (${penaltyScoreB})`;
            
            const remainingRounds = 5 - round;
            const scoreDiff = Math.abs(penaltyScoreA - penaltyScoreB);
            
            if (round >= 5 || scoreDiff > remainingRounds) {
                if (penaltyScoreA > penaltyScoreB) {
                    match.winner = match.teamA;
                    match.penaltyScoreA = penaltyScoreA;
                    match.penaltyScoreB = penaltyScoreB;
                    addTournamentLog(`🏆 ${match.teamA.name} menang adu penalti ${penaltyScoreA}-${penaltyScoreB}!`, 'match-end');
                    proceedAfterMatch(match);
                    return;
                } else if (penaltyScoreB > penaltyScoreA) {
                    match.winner = match.teamB;
                    match.penaltyScoreA = penaltyScoreA;
                    match.penaltyScoreB = penaltyScoreB;
                    addTournamentLog(`🏆 ${match.teamB.name} menang adu penalti ${penaltyScoreB}-${penaltyScoreA}!`, 'match-end');
                    proceedAfterMatch(match);
                    return;
                } else if (round === 5) {
                    suddenDeathMode = true;
                    addTournamentLog('⚡ Masih seri! Sudden Death dimulai!', 'important');
                    addLiveEvent('⚡ Sudden Death!', 'goal');
                }
            }
            
            round++;
            setTimeout(takePenalty, 3000);
        }, 1500);
    }
    
    takePenalty();
}

function proceedAfterMatch(match) {
    match.status = 'completed';
    tournamentData.currentMatchIndex++;
    
    document.getElementById('liveMatchDisplay').style.display = 'none';
    displayMatchStats(match);
    renderBracket();
    updateTournamentStatus(`Pertandingan selesai! ${match.winner.name} lolos ke babak berikutnya.`);
    
    setTimeout(() => {
        playNextMatch();
    }, 5000);
}

function displayMatchStats(match) {
    const statsSection = document.getElementById('tournamentStatsSection');
    const statsDiv = document.getElementById('tournamentStats');
    
    statsSection.style.display = 'block';
    
    const stats = match.stats;
    
    const ratingA = (match.scoreA * 10) + (stats.teamA.assists * 7) + (stats.teamA.shotsOnTarget * 3) + 
                    (stats.teamA.possession * 0.5) - (stats.teamA.fouls * 2) - (stats.teamA.yellowCards * 3) - (stats.teamA.redCards * 10);
    const ratingB = (match.scoreB * 10) + (stats.teamB.assists * 7) + (stats.teamB.shotsOnTarget * 3) + 
                    (stats.teamB.possession * 0.5) - (stats.teamB.fouls * 2) - (stats.teamB.yellowCards * 3) - (stats.teamB.redCards * 10);
    
    const manOfMatch = ratingA > ratingB ? match.teamA.name : match.teamB.name;
    const motmRating = Math.max(ratingA, ratingB).toFixed(1);
    
    statsDiv.innerHTML = `
        <div class="match-stats-header">
            <h4>${match.teamA.name} ${match.scoreA} - ${match.scoreB} ${match.teamB.name}</h4>
            <p class="stats-subtitle">📊 Statistik Pertandingan Lengkap</p>
        </div>
        <div class="man-of-match">
            <span class="motm-icon">⭐</span>
            <span class="motm-label">Man of the Match:</span>
            <span class="motm-name">${manOfMatch}</span>
            <span class="motm-rating">(Rating: ${motmRating})</span>
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-label">⚽ Penguasaan Bola</span>
                <div class="stat-values">
                    <span>${stats.teamA.possession}%</span>
                    <div class="stat-bar-mini">
                        <div class="stat-bar-fill-mini" style="width: ${stats.teamA.possession}%"></div>
                    </div>
                    <span>${stats.teamB.possession}%</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🎯 Tembakan</span>
                <div class="stat-values">
                    <span>${stats.teamA.shots}</span>
                    <span>-</span>
                    <span>${stats.teamB.shots}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🎯 On Target</span>
                <div class="stat-values">
                    <span>${stats.teamA.shotsOnTarget}</span>
                    <span>-</span>
                    <span>${stats.teamB.shotsOnTarget}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🅰️ Assist</span>
                <div class="stat-values">
                    <span>${stats.teamA.assists}</span>
                    <span>-</span>
                    <span>${stats.teamB.assists}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">📝 Operan</span>
                <div class="stat-values">
                    <span>${stats.teamA.passes}</span>
                    <span>-</span>
                    <span>${stats.teamB.passes}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">⛳ Tendangan Pojok</span>
                <div class="stat-values">
                    <span>${stats.teamA.corners}</span>
                    <span>-</span>
                    <span>${stats.teamB.corners}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🚩 Offside</span>
                <div class="stat-values">
                    <span>${stats.teamA.offsides}</span>
                    <span>-</span>
                    <span>${stats.teamB.offsides}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">⚠️ Pelanggaran</span>
                <div class="stat-values">
                    <span>${stats.teamA.fouls}</span>
                    <span>-</span>
                    <span>${stats.teamB.fouls}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🟨 Kartu Kuning</span>
                <div class="stat-values">
                    <span>${stats.teamA.yellowCards}</span>
                    <span>-</span>
                    <span>${stats.teamB.yellowCards}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🟥 Kartu Merah</span>
                <div class="stat-values">
                    <span>${stats.teamA.redCards}</span>
                    <span>-</span>
                    <span>${stats.teamB.redCards}</span>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        statsSection.style.display = 'none';
    }, 5500);
}

function setupSemiFinals() {
    if (tournamentData.teamCount === 4) {
        tournamentData.semiFinals = [
            { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    } else if (tournamentData.quarterFinals && tournamentData.quarterFinals.length >= 4) {
        tournamentData.semiFinals = [
            { teamA: tournamentData.quarterFinals[0].winner, teamB: tournamentData.quarterFinals[1].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: tournamentData.quarterFinals[2].winner, teamB: tournamentData.quarterFinals[3].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    }
    
    tournamentData.currentRound = 'semi';
    tournamentData.matchQueue = [...tournamentData.semiFinals];
    tournamentData.currentMatchIndex = 0;
    
    addTournamentLog('🔥 Semi Finals dimulai! 4 tim tersisa berjuang untuk masuk Final!', 'round-change');
    showEventAnimation('🔥 Semi Finals!<br>4 Tim Tersisa', 'goal');
    renderBracket();
}

function setupFinal() {
    if (tournamentData.semiFinals && tournamentData.semiFinals.length >= 2 &&
        tournamentData.semiFinals[0].winner && tournamentData.semiFinals[1].winner) {
        tournamentData.final = {
            teamA: tournamentData.semiFinals[0].winner,
            teamB: tournamentData.semiFinals[1].winner,
            scoreA: null,
            scoreB: null,
            winner: null,
            status: 'pending'
        };
        
        tournamentData.currentRound = 'final';
        tournamentData.matchQueue = [tournamentData.final];
        tournamentData.currentMatchIndex = 0;
        
        addTournamentLog(`🏆 Final: ${tournamentData.final.teamA.name} vs ${tournamentData.final.teamB.name}!`, 'round-change');
        showEventAnimation('🏆 FINAL!<br>Perebutan Juara', 'goal');
        renderBracket();
    }
}

function renderBracket() {
    // Atur visibilitas kolom berdasarkan jumlah tim
    const round16Column = document.getElementById('round16Column');
    const quarterColumn = document.getElementById('quarterColumn');
    const semiColumn = document.getElementById('semiColumn');
    
    // Null check untuk menghindari error jika element tidak ditemukan
    if (!round16Column || !quarterColumn || !semiColumn) {
        return;
    }
    
    if (tournamentData.teamCount === 16) {
        round16Column.style.display = 'flex';
        quarterColumn.style.display = 'flex';
        semiColumn.style.display = 'flex';
    } else if (tournamentData.teamCount === 8) {
        round16Column.style.display = 'none';
        quarterColumn.style.display = 'flex';
        semiColumn.style.display = 'flex';
    } else if (tournamentData.teamCount === 4) {
        round16Column.style.display = 'none';
        quarterColumn.style.display = 'none';
        semiColumn.style.display = 'flex';
    }
    
    // Render Round of 16 (untuk 16 tim)
    const roundOf16Div = document.getElementById('roundOf16');
    if (roundOf16Div) {
        roundOf16Div.innerHTML = '';
        if (tournamentData.roundOf16.length > 0) {
            tournamentData.roundOf16.forEach((match, index) => {
                roundOf16Div.innerHTML += createMatchCard(match, `R16-${index + 1}`);
            });
        }
    }
    
    // Render Quarter Finals
    const quarterFinalsDiv = document.getElementById('quarterFinals');
    if (quarterFinalsDiv) {
        quarterFinalsDiv.innerHTML = '';
        if (tournamentData.quarterFinals.length > 0) {
            tournamentData.quarterFinals.forEach((match, index) => {
                quarterFinalsDiv.innerHTML += createMatchCard(match, `QF${index + 1}`);
            });
        }
    }
    
    // Render Semi Finals
    const semiFinalsDiv = document.getElementById('semiFinals');
    if (semiFinalsDiv) {
        semiFinalsDiv.innerHTML = '';
        if (tournamentData.semiFinals.length > 0) {
            tournamentData.semiFinals.forEach((match, index) => {
                semiFinalsDiv.innerHTML += createMatchCard(match, `SF${index + 1}`);
            });
        }
    }
    
    // Render Final
    const finalDiv = document.getElementById('final');
    if (finalDiv) {
        finalDiv.innerHTML = '';
        if (tournamentData.final) {
            finalDiv.innerHTML = createMatchCard(tournamentData.final, 'Final');
        }
    }
}

function createMatchCard(match, matchId) {
    const teamAName = match.teamA ? match.teamA.name : 'TBD';
    const teamBName = match.teamB ? match.teamB.name : 'TBD';
    const teamAPending = !match.teamA ? 'pending-team' : '';
    const teamBPending = !match.teamB ? 'pending-team' : '';
    
    const statusClass = match.status === 'playing' ? 'active' : match.status === 'completed' ? 'completed' : '';
    const teamAClass = match.winner && match.teamA && match.winner.name === match.teamA.name ? 'winner' : '';
    const teamBClass = match.winner && match.teamB && match.winner.name === match.teamB.name ? 'winner' : '';
    const teamALosses = match.status === 'completed' && match.winner && match.teamA && match.winner.name !== match.teamA.name ? 'loser' : '';
    const teamBLosses = match.status === 'completed' && match.winner && match.teamB && match.winner.name !== match.teamB.name ? 'loser' : '';
    
    const hasPenalty = match.penaltyScoreA !== undefined && match.penaltyScoreB !== undefined;
    const scoreADisplay = match.scoreA !== null ? 
        (hasPenalty ? `${match.scoreA} (${match.penaltyScoreA})` : match.scoreA) : '-';
    const scoreBDisplay = match.scoreB !== null ? 
        (hasPenalty ? `${match.scoreB} (${match.penaltyScoreB})` : match.scoreB) : '-';
    
    const viewStatsBtn = match.status === 'completed' && match.stats ? 
        `<button class="btn-view-stats" onclick="viewMatchStats('${matchId}')">📊</button>` : '';
    
    return `
        <div class="match-card ${statusClass}" id="${matchId}" data-match='${JSON.stringify(match).replace(/'/g, "&apos;")}'>
            <div class="match-team ${teamAClass} ${teamALosses} ${teamAPending}">
                <span class="match-team-name">${teamAName}</span>
                <span class="match-team-score">${scoreADisplay}</span>
            </div>
            <div class="match-team ${teamBClass} ${teamBLosses} ${teamBPending}">
                <span class="match-team-name">${teamBName}</span>
                <span class="match-team-score">${scoreBDisplay}</span>
            </div>
            <div class="match-status">
                ${match.status === 'playing' ? '⚽ Berlangsung' : match.status === 'completed' ? (hasPenalty ? '✓ Penalti' : '✓ Selesai') : 'Menunggu'}
                ${viewStatsBtn}
            </div>
        </div>
    `;
}

function viewMatchStats(matchId) {
    const matchCard = document.getElementById(matchId);
    if (!matchCard) return;
    
    const matchDataStr = matchCard.getAttribute('data-match');
    if (!matchDataStr) return;
    
    const match = JSON.parse(matchDataStr);
    displayMatchStats(match);
    
    const statsDiv = document.getElementById('tournamentStats');
    const collapseBtn = document.getElementById('statsCollapseBtn');
    
    statsDiv.classList.remove('collapsed');
    tournamentData.statsCollapsed = false;
    if (collapseBtn) {
        collapseBtn.classList.add('rotated');
        collapseBtn.innerHTML = '▲';
    }
    
    const statsSection = document.getElementById('tournamentStatsSection');
    statsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayChampion() {
    const championDiv = document.getElementById('champion');
    const champion = tournamentData.final.winner;
    
    championDiv.innerHTML = `
        <div class="champion-display has-winner">
            <div class="champion-trophy">🏆</div>
            <div class="champion-name">${champion.name}</div>
            <div class="champion-label">JUARA TOURNAMENT!</div>
        </div>
    `;
    
    updateTournamentStatus(`🎉 ${champion.name} adalah Juara Tournament! Selamat!`);
    showEventAnimation(`🏆 ${champion.name}<br>JUARA TOURNAMENT!`, 'goal');
}

// Komentator Commentary System
const commentatorLines = {
    matchStart: [
        "Selamat datang di pertandingan yang sangat dinanti! Kedua tim sudah siap di lapangan!",
        "Pertandingan dimulai! Atmosfer di stadion luar biasa hari ini!",
        "Wasit meniup peluit! Pertandingan resmi dimulai!",
        "Ini dia! Pertandingan besar hari ini dimulai! Kedua tim siap berperang!"
    ],
    goal: [
        "GOOOOLLLL! Sungguh spektakuler! Stadion meledak!",
        "MASUK! Gol yang luar biasa indah!",
        "GOOOOOLLL! Tidak bisa ditahan! Eksekusi sempurna!",
        "WOOW! Gol fantastis! Kiper tidak bisa berbuat apa-apa!"
    ],
    save: [
        "Penyelamatan gemilang dari kiper! Refleks luar biasa!",
        "Kiper tampil heroik! Bola berhasil ditepis!",
        "Wow! Kiper menunjukkan kualitasnya! Penyelamatan kelas dunia!",
        "Fantastis! Kiper membaca arah bola dengan sempurna!"
    ],
    miss: [
        "Ohhh! Peluang emas terbuang sia-sia!",
        "Tidak bisa dipercaya! Peluang bagus meleset!",
        "Sayang sekali! Seharusnya bisa masuk!",
        "Hampir! Sedikit lagi menjadi gol indah!"
    ],
    halftime: [
        "Turun minum! Mari kita lihat strategi babak kedua!",
        "Babak pertama selesai! Pertandingan sangat sengit!",
        "Half-time! Kedua tim akan melakukan evaluasi di ruang ganti!"
    ]
};

function getRandomComment(type) {
    const comments = commentatorLines[type];
    return comments[Math.floor(Math.random() * comments.length)];
}

function addTournamentLog(message, type = 'normal') {
    const logContainer = document.getElementById('tournamentLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'tournament-log-entry' + (type !== 'normal' ? ' ' + type : '');
    
    const timestamp = new Date().toLocaleTimeString('id-ID');
    logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    
    logContainer.appendChild(logEntry);
    
    if (tournamentData.autoScrollEnabled) {
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    tournamentData.matchLogs.push({ timestamp, message, type });
}

function toggleAutoScroll() {
    tournamentData.autoScrollEnabled = !tournamentData.autoScrollEnabled;
    const toggleBtn = document.getElementById('autoScrollToggle');
    
    if (tournamentData.autoScrollEnabled) {
        toggleBtn.classList.remove('disabled');
        toggleBtn.innerHTML = '🔽 Auto';
        const logContainer = document.getElementById('tournamentLog');
        logContainer.scrollTop = logContainer.scrollHeight;
    } else {
        toggleBtn.classList.add('disabled');
        toggleBtn.innerHTML = '⏸️ Manual';
    }
}

function addCommentary(message) {
    const logContainer = document.getElementById('tournamentLog');
    const commentEntry = document.createElement('div');
    commentEntry.className = 'tournament-log-entry commentary';
    
    const timestamp = new Date().toLocaleTimeString('id-ID');
    commentEntry.innerHTML = `<strong>[${timestamp}]</strong> 🎙️ <em>"${message}"</em>`;
    
    logContainer.appendChild(commentEntry);
    
    if (tournamentData.autoScrollEnabled) {
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

function updateTournamentStatus(message) {
    document.getElementById('tournamentStatus').textContent = message;
}

function backToMenuFromTournament() {
    if (tournamentData.isRunning) {
        if (confirm('Tournament masih berlangsung. Yakin ingin kembali ke menu?')) {
            tournamentData.isRunning = false;
            showScreen('mainMenu');
        }
    } else {
        showScreen('mainMenu');
    }
}

// Difficulty Controls
function changeDifficulty(team, delta) {
    const difficultyElement = document.getElementById('difficulty' + team);
    const barElement = document.getElementById('difficultyBar' + team);
    let currentDifficulty = parseInt(difficultyElement.textContent);
    
    currentDifficulty += delta;
    if (currentDifficulty < 1) currentDifficulty = 1;
    if (currentDifficulty > 7) currentDifficulty = 7;
    
    difficultyElement.textContent = currentDifficulty;
    const percentage = (currentDifficulty / 7) * 100;
    barElement.style.width = percentage + '%';
}

// Settings
function saveSettings() {
    const duration = document.getElementById('matchDuration').value;
    const speed = document.getElementById('simulationSpeed').value;
    const displayMode = document.getElementById('displayMode').value;
    
    localStorage.setItem('matchDuration', duration);
    localStorage.setItem('simulationSpeed', speed);
    localStorage.setItem('displayMode', displayMode);
    
    matchData.duration = parseInt(duration);
    matchData.speed = parseInt(speed);
    
    showScreen('mainMenu');
}

function loadSettings() {
    const duration = localStorage.getItem('matchDuration') || '90';
    const speed = localStorage.getItem('simulationSpeed') || '200';
    const displayMode = localStorage.getItem('displayMode') || 'dark';
    
    document.getElementById('matchDuration').value = duration;
    document.getElementById('simulationSpeed').value = speed;
    document.getElementById('displayMode').value = displayMode;
    
    matchData.duration = parseInt(duration);
    matchData.speed = parseInt(speed);
}

// Match Setup
function startMatch() {
    // Get team data
    matchData.teamA.name = document.getElementById('teamAName').value || 'Tim A';
    matchData.teamB.name = document.getElementById('teamBName').value || 'Tim B';
    matchData.teamA.difficulty = parseInt(document.getElementById('difficultyA').textContent);
    matchData.teamB.difficulty = parseInt(document.getElementById('difficultyB').textContent);
    matchData.teamA.score = 0;
    matchData.teamB.score = 0;
    matchData.currentMinute = 0;
    matchData.logs = [];
    matchData.stats = {
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0 }
    };
    
    // Update UI
    document.getElementById('matchTitle').textContent = `${matchData.teamA.name} vs ${matchData.teamB.name}`;
    document.getElementById('teamANameDisplay').textContent = matchData.teamA.name;
    document.getElementById('teamBNameDisplay').textContent = matchData.teamB.name;
    document.getElementById('scoreA').textContent = '0';
    document.getElementById('scoreB').textContent = '0';
    document.getElementById('matchTime').textContent = "0'";
    document.getElementById('matchLog').innerHTML = '';
    
    showScreen('matchScreen');
    runMatch();
}

// Match Simulation
function runMatch() {
    matchData.isRunning = true;
    addLog(0, 'Pertandingan dimulai! Wasit meniup peluit pembuka.', 'important');
    addMatchCommentary(getRandomComment('matchStart'));
    
    matchData.interval = setInterval(() => {
        matchData.currentMinute++;
        document.getElementById('matchTime').textContent = matchData.currentMinute + "'";
        
        // Simulate events
        simulateMinute();
        
        // Check if match ended
        if (matchData.currentMinute >= matchData.duration) {
            endMatch();
        }
    }, matchData.speed);
}

function simulateMinute() {
    const minute = matchData.currentMinute;
    
    // Possession battle (subtle changes)
    updatePossession();
    
    // Random events based on difficulty
    const eventChance = Math.random() * 100;
    
    if (eventChance < 15) {
        // Attack event
        simulateAttack();
    } else if (eventChance < 25) {
        // Pass sequence
        simulatePassSequence();
    } else if (eventChance < 28) {
        // Foul
        simulateFoul();
    } else if (eventChance < 30) {
        // Corner
        simulateCorner();
    }
    
    // Key moments
    if (minute === Math.floor(matchData.duration / 2)) {
        addLog(minute, 'Turun minum! Babak pertama selesai.', 'important');
        addMatchCommentary(getRandomComment('halftime'));
        addLiveEvent('⏸️ Half Time');
    } else if (minute === Math.floor(matchData.duration / 2) + 1) {
        addLog(minute, 'Babak kedua dimulai!', 'important');
        addLiveEvent('▶️ Babak 2 dimulai');
    }
}

function simulateAttack() {
    const attackingTeam = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const defendingTeam = attackingTeam === 'teamA' ? 'teamB' : 'teamA';
    const attackTeamName = matchData[attackingTeam].name;
    const defendTeamName = matchData[defendingTeam].name;
    const difficulty = matchData[attackingTeam].difficulty;
    
    // Calculate shot chance based on difficulty (1-7)
    const shotAccuracy = 20 + (difficulty * 8); // 28% to 76%
    const shootChance = Math.random() * 100;
    
    matchData.stats[attackingTeam].shots++;
    
    if (shootChance < shotAccuracy) {
        // Shot on target
        matchData.stats[attackingTeam].shotsOnTarget++;
        
        // Calculate goal chance (higher difficulty = more goals)
        const goalChance = 15 + (difficulty * 5); // 20% to 50% of shots on target
        const goalRoll = Math.random() * 100;
        
        if (goalRoll < goalChance) {
            // GOAL!
            matchData[attackingTeam].score++;
            const scorer = generatePlayerName();
            addLog(matchData.currentMinute, `⚽ GOOOL! ${attackTeamName} mencetak gol! Dicetak oleh ${scorer}! ${matchData.teamA.name} ${matchData.teamA.score} - ${matchData.teamB.score} ${matchData.teamB.name}`, 'goal');
            addMatchCommentary(getRandomComment('goal'));
            updateScore();
            addLiveEvent(`⚽ GOOL! ${scorer} (${attackTeamName})`, 'goal');
            showEventAnimation(`⚽ GOOOL!<br>${scorer}`, 'goal');
        } else {
            const saveType = ['refleks cemerlang', 'menangkap bola dengan aman', 'memukul bola ke pojok', 'menepis dengan sempurna'];
            const saveMessage = saveType[Math.floor(Math.random() * saveType.length)];
            addLog(matchData.currentMinute, `Tembakan keras ke arah gawang ${defendTeamName}! Kiper melakukan ${saveMessage}.`);
            addMatchCommentary(getRandomComment('save'));
            addLiveEvent(`Kiper ${defendTeamName} ${saveMessage}`);
        }
    } else {
        // Shot off target
        const missType = ['melebar', 'melambung tinggi', 'mengenai tiang gawang', 'di-blok pemain bertahan'];
        const miss = missType[Math.floor(Math.random() * missType.length)];
        addLog(matchData.currentMinute, `Peluang ${attackTeamName}! Tembakan ${miss}.`);
        if (miss === 'mengenai tiang gawang') {
            addMatchCommentary(getRandomComment('miss'));
            addLiveEvent(`⚠️ ${attackTeamName} mengenai tiang!`);
        }
    }
}

function simulatePassSequence() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const passCount = Math.floor(Math.random() * 10) + 5;
    
    matchData.stats[team].passes += passCount;
    addLog(matchData.currentMinute, `${teamName} membangun serangan dengan ${passCount} operan beruntun.`);
}

function simulateFoul() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    const playerName = generatePlayerName();
    
    matchData.stats[team].fouls++;
    
    const cardChance = Math.random() * 100;
    if (cardChance < 20) {
        matchData.stats[team].yellowCards++;
        addLog(matchData.currentMinute, `🟨 Kartu kuning untuk ${playerName} (${teamName}) karena pelanggaran keras!`, 'warning');
        addLiveEvent(`🟨 Kartu kuning: ${playerName} (${teamName})`, 'warning');
    } else {
        addLog(matchData.currentMinute, `Pelanggaran oleh ${playerName} (${teamName}). Tendangan bebas diberikan.`);
    }
}

function simulateCorner() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    
    matchData.stats[team].corners++;
    addLog(matchData.currentMinute, `Tendangan pojok untuk ${teamName}.`);
    addLiveEvent(`⚽ Tendangan pojok ${teamName}`);
    
    // Corner can lead to goal
    if (Math.random() < 0.15) {
        setTimeout(() => simulateAttack(), 100);
    }
}

function updatePossession() {
    const diffA = matchData.teamA.difficulty;
    const diffB = matchData.teamB.difficulty;
    const totalDiff = diffA + diffB;
    
    // Calculate possession based on difficulty ratio
    const possessionA = Math.floor((diffA / totalDiff) * 100);
    const possessionB = 100 - possessionA;
    
    // Add some randomness
    const randomFactor = Math.floor(Math.random() * 10) - 5;
    matchData.stats.teamA.possession = Math.max(30, Math.min(70, possessionA + randomFactor));
    matchData.stats.teamB.possession = 100 - matchData.stats.teamA.possession;
}

function generatePlayerName() {
    const firstNames = ['Carlos', 'Marco', 'Diego', 'Lucas', 'Andre', 'Paulo', 'Ricardo', 'Fernando', 'Miguel', 'Rafael'];
    const lastNames = ['Silva', 'Santos', 'Rodriguez', 'Martinez', 'Garcia', 'Lopez', 'Gonzalez', 'Fernandez', 'Perez', 'Torres'];
    return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
}

function updateScore() {
    document.getElementById('scoreA').textContent = matchData.teamA.score;
    document.getElementById('scoreB').textContent = matchData.teamB.score;
}

function endMatch() {
    clearInterval(matchData.interval);
    matchData.isRunning = false;
    
    const scoreA = matchData.teamA.score;
    const scoreB = matchData.teamB.score;
    let result = '';
    
    if (scoreA > scoreB) {
        result = `${matchData.teamA.name} menang!`;
    } else if (scoreB > scoreA) {
        result = `${matchData.teamB.name} menang!`;
    } else {
        result = 'Pertandingan berakhir imbang!';
    }
    
    addLog(matchData.currentMinute, `⏱️ Pertandingan selesai! ${result} Skor akhir: ${matchData.teamA.name} ${scoreA} - ${scoreB} ${matchData.teamB.name}`, 'important');
    updateStats();
}

function addLog(minute, message, type = 'normal') {
    const logContainer = document.getElementById('matchLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry' + (type !== 'normal' ? ' ' + type : '');
    logEntry.innerHTML = `<span class="log-time">${minute}'</span>${message}`;
    
    logContainer.appendChild(logEntry);
    
    if (matchData.autoScrollEnabled) {
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    matchData.logs.push({ minute, message, type });
}

function addMatchCommentary(message) {
    const logContainer = document.getElementById('matchLog');
    const commentEntry = document.createElement('div');
    commentEntry.className = 'log-entry commentary';
    commentEntry.innerHTML = `<span class="log-time">🎙️</span><em>"${message}"</em>`;
    
    logContainer.appendChild(commentEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function toggleStats() {
    const statsPanel = document.getElementById('statsPanel');
    statsPanel.classList.toggle('active');
    
    if (statsPanel.classList.contains('active')) {
        updateStats();
    }
}

function updateStats() {
    const statsContent = document.getElementById('statsContent');
    const stats = matchData.stats;
    
    statsContent.innerHTML = `
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Penguasaan Bola</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${stats.teamA.possession}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.possession}% - ${stats.teamB.possession}%</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${stats.teamB.possession}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Total Tembakan</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.shots, stats.teamB.shots, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.shots} - ${stats.teamB.shots}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.shots, stats.teamB.shots, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Tembakan Tepat Sasaran</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.shotsOnTarget, stats.teamB.shotsOnTarget, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.shotsOnTarget} - ${stats.teamB.shotsOnTarget}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.shotsOnTarget, stats.teamB.shotsOnTarget, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Operan Sukses</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.passes, stats.teamB.passes, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.passes} - ${stats.teamB.passes}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.passes, stats.teamB.passes, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Tendangan Pojok</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.corners, stats.teamB.corners, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.corners} - ${stats.teamB.corners}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.corners, stats.teamB.corners, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Pelanggaran</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.fouls, stats.teamB.fouls, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.fouls} - ${stats.teamB.fouls}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.fouls, stats.teamB.fouls, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Kartu Kuning</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.yellowCards, stats.teamB.yellowCards, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.yellowCards} - ${stats.teamB.yellowCards}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.yellowCards, stats.teamB.yellowCards, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Kartu Merah</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.redCards, stats.teamB.redCards, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.redCards} - ${stats.teamB.redCards}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.redCards, stats.teamB.redCards, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Offside</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.offsides, stats.teamB.offsides, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.offsides} - ${stats.teamB.offsides}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.offsides, stats.teamB.offsides, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Assist</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.assists, stats.teamB.assists, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.assists} - ${stats.teamB.assists}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.assists, stats.teamB.assists, 'B')}%"></div>
                </div>
            </div>
        </div>
    `;
}

function getStatPercentage(valueA, valueB, team) {
    const total = valueA + valueB;
    if (total === 0) return 0;
    
    if (team === 'A') {
        return Math.floor((valueA / total) * 100);
    } else {
        return Math.floor((valueB / total) * 100);
    }
}

function backToMenu() {
    if (matchData.isRunning) {
        if (confirm('Pertandingan masih berlangsung. Yakin ingin kembali ke menu?')) {
            clearInterval(matchData.interval);
            matchData.isRunning = false;
            showScreen('mainMenu');
        }
    } else {
        showScreen('mainMenu');
    }
}

function toggleMatchAutoScroll() {
    matchData.autoScrollEnabled = !matchData.autoScrollEnabled;
    const toggleBtn = document.getElementById('matchAutoScrollToggle');
    
    if (matchData.autoScrollEnabled) {
        toggleBtn.classList.remove('disabled');
        toggleBtn.innerHTML = '🔽 Auto';
        const logContainer = document.getElementById('matchLog');
        if (logContainer) {
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    } else {
        toggleBtn.classList.add('disabled');
        toggleBtn.innerHTML = '⏸️ Manual';
    }
}

function clearMatchLog() {
    if (confirm('Yakin ingin menghapus semua log pertandingan?')) {
        document.getElementById('matchLog').innerHTML = '';
        matchData.logs = [];
    }
}

function downloadMatchLog() {
    if (matchData.logs.length === 0) {
        alert('Tidak ada log untuk didownload!');
        return;
    }
    
    let logText = `Log Pertandingan: ${matchData.teamA.name} vs ${matchData.teamB.name}\n`;
    logText += `Skor Akhir: ${matchData.teamA.score} - ${matchData.teamB.score}\n`;
    logText += `${'='.repeat(60)}\n\n`;
    
    matchData.logs.forEach(log => {
        logText += `[${log.minute}'] ${log.message}\n`;
    });
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Match_Log_${matchData.teamA.name}_vs_${matchData.teamB.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearTournamentLog() {
    if (confirm('Yakin ingin menghapus semua log tournament?')) {
        document.getElementById('tournamentLog').innerHTML = '';
        tournamentData.matchLogs = [];
    }
}

function downloadTournamentLog() {
    if (tournamentData.matchLogs.length === 0) {
        alert('Tidak ada log untuk didownload!');
        return;
    }
    
    let logText = `Log Tournament - ${tournamentData.teamCount} Tim\n`;
    logText += `${'='.repeat(60)}\n\n`;
    
    tournamentData.matchLogs.forEach(log => {
        logText += `[${log.timestamp}] ${log.message}\n`;
    });
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tournament_Log_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleTournamentStatsCollapse() {
    tournamentData.statsCollapsed = !tournamentData.statsCollapsed;
    const statsDiv = document.getElementById('tournamentStats');
    const collapseBtn = document.getElementById('statsCollapseBtn');
    
    if (tournamentData.statsCollapsed) {
        statsDiv.classList.add('collapsed');
        collapseBtn.classList.remove('rotated');
        collapseBtn.innerHTML = '▼';
    } else {
        statsDiv.classList.remove('collapsed');
        collapseBtn.classList.add('rotated');
        collapseBtn.innerHTML = '▲';
    }
}

function showEventAnimation(message, type = 'goal') {
    const container = document.getElementById('eventAnimations');
    if (!container) return;
    
    const animation = document.createElement('div');
    animation.className = `event-animation ${type}`;
    animation.innerHTML = message;
    
    const randomOffset = (Math.random() - 0.5) * 20;
    animation.style.top = `${30 + randomOffset}%`;
    
    container.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
    }, 3000);
}
