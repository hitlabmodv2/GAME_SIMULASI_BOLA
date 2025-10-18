// Global Variables
let currentScreen = 'mainMenu';
let matchData = {
    teamA: { name: 'Barcelona FC', difficulty: 5, score: 0 },
    teamB: { name: 'Real Madrid', difficulty: 5, score: 0 },
    currentMinute: 0,
    duration: 90,
    speed: 200,
    logs: [],
    stats: {
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 }
    },
    isRunning: false,
    interval: null
};

let tournamentData = {
    teams: [],
    quarterFinals: [],
    semiFinals: [],
    final: null,
    champion: null,
    isRunning: false,
    currentRound: 'quarter',
    matchQueue: [],
    currentMatchIndex: 0,
    matchLogs: [],
    setupMode: 'manual',
    autoPlayEnabled: true
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
    { name: 'Ajax Amsterdam', difficulty: 4 }
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
    const shuffled = [...predefinedTeams].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= 8; i++) {
        const team = shuffled[i - 1];
        document.getElementById('tournamentTeam' + i).value = team.name;
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
    tournamentData.teams = [];
    
    for (let i = 1; i <= 8; i++) {
        const teamName = document.getElementById('tournamentTeam' + i).value || 'Tim ' + i;
        const difficulty = parseInt(document.getElementById('tournamentDiff' + i).textContent);
        tournamentData.teams.push({ name: teamName, difficulty: difficulty });
    }
    
    tournamentData.quarterFinals = [];
    tournamentData.semiFinals = [];
    tournamentData.final = null;
    tournamentData.champion = null;
    tournamentData.currentRound = 'quarter';
    tournamentData.matchQueue = [];
    tournamentData.currentMatchIndex = 0;
    tournamentData.matchLogs = [];
    tournamentData.isRunning = true;
    
    setupQuarterFinals();
    showScreen('tournament');
    document.getElementById('tournamentRoundTitle').textContent = 'Babak 1: Quarter Finals & Semi Finals';
    addTournamentLog('🏆 Tournament dimulai! 8 tim siap berkompetisi untuk menjadi juara!', 'round-change');
    
    setTimeout(() => {
        playNextMatch();
    }, 2000);
}

function setupQuarterFinals() {
    tournamentData.quarterFinals = [
        { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[4], teamB: tournamentData.teams[5], scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.teams[6], teamB: tournamentData.teams[7], scoreA: null, scoreB: null, winner: null, status: 'pending' }
    ];
    
    tournamentData.matchQueue = [...tournamentData.quarterFinals];
    renderBracket();
}

