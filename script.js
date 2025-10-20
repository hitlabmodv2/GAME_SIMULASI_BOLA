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
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 }
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
    statsCollapsed: true,
    randomizeHistory: []
};

const predefinedTeams = [
    { name: 'Manchester City', difficulty: 7, logo: 'team-logos/manchester-city.png', country: 'England' },
    { name: 'Real Madrid', difficulty: 7, logo: 'team-logos/real-madrid.png', country: 'Spain' },
    { name: 'Bayern Munich', difficulty: 7, logo: 'team-logos/bayern-munich.png', country: 'Germany' },
    { name: 'Liverpool FC', difficulty: 6, logo: 'team-logos/liverpool.png', country: 'England' },
    { name: 'Barcelona FC', difficulty: 6, logo: 'team-logos/barcelona.png', country: 'Spain' },
    { name: 'PSG', difficulty: 6, logo: 'team-logos/psg.png', country: 'France' },
    { name: 'Arsenal FC', difficulty: 6, logo: 'team-logos/arsenal.png', country: 'England' },
    { name: 'Inter Milan', difficulty: 6, logo: 'team-logos/inter-milan.png', country: 'Italy' },
    { name: 'Bayer Leverkusen', difficulty: 6, logo: 'team-logos/bayer-leverkusen.png', country: 'Germany' },
    { name: 'Manchester United', difficulty: 5, logo: 'team-logos/manchester-united.png', country: 'England' },
    { name: 'Chelsea FC', difficulty: 5, logo: 'team-logos/chelsea.png', country: 'England' },
    { name: 'Atletico Madrid', difficulty: 5, logo: 'team-logos/atletico-madrid.png', country: 'Spain' },
    { name: 'AC Milan', difficulty: 5, logo: 'team-logos/ac-milan.png', country: 'Italy' },
    { name: 'Juventus', difficulty: 5, logo: 'team-logos/juventus.png', country: 'Italy' },
    { name: 'Borussia Dortmund', difficulty: 5, logo: 'team-logos/borussia-dortmund.png', country: 'Germany' },
    { name: 'Napoli', difficulty: 5, logo: 'team-logos/napoli.png', country: 'Italy' },
    { name: 'Tottenham', difficulty: 5, logo: 'team-logos/tottenham.png', country: 'England' },
    { name: 'Newcastle United', difficulty: 5, logo: 'team-logos/newcastle-united.png', country: 'England' },
    { name: 'RB Leipzig', difficulty: 5, logo: 'team-logos/rb-leipzig.png', country: 'Germany' },
    { name: 'Benfica', difficulty: 5, logo: 'team-logos/benfica.png', country: 'Portugal' },
    { name: 'FC Porto', difficulty: 5, logo: 'team-logos/fc-porto.png', country: 'Portugal' },
    { name: 'Sporting CP', difficulty: 5, logo: 'team-logos/sporting-cp.png', country: 'Portugal' },
    { name: 'Ajax Amsterdam', difficulty: 4, logo: 'team-logos/ajax-amsterdam.png', country: 'Netherlands' },
    { name: 'AS Roma', difficulty: 4, logo: 'team-logos/as-roma.png', country: 'Italy' },
    { name: 'Sevilla FC', difficulty: 4, logo: 'team-logos/sevilla.png', country: 'Spain' },
    { name: 'Valencia CF', difficulty: 4, logo: 'team-logos/valencia.png', country: 'Spain' },
    { name: 'West Ham United', difficulty: 4, logo: 'team-logos/west-ham-united.png', country: 'England' },
    { name: 'Leicester City', difficulty: 4, logo: 'team-logos/leicester-city.png', country: 'England' },
    { name: 'Olympique Lyon', difficulty: 4, logo: 'team-logos/olympique-lyon.png', country: 'France' },
    { name: 'Marseille', difficulty: 4, logo: 'team-logos/marseille.png', country: 'France' },
    { name: 'Monaco', difficulty: 4, logo: 'team-logos/monaco.png', country: 'France' },
    { name: 'Shakhtar Donetsk', difficulty: 3, logo: 'team-logos/shakhtar-donetsk.png', country: 'Ukraine' }
];

// Helper function untuk mendapatkan logo tim
function getTeamLogo(teamName) {
    const teamInfo = teamsInfo[teamName];
    return teamInfo ? teamInfo.logo : '';
}

// Helper function untuk mendapatkan country tim
function getTeamCountry(teamName) {
    const teamInfo = teamsInfo[teamName];
    return teamInfo ? teamInfo.country : '';
}

// Helper function untuk mendapatkan warna tim
function getTeamColors(teamName) {
    const teamInfo = teamsInfo[teamName];
    return teamInfo ? teamInfo.colors : { primary: '#333', secondary: '#666' };
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadSettings();
    populateTeamDropdowns();
    initScrollToTop();
    initializeTeamLogos();
});

