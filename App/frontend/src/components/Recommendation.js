import React, { useState, useEffect } from 'react'
import './Recommendation.css'

function Recommendation() {

    const id_name_pair = [{'game_id': '1055540', 'game_name': 'A Short Hike'},
                            {'game_id': '105600', 'game_name': 'Terraria'},
                            {'game_id': '1056960', 'game_name': 'Wolfenstein: Youngblood'},
                            {'game_id': '107410', 'game_name': 'Arma 3'},
                            {'game_id': '113200', 'game_name': 'The Binding of Isaac'},
                            {'game_id': '200900', 'game_name': 'Cave Story+'},
                            {'game_id': '203160', 'game_name': 'Tomb Raider'},
                            {'game_id': '204360', 'game_name': 'Castle Crashers'},
                            {'game_id': '205100', 'game_name': 'Dishonored'},
                            {'game_id': '206190', 'game_name': 'Gunpoint'},
                            {'game_id': '206440', 'game_name': 'To the Moon'},
                            {'game_id': '212680', 'game_name': 'FTL: Faster Than Light'},
                            {'game_id': '213670', 'game_name': 'South Park™: The Stick of Truth™'},
                            {'game_id': '214560', 'game_name': 'Mark of the Ninja'},
                            {'game_id': '214950', 'game_name': 'Total War: ROME II - Emperor Edition'},
                            {'game_id': '218620', 'game_name': 'PAYDAY 2'},
                            {'game_id': '219150', 'game_name': 'Hotline Miami'},
                            {'game_id': '219740', 'game_name': "Don't Starve"},
                            {'game_id': '221380', 'game_name': 'Age of Empires II (2013)'},
                            {'game_id': '221640', 'game_name': 'Super Hexagon'},
                            {'game_id': '225540', 'game_name': 'Just Cause 3'},
                            {'game_id': '227300', 'game_name': 'Euro Truck Simulator 2'},
                            {'game_id': '233860', 'game_name': 'Kenshi'},
                            {'game_id': '236850', 'game_name': 'Europa Universalis IV'},
                            {'game_id': '238320', 'game_name': 'Outlast'},
                            {'game_id': '238460', 'game_name': 'BattleBlock Theater'},
                            {'game_id': '239030', 'game_name': 'Papers, Please'},
                            {'game_id': '239140', 'game_name': 'Dying Light'},
                            {'game_id': '240', 'game_name': 'Counter-Strike: Source'},
                            {'game_id': '240', 'game_name': 'and 360 mm radiators'},
                            {'game_id': '240720', 'game_name': 'Getting Over It with Bennett Foddy'},
                            {'game_id': '242760', 'game_name': 'The Forest'},
                            {'game_id': '242920', 'game_name': 'Banished'},
                            {'game_id': '247240', 'game_name': 'Volgarr the Viking'},
                            {'game_id': '247730', 'game_name': 'Nether'},
                            {'game_id': '250320', 'game_name': 'The Wolf Among Us'},
                            {'game_id': '250760', 'game_name': 'Shovel Knight: Treasure Trove'},
                            {'game_id': '250900', 'game_name': 'The Binding of Isaac: Rebirth'},
                            {'game_id': '252490', 'game_name': 'Rust'},
                            {'game_id': '252950', 'game_name': 'Rocket League'},
                            {'game_id': '253230', 'game_name': 'A Hat in Time'},
                            {'game_id': '255710', 'game_name': 'Cities: Skylines'},
                            {'game_id': '258180', 'game_name': 'Deus Ex: The Fall'},
                            {'game_id': '262060', 'game_name': 'Darkest Dungeon®'},
                            {'game_id': '264200', 'game_name': 'One Finger Death Punch'},
                            {'game_id': '264710', 'game_name': 'Subnautica'},
                            {'game_id': '268500', 'game_name': 'XCOM 2'},
                            {'game_id': '268910', 'game_name': 'Cuphead'},
                            {'game_id': '269950', 'game_name': 'X-Plane 11'},
                            {'game_id': '270880', 'game_name': 'American Truck Simulator'},
                            {'game_id': '271590', 'game_name': 'Grand Theft Auto V'},
                            {'game_id': '272270', 'game_name': 'Torment: Tides of Numenera'},
                            {'game_id': '274190', 'game_name': 'Broforce'},
                            {'game_id': '275390',
                            'game_name': 'Guacamelee! Super Turbo Championship Edition'},
                            {'game_id': '275850', 'game_name': "No Man's Sky"},
                            {'game_id': '281990', 'game_name': 'Stellaris'},
                            {'game_id': '282560', 'game_name': 'RollerCoaster Tycoon World'},
                            {'game_id': '283640', 'game_name': 'Salt and Sanctuary'},
                            {'game_id': '284160', 'game_name': 'BeamNG.drive'},
                            {'game_id': '285190', 'game_name': 'Warhammer 40,000: Dawn of War III'},
                            {'game_id': '286160', 'game_name': 'Tabletop Simulator'},
                            {'game_id': '288160', 'game_name': 'The Room'},
                            {'game_id': '289070', 'game_name': "Sid Meier's Civilization VI"},
                            {'game_id': '291860', 'game_name': 'Pit People'},
                            {'game_id': '292030', 'game_name': 'The Witcher 3: Wild Hunt'},
                            {'game_id': '292730', 'game_name': 'Call of Duty: Infinite Warfare'},
                            {'game_id': '294100', 'game_name': 'RimWorld'},
                            {'game_id': '297130', 'game_name': 'Titan Souls'},
                            {'game_id': '304390', 'game_name': 'For Honor'},
                            {'game_id': '306130', 'game_name': 'The Elder Scrolls Online'},
                            {'game_id': '311690', 'game_name': 'Enter the Gungeon'},
                            {'game_id': '312530', 'game_name': 'Duck Game'},
                            {'game_id': '312660', 'game_name': 'Sniper Elite 4'},
                            {'game_id': '322110', 'game_name': '20XX'},
                            {'game_id': '322330', 'game_name': "Don't Starve Together"},
                            {'game_id': '323190', 'game_name': 'Frostpunk'},
                            {'game_id': '32470', 'game_name': 'STAR WARS™ Empire at War: Gold Pack'},
                            {'game_id': '332200', 'game_name': 'Axiom Verge'},
                            {'game_id': '337340', 'game_name': 'Finding Paradise'},
                            {'game_id': '339800', 'game_name': 'HuniePop'},
                            {'game_id': '341800', 'game_name': 'Keep Talking and Nobody Explodes'},
                            {'game_id': '346110', 'game_name': 'ARK: Survival Evolved'},
                            {'game_id': '35140', 'game_name': 'Batman: Arkham Asylum GOTY Edition'},
                            {'game_id': '352550', 'game_name': 'Urban Empire'},
                            {'game_id': '355790', 'game_name': 'Styx: Shards of Darkness'},
                            {'game_id': '356190', 'game_name': 'Middle-earth™: Shadow of War™'},
                            {'game_id': '357190', 'game_name': 'Ultimate Marvel vs. Capcom 3'},
                            {'game_id': '359550', 'game_name': "Tom Clancy's Rainbow Six Siege"},
                            {'game_id': '362890', 'game_name': 'Black Mesa'},
                            {'game_id': '364360', 'game_name': 'Total War: WARHAMMER'},
                            {'game_id': '367520', 'game_name': 'Hollow Knight'},
                            {'game_id': '374320', 'game_name': 'DARK SOULS™ III'},
                            {'game_id': '377160', 'game_name': 'Fallout 4'},
                            {'game_id': '379430', 'game_name': 'Kingdom Come: Deliverance'},
                            {'game_id': '379720', 'game_name': 'DOOM'},
                            {'game_id': '381210', 'game_name': 'Dead by Daylight'},
                            {'game_id': '382310', 'game_name': 'Eco'},
                            {'game_id': '385560', 'game_name': 'Shadow Complex Remastered'},
                            {'game_id': '390340', 'game_name': 'Umbrella Corps'},
                            {'game_id': '391220', 'game_name': 'Rise of the Tomb Raider'},
                            {'game_id': '391540', 'game_name': 'Undertale'},
                            {'game_id': '39210', 'game_name': 'FINAL FANTASY XIV Online'},
                            {'game_id': '393520', 'game_name': 'Iconoclasts'},
                            {'game_id': '394360', 'game_name': 'Hearts of Iron IV'},
                            {'game_id': '4000', 'game_name': "Garry's Mod"},
                            {'game_id': '400940', 'game_name': 'Budget Cuts'},
                            {'game_id': '405710', 'game_name': 'Staxel'},
                            {'game_id': '40800', 'game_name': 'Super Meat Boy'},
                            {'game_id': '412830', 'game_name': 'STEINS;GATE'},
                            {'game_id': '413150', 'game_name': 'Stardew Valley'},
                            {'game_id': '413410', 'game_name': 'Danganronpa: Trigger Happy Havoc'},
                            {'game_id': '413420', 'game_name': 'Danganronpa 2: Goodbye Despair'},
                            {'game_id': '417290', 'game_name': 'Ghost of a Tale'},
                            {'game_id': '418370', 'game_name': 'Resident Evil 7 Biohazard'},
                            {'game_id': '420', 'game_name': 'Half-Life 2: Episode Two'},
                            {'game_id': '420', 'game_name': '360/10"'},
                            {'game_id': '420',
                            'game_name': '666/10 would create my own horror movie again'},
                            {'game_id': '420290', 'game_name': 'Blackwake'},
                            {'game_id': '420530', 'game_name': 'OneShot'},
                            {'game_id': '421020', 'game_name': 'DiRT 4'},
                            {'game_id': '424840', 'game_name': 'Little Nightmares'},
                            {'game_id': '425580', 'game_name': 'The Room Two'},
                            {'game_id': '427290', 'game_name': 'Vampyr'},
                            {'game_id': '427520', 'game_name': 'Factorio'},
                            {'game_id': '428550', 'game_name': 'Momodora: Reverie Under the Moonlight'},
                            {'game_id': '428690', 'game_name': 'Youtubers Life'},
                            {'game_id': '429660', 'game_name': 'Tales of Berseria'},
                            {'game_id': '431960', 'game_name': 'Wallpaper Engine'},
                            {'game_id': '433340', 'game_name': 'Slime Rancher'},
                            {'game_id': '435150', 'game_name': 'Divinity: Original Sin 2'},
                            {'game_id': '440900', 'game_name': 'Conan Exiles'},
                            {'game_id': '445220', 'game_name': 'Avorion'},
                            {'game_id': '447040', 'game_name': 'Watch_Dogs 2'},
                            {'game_id': '447530',
                            'game_name': 'VA-11 Hall-A: Cyberpunk Bartender Action'},
                            {'game_id': '447820', 'game_name': 'Day of Infamy'},
                            {'game_id': '457140', 'game_name': 'Oxygen Not Included'},
                            {'game_id': '460930', 'game_name': "Tom Clancy's Ghost Recon® Wildlands"},
                            {'game_id': '464920', 'game_name': 'Surviving Mars'},
                            {'game_id': '466560', 'game_name': 'Northgard'},
                            {'game_id': '476600', 'game_name': 'Call of Duty: WWII'},
                            {'game_id': '477160', 'game_name': 'Human: Fall Flat'},
                            {'game_id': '47890', 'game_name': 'The Sims(TM) 3'},
                            {'game_id': '481510', 'game_name': 'Night in the Woods'},
                            {'game_id': '485510', 'game_name': 'Nioh: Complete Edition'},
                            {'game_id': '48700', 'game_name': 'Mount & Blade: Warband'},
                            {'game_id': '489830',
                            'game_name': 'The Elder Scrolls V: Skyrim Special Edition'},
                            {'game_id': '489940', 'game_name': 'BATTALION 1944'},
                            {'game_id': '493340', 'game_name': 'Planet Coaster'},
                            {'game_id': '495560', 'game_name': 'Farm Manager 2018'},
                            {'game_id': '501080', 'game_name': 'Fishing: Barents Sea'},
                            {'game_id': '502280', 'game_name': 'BERSERK and the Band of the Hawk'},
                            {'game_id': '502800', 'game_name': 'SENRAN KAGURA ESTIVAL VERSUS'},
                            {'game_id': '503940', 'game_name': 'Railway Empire'},
                            {'game_id': '504230', 'game_name': 'Celeste'},
                            {'game_id': '508440', 'game_name': 'Totally Accurate Battle Simulator'},
                            {'game_id': '510510', 'game_name': 'WWE 2K17'},
                            {'game_id': '512900', 'game_name': 'Streets of Rogue'},
                            {'game_id': '513710', 'game_name': 'SCUM'},
                            {'game_id': '517630', 'game_name': 'Just Cause 4'},
                            {'game_id': '518790', 'game_name': 'theHunter: Call of the Wild™'},
                            {'game_id': '519860', 'game_name': 'DUSK'},
                            {'game_id': '524220', 'game_name': 'NieR:Automata™'},
                            {'game_id': '524580', 'game_name': 'Fairy Fencer F Advent Dark Force'},
                            {'game_id': '526160', 'game_name': 'The Wild Eight'},
                            {'game_id': '527230', 'game_name': 'For The King'},
                            {'game_id': '530070', 'game_name': 'Train Sim World® 2020'},
                            {'game_id': '535930', 'game_name': 'Two Point Hospital'},
                            {'game_id': '537800', 'game_name': 'Bomber Crew'},
                            {'game_id': '541210', 'game_name': 'Cold Waters'},
                            {'game_id': '543460', 'game_name': 'Dead Rising 4'},
                            {'game_id': '543900', 'game_name': 'METAL GEAR SURVIVE'},
                            {'game_id': '544750', 'game_name': 'SOULCALIBUR VI'},
                            {'game_id': '546050', 'game_name': 'Puyo Puyo™Tetris® '},
                            {'game_id': '548430', 'game_name': 'Deep Rock Galactic'},
                            {'game_id': '55230', 'game_name': 'Saints Row: The Third'},
                            {'game_id': '552500', 'game_name': 'Warhammer: Vermintide 2'},
                            {'game_id': '552520', 'game_name': 'Far Cry 5'},
                            {'game_id': '555220', 'game_name': 'Detention'},
                            {'game_id': '560130', 'game_name': 'Pillars of Eternity II: Deadfire'},
                            {'game_id': '569860', 'game_name': 'Thimbleweed Park'},
                            {'game_id': '570940', 'game_name': 'DARK SOULS™: REMASTERED'},
                            {'game_id': '571740', 'game_name': 'Golf It!'},
                            {'game_id': '572410', 'game_name': 'Steel Division: Normandy 44'},
                            {'game_id': '574050', 'game_name': 'DRAGON QUEST HEROES™ II'},
                            {'game_id': '577800', 'game_name': 'NBA 2K18'},
                            {'game_id': '578080', 'game_name': "PLAYERUNKNOWN'S BATTLEGROUNDS"},
                            {'game_id': '581320', 'game_name': 'Insurgency: Sandstorm'},
                            {'game_id': '582010', 'game_name': 'Monster Hunter: World'},
                            {'game_id': '582160', 'game_name': "Assassin's Creed Origins"},
                            {'game_id': '582660', 'game_name': 'Black Desert Online'},
                            {'game_id': '583470', 'game_name': 'The End Is Nigh'},
                            {'game_id': '583950', 'game_name': 'Artifact'},
                            {'game_id': '585420', 'game_name': 'Trailmakers'},
                            {'game_id': '588650', 'game_name': 'Dead Cells'},
                            {'game_id': '589360', 'game_name': 'Ni no Kuni™ II: Revenant Kingdom'},
                            {'game_id': '590380', 'game_name': 'Into the Breach'},
                            {'game_id': '593600', 'game_name': 'PixARK'},
                            {'game_id': '594570', 'game_name': 'Total War: WARHAMMER II'},
                            {'game_id': '594650', 'game_name': 'Hunt: Showdown'},
                            {'game_id': '595520', 'game_name': 'FINAL FANTASY XII THE ZODIAC AGE'},
                            {'game_id': '598330', 'game_name': 'SimAirport'},
                            {'game_id': '606280', 'game_name': 'Darksiders III'},
                            {'game_id': '609320', 'game_name': 'FAR: Lone Sails'},
                            {'game_id': '611760', 'game_name': "Don't Escape: 4 Days to Survive"},
                            {'game_id': '613100', 'game_name': 'House Flipper'},
                            {'game_id': '613830', 'game_name': 'CHRONO TRIGGER'},
                            {'game_id': '619290', 'game_name': 'Out of the Park Baseball 19'},
                            {'game_id': '620', 'game_name': 'Portal 2'},
                            {'game_id': '620590', 'game_name': 'Ancestors Legacy'},
                            {'game_id': '620980', 'game_name': 'Beat Saber'},
                            {'game_id': '621060', 'game_name': 'PC Building Simulator'},
                            {'game_id': '626690', 'game_name': 'Sword Art Online: Fatal Bullet'},
                            {'game_id': '629760', 'game_name': 'MORDHAU'},
                            {'game_id': '629910', 'game_name': 'Clicker Heroes 2'},
                            {'game_id': '631510', 'game_name': 'Devil May Cry HD Collection'},
                            {'game_id': '632350',
                            'game_name': 'Cyberdimension Neptunia: 4 Goddesses Online'},
                            {'game_id': '636480', 'game_name': 'Ravenfield'},
                            {'game_id': '637090', 'game_name': 'BATTLETECH'},
                            {'game_id': '637650', 'game_name': 'FINAL FANTASY XV WINDOWS EDITION'},
                            {'game_id': '637670', 'game_name': 'Secret of Mana'},
                            {'game_id': '638970', 'game_name': 'Yakuza 0'},
                            {'game_id': '640820', 'game_name': 'Pathfinder: Kingmaker'},
                            {'game_id': '644560', 'game_name': 'Mirror'},
                            {'game_id': '644930', 'game_name': 'They Are Billions'},
                            {'game_id': '646570', 'game_name': 'Slay the Spire'},
                            {'game_id': '646910', 'game_name': 'The Crew 2'},
                            {'game_id': '648350', 'game_name': 'Jurassic World Evolution'},
                            {'game_id': '648800', 'game_name': 'Raft'},
                            {'game_id': '666140', 'game_name': 'My Time At Portia'},
                            {'game_id': '671440', 'game_name': 'Rise of Industry'},
                            {'game_id': '671510', 'game_name': 'Desolate'},
                            {'game_id': '673880', 'game_name': 'Warhammer 40,000: Mechanicus'},
                            {'game_id': '673950', 'game_name': 'Farm Together'},
                            {'game_id': '677120', 'game_name': 'Heroes of Hammerwatch'},
                            {'game_id': '677160', 'game_name': 'We Were Here Too'},
                            {'game_id': '678950', 'game_name': 'DRAGON BALL FighterZ'},
                            {'game_id': '681660', 'game_name': 'Bless Online'},
                            {'game_id': '683320', 'game_name': 'GRIS'},
                            {'game_id': '686600', 'game_name': 'Rapture Rejects'},
                            {'game_id': '688130', 'game_name': 'Pogostuck: Rage With Your Friends'},
                            {'game_id': '690830', 'game_name': 'Foundation'},
                            {'game_id': '696170', 'game_name': 'SENRAN KAGURA Peach Beach Splash'},
                            {'game_id': '698780', 'game_name': 'Doki Doki Literature Club'},
                            {'game_id': '70', 'game_name': 'Half-Life'},
                            {'game_id': '701160', 'game_name': 'Kingdom Two Crowns'},
                            {'game_id': '704850', 'game_name': 'Thief Simulator'},
                            {'game_id': '712100', 'game_name': 'Total War Saga: Thrones of Britannia'},
                            {'game_id': '723390', 'game_name': 'Hunt Down The Freeman'},
                            {'game_id': '728880', 'game_name': 'Overcooked! 2'},
                            {'game_id': '730310', 'game_name': 'DYNASTY WARRIORS 9'},
                            {'game_id': '731490', 'game_name': 'Crash Bandicoot™ N. Sane Trilogy'},
                            {'game_id': '732810', 'game_name': 'Slipstream'},
                            {'game_id': '736260', 'game_name': 'Baba Is You'},
                            {'game_id': '748490',
                            'game_name': 'The Legend of Heroes: Trails of Cold Steel II'},
                            {'game_id': '7510', 'game_name': 'X-Blades'},
                            {'game_id': '753420', 'game_name': 'Dungreed'},
                            {'game_id': '753650', 'game_name': 'Due Process'},
                            {'game_id': '758190', 'game_name': 'Dragon Cliff 龙崖'},
                            {'game_id': '760060', 'game_name': 'Mutant Year Zero: Road to Eden'},
                            {'game_id': '772540', 'game_name': 'Battle Royale Trainer'},
                            {'game_id': '773951', 'game_name': 'Freeman: Guerrilla Warfare'},
                            {'game_id': '779340', 'game_name': 'Total War: THREE KINGDOMS'},
                            {'game_id': '782330', 'game_name': 'DOOM Eternal'},
                            {'game_id': '787480', 'game_name': 'Phoenix Wright: Ace Attorney Trilogy'},
                            {'game_id': '787860', 'game_name': 'Farming Simulator 19'},
                            {'game_id': '788260', 'game_name': 'Rules Of Survival'},
                            {'game_id': '792990', 'game_name': 'Identity'},
                            {'game_id': '812140', 'game_name': "Assassin's Creed Odyssey"},
                            {'game_id': '814380', 'game_name': 'Sekiro™: Shadows Die Twice'},
                            {'game_id': '817130', 'game_name': 'WWE 2K19'},
                            {'game_id': '823130', 'game_name': 'Totally Accurate Battlegrounds'},
                            {'game_id': '825630', 'game_name': 'STEINS;GATE 0'},
                            {'game_id': '834910', 'game_name': 'ATLAS'},
                            {'game_id': '841370', 'game_name': 'NBA 2K19'},
                            {'game_id': '857980', 'game_name': 'Void Bastards'},
                            {'game_id': '858210', 'game_name': 'Nova Drift'},
                            {'game_id': '863550', 'game_name': 'HITMAN™ 2'},
                            {'game_id': '872790', 'game_name': 'Football Manager 2019'},
                            {'game_id': '883710', 'game_name': 'Resident Evil 2'},
                            {'game_id': '8870', 'game_name': 'BioShock Infinite'},
                            {'game_id': '8930', 'game_name': "Sid Meier's Civilization V"},
                            {'game_id': '899440', 'game_name': 'GOD EATER 3'},
                            {'game_id': '945360', 'game_name': 'Among Us'},
                            {'game_id': '960090', 'game_name': 'Bloons TD 6'}];

    const [steamId, setSteamId] = useState("1055540");
    const [contentRecommendData, setContentRecommendData] = useState([]);
    const [collaborativeRecommendData, setCollaborativeRecommendData] = useState([]);
    const [recommended, setRecommended] = useState(false);

    const changeSteamId = (e) => {
        setSteamId(e.target.value);
    }

    const getRecommendation = () => {
        fetch(`/recommendations/${steamId}`).then(
            res => res.json()
        ).then(
            data => {
                if (data.content_recommendations) {
                    setContentRecommendData(data.content_recommendations);
                }
                if (data.collaborative_recommendations) {
                    setCollaborativeRecommendData(data.collaborative_recommendations);
                }
                console.log(data)
            }
        )
        setRecommended(true);
    }

    useEffect(() => {

    }, [recommended, contentRecommendData,collaborativeRecommendData])

    return (
        <section className="recommendation_section">

        <h2>Game Recommendation</h2>

        <h3>Choose a game:</h3>

        <div className="game_select_box">

            <select name="games" className="games_select" form="games" selected={steamId} onChange={(e) => {changeSteamId(e)}}>
                {
                    id_name_pair.map((pair) => {
                        return (
                            <option value={pair['game_id']}>{pair['game_name']}</option>
                        )
                    })
                }
            </select>

            <button className="game_select_button" onClick={getRecommendation}>Recommend</button>

        </div>

        {
            (recommended)
            ? <div>
                <h3>Recommended Games:</h3>

                <div className="recommended_games_box">

                    <div className="content_recommended_game">

                        <h4>Content-based Recommender</h4>

                        {
                            (contentRecommendData != [])
                            ? <table>
                                <col className="col1" />
                                <col className="col2" />
                                <col className="col3" />
                                <col className="col4" />
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Game ID</th>
                                        <th>Game Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contentRecommendData?.map((game) => {
                                            return (
                                                <tr>
                                                    <td>{game.rank}.</td>
                                                    <td>{game.game_id}</td>
                                                    <td>{game.game_name}</td>
                                                    <td>{game.score} %</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <div className="loading">Loading...</div>
                        }

                    </div>

                    <div className="collaborative_recommended_game">

                        <h4>Collaborative Recommender</h4>

                        {
                            (collaborativeRecommendData != [])
                            ? <table>
                                <col className="col1" />
                                <col className="col2" />
                                <col className="col3" />
                                <col className="col4" />
                                <thead></thead>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Game ID</th>
                                        <th>Game Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        collaborativeRecommendData?.map((game) => {
                                            return (
                                                <tr>
                                                    <td>{game.rank}.</td>
                                                    <td>{game.game_id}</td>
                                                    <td>{game.game_name}</td>
                                                    <td>{game.score} %</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <div className="loading">Loading...</div>
                        }

                    </div>
                </div>
            </div>
            : ""
        }

        </section>
    )
}

export default Recommendation