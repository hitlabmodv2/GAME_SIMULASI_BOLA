const teamFlags = {
    'Manchester City': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Manchester United': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Liverpool FC': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Chelsea FC': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Arsenal FC': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Tottenham': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Newcastle United': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'West Ham United': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Leicester City': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Real Madrid': '🇪🇸',
    'Barcelona FC': '🇪🇸',
    'Atletico Madrid': '🇪🇸',
    'Sevilla FC': '🇪🇸',
    'Valencia CF': '🇪🇸',
    'Bayern Munich': '🇩🇪',
    'Borussia Dortmund': '🇩🇪',
    'RB Leipzig': '🇩🇪',
    'Bayer Leverkusen': '🇩🇪',
    'PSG': '🇫🇷',
    'Olympique Lyon': '🇫🇷',
    'Marseille': '🇫🇷',
    'Monaco': '🇲🇨',
    'AC Milan': '🇮🇹',
    'Inter Milan': '🇮🇹',
    'Juventus': '🇮🇹',
    'Napoli': '🇮🇹',
    'AS Roma': '🇮🇹',
    'Benfica': '🇵🇹',
    'FC Porto': '🇵🇹',
    'Sporting CP': '🇵🇹',
    'Ajax Amsterdam': '🇳🇱',
    'Shakhtar Donetsk': '🇺🇦'
};

function getTeamFlag(teamName) {
    return teamFlags[teamName] || '⚽';
}

function getTeamWithFlag(teamName) {
    const flag = getTeamFlag(teamName);
    return `${flag} ${teamName}`;
}