// Initialize team logos on page load
function initializeTeamLogos() {
    const teamCountSelect = document.getElementById('teamCount');
    const maxTeams = teamCountSelect ? parseInt(teamCountSelect.value) : 8;
    
    for (let i = 1; i <= maxTeams; i++) {
        updateTeamLogo(i);
    }
}

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function populateTeamDropdowns() {
    // Populate all dropdowns with team options including country info
    for (let i = 1; i <= 8; i++) {
        const selectElement = document.getElementById('tournamentTeamSelect' + i);
        if (selectElement && selectElement.options.length === 1) {
            predefinedTeams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.name;
                option.dataset.difficulty = team.difficulty;
                option.dataset.logo = team.logo;
                option.dataset.country = team.country;
                option.textContent = `${team.name} - ${team.country} (${getDifficultyLabel(team.difficulty)})`;
                selectElement.appendChild(option);
            });
        }
    }
}

// Function untuk menampilkan logo tim di match header
function displayTeamLogos() {
    const teamALogo = getTeamLogo(matchData.teamA.name);
    const teamBLogo = getTeamLogo(matchData.teamB.name);
    
    if (teamALogo) {
        const teamADisplay = document.getElementById('teamANameDisplay');
        if (teamADisplay && !teamADisplay.querySelector('img')) {
            const logoImg = document.createElement('img');
            logoImg.src = teamALogo;
            logoImg.alt = matchData.teamA.name;
            logoImg.style.width = '30px';
            logoImg.style.height = '30px';
            logoImg.style.marginRight = '8px';
            logoImg.style.verticalAlign = 'middle';
            teamADisplay.insertBefore(logoImg, teamADisplay.firstChild);
        }
    }
    
    if (teamBLogo) {
        const teamBDisplay = document.getElementById('teamBNameDisplay');
        if (teamBDisplay && !teamBDisplay.querySelector('img')) {
            const logoImg = document.createElement('img');
            logoImg.src = teamBLogo;
            logoImg.alt = matchData.teamB.name;
            logoImg.style.width = '30px';
            logoImg.style.height = '30px';
            logoImg.style.marginLeft = '8px';
            logoImg.style.verticalAlign = 'middle';
            teamBDisplay.appendChild(logoImg);
        }
    }
}

// Function untuk menampilkan skuad dan formasi tim
function displayTeamSquads() {
    const teamASquad = getFullSquad(matchData.teamA.name);
    const teamBSquad = getFullSquad(matchData.teamB.name);
    
    let squadInfo = '<div style="margin: 10px 0; padding: 10px; background: var(--card-bg); border-radius: 8px;">';
    squadInfo += '<h4 style="margin-bottom: 10px;">📋 Formasi & Skuad</h4>';
    
    if (teamASquad) {
        squadInfo += `<div style="margin: 5px 0;"><strong>${matchData.teamA.name}:</strong> Formasi ${teamASquad.formation} | ${teamASquad.totalPlayers} Pemain</div>`;
    }
    
    if (teamBSquad) {
        squadInfo += `<div style="margin: 5px 0;"><strong>${matchData.teamB.name}:</strong> Formasi ${teamBSquad.formation} | ${teamBSquad.totalPlayers} Pemain</div>`;
    }
    
    squadInfo += '</div>';
    
    const matchLog = document.getElementById('matchLog');
    if (matchLog) {
        matchLog.innerHTML = squadInfo + matchLog.innerHTML;
    }
}

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
    // ALWAYS clear animations when changing screens
    clearEventAnimations();
    
    // Hide eventAnimations container on menu screen, show on other screens
    const eventAnimationsContainer = document.getElementById('eventAnimations');
    if (eventAnimationsContainer) {
        if (screenName === 'mainMenu' || screenName === 'settings') {
            eventAnimationsContainer.style.display = 'none';
        } else {
            eventAnimationsContainer.style.display = 'block';
        }
    }
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName).classList.add('active');
    currentScreen = screenName;
}

function getDifficultyLabel(level) {
    const labels = {
        1: 'Sangat Lemah',
        2: 'Lemah',
        3: 'Cukup Lemah',
        4: 'Sedang',
        5: 'Cukup Kuat',
        6: 'Kuat',
        7: 'Sangat Kuat'
    };
    return labels[level] || 'Sedang';
}

