// Data lengkap informasi tim dengan logo, negara, dan warna
const teamsInfo = {
    'Manchester City': {
        logo: 'team-logos/manchester-city.png',
        country: 'England',
        colors: { primary: '#6CABDD', secondary: '#1C2C5B' },
        stadium: 'Etihad Stadium',
        founded: 1880
    },
    'Real Madrid': {
        logo: 'team-logos/real-madrid.png',
        country: 'Spain',
        colors: { primary: '#FFFFFF', secondary: '#FFD700' },
        stadium: 'Santiago Bernabéu',
        founded: 1902
    },
    'Bayern Munich': {
        logo: 'team-logos/bayern-munich.png',
        country: 'Germany',
        colors: { primary: '#DC052D', secondary: '#0066B2' },
        stadium: 'Allianz Arena',
        founded: 1900
    },
    'Liverpool FC': {
        logo: 'team-logos/liverpool.png',
        country: 'England',
        colors: { primary: '#C8102E', secondary: '#00B2A9' },
        stadium: 'Anfield',
        founded: 1892
    },
    'Barcelona FC': {
        logo: 'team-logos/barcelona.png',
        country: 'Spain',
        colors: { primary: '#A50044', secondary: '#004D98' },
        stadium: 'Camp Nou',
        founded: 1899
    },
    'PSG': {
        logo: 'team-logos/psg.png',
        country: 'France',
        colors: { primary: '#004170', secondary: '#DA291C' },
        stadium: 'Parc des Princes',
        founded: 1970
    },
    'Arsenal FC': {
        logo: 'team-logos/arsenal.png',
        country: 'England',
        colors: { primary: '#EF0107', secondary: '#FFFFFF' },
        stadium: 'Emirates Stadium',
        founded: 1886
    },
    'Inter Milan': {
        logo: 'team-logos/inter-milan.png',
        country: 'Italy',
        colors: { primary: '#010E80', secondary: '#000000' },
        stadium: 'San Siro',
        founded: 1908
    },
    'Bayer Leverkusen': {
        logo: 'team-logos/bayer-leverkusen.png',
        country: 'Germany',
        colors: { primary: '#E32221', secondary: '#000000' },
        stadium: 'BayArena',
        founded: 1904
    },
    'Manchester United': {
        logo: 'team-logos/manchester-united.png',
        country: 'England',
        colors: { primary: '#DA291C', secondary: '#FBE122' },
        stadium: 'Old Trafford',
        founded: 1878
    },
    'Chelsea FC': {
        logo: 'team-logos/chelsea.png',
        country: 'England',
        colors: { primary: '#034694', secondary: '#FFFFFF' },
        stadium: 'Stamford Bridge',
        founded: 1905
    },
    'Atletico Madrid': {
        logo: 'team-logos/atletico-madrid.png',
        country: 'Spain',
        colors: { primary: '#CB3524', secondary: '#FFFFFF' },
        stadium: 'Cívitas Metropolitano',
        founded: 1903
    },
    'AC Milan': {
        logo: 'team-logos/ac-milan.png',
        country: 'Italy',
        colors: { primary: '#FB090B', secondary: '#000000' },
        stadium: 'San Siro',
        founded: 1899
    },
    'Juventus': {
        logo: 'team-logos/juventus.png',
        country: 'Italy',
        colors: { primary: '#000000', secondary: '#FFFFFF' },
        stadium: 'Allianz Stadium',
        founded: 1897
    },
    'Borussia Dortmund': {
        logo: 'team-logos/borussia-dortmund.png',
        country: 'Germany',
        colors: { primary: '#FDE100', secondary: '#000000' },
        stadium: 'Signal Iduna Park',
        founded: 1909
    },
    'Napoli': {
        logo: 'team-logos/napoli.png',
        country: 'Italy',
        colors: { primary: '#0E70B8', secondary: '#FFFFFF' },
        stadium: 'Stadio Diego Armando Maradona',
        founded: 1926
    },
    'Tottenham': {
        logo: 'team-logos/tottenham.png',
        country: 'England',
        colors: { primary: '#132257', secondary: '#FFFFFF' },
        stadium: 'Tottenham Hotspur Stadium',
        founded: 1882
    },
    'Newcastle United': {
        logo: 'team-logos/newcastle-united.png',
        country: 'England',
        colors: { primary: '#000000', secondary: '#FFFFFF' },
        stadium: 'St James\' Park',
        founded: 1892
    },
    'RB Leipzig': {
        logo: 'team-logos/rb-leipzig.png',
        country: 'Germany',
        colors: { primary: '#DD0741', secondary: '#FFFFFF' },
        stadium: 'Red Bull Arena',
        founded: 2009
    },
    'Benfica': {
        logo: 'team-logos/benfica.png',
        country: 'Portugal',
        colors: { primary: '#ED1C24', secondary: '#FFFFFF' },
        stadium: 'Estádio da Luz',
        founded: 1904
    },
    'FC Porto': {
        logo: 'team-logos/fc-porto.png',
        country: 'Portugal',
        colors: { primary: '#003DA5', secondary: '#FFFFFF' },
        stadium: 'Estádio do Dragão',
        founded: 1893
    },
    'Sporting CP': {
        logo: 'team-logos/sporting-cp.png',
        country: 'Portugal',
        colors: { primary: '#00864A', secondary: '#FFFFFF' },
        stadium: 'Estádio José Alvalade',
        founded: 1906
    },
    'Ajax Amsterdam': {
        logo: 'team-logos/ajax-amsterdam.png',
        country: 'Netherlands',
        colors: { primary: '#D2122E', secondary: '#FFFFFF' },
        stadium: 'Johan Cruyff Arena',
        founded: 1900
    },
    'AS Roma': {
        logo: 'team-logos/as-roma.png',
        country: 'Italy',
        colors: { primary: '#87001C', secondary: '#F7B500' },
        stadium: 'Stadio Olimpico',
        founded: 1927
    },
    'Sevilla FC': {
        logo: 'team-logos/sevilla.png',
        country: 'Spain',
        colors: { primary: '#F43333', secondary: '#FFFFFF' },
        stadium: 'Ramón Sánchez Pizjuán',
        founded: 1890
    },
    'Valencia CF': {
        logo: 'team-logos/valencia.png',
        country: 'Spain',
        colors: { primary: '#FFFFFF', secondary: '#000000' },
        stadium: 'Mestalla',
        founded: 1919
    },
    'West Ham United': {
        logo: 'team-logos/west-ham-united.png',
        country: 'England',
        colors: { primary: '#7A263A', secondary: '#1BB1E7' },
        stadium: 'London Stadium',
        founded: 1895
    },
    'Leicester City': {
        logo: 'team-logos/leicester-city.png',
        country: 'England',
        colors: { primary: '#003090', secondary: '#FDBE11' },
        stadium: 'King Power Stadium',
        founded: 1884
    },
    'Olympique Lyon': {
        logo: 'team-logos/olympique-lyon.png',
        country: 'France',
        colors: { primary: '#FFFFFF', secondary: '#DA1F30' },
        stadium: 'Groupama Stadium',
        founded: 1950
    },
    'Marseille': {
        logo: 'team-logos/marseille.png',
        country: 'France',
        colors: { primary: '#2FAEE0', secondary: '#FFFFFF' },
        stadium: 'Stade Vélodrome',
        founded: 1899
    },
    'Monaco': {
        logo: 'team-logos/monaco.png',
        country: 'France',
        colors: { primary: '#ED1C24', secondary: '#FFFFFF' },
        stadium: 'Stade Louis II',
        founded: 1924
    },
    'Shakhtar Donetsk': {
        logo: 'team-logos/shakhtar-donetsk.png',
        country: 'Ukraine',
        colors: { primary: '#FF6600', secondary: '#000000' },
        stadium: 'NSC Olimpiyskiy',
        founded: 1936
    }
};