function playNextMatch() {
    if (tournamentData.currentMatchIndex < tournamentData.matchQueue.length) {
        const match = tournamentData.matchQueue[tournamentData.currentMatchIndex];
        playTournamentMatch(match);
    } else {
        if (tournamentData.currentRound === 'quarter') {
            addTournamentLog('✅ Quarter Finals selesai! Mempersiapkan Semi Finals...', 'round-change');
            setTimeout(() => {
                setupSemiFinals();
                setTimeout(() => playNextMatch(), 2000);
            }, 2000);
        } else if (tournamentData.currentRound === 'semi') {
            addTournamentLog('🎯 Babak 1 selesai! Memulai Babak 2: Final!', 'round-change');
            document.getElementById('tournamentRoundTitle').textContent = 'Babak 2: Final';
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
    
    const roundName = tournamentData.currentRound === 'quarter' ? 'Quarter Final' : 
                      tournamentData.currentRound === 'semi' ? 'Semi Final' : 'Final';
    
    addTournamentLog(`⚽ ${roundName}: ${match.teamA.name} vs ${match.teamB.name} - Pertandingan dimulai!`, 'match-start');
    updateTournamentStatus(`Sedang berlangsung: ${match.teamA.name} vs ${match.teamB.name}`);
    
    document.getElementById('liveMatchDisplay').style.display = 'block';
    document.getElementById('liveTeamA').textContent = match.teamA.name;
    document.getElementById('liveTeamB').textContent = match.teamB.name;
    document.getElementById('liveScoreA').textContent = '0';
    document.getElementById('liveScoreB').textContent = '0';
    document.getElementById('liveMinute').textContent = "0'";
    document.getElementById('liveEvents').innerHTML = '';
    
    renderBracket();
    
    matchData.teamA = { name: match.teamA.name, difficulty: match.teamA.difficulty, score: 0 };
    matchData.teamB = { name: match.teamB.name, difficulty: match.teamB.difficulty, score: 0 };
    matchData.currentMinute = 0;
    matchData.logs = [];
    matchData.stats = {
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 }
    };
    
    simulateTournamentMatch(match);
}

function simulateTournamentMatch(match) {
    const duration = matchData.duration;
    const simulationSpeed = 100;
    
    const interval = setInterval(() => {
        matchData.currentMinute++;
        document.getElementById('liveMinute').textContent = matchData.currentMinute + "'";
        
        simulateMinute();
        
        document.getElementById('liveScoreA').textContent = matchData.teamA.score;
        document.getElementById('liveScoreB').textContent = matchData.teamB.score;
        
        if (matchData.currentMinute >= duration) {
            clearInterval(interval);
            finishTournamentMatch(match);
        }
    }, simulationSpeed);
}

function addLiveEvent(message, type = 'normal') {
    const liveEvents = document.getElementById('liveEvents');
    const eventDiv = document.createElement('div');
    eventDiv.className = 'live-event' + (type !== 'normal' ? ' ' + type : '');
    eventDiv.textContent = `${matchData.currentMinute}' - ${message}`;
    
    liveEvents.insertBefore(eventDiv, liveEvents.firstChild);
    
    if (liveEvents.children.length > 5) {
        liveEvents.removeChild(liveEvents.lastChild);
    }
}

function finishTournamentMatch(match) {
    match.scoreA = matchData.teamA.score;
    match.scoreB = matchData.teamB.score;
    
    if (match.scoreA > match.scoreB) {
        match.winner = match.teamA;
        addTournamentLog(`🎉 ${match.teamA.name} menang ${match.scoreA}-${match.scoreB} melawan ${match.teamB.name}!`, 'match-end');
    } else if (match.scoreB > match.scoreA) {
        match.winner = match.teamB;
        addTournamentLog(`🎉 ${match.teamB.name} menang ${match.scoreB}-${match.scoreA} melawan ${match.teamA.name}!`, 'match-end');
    } else {
        const penaltyWinner = Math.random() > 0.5 ? match.teamA : match.teamB;
        match.winner = penaltyWinner;
        addTournamentLog(`⚽ Imbang ${match.scoreA}-${match.scoreB}! ${penaltyWinner.name} menang adu penalti!`, 'match-end');
    }
    
    match.status = 'completed';
    tournamentData.currentMatchIndex++;
    
    document.getElementById('liveMatchDisplay').style.display = 'none';
    renderBracket();
    updateTournamentStatus(`Pertandingan selesai! ${match.winner.name} lolos ke babak berikutnya.`);
    
    setTimeout(() => {
        playNextMatch();
    }, 3000);
}

function setupSemiFinals() {
    tournamentData.semiFinals = [
        { teamA: tournamentData.quarterFinals[0].winner, teamB: tournamentData.quarterFinals[1].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' },
        { teamA: tournamentData.quarterFinals[2].winner, teamB: tournamentData.quarterFinals[3].winner, scoreA: null, scoreB: null, winner: null, status: 'pending' }
    ];
    
    tournamentData.currentRound = 'semi';
    tournamentData.matchQueue = [...tournamentData.semiFinals];
    tournamentData.currentMatchIndex = 0;
    
    addTournamentLog('🔥 Semi Finals dimulai! 4 tim tersisa berjuang untuk masuk Final!', 'round-change');
    renderBracket();
}

function setupFinal() {
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
    renderBracket();
}

function renderBracket() {
    const quarterFinalsDiv = document.getElementById('quarterFinals');
    const semiFinalsDiv = document.getElementById('semiFinals');
    const finalDiv = document.getElementById('final');
    
    quarterFinalsDiv.innerHTML = '';
    tournamentData.quarterFinals.forEach((match, index) => {
        quarterFinalsDiv.innerHTML += createMatchCard(match, `QF${index + 1}`);
    });
    
    semiFinalsDiv.innerHTML = '';
    tournamentData.semiFinals.forEach((match, index) => {
        semiFinalsDiv.innerHTML += createMatchCard(match, `SF${index + 1}`);
    });
    
    finalDiv.innerHTML = '';
    if (tournamentData.final) {
        finalDiv.innerHTML = createMatchCard(tournamentData.final, 'Final');
    }
}

function createMatchCard(match, matchId) {
    if (!match.teamA || !match.teamB) return '';
    
    const statusClass = match.status === 'playing' ? 'active' : match.status === 'completed' ? 'completed' : '';
    const teamAClass = match.winner && match.winner.name === match.teamA.name ? 'winner' : '';
    const teamBClass = match.winner && match.winner.name === match.teamB.name ? 'winner' : '';
    
    return `
        <div class="match-card ${statusClass}" id="${matchId}">
            <div class="match-team ${teamAClass}">
                <span class="match-team-name">${match.teamA.name}</span>
                <span class="match-team-score">${match.scoreA !== null ? match.scoreA : '-'}</span>
            </div>
            <div class="match-team ${teamBClass}">
                <span class="match-team-name">${match.teamB.name}</span>
                <span class="match-team-score">${match.scoreB !== null ? match.scoreB : '-'}</span>
            </div>
            <div class="match-status">
                ${match.status === 'playing' ? '⚽ Berlangsung' : match.status === 'completed' ? '✓ Selesai' : 'Menunggu'}
            </div>
        </div>
    `;
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
}

function addTournamentLog(message, type = 'normal') {
    const logContainer = document.getElementById('tournamentLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'tournament-log-entry' + (type !== 'normal' ? ' ' + type : '');
    
    const timestamp = new Date().toLocaleTimeString('id-ID');
    logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    tournamentData.matchLogs.push({ timestamp, message, type });
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
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0 }
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
    } else if (minute === Math.floor(matchData.duration / 2) + 1) {
        addLog(minute, 'Babak kedua dimulai!', 'important');
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
            updateScore();
            
            if (tournamentData.isRunning && document.getElementById('liveMatchDisplay').style.display === 'block') {
                addLiveEvent(`⚽ GOOL! ${scorer} (${attackTeamName})`, 'goal');
            }
        } else {
            const saveType = ['refleks cemerlang', 'menangkap bola dengan aman', 'memukul bola ke pojok', 'menepis dengan sempurna'];
            addLog(matchData.currentMinute, `Tembakan keras ke arah gawang ${defendTeamName}! Kiper melakukan ${saveType[Math.floor(Math.random() * saveType.length)]}.`);
        }
    } else {
        // Shot off target
        const missType = ['melebar', 'melambung tinggi', 'mengenai tiang gawang', 'di-blok pemain bertahan'];
        addLog(matchData.currentMinute, `Peluang ${attackTeamName}! Tembakan ${missType[Math.floor(Math.random() * missType.length)]}.`);
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
        
        if (tournamentData.isRunning && document.getElementById('liveMatchDisplay').style.display === 'block') {
            addLiveEvent(`🟨 Kartu kuning: ${playerName}`, 'warning');
        }
    } else {
        addLog(matchData.currentMinute, `Pelanggaran oleh ${playerName} (${teamName}). Tendangan bebas diberikan.`);
    }
}

function simulateCorner() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    
    matchData.stats[team].corners++;
    addLog(matchData.currentMinute, `Tendangan pojok untuk ${teamName}.`);
    
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
    logContainer.scrollTop = logContainer.scrollHeight;
    
    matchData.logs.push({ minute, message, type });
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