function updateTeamInputs() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const teamsGrid = document.getElementById('teamsGrid');
    teamsGrid.innerHTML = '';
    
    // Generate team options for dropdown
    let teamOptions = '<option value="">-- Pilih Tim atau Ketik Manual --</option>';
    predefinedTeams.forEach(team => {
        teamOptions += `<option value="${team.name}" data-difficulty="${team.difficulty}">${team.name} (${getDifficultyLabel(team.difficulty)})</option>`;
    });
    
    for (let i = 1; i <= teamCount; i++) {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'tournament-team-input';
        teamDiv.innerHTML = `
            <h3>Tim ${i}</h3>
            <div id="teamLogo${i}" class="team-logo-display" style="width: 60px; height: 60px; margin: 10px auto; display: none; justify-content: center; align-items: center; border-radius: 50%; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.3); background: rgba(255,255,255,0.05);">
                <img id="teamLogoImg${i}" src="" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <select id="tournamentTeamSelect${i}" class="team-select" onchange="selectPredefinedTeam(${i})">
                ${teamOptions}
            </select>
            <input type="text" id="tournamentTeam${i}" placeholder="Atau ketik nama tim manual" maxlength="20" value="" oninput="updateTeamLogo(${i})">
            <div class="difficulty-selector">
                <label style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 5px;">Tingkat Kesulitan:</label>
                <div class="difficulty-slider-container">
                    <input type="range" id="tournamentSlider${i}" class="difficulty-slider" min="1" max="7" value="5" oninput="updateTournamentSlider(${i})">
                    <div class="difficulty-value" id="tournamentDiff${i}">5</div>
                </div>
                <div class="difficulty-label" id="tournamentDiffLabel${i}">Cukup Kuat</div>
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
    
    // Initialize logos after team inputs are created
    setTimeout(() => {
        initializeTeamLogos();
    }, 100);
}

function selectPredefinedTeam(teamNum) {
    const selectElement = document.getElementById('tournamentTeamSelect' + teamNum);
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    if (selectedOption.value) {
        // Set team name
        document.getElementById('tournamentTeam' + teamNum).value = selectedOption.value;
        
        // Set difficulty
        const difficulty = parseInt(selectedOption.dataset.difficulty);
        const sliderElement = document.getElementById('tournamentSlider' + teamNum);
        if (sliderElement) {
            sliderElement.value = difficulty;
            updateTournamentSlider(teamNum);
        }
        
        // Update logo
        updateTeamLogo(teamNum);
    }
}

function updateTeamLogo(teamNum) {
    const teamInput = document.getElementById('tournamentTeam' + teamNum);
    const logoDisplay = document.getElementById('teamLogo' + teamNum);
    const logoImg = document.getElementById('teamLogoImg' + teamNum);
    
    if (!teamInput || !logoDisplay || !logoImg) {
        return;
    }
    
    const teamName = teamInput.value.trim();
    
    if (teamName) {
        const logo = getTeamLogo(teamName);
        if (logo) {
            logoImg.src = logo;
            logoImg.alt = teamName;
            logoDisplay.style.display = 'flex';
        } else {
            logoDisplay.style.display = 'none';
        }
    } else {
        logoDisplay.style.display = 'none';
    }
}

function updateTournamentSlider(teamNum) {
    const sliderElement = document.getElementById('tournamentSlider' + teamNum);
    const difficultyElement = document.getElementById('tournamentDiff' + teamNum);
    const difficultyLabelElement = document.getElementById('tournamentDiffLabel' + teamNum);
    const barElement = document.getElementById('tournamentDiffBar' + teamNum);
    
    const difficulty = parseInt(sliderElement.value);
    difficultyElement.textContent = difficulty;
    
    if (difficultyLabelElement) {
        difficultyLabelElement.textContent = getDifficultyLabel(difficulty);
    }
    
    const percentage = (difficulty / 7) * 100;
    barElement.style.width = percentage + '%';
}

function randomizeTeams() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const availableTeams = [...predefinedTeams];
    const selectedTeams = [];
    
    for (let i = 0; i < teamCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableTeams.length);
        selectedTeams.push(availableTeams[randomIndex]);
        availableTeams.splice(randomIndex, 1);
    }
    
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const historyEntry = {
        timestamp: timestamp,
        teams: []
    };
    
    for (let i = 1; i <= teamCount; i++) {
        const team = selectedTeams[i - 1];
        const inputElement = document.getElementById('tournamentTeam' + i);
        const sliderElement = document.getElementById('tournamentSlider' + i);
        const diffElement = document.getElementById('tournamentDiff' + i);
        const diffBarElement = document.getElementById('tournamentDiffBar' + i);
        const diffLabelElement = document.getElementById('tournamentDiffLabel' + i);
        
        if (inputElement) inputElement.value = team.name;
        if (sliderElement) sliderElement.value = team.difficulty;
        if (diffElement) diffElement.textContent = team.difficulty;
        if (diffLabelElement) diffLabelElement.textContent = getDifficultyLabel(team.difficulty);
        if (diffBarElement) {
            const percentage = (team.difficulty / 7) * 100;
            diffBarElement.style.width = percentage + '%';
        }
        
        historyEntry.teams.push({
            position: i,
            name: team.name,
            difficulty: team.difficulty
        });
        
        const selectElement = document.getElementById('tournamentTeamSelect' + i);
        if (selectElement) selectElement.value = '';
    }
    
    tournamentData.randomizeHistory.push(historyEntry);
    displayRandomizeHistory();
    
    showEventAnimation('🎲 Tim berhasil di-random dengan tim real!', 'success');
}

function updateRealtimeData() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const currentMode = tournamentData.setupMode;
    let updatedCount = 0;
    const changelog = [];
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const timestamp = currentDate.toLocaleString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const realtimePerformanceData = {
        'Manchester City': { difficulty: 7, reason: 'Dominan Premier League & Champions League' },
        'Real Madrid': { difficulty: 7, reason: 'Juara La Liga & performa konsisten' },
        'Bayern Munich': { difficulty: 7, reason: 'Dominan Bundesliga' },
        'Liverpool FC': { difficulty: 6, reason: 'Performa kuat Premier League' },
        'Barcelona FC': { difficulty: 6, reason: 'Rebuild berhasil, performa membaik' },
        'PSG': { difficulty: 6, reason: 'Dominan Ligue 1' },
        'Arsenal FC': { difficulty: 6, reason: 'Konsisten di top 3 Premier League' },
        'Inter Milan': { difficulty: 6, reason: 'Juara Serie A, performa solid' },
        'Bayer Leverkusen': { difficulty: 6, reason: 'Performa impresif Bundesliga' },
        'Manchester United': { difficulty: 5, reason: 'Inkonsisten, rebuild masih berlanjut' },
        'Chelsea FC': { difficulty: 5, reason: 'Squad muda, performa naik turun' },
        'Atletico Madrid': { difficulty: 5, reason: 'Solid tapi tidak dominan' },
        'AC Milan': { difficulty: 5, reason: 'Kompetitif Serie A' },
        'Juventus': { difficulty: 5, reason: 'Masa transisi' },
        'Borussia Dortmund': { difficulty: 5, reason: 'Kompetitif Bundesliga' },
        'Napoli': { difficulty: 5, reason: 'Performa turun setelah juara' },
        'Tottenham': { difficulty: 5, reason: 'Performa membaik di Premier League' },
        'Newcastle United': { difficulty: 5, reason: 'Investasi besar, squad kuat' },
        'RB Leipzig': { difficulty: 5, reason: 'Konsisten Bundesliga' },
        'Benfica': { difficulty: 5, reason: 'Dominan Liga Portugal' },
        'FC Porto': { difficulty: 5, reason: 'Kuat di Portugal' },
        'Sporting CP': { difficulty: 5, reason: 'Kompetitif Liga Portugal' },
        'Ajax Amsterdam': { difficulty: 4, reason: 'Kehilangan pemain kunci' },
        'AS Roma': { difficulty: 4, reason: 'Mid-table Serie A' },
        'Sevilla FC': { difficulty: 4, reason: 'Performa menurun' },
        'Valencia CF': { difficulty: 4, reason: 'Berjuang di mid-table' },
        'West Ham United': { difficulty: 4, reason: 'Inkonsisten' },
        'Leicester City': { difficulty: 4, reason: 'Berjuang liga menengah' },
        'Olympique Lyon': { difficulty: 4, reason: 'Mid-table Ligue 1' },
        'Marseille': { difficulty: 4, reason: 'Kompetitif tapi tidak stabil' },
        'Monaco': { difficulty: 4, reason: 'Developing young talents' },
        'Shakhtar Donetsk': { difficulty: 3, reason: 'Terdampak kondisi negara' }
    };
    
    if (currentMode === 'manual') {
        for (let i = 1; i <= teamCount; i++) {
            const inputElement = document.getElementById('tournamentTeam' + i);
            const teamName = inputElement ? inputElement.value : '';
            
            if (teamName && realtimePerformanceData[teamName]) {
                const newData = realtimePerformanceData[teamName];
                const sliderElement = document.getElementById('tournamentSlider' + i);
                const diffElement = document.getElementById('tournamentDiff' + i);
                const oldDifficulty = diffElement ? parseInt(diffElement.textContent) : 0;
                const diffBarElement = document.getElementById('tournamentDiffBar' + i);
                const diffLabelElement = document.getElementById('tournamentDiffLabel' + i);
                
                if (sliderElement) sliderElement.value = newData.difficulty;
                if (diffElement) diffElement.textContent = newData.difficulty;
                if (diffLabelElement) diffLabelElement.textContent = getDifficultyLabel(newData.difficulty);
                if (diffBarElement) {
                    const percentage = (newData.difficulty / 7) * 100;
                    diffBarElement.style.width = percentage + '%';
                }
                
                changelog.push({
                    team: teamName,
                    oldLevel: oldDifficulty,
                    newLevel: newData.difficulty,
                    reason: newData.reason,
                    timestamp: timestamp
                });
                
                updatedCount++;
            }
        }
    } else {
        autoGenerateTeams();
        
        for (let i = 1; i <= teamCount; i++) {
            const inputElement = document.getElementById('tournamentTeam' + i);
            const teamName = inputElement ? inputElement.value : '';
            
            if (teamName && realtimePerformanceData[teamName]) {
                const newData = realtimePerformanceData[teamName];
                changelog.push({
                    team: teamName,
                    oldLevel: 0,
                    newLevel: newData.difficulty,
                    reason: newData.reason,
                    timestamp: timestamp
                });
            }
        }
        updatedCount = teamCount;
    }
    
    if (changelog.length > 0) {
        displayChangelog(changelog);
    }
    
    if (updatedCount > 0) {
        showEventAnimation(`🔄 Data realtime berhasil diupdate! ${updatedCount} tim diperbarui (${currentMonth}/${currentYear})`, 'success');
    } else {
        showEventAnimation('ℹ️ Gunakan tim dari database untuk update data realtime!', 'info');
    }
}

function displayChangelog(changelog) {
    const container = document.getElementById('changelogContainer');
    const content = document.getElementById('changelogContent');
    
    if (!container || !content) return;
    
    content.innerHTML = '';
    
    changelog.forEach(change => {
        const levelDiff = change.newLevel - change.oldLevel;
        let changeType = 'level-stable';
        let icon = '📊';
        
        if (levelDiff > 0) {
            changeType = 'level-up';
            icon = '📈';
        } else if (levelDiff < 0) {
            changeType = 'level-down';
            icon = '📉';
        }
        
        const changeItem = document.createElement('div');
        changeItem.className = `changelog-item ${changeType}`;
        
        let levelChangeHTML = '';
        if (change.oldLevel > 0) {
            levelChangeHTML = `
                <div class="changelog-level-change">
                    <span class="level-badge old-level">Level ${change.oldLevel}</span>
                    <span class="level-arrow">→</span>
                    <span class="level-badge new-level">Level ${change.newLevel}</span>
                </div>
            `;
        } else {
            levelChangeHTML = `
                <div class="changelog-level-change">
                    <span class="level-badge new-level">Level ${change.newLevel}</span>
                </div>
            `;
        }
        
        changeItem.innerHTML = `
            <div class="changelog-icon">${icon}</div>
            <div class="changelog-details">
                <div class="changelog-team-name">${change.team}</div>
                ${levelChangeHTML}
                <div class="changelog-reason">💬 ${change.reason}</div>
                <span class="changelog-timestamp">⏰ ${change.timestamp}</span>
            </div>
        `;
        
        content.appendChild(changeItem);
    });
    
    container.style.display = 'block';
}

function closeChangelog() {
    const container = document.getElementById('changelogContainer');
    if (container) {
        container.style.display = 'none';
    }
}

function displayRandomizeHistory() {
    const container = document.getElementById('randomizeHistoryContainer');
    const content = document.getElementById('randomizeHistoryContent');
    
    if (!container || !content) return;
    
    content.innerHTML = '';
    
    if (tournamentData.randomizeHistory.length === 0) {
        content.innerHTML = '<p class="changelog-empty">Belum ada riwayat. Klik "Random Tim Real" untuk memilih tim secara acak.</p>';
        return;
    }
    
    const historyToShow = [...tournamentData.randomizeHistory].reverse();
    
    historyToShow.forEach((entry, index) => {
        const historySection = document.createElement('div');
        historySection.className = 'randomize-history-section';
        historySection.style.marginBottom = '20px';
        historySection.style.paddingBottom = '15px';
        historySection.style.borderBottom = index < historyToShow.length - 1 ? '1px solid var(--border-color)' : 'none';
        
        const headerDiv = document.createElement('div');
        headerDiv.style.marginBottom = '10px';
        headerDiv.style.fontWeight = 'bold';
        headerDiv.style.color = 'var(--primary-color)';
        headerDiv.innerHTML = `🎲 Random #${tournamentData.randomizeHistory.length - index} - ⏰ ${entry.timestamp}`;
        historySection.appendChild(headerDiv);
        
        entry.teams.forEach(team => {
            const teamItem = document.createElement('div');
            teamItem.className = 'changelog-item level-stable';
            
            teamItem.innerHTML = `
                <div class="changelog-icon">⚽</div>
                <div class="changelog-details">
                    <div class="changelog-team-name">Tim ${team.position}: ${team.name}</div>
                    <div class="changelog-level-change">
                        <span class="level-badge new-level">Level ${team.difficulty}</span>
                    </div>
                    <div class="changelog-reason">💬 ${getDifficultyLabel(team.difficulty)}</div>
                </div>
            `;
            
            historySection.appendChild(teamItem);
        });
        
        content.appendChild(historySection);
    });
    
    container.style.display = 'block';
}

