// Data skuad pemain untuk semua tim dengan formasi dan substitusi
const teamSquads = {
    'Manchester City': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Ederson', number: 31 },
            { position: 'RB', name: 'Walker', number: 2 },
            { position: 'CB', name: 'Dias', number: 3 },
            { position: 'CB', name: 'Akanji', number: 25 },
            { position: 'LB', name: 'Gvardiol', number: 24 },
            { position: 'CDM', name: 'Rodri', number: 16 },
            { position: 'CM', name: 'De Bruyne', number: 17 },
            { position: 'CM', name: 'Bernardo Silva', number: 20 },
            { position: 'RW', name: 'Foden', number: 47 },
            { position: 'ST', name: 'Haaland', number: 9 },
            { position: 'LW', name: 'Grealish', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Ortega', number: 18 },
            { position: 'DF', name: 'Stones', number: 5 },
            { position: 'DF', name: 'Ake', number: 6 },
            { position: 'MF', name: 'Kovacic', number: 8 },
            { position: 'MF', name: 'Nunes', number: 27 },
            { position: 'FW', name: 'Doku', number: 11 },
            { position: 'FW', name: 'Alvarez', number: 19 }
        ]
    },
    'Real Madrid': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Courtois', number: 1 },
            { position: 'RB', name: 'Carvajal', number: 2 },
            { position: 'CB', name: 'Militao', number: 3 },
            { position: 'CB', name: 'Rudiger', number: 22 },
            { position: 'LB', name: 'Mendy', number: 23 },
            { position: 'CDM', name: 'Tchouameni', number: 18 },
            { position: 'CM', name: 'Valverde', number: 15 },
            { position: 'CM', name: 'Bellingham', number: 5 },
            { position: 'RW', name: 'Rodrygo', number: 11 },
            { position: 'ST', name: 'Vinicius Jr', number: 7 },
            { position: 'LW', name: 'Mbappé', number: 9 }
        ],
        substitutes: [
            { position: 'GK', name: 'Lunin', number: 13 },
            { position: 'DF', name: 'Alaba', number: 4 },
            { position: 'DF', name: 'Vazquez', number: 17 },
            { position: 'MF', name: 'Modric', number: 10 },
            { position: 'MF', name: 'Camavinga', number: 12 },
            { position: 'FW', name: 'Brahim', number: 21 },
            { position: 'FW', name: 'Endrick', number: 16 }
        ]
    },
    'Bayern Munich': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Neuer', number: 1 },
            { position: 'RB', name: 'Mazraoui', number: 40 },
            { position: 'CB', name: 'Upamecano', number: 2 },
            { position: 'CB', name: 'Kim Min-jae', number: 3 },
            { position: 'LB', name: 'Davies', number: 19 },
            { position: 'CDM', name: 'Kimmich', number: 6 },
            { position: 'CDM', name: 'Goretzka', number: 8 },
            { position: 'CAM', name: 'Musiala', number: 42 },
            { position: 'RW', name: 'Sané', number: 10 },
            { position: 'ST', name: 'Kane', number: 9 },
            { position: 'LW', name: 'Gnabry', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Peretz', number: 18 },
            { position: 'DF', name: 'de Ligt', number: 4 },
            { position: 'DF', name: 'Guerreiro', number: 22 },
            { position: 'MF', name: 'Laimer', number: 27 },
            { position: 'MF', name: 'Palhinha', number: 16 },
            { position: 'FW', name: 'Coman', number: 11 },
            { position: 'FW', name: 'Müller', number: 25 }
        ]
    },
    'Liverpool FC': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Alisson', number: 1 },
            { position: 'RB', name: 'Alexander-Arnold', number: 66 },
            { position: 'CB', name: 'Van Dijk', number: 4 },
            { position: 'CB', name: 'Konate', number: 5 },
            { position: 'LB', name: 'Robertson', number: 26 },
            { position: 'CDM', name: 'Mac Allister', number: 10 },
            { position: 'CM', name: 'Gravenberch', number: 38 },
            { position: 'CM', name: 'Szoboszlai', number: 8 },
            { position: 'RW', name: 'Salah', number: 11 },
            { position: 'ST', name: 'Nunez', number: 9 },
            { position: 'LW', name: 'Diaz', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Kelleher', number: 62 },
            { position: 'DF', name: 'Gomez', number: 2 },
            { position: 'DF', name: 'Tsimikas', number: 21 },
            { position: 'MF', name: 'Endo', number: 3 },
            { position: 'MF', name: 'Jones', number: 17 },
            { position: 'FW', name: 'Gakpo', number: 18 },
            { position: 'FW', name: 'Jota', number: 20 }
        ]
    },
    'Barcelona FC': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Ter Stegen', number: 1 },
            { position: 'RB', name: 'Kounde', number: 23 },
            { position: 'CB', name: 'Araujo', number: 4 },
            { position: 'CB', name: 'Christensen', number: 15 },
            { position: 'LB', name: 'Balde', number: 3 },
            { position: 'CDM', name: 'De Jong', number: 21 },
            { position: 'CM', name: 'Gavi', number: 6 },
            { position: 'CM', name: 'Pedri', number: 8 },
            { position: 'RW', name: 'Yamal', number: 27 },
            { position: 'ST', name: 'Lewandowski', number: 9 },
            { position: 'LW', name: 'Raphinha', number: 11 }
        ],
        substitutes: [
            { position: 'GK', name: 'Peña', number: 13 },
            { position: 'DF', name: 'Cubarsi', number: 2 },
            { position: 'DF', name: 'Fort', number: 32 },
            { position: 'MF', name: 'Gundogan', number: 22 },
            { position: 'MF', name: 'Fermin', number: 16 },
            { position: 'FW', name: 'Ferran Torres', number: 7 },
            { position: 'FW', name: 'Felix', number: 14 }
        ]
    },
    'PSG': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Donnarumma', number: 99 },
            { position: 'RB', name: 'Hakimi', number: 2 },
            { position: 'CB', name: 'Marquinhos', number: 5 },
            { position: 'CB', name: 'Skriniar', number: 37 },
            { position: 'LB', name: 'Mendes', number: 25 },
            { position: 'CDM', name: 'Vitinha', number: 17 },
            { position: 'CM', name: 'Zaire-Emery', number: 33 },
            { position: 'CM', name: 'Ruiz', number: 8 },
            { position: 'RW', name: 'Dembele', number: 10 },
            { position: 'ST', name: 'Kolo Muani', number: 23 },
            { position: 'LW', name: 'Barcola', number: 29 }
        ],
        substitutes: [
            { position: 'GK', name: 'Safonov', number: 39 },
            { position: 'DF', name: 'Beraldo', number: 35 },
            { position: 'DF', name: 'Pacho', number: 51 },
            { position: 'MF', name: 'Neves', number: 87 },
            { position: 'MF', name: 'Lee Kang-in', number: 19 },
            { position: 'FW', name: 'Asensio', number: 11 },
            { position: 'FW', name: 'Ramos', number: 9 }
        ]
    },
    'Arsenal FC': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Raya', number: 22 },
            { position: 'RB', name: 'White', number: 4 },
            { position: 'CB', name: 'Saliba', number: 2 },
            { position: 'CB', name: 'Gabriel', number: 6 },
            { position: 'LB', name: 'Timber', number: 12 },
            { position: 'CDM', name: 'Rice', number: 41 },
            { position: 'CM', name: 'Odegaard', number: 8 },
            { position: 'CM', name: 'Havertz', number: 29 },
            { position: 'RW', name: 'Saka', number: 7 },
            { position: 'ST', name: 'Jesus', number: 9 },
            { position: 'LW', name: 'Martinelli', number: 11 }
        ],
        substitutes: [
            { position: 'GK', name: 'Ramsdale', number: 1 },
            { position: 'DF', name: 'Tomiyasu', number: 18 },
            { position: 'DF', name: 'Kiwior', number: 15 },
            { position: 'MF', name: 'Jorginho', number: 20 },
            { position: 'MF', name: 'Partey', number: 5 },
            { position: 'FW', name: 'Trossard', number: 19 },
            { position: 'FW', name: 'Nketiah', number: 14 }
        ]
    },
    'Inter Milan': {
        formation: '3-5-2',
        startingXI: [
            { position: 'GK', name: 'Sommer', number: 1 },
            { position: 'CB', name: 'Pavard', number: 28 },
            { position: 'CB', name: 'Acerbi', number: 15 },
            { position: 'CB', name: 'Bastoni', number: 95 },
            { position: 'RWB', name: 'Dumfries', number: 2 },
            { position: 'CM', name: 'Barella', number: 23 },
            { position: 'CM', name: 'Calhanoglu', number: 20 },
            { position: 'CM', name: 'Mkhitaryan', number: 22 },
            { position: 'LWB', name: 'Dimarco', number: 32 },
            { position: 'ST', name: 'Lautaro Martinez', number: 10 },
            { position: 'ST', name: 'Thuram', number: 9 }
        ],
        substitutes: [
            { position: 'GK', name: 'Di Gennaro', number: 12 },
            { position: 'DF', name: 'De Vrij', number: 6 },
            { position: 'DF', name: 'Darmian', number: 36 },
            { position: 'MF', name: 'Frattesi', number: 16 },
            { position: 'MF', name: 'Zielinski', number: 7 },
            { position: 'FW', name: 'Taremi', number: 99 },
            { position: 'FW', name: 'Arnautovic', number: 8 }
        ]
    },
    'Bayer Leverkusen': {
        formation: '3-4-2-1',
        startingXI: [
            { position: 'GK', name: 'Hradecky', number: 1 },
            { position: 'CB', name: 'Tapsoba', number: 12 },
            { position: 'CB', name: 'Tah', number: 4 },
            { position: 'CB', name: 'Hincapie', number: 3 },
            { position: 'RM', name: 'Frimpong', number: 30 },
            { position: 'CM', name: 'Xhaka', number: 34 },
            { position: 'CM', name: 'Palacios', number: 25 },
            { position: 'LM', name: 'Grimaldo', number: 20 },
            { position: 'CAM', name: 'Wirtz', number: 10 },
            { position: 'CAM', name: 'Hofmann', number: 7 },
            { position: 'ST', name: 'Boniface', number: 22 }
        ],
        substitutes: [
            { position: 'GK', name: 'Kovar', number: 17 },
            { position: 'DF', name: 'Kossounou', number: 6 },
            { position: 'DF', name: 'Arthur', number: 13 },
            { position: 'MF', name: 'Andrich', number: 8 },
            { position: 'MF', name: 'Garcia', number: 24 },
            { position: 'FW', name: 'Adli', number: 21 },
            { position: 'FW', name: 'Schick', number: 14 }
        ]
    },
    'Manchester United': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Onana', number: 24 },
            { position: 'RB', name: 'Dalot', number: 20 },
            { position: 'CB', name: 'de Ligt', number: 4 },
            { position: 'CB', name: 'Martinez', number: 6 },
            { position: 'LB', name: 'Mazraoui', number: 3 },
            { position: 'CDM', name: 'Casemiro', number: 18 },
            { position: 'CDM', name: 'Ugarte', number: 25 },
            { position: 'CAM', name: 'Bruno Fernandes', number: 8 },
            { position: 'RW', name: 'Amad', number: 16 },
            { position: 'ST', name: 'Hojlund', number: 11 },
            { position: 'LW', name: 'Rashford', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Bayindir', number: 1 },
            { position: 'DF', name: 'Maguire', number: 5 },
            { position: 'DF', name: 'Shaw', number: 23 },
            { position: 'MF', name: 'Eriksen', number: 14 },
            { position: 'MF', name: 'Mainoo', number: 37 },
            { position: 'FW', name: 'Garnacho', number: 17 },
            { position: 'FW', name: 'Zirkzee', number: 9 }
        ]
    },
    'Chelsea FC': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Sanchez', number: 1 },
            { position: 'RB', name: 'James', number: 24 },
            { position: 'CB', name: 'Fofana', number: 29 },
            { position: 'CB', name: 'Colwill', number: 6 },
            { position: 'LB', name: 'Cucurella', number: 3 },
            { position: 'CDM', name: 'Caicedo', number: 25 },
            { position: 'CDM', name: 'Fernandez', number: 8 },
            { position: 'CAM', name: 'Palmer', number: 20 },
            { position: 'RW', name: 'Neto', number: 7 },
            { position: 'ST', name: 'Jackson', number: 15 },
            { position: 'LW', name: 'Mudryk', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Jorgensen', number: 12 },
            { position: 'DF', name: 'Badiashile', number: 4 },
            { position: 'DF', name: 'Gusto', number: 27 },
            { position: 'MF', name: 'Lavia', number: 45 },
            { position: 'MF', name: 'Dewsbury-Hall', number: 22 },
            { position: 'FW', name: 'Nkunku', number: 18 },
            { position: 'FW', name: 'Felix', number: 14 }
        ]
    },
    'Atletico Madrid': {
        formation: '3-5-2',
        startingXI: [
            { position: 'GK', name: 'Oblak', number: 13 },
            { position: 'CB', name: 'Gimenez', number: 2 },
            { position: 'CB', name: 'Witsel', number: 20 },
            { position: 'CB', name: 'Le Normand', number: 3 },
            { position: 'RM', name: 'Llorente', number: 14 },
            { position: 'CM', name: 'De Paul', number: 5 },
            { position: 'CM', name: 'Koke', number: 6 },
            { position: 'CM', name: 'Barrios', number: 8 },
            { position: 'LM', name: 'Gallagher', number: 4 },
            { position: 'ST', name: 'Griezmann', number: 7 },
            { position: 'ST', name: 'Alvarez', number: 19 }
        ],
        substitutes: [
            { position: 'GK', name: 'Musso', number: 1 },
            { position: 'DF', name: 'Molina', number: 16 },
            { position: 'DF', name: 'Reinildo', number: 23 },
            { position: 'MF', name: 'Lemar', number: 11 },
            { position: 'MF', name: 'Lino', number: 12 },
            { position: 'FW', name: 'Sorloth', number: 9 },
            { position: 'FW', name: 'Correa', number: 10 }
        ]
    },
    'AC Milan': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Maignan', number: 16 },
            { position: 'RB', name: 'Emerson Royal', number: 22 },
            { position: 'CB', name: 'Tomori', number: 23 },
            { position: 'CB', name: 'Gabbia', number: 46 },
            { position: 'LB', name: 'Theo Hernandez', number: 19 },
            { position: 'CDM', name: 'Fofana', number: 29 },
            { position: 'CDM', name: 'Reijnders', number: 14 },
            { position: 'CAM', name: 'Pulisic', number: 11 },
            { position: 'RW', name: 'Chukwueze', number: 21 },
            { position: 'ST', name: 'Morata', number: 7 },
            { position: 'LW', name: 'Leao', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Sportiello', number: 57 },
            { position: 'DF', name: 'Pavlovic', number: 31 },
            { position: 'DF', name: 'Terracciano', number: 42 },
            { position: 'MF', name: 'Musah', number: 80 },
            { position: 'MF', name: 'Loftus-Cheek', number: 8 },
            { position: 'FW', name: 'Abraham', number: 90 },
            { position: 'FW', name: 'Okafor', number: 17 }
        ]
    },
    'Juventus': {
        formation: '3-5-2',
        startingXI: [
            { position: 'GK', name: 'Di Gregorio', number: 29 },
            { position: 'CB', name: 'Gatti', number: 4 },
            { position: 'CB', name: 'Kalulu', number: 15 },
            { position: 'CB', name: 'Bremer', number: 3 },
            { position: 'RM', name: 'Cambiaso', number: 27 },
            { position: 'CM', name: 'Locatelli', number: 5 },
            { position: 'CM', name: 'Thuram', number: 19 },
            { position: 'CM', name: 'Douglas Luiz', number: 26 },
            { position: 'LM', name: 'Yildiz', number: 10 },
            { position: 'ST', name: 'Vlahovic', number: 9 },
            { position: 'ST', name: 'Conceicao', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Perin', number: 36 },
            { position: 'DF', name: 'Danilo', number: 6 },
            { position: 'DF', name: 'Cabal', number: 32 },
            { position: 'MF', name: 'Fagioli', number: 21 },
            { position: 'MF', name: 'McKennie', number: 16 },
            { position: 'FW', name: 'Koopmeiners', number: 8 },
            { position: 'FW', name: 'Weah', number: 22 }
        ]
    },
    'Borussia Dortmund': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Kobel', number: 1 },
            { position: 'RB', name: 'Ryerson', number: 26 },
            { position: 'CB', name: 'Sule', number: 25 },
            { position: 'CB', name: 'Schlotterbeck', number: 4 },
            { position: 'LB', name: 'Bensebaini', number: 5 },
            { position: 'CDM', name: 'Can', number: 23 },
            { position: 'CDM', name: 'Sabitzer', number: 20 },
            { position: 'CAM', name: 'Brandt', number: 10 },
            { position: 'RW', name: 'Adeyemi', number: 27 },
            { position: 'ST', name: 'Guirassy', number: 9 },
            { position: 'LW', name: 'Malen', number: 21 }
        ],
        substitutes: [
            { position: 'GK', name: 'Meyer', number: 33 },
            { position: 'DF', name: 'Anton', number: 3 },
            { position: 'DF', name: 'Couto', number: 2 },
            { position: 'MF', name: 'Nmecha', number: 8 },
            { position: 'MF', name: 'Gross', number: 13 },
            { position: 'FW', name: 'Beier', number: 14 },
            { position: 'FW', name: 'Duranville', number: 16 }
        ]
    },
    'Napoli': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Meret', number: 1 },
            { position: 'RB', name: 'Di Lorenzo', number: 22 },
            { position: 'CB', name: 'Rrahmani', number: 13 },
            { position: 'CB', name: 'Buongiorno', number: 4 },
            { position: 'LB', name: 'Olivera', number: 17 },
            { position: 'CDM', name: 'Lobotka', number: 68 },
            { position: 'CM', name: 'Anguissa', number: 99 },
            { position: 'CM', name: 'McTominay', number: 8 },
            { position: 'RW', name: 'Politano', number: 21 },
            { position: 'ST', name: 'Lukaku', number: 11 },
            { position: 'LW', name: 'Kvaratskhelia', number: 77 }
        ],
        substitutes: [
            { position: 'GK', name: 'Caprile', number: 25 },
            { position: 'DF', name: 'Juan Jesus', number: 5 },
            { position: 'DF', name: 'Spinazzola', number: 37 },
            { position: 'MF', name: 'Gilmour', number: 6 },
            { position: 'MF', name: 'Folorunsho', number: 90 },
            { position: 'FW', name: 'Ngonge', number: 26 },
            { position: 'FW', name: 'Raspadori', number: 81 }
        ]
    },
    'Tottenham': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Vicario', number: 13 },
            { position: 'RB', name: 'Porro', number: 23 },
            { position: 'CB', name: 'Romero', number: 17 },
            { position: 'CB', name: 'Van de Ven', number: 37 },
            { position: 'LB', name: 'Udogie', number: 38 },
            { position: 'CDM', name: 'Bissouma', number: 8 },
            { position: 'CM', name: 'Bentancur', number: 30 },
            { position: 'CM', name: 'Maddison', number: 10 },
            { position: 'RW', name: 'Kulusevski', number: 21 },
            { position: 'ST', name: 'Solanke', number: 19 },
            { position: 'LW', name: 'Son', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Forster', number: 20 },
            { position: 'DF', name: 'Dragusin', number: 6 },
            { position: 'DF', name: 'Davies', number: 33 },
            { position: 'MF', name: 'Sarr', number: 29 },
            { position: 'MF', name: 'Bergvall', number: 15 },
            { position: 'FW', name: 'Johnson', number: 22 },
            { position: 'FW', name: 'Richarlison', number: 9 }
        ]
    },
    'Newcastle United': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Pope', number: 22 },
            { position: 'RB', name: 'Trippier', number: 2 },
            { position: 'CB', name: 'Schar', number: 5 },
            { position: 'CB', name: 'Burn', number: 33 },
            { position: 'LB', name: 'Hall', number: 20 },
            { position: 'CDM', name: 'Guimaraes', number: 39 },
            { position: 'CM', name: 'Tonali', number: 8 },
            { position: 'CM', name: 'Joelinton', number: 7 },
            { position: 'RW', name: 'Murphy', number: 23 },
            { position: 'ST', name: 'Isak', number: 14 },
            { position: 'LW', name: 'Gordon', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Dubravka', number: 1 },
            { position: 'DF', name: 'Lascelles', number: 6 },
            { position: 'DF', name: 'Livramento', number: 21 },
            { position: 'MF', name: 'Longstaff', number: 36 },
            { position: 'MF', name: 'Willock', number: 28 },
            { position: 'FW', name: 'Barnes', number: 11 },
            { position: 'FW', name: 'Osula', number: 18 }
        ]
    },
    'RB Leipzig': {
        formation: '4-4-2',
        startingXI: [
            { position: 'GK', name: 'Gulacsi', number: 1 },
            { position: 'RB', name: 'Henrichs', number: 39 },
            { position: 'CB', name: 'Orban', number: 4 },
            { position: 'CB', name: 'Lukeba', number: 23 },
            { position: 'LB', name: 'Raum', number: 22 },
            { position: 'RM', name: 'Nusa', number: 7 },
            { position: 'CM', name: 'Haidara', number: 8 },
            { position: 'CM', name: 'Kampl', number: 44 },
            { position: 'LM', name: 'Xavi Simons', number: 10 },
            { position: 'ST', name: 'Openda', number: 17 },
            { position: 'ST', name: 'Sesko', number: 30 }
        ],
        substitutes: [
            { position: 'GK', name: 'Vandevoordt', number: 26 },
            { position: 'DF', name: 'Bitshiabu', number: 5 },
            { position: 'DF', name: 'Geertruida', number: 3 },
            { position: 'MF', name: 'Vermeeren', number: 18 },
            { position: 'MF', name: 'Baumgartner', number: 14 },
            { position: 'FW', name: 'Poulsen', number: 9 },
            { position: 'FW', name: 'Andre Silva', number: 19 }
        ]
    },
    'Benfica': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Trubin', number: 1 },
            { position: 'RB', name: 'Bah', number: 6 },
            { position: 'CB', name: 'Silva', number: 4 },
            { position: 'CB', name: 'Otamendi', number: 30 },
            { position: 'LB', name: 'Carreras', number: 3 },
            { position: 'CDM', name: 'Florentino', number: 61 },
            { position: 'CM', name: 'Aursnes', number: 8 },
            { position: 'CM', name: 'Kokcu', number: 10 },
            { position: 'RW', name: 'Di Maria', number: 11 },
            { position: 'ST', name: 'Pavlidis', number: 14 },
            { position: 'LW', name: 'Aktürkoglu', number: 17 }
        ],
        substitutes: [
            { position: 'GK', name: 'Soares', number: 24 },
            { position: 'DF', name: 'Araujo', number: 44 },
            { position: 'DF', name: 'Kaboré', number: 26 },
            { position: 'MF', name: 'Barreiro', number: 18 },
            { position: 'MF', name: 'Beste', number: 7 },
            { position: 'FW', name: 'Schjelderup', number: 23 },
            { position: 'FW', name: 'Cabral', number: 19 }
        ]
    },
    'FC Porto': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Diogo Costa', number: 99 },
            { position: 'RB', name: 'Joao Mario', number: 23 },
            { position: 'CB', name: 'Pepe', number: 3 },
            { position: 'CB', name: 'Ze Pedro', number: 97 },
            { position: 'LB', name: 'Wendell', number: 22 },
            { position: 'CDM', name: 'Alan Varela', number: 6 },
            { position: 'CDM', name: 'Nico Gonzalez', number: 16 },
            { position: 'CAM', name: 'Pepe', number: 11 },
            { position: 'RW', name: 'Galeno', number: 13 },
            { position: 'ST', name: 'Evanilson', number: 9 },
            { position: 'LW', name: 'Pepe', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Rui Pedro', number: 32 },
            { position: 'DF', name: 'Fernandes', number: 2 },
            { position: 'DF', name: 'Djaló', number: 4 },
            { position: 'MF', name: 'Grujic', number: 8 },
            { position: 'MF', name: 'Veron', number: 27 },
            { position: 'FW', name: 'Loader', number: 14 },
            { position: 'FW', name: 'Namaso', number: 19 }
        ]
    },
    'Sporting CP': {
        formation: '3-4-3',
        startingXI: [
            { position: 'GK', name: 'Israel', number: 1 },
            { position: 'CB', name: 'Diomande', number: 26 },
            { position: 'CB', name: 'Debast', number: 6 },
            { position: 'CB', name: 'Inacio', number: 25 },
            { position: 'RM', name: 'Quenda', number: 57 },
            { position: 'CM', name: 'Hjulmand', number: 42 },
            { position: 'CM', name: 'Morita', number: 5 },
            { position: 'LM', name: 'Araujo', number: 17 },
            { position: 'RW', name: 'Trincao', number: 17 },
            { position: 'ST', name: 'Gyokeres', number: 9 },
            { position: 'LW', name: 'Edwards', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Kovacevic', number: 13 },
            { position: 'DF', name: 'Reis', number: 72 },
            { position: 'DF', name: 'Esgaio', number: 47 },
            { position: 'MF', name: 'Braganca', number: 23 },
            { position: 'MF', name: 'Goncalves', number: 8 },
            { position: 'FW', name: 'Harder', number: 19 },
            { position: 'FW', name: 'Catamo', number: 20 }
        ]
    },
    'Ajax Amsterdam': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Pasveer', number: 22 },
            { position: 'RB', name: 'Rensch', number: 2 },
            { position: 'CB', name: 'Sutalo', number: 37 },
            { position: 'CB', name: 'Baas', number: 15 },
            { position: 'LB', name: 'Hato', number: 4 },
            { position: 'CDM', name: 'Henderson', number: 6 },
            { position: 'CM', name: 'Taylor', number: 8 },
            { position: 'CM', name: 'Klaassen', number: 17 },
            { position: 'RW', name: 'Traoré', number: 20 },
            { position: 'ST', name: 'Brobbey', number: 9 },
            { position: 'LW', name: 'Godts', number: 11 }
        ],
        substitutes: [
            { position: 'GK', name: 'Ramaj', number: 1 },
            { position: 'DF', name: 'Gaaei', number: 3 },
            { position: 'DF', name: 'Kaplan', number: 31 },
            { position: 'MF', name: 'Fitz-Jim', number: 28 },
            { position: 'MF', name: 'Mannsverk', number: 32 },
            { position: 'FW', name: 'Weghorst', number: 25 },
            { position: 'FW', name: 'Akpom', number: 10 }
        ]
    },
    'AS Roma': {
        formation: '3-4-2-1',
        startingXI: [
            { position: 'GK', name: 'Svilar', number: 99 },
            { position: 'CB', name: 'Mancini', number: 23 },
            { position: 'CB', name: 'Ndicka', number: 5 },
            { position: 'CB', name: 'Hermoso', number: 22 },
            { position: 'RM', name: 'Celik', number: 19 },
            { position: 'CM', name: 'Kone', number: 17 },
            { position: 'CM', name: 'Paredes', number: 16 },
            { position: 'LM', name: 'Angelino', number: 3 },
            { position: 'CAM', name: 'Pellegrini', number: 7 },
            { position: 'CAM', name: 'Dybala', number: 21 },
            { position: 'ST', name: 'Dovbyk', number: 11 }
        ],
        substitutes: [
            { position: 'GK', name: 'Ryan', number: 89 },
            { position: 'DF', name: 'Hummels', number: 15 },
            { position: 'DF', name: 'Saelemaekers', number: 56 },
            { position: 'MF', name: 'Cristante', number: 4 },
            { position: 'MF', name: 'El Shaarawy', number: 92 },
            { position: 'FW', name: 'Shomurodov', number: 14 },
            { position: 'FW', name: 'Baldanzi', number: 35 }
        ]
    },
    'Sevilla FC': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Nyland', number: 13 },
            { position: 'RB', name: 'Carmona', number: 32 },
            { position: 'CB', name: 'Bade', number: 22 },
            { position: 'CB', name: 'Nianzou', number: 23 },
            { position: 'LB', name: 'Pedrosa', number: 3 },
            { position: 'CDM', name: 'Sambi Lokonga', number: 12 },
            { position: 'CM', name: 'Sow', number: 20 },
            { position: 'CM', name: 'Gudelj', number: 6 },
            { position: 'RW', name: 'Lukebakio', number: 11 },
            { position: 'ST', name: 'En-Nesyri', number: 15 },
            { position: 'LW', name: 'Ocampos', number: 5 }
        ],
        substitutes: [
            { position: 'GK', name: 'Dmitrovic', number: 1 },
            { position: 'DF', name: 'Juanlu', number: 26 },
            { position: 'DF', name: 'Marcao', number: 4 },
            { position: 'MF', name: 'Salas', number: 17 },
            { position: 'MF', name: 'Suso', number: 7 },
            { position: 'FW', name: 'Peque', number: 18 },
            { position: 'FW', name: 'Romero', number: 21 }
        ]
    },
    'Valencia CF': {
        formation: '4-4-2',
        startingXI: [
            { position: 'GK', name: 'Mamardashvili', number: 25 },
            { position: 'RB', name: 'Foulquier', number: 20 },
            { position: 'CB', name: 'Mosquera', number: 3 },
            { position: 'CB', name: 'Tarrega', number: 15 },
            { position: 'LB', name: 'Vazquez', number: 21 },
            { position: 'RM', name: 'Lopez', number: 16 },
            { position: 'CM', name: 'Pepelu', number: 18 },
            { position: 'CM', name: 'Guillamon', number: 6 },
            { position: 'LM', name: 'Rioja', number: 22 },
            { position: 'ST', name: 'Hugo Duro', number: 19 },
            { position: 'ST', name: 'Almeida', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Dimitrievski', number: 13 },
            { position: 'DF', name: 'Correia', number: 2 },
            { position: 'DF', name: 'Gasiorowski', number: 24 },
            { position: 'MF', name: 'Guerra', number: 8 },
            { position: 'MF', name: 'Barrenechea', number: 5 },
            { position: 'FW', name: 'Mir', number: 17 },
            { position: 'FW', name: 'Mari', number: 11 }
        ]
    },
    'West Ham United': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Areola', number: 23 },
            { position: 'RB', name: 'Coufal', number: 5 },
            { position: 'CB', name: 'Mavropanos', number: 15 },
            { position: 'CB', name: 'Kilman', number: 26 },
            { position: 'LB', name: 'Emerson', number: 33 },
            { position: 'CDM', name: 'Rodriguez', number: 24 },
            { position: 'CDM', name: 'Alvarez', number: 19 },
            { position: 'CAM', name: 'Paqueta', number: 10 },
            { position: 'RW', name: 'Bowen', number: 20 },
            { position: 'ST', name: 'Antonio', number: 9 },
            { position: 'LW', name: 'Kudus', number: 14 }
        ],
        substitutes: [
            { position: 'GK', name: 'Fabianski', number: 1 },
            { position: 'DF', name: 'Wan-Bissaka', number: 29 },
            { position: 'DF', name: 'Cresswell', number: 3 },
            { position: 'MF', name: 'Soucek', number: 28 },
            { position: 'MF', name: 'Soler', number: 4 },
            { position: 'FW', name: 'Ings', number: 18 },
            { position: 'FW', name: 'Summerville', number: 7 }
        ]
    },
    'Leicester City': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Hermansen', number: 30 },
            { position: 'RB', name: 'Justin', number: 2 },
            { position: 'CB', name: 'Faes', number: 3 },
            { position: 'CB', name: 'Vestergaard', number: 23 },
            { position: 'LB', name: 'Kristiansen', number: 16 },
            { position: 'CDM', name: 'Winks', number: 8 },
            { position: 'CM', name: 'Ndidi', number: 25 },
            { position: 'CM', name: 'Dewsbury-Hall', number: 22 },
            { position: 'RW', name: 'Fatawu', number: 18 },
            { position: 'ST', name: 'Vardy', number: 9 },
            { position: 'LW', name: 'Mavididi', number: 10 }
        ],
        substitutes: [
            { position: 'GK', name: 'Ward', number: 1 },
            { position: 'DF', name: 'Coady', number: 4 },
            { position: 'DF', name: 'Pereira', number: 21 },
            { position: 'MF', name: 'Soumaré', number: 24 },
            { position: 'MF', name: 'El Khannouss', number: 11 },
            { position: 'FW', name: 'Buonanotte', number: 40 },
            { position: 'FW', name: 'Daka', number: 20 }
        ]
    },
    'Olympique Lyon': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Perri', number: 1 },
            { position: 'RB', name: 'Maitland-Niles', number: 98 },
            { position: 'CB', name: 'Caleta-Car', number: 55 },
            { position: 'CB', name: 'Niakhate', number: 19 },
            { position: 'LB', name: 'Tagliafico', number: 3 },
            { position: 'CDM', name: 'Matic', number: 31 },
            { position: 'CM', name: 'Veretout', number: 7 },
            { position: 'CM', name: 'Tolisso', number: 8 },
            { position: 'RW', name: 'Cherki', number: 18 },
            { position: 'ST', name: 'Lacazette', number: 10 },
            { position: 'LW', name: 'Fofana', number: 11 }
        ],
        substitutes: [
            { position: 'GK', name: 'Lopes', number: 35 },
            { position: 'DF', name: 'Kumbedi', number: 20 },
            { position: 'DF', name: 'Mata', number: 22 },
            { position: 'MF', name: 'Caqueret', number: 6 },
            { position: 'MF', name: 'Tessmann', number: 23 },
            { position: 'FW', name: 'Nuamah', number: 27 },
            { position: 'FW', name: 'Mikautadze', number: 69 }
        ]
    },
    'Marseille': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Rulli', number: 1 },
            { position: 'RB', name: 'Lirola', number: 29 },
            { position: 'CB', name: 'Balerdi', number: 5 },
            { position: 'CB', name: 'Cornelius', number: 20 },
            { position: 'LB', name: 'Murillo', number: 62 },
            { position: 'CDM', name: 'Rongier', number: 21 },
            { position: 'CM', name: 'Kondogbia', number: 19 },
            { position: 'CM', name: 'Harit', number: 11 },
            { position: 'RW', name: 'Greenwood', number: 10 },
            { position: 'ST', name: 'Maupay', number: 8 },
            { position: 'LW', name: 'Luis Henrique', number: 44 }
        ],
        substitutes: [
            { position: 'GK', name: 'De Lange', number: 36 },
            { position: 'DF', name: 'Brassier', number: 20 },
            { position: 'DF', name: 'Merlin', number: 3 },
            { position: 'MF', name: 'Hojbjerg', number: 23 },
            { position: 'MF', name: 'Rabiot', number: 25 },
            { position: 'FW', name: 'Rowe', number: 17 },
            { position: 'FW', name: 'Wahi', number: 9 }
        ]
    },
    'Monaco': {
        formation: '4-2-3-1',
        startingXI: [
            { position: 'GK', name: 'Majecki', number: 1 },
            { position: 'RB', name: 'Vanderson', number: 2 },
            { position: 'CB', name: 'Singo', number: 17 },
            { position: 'CB', name: 'Salisu', number: 22 },
            { position: 'LB', name: 'Caio Henrique', number: 12 },
            { position: 'CDM', name: 'Camara', number: 4 },
            { position: 'CDM', name: 'Zakaria', number: 6 },
            { position: 'CAM', name: 'Minamino', number: 18 },
            { position: 'RW', name: 'Akliouche', number: 11 },
            { position: 'ST', name: 'Embolo', number: 10 },
            { position: 'LW', name: 'Ben Seghir', number: 7 }
        ],
        substitutes: [
            { position: 'GK', name: 'Kohn', number: 16 },
            { position: 'DF', name: 'Mawissa', number: 13 },
            { position: 'DF', name: 'Kehrer', number: 5 },
            { position: 'MF', name: 'Magassa', number: 88 },
            { position: 'MF', name: 'Golovin', number: 17 },
            { position: 'FW', name: 'Ilenikhena', number: 21 },
            { position: 'FW', name: 'Balogun', number: 9 }
        ]
    },
    'Shakhtar Donetsk': {
        formation: '4-3-3',
        startingXI: [
            { position: 'GK', name: 'Riznyk', number: 31 },
            { position: 'RB', name: 'Konoplya', number: 26 },
            { position: 'CB', name: 'Bondar', number: 5 },
            { position: 'CB', name: 'Matvienko', number: 22 },
            { position: 'LB', name: 'Azarovi', number: 13 },
            { position: 'CDM', name: 'Stepanenko', number: 6 },
            { position: 'CM', name: 'Kryskiv', number: 8 },
            { position: 'CM', name: 'Sudakov', number: 10 },
            { position: 'RW', name: 'Zubkov', number: 11 },
            { position: 'ST', name: 'Sikan', number: 14 },
            { position: 'LW', name: 'Kevin', number: 15 }
        ],
        substitutes: [
            { position: 'GK', name: 'Tvardovskyi', number: 72 },
            { position: 'DF', name: 'Lemkin', number: 32 },
            { position: 'DF', name: 'Pedrinho', number: 38 },
            { position: 'MF', name: 'Bondarenko', number: 21 },
            { position: 'MF', name: 'Newertton', number: 7 },
            { position: 'FW', name: 'Eguinaldo', number: 2 },
            { position: 'FW', name: 'Traore', number: 27 }
        ]
    }
};