function closeRandomizeHistory() {
    const container = document.getElementById('randomizeHistoryContainer');
    if (container) {
        container.style.display = 'none';
    }
}

function setSetupMode(mode) {
    tournamentData.setupMode = mode;
    
    document.getElementById('manualModeBtn').classList.remove('active');
    document.getElementById('autoModeBtn').classList.remove('active');
    
    const randomButtonContainer = document.getElementById('randomButtonContainer');
    
    if (mode === 'manual') {
        document.getElementById('manualModeBtn').classList.add('active');
        document.querySelector('.tournament-teams-setup').style.display = 'block';
        if (randomButtonContainer) randomButtonContainer.style.display = 'flex';
    } else {
        document.getElementById('autoModeBtn').classList.add('active');
        document.querySelector('.tournament-teams-setup').style.display = 'none';
        if (randomButtonContainer) randomButtonContainer.style.display = 'flex';
        autoGenerateTeams();
    }
}

function autoGenerateTeams() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const shuffled = [...predefinedTeams].sort(() => Math.random() - 0.5);
    
    for (let i = 1; i <= teamCount; i++) {
        const team = shuffled[i - 1];
        
        // Set dropdown
        const selectElement = document.getElementById('tournamentTeamSelect' + i);
        if (selectElement) {
            selectElement.value = team.name;
        }
        
        // Set team name input
        document.getElementById('tournamentTeam' + i).value = team.name;
        
        // Set slider
        const sliderElement = document.getElementById('tournamentSlider' + i);
        if (sliderElement) {
            sliderElement.value = team.difficulty;
        }
        
        // Update difficulty display
        document.getElementById('tournamentDiff' + i).textContent = team.difficulty;
        
        // Update difficulty label
        const difficultyLabelElement = document.getElementById('tournamentDiffLabel' + i);
        if (difficultyLabelElement) {
            difficultyLabelElement.textContent = getDifficultyLabel(team.difficulty);
        }
        
        // Update bar
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
    
    if (teamCount === 16) {
        tournamentData.quarterFinals = [
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    } else if (teamCount === 8) {
        tournamentData.quarterFinals = [
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' },
            { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, status: 'pending' }
        ];
    }
    
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
        tournamentData.quarterFinals[0] = { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' };
        tournamentData.quarterFinals[1] = { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' };
        tournamentData.quarterFinals[2] = { teamA: tournamentData.teams[4], teamB: tournamentData.teams[5], scoreA: null, scoreB: null, winner: null, status: 'pending' };
        tournamentData.quarterFinals[3] = { teamA: tournamentData.teams[6], teamB: tournamentData.teams[7], scoreA: null, scoreB: null, winner: null, status: 'pending' };
    } else if (tournamentData.teamCount === 16) {
        // Dari Round of 16 winners untuk 16 tim - update placeholder yang sudah ada
        // Validasi: pastikan semua winners ada sebelum update
        const allWinnersExist = tournamentData.roundOf16.every(match => match.winner);
        if (allWinnersExist) {
            tournamentData.quarterFinals[0].teamA = tournamentData.roundOf16[0].winner;
            tournamentData.quarterFinals[0].teamB = tournamentData.roundOf16[1].winner;
            tournamentData.quarterFinals[1].teamA = tournamentData.roundOf16[2].winner;
            tournamentData.quarterFinals[1].teamB = tournamentData.roundOf16[3].winner;
            tournamentData.quarterFinals[2].teamA = tournamentData.roundOf16[4].winner;
            tournamentData.quarterFinals[2].teamB = tournamentData.roundOf16[5].winner;
            tournamentData.quarterFinals[3].teamA = tournamentData.roundOf16[6].winner;
            tournamentData.quarterFinals[3].teamB = tournamentData.roundOf16[7].winner;
        } else {
            console.error('Error: Tidak semua Round of 16 matches memiliki winner');
        }
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
    // Validasi: pastikan kedua tim ada sebelum memulai pertandingan
    if (!match || !match.teamA || !match.teamB) {
        console.error('Error: Match memiliki tim yang tidak valid', match);
        tournamentData.currentMatchIndex++;
        playNextMatch();
        return;
    }
    
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
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 }
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
    
    matchData.stats[team].substitutions++;
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
            matchData.stats.teamA.penaltiesScored++;
            addTournamentLog(`${penaltyA.icon} ${match.teamA.name} - ${penaltyA.result}! Penalti ${roundLabel} ${penaltyA.message} (${penaltyScoreA}-${penaltyScoreB})`, penaltyA.type);
            addLiveEvent(`⚽ ${match.teamA.name} skor!`, 'goal');
        } else {
            matchData.stats.teamA.penaltiesMissed++;
            addTournamentLog(`${penaltyA.icon} ${match.teamA.name} - ${penaltyA.result}! Penalti ${roundLabel} ${penaltyA.message}`, penaltyA.type);
            addLiveEvent(`${penaltyA.icon} ${match.teamA.name} gagal!`, penaltyA.type);
        }
        
        document.getElementById('liveScoreA').textContent = `${match.scoreA} (${penaltyScoreA})`;
        document.getElementById('liveScoreB').textContent = `${match.scoreB} (${penaltyScoreB})`;
        
        setTimeout(() => {
            const penaltyB = executePenalty(match.teamB, match.teamA.difficulty);
            if (penaltyB.scored) {
                penaltyScoreB++;
                matchData.stats.teamB.penaltiesScored++;
                addTournamentLog(`${penaltyB.icon} ${match.teamB.name} - ${penaltyB.result}! Penalti ${roundLabel} ${penaltyB.message} (${penaltyScoreA}-${penaltyScoreB})`, penaltyB.type);
                addLiveEvent(`⚽ ${match.teamB.name} skor!`, 'goal');
            } else {
                matchData.stats.teamB.penaltiesMissed++;
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
    const collapseBtn = document.getElementById('statsCollapseBtn');
    
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
            <div class="stat-item">
                <span class="stat-label">⚽ Penalti Berhasil</span>
                <div class="stat-values">
                    <span>${stats.teamA.penaltiesScored || 0}</span>
                    <span>-</span>
                    <span>${stats.teamB.penaltiesScored || 0}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">❌ Penalti Gagal</span>
                <div class="stat-values">
                    <span>${stats.teamA.penaltiesMissed || 0}</span>
                    <span>-</span>
                    <span>${stats.teamB.penaltiesMissed || 0}</span>
                </div>
            </div>
            <div class="stat-item">
                <span class="stat-label">🔄 Pergantian Pemain</span>
                <div class="stat-values">
                    <span>${stats.teamA.substitutions || 0}</span>
                    <span>-</span>
                    <span>${stats.teamB.substitutions || 0}</span>
                </div>
            </div>
        </div>
    `;
    
    // Tampilkan stats dan buat expanded (tidak collapsed)
    statsDiv.classList.remove('collapsed');
    tournamentData.statsCollapsed = false;
    if (collapseBtn) {
        collapseBtn.textContent = '▼';
    }
    
    // Scroll ke stats section untuk mobile
    setTimeout(() => {
        statsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function setupSemiFinals() {
    if (tournamentData.teamCount === 4) {
        // Langsung dari teams untuk 4 tim
        tournamentData.semiFinals[0] = { teamA: tournamentData.teams[0], teamB: tournamentData.teams[1], scoreA: null, scoreB: null, winner: null, status: 'pending' };
        tournamentData.semiFinals[1] = { teamA: tournamentData.teams[2], teamB: tournamentData.teams[3], scoreA: null, scoreB: null, winner: null, status: 'pending' };
    } else if (tournamentData.quarterFinals && tournamentData.quarterFinals.length >= 4) {
        // Dari Quarter Finals winners - update placeholder yang sudah ada
        // Validasi: pastikan semua winners ada sebelum update
        const allWinnersExist = tournamentData.quarterFinals.every(match => match.winner);
        if (allWinnersExist) {
            tournamentData.semiFinals[0].teamA = tournamentData.quarterFinals[0].winner;
            tournamentData.semiFinals[0].teamB = tournamentData.quarterFinals[1].winner;
            tournamentData.semiFinals[1].teamA = tournamentData.quarterFinals[2].winner;
            tournamentData.semiFinals[1].teamB = tournamentData.quarterFinals[3].winner;
        } else {
            console.error('Error: Tidak semua Quarter Finals matches memiliki winner');
        }
    }
    
    tournamentData.currentRound = 'semi';
    tournamentData.matchQueue = [...tournamentData.semiFinals];
    tournamentData.currentMatchIndex = 0;
    
    addTournamentLog('🔥 Semi Finals dimulai! 4 tim tersisa berjuang untuk masuk Final!', 'round-change');
    showEventAnimation('🔥 Semi Finals!<br>4 Tim Tersisa', 'goal');
    renderBracket();
}

function setupFinal() {
    if (tournamentData.semiFinals && tournamentData.semiFinals.length >= 2) {
        // Validasi: pastikan kedua semi final winners ada
        const allWinnersExist = tournamentData.semiFinals.every(match => match.winner);
        if (allWinnersExist) {
            // Update placeholder yang sudah ada
            tournamentData.final.teamA = tournamentData.semiFinals[0].winner;
            tournamentData.final.teamB = tournamentData.semiFinals[1].winner;
            tournamentData.final.scoreA = null;
            tournamentData.final.scoreB = null;
            tournamentData.final.winner = null;
            tournamentData.final.status = 'pending';
            
            tournamentData.currentRound = 'final';
            tournamentData.matchQueue = [tournamentData.final];
            tournamentData.currentMatchIndex = 0;
            
            addTournamentLog(`🏆 Final: ${tournamentData.final.teamA.name} vs ${tournamentData.final.teamB.name}!`, 'round-change');
            showEventAnimation('🏆 FINAL!<br>Perebutan Juara', 'goal');
            renderBracket();
        } else {
            console.error('Error: Tidak semua Semi Finals matches memiliki winner');
        }
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
    
    // Get team logos
    const teamALogo = match.teamA ? getTeamLogo(match.teamA.name) : '';
    const teamBLogo = match.teamB ? getTeamLogo(match.teamB.name) : '';
    
    // Create logo HTML
    const teamALogoHTML = teamALogo ? `<img src="${teamALogo}" alt="${teamAName}" class="team-logo-small" style="width: 24px; height: 24px; margin-right: 6px; vertical-align: middle; border-radius: 50%; object-fit: cover;">` : '';
    const teamBLogoHTML = teamBLogo ? `<img src="${teamBLogo}" alt="${teamBName}" class="team-logo-small" style="width: 24px; height: 24px; margin-right: 6px; vertical-align: middle; border-radius: 50%; object-fit: cover;">` : '';
    
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
                <span class="match-team-name">${teamALogoHTML}${teamAName}</span>
                <span class="match-team-score">${scoreADisplay}</span>
            </div>
            <div class="match-team ${teamBClass} ${teamBLosses} ${teamBPending}">
                <span class="match-team-name">${teamBLogoHTML}${teamBName}</span>
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
    const championLogo = getTeamLogo(champion.name);
    const logoHTML = championLogo ? `<img src="${championLogo}" alt="${champion.name}" style="width: 80px; height: 80px; margin: 10px auto; display: block; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">` : '';
    
    championDiv.innerHTML = `
        <div class="champion-display has-winner">
            <div class="champion-trophy">🏆</div>
            ${logoHTML}
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
            clearEventAnimations();
            showScreen('mainMenu');
        }
    } else {
        clearEventAnimations();
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
        teamA: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 },
        teamB: { shots: 0, shotsOnTarget: 0, possession: 50, passes: 0, fouls: 0, corners: 0, yellowCards: 0, redCards: 0, offsides: 0, assists: 0, penaltiesScored: 0, penaltiesMissed: 0, substitutions: 0 }
    };
    
    // Update UI
    document.getElementById('matchTitle').textContent = `${matchData.teamA.name} vs ${matchData.teamB.name}`;
    document.getElementById('teamANameDisplay').textContent = matchData.teamA.name;
    document.getElementById('teamBNameDisplay').textContent = matchData.teamB.name;
    document.getElementById('scoreA').textContent = '0';
    document.getElementById('scoreB').textContent = '0';
    document.getElementById('matchTime').textContent = "0'";
    document.getElementById('matchLog').innerHTML = '';
    
    // Reset substitution manager
    if (typeof substitutionManager !== 'undefined') {
        substitutionManager.reset();
    }
    
    showScreen('matchScreen');
    
    // Display team logos and squad info
    setTimeout(() => {
        displayTeamLogos();
        displayTeamSquads();
    }, 100);
    
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
    
    // Substitutions at specific minutes
    if (minute === 60 || minute === 70 || minute === 80) {
        if (Math.random() < 0.7) {
            simulateSubstitution();
        }
    }
}

function simulateSubstitution() {
    const team = Math.random() > 0.5 ? 'teamA' : 'teamB';
    const teamName = matchData[team].name;
    
    // Gunakan substitution manager dengan data pemain real dari teamSquads
    if (typeof substitutionManager !== 'undefined' && typeof teamSquads !== 'undefined') {
        // Cek apakah tim ini ada di database skuad
        if (teamSquads[teamName]) {
            const result = substitutionManager.generateAutoSubstitution(teamName, matchData.currentMinute);
            
            if (result && result.success) {
                // Increment stats hanya jika substitusi berhasil
                matchData.stats[team].substitutions++;
                
                const playerOutInfo = `${result.substitution.playerOut.name} (#${result.substitution.playerOut.number})`;
                const playerInInfo = `${result.substitution.playerIn.name} (#${result.substitution.playerIn.number})`;
                
                addLog(matchData.currentMinute, `🔄 Substitusi ${teamName}: ${playerOutInfo} ↔ ${playerInInfo}`, 'substitution');
                addMatchCommentary(`Tim ${teamName} melakukan pergantian pemain. ${result.substitution.playerIn.name} masuk menggantikan ${result.substitution.playerOut.name}.`);
                addLiveEvent(`🔄 ${teamName}: ${result.substitution.playerIn.name} masuk`);
            }
            // Jika tim punya data skuad tapi generateAutoSubstitution return null atau !success,
            // keluar tanpa substitusi (belum waktunya atau sudah maksimal)
            return;
        }
    }
    
    // Fallback HANYA untuk tim custom user yang TIDAK ada di database skuad
    const playerOut = generatePlayerName();
    const playerIn = generatePlayerName();
    
    matchData.stats[team].substitutions++;
    addLog(matchData.currentMinute, `🔄 Substitusi ${teamName}: ${playerOut} keluar, ${playerIn} masuk!`, 'substitution');
    addMatchCommentary(`Tim ${teamName} melakukan perubahan dengan memasukkan ${playerIn}.`);
    addLiveEvent(`🔄 ${teamName}: ${playerIn} masuk`);
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
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Penalti Berhasil</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.penaltiesScored, stats.teamB.penaltiesScored, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.penaltiesScored} - ${stats.teamB.penaltiesScored}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.penaltiesScored, stats.teamB.penaltiesScored, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Penalti Gagal</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.penaltiesMissed, stats.teamB.penaltiesMissed, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.penaltiesMissed} - ${stats.teamB.penaltiesMissed}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.penaltiesMissed, stats.teamB.penaltiesMissed, 'B')}%"></div>
                </div>
            </div>
        </div>
        
        <div class="stat-row">
            <div class="stat-label">
                <span>${matchData.teamA.name}</span>
                <span>Pergantian Pemain</span>
                <span>${matchData.teamB.name}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar reverse">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.substitutions, stats.teamB.substitutions, 'A')}%"></div>
                </div>
                <div class="stat-value">${stats.teamA.substitutions} - ${stats.teamB.substitutions}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${getStatPercentage(stats.teamA.substitutions, stats.teamB.substitutions, 'B')}%"></div>
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
            clearEventAnimations();
            showScreen('mainMenu');
        }
    } else {
        clearEventAnimations();
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
    // JANGAN TAMPILKAN ANIMASI kalau di menu atau settings!
    if (currentScreen === 'mainMenu' || currentScreen === 'settings') {
        return; // Langsung keluar, jangan buat animasi
    }
    
    const container = document.getElementById('eventAnimations');
    if (!container) return;
    
    // Double check - jangan tampilkan kalau container hidden
    if (container.style.display === 'none') {
        return;
    }
    
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

function clearEventAnimations() {
    // Force remove all event-animation elements FIRST
    const allAnimations = document.querySelectorAll('.event-animation');
    allAnimations.forEach(animation => {
        animation.remove();
    });
    
    // Clear all event animations container
    const container = document.getElementById('eventAnimations');
    if (container) {
        container.innerHTML = '';
        // Force hide container
        container.style.display = 'none';
    }
    
    // Clear tournament live display
    const liveMatchDisplay = document.getElementById('liveMatchDisplay');
    if (liveMatchDisplay) {
        liveMatchDisplay.style.display = 'none';
    }
    
    // Clear live events
    const liveEvents = document.getElementById('liveEvents');
    if (liveEvents) {
        liveEvents.innerHTML = '';
    }
}
