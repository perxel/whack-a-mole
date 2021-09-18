class GameData{
    constructor(){
    }

    getGameSettings(){
        const settings = {
            game_duration: 300 * 1000,
            character_per_wave: 1,
            wave_duration: 2300,
            character_show_duration: 300,
            character_idle_duration: 2000,
            character_hide_duration: 300
        };

        const GAME_DURATION = 300 * 1000; // [ms]
        const CHARACTER_PER_WAVE = 1;
        const WAVE_TIME = 2300; // [ms]
        const CHARACTER_SHOW = 300; // [ms]
        const CHARACTER_IDLE = 2000; // [ms]
        const CHARACTER_HIDE = 300; // [ms]
        return settings;
    }

    getCharacters(characterID){
        const characters = [
            {
                "id": 1,
                "name": "1",
                "point": 10,
                "rare_level": 0.18,
                "sprite_name": "1"
            },
            {
                "id": 2,
                "name": "2",
                "point": 20,
                "rare_level": 0.16,
                "sprite_name": "2"
            },
            {
                "id": 3,
                "name": "3",
                "point": 30,
                "rare_level": 0.15,
                "sprite_name": "3"
            },
            {
                "id": 4,
                "name": "4",
                "point": 40,
                "rare_level": 0.13,
                "sprite_name": "4"
            },
            {
                "id": 5,
                "name": "5",
                "point": 50,
                "rare_level": 0.10,
                "sprite_name": "5"
            },
            {
                "id": 6,
                "name": "6",
                "point": 60,
                "rare_level": 0.09,
                "sprite_name": "6"
            },
            {
                "id": 7,
                "name": "7",
                "point": 80,
                "rare_level": 0.07,
                "sprite_name": "7"
            },
            {
                "id": 8,
                "name": "8",
                "point": 80,
                "rare_level": 0.06,
                "sprite_name": "8"
            },
            {
                "id": 9,
                "name": "9",
                "point": 90,
                "rare_level": 0.04,
                "sprite_name": "9"
            },
            {
                "id": 10,
                "name": "10",
                "point": 100,
                "rare_level": 0.02,
                "sprite_name": "10"
            },
            {
                "id": 11,
                "name": "Bomb",
                "point": -50,
                "rare_level": 0.15,
                "sprite_name": "bomb"
            }
        ]

        if(typeof characterID !== 'undefined'){
            return getObjectInArray(characters, 'id', parseInt(characterID));
        }else{
            return characterID;
        }
    }

    getLevels(levelID){
        const levels = [
            {
                "id": 1,
                "name": "1",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/1.jpg",
                "mobile_bg_url": "assets/img/backgrounds/1-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [2]
            },
            {
                "id": 2,
                "name": "2",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/2.jpg",
                "mobile_bg_url": "assets/img/backgrounds/2-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [3]
            },
            {
                "id": 3,
                "name": "3",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/3.jpg",
                "mobile_bg_url": "assets/img/backgrounds/3-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [4]
            },
            {
                "id": 4,
                "name": "4",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/4.jpg",
                "mobile_bg_url": "assets/img/backgrounds/4-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [5]
            },
            {
                "id": 5,
                "name": "5",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/5.jpg",
                "mobile_bg_url": "assets/img/backgrounds/5-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [6]
            },
            {
                "id": 6,
                "name": "6",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/6.jpg",
                "mobile_bg_url": "assets/img/backgrounds/6-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [7]
            },
            {
                "id": 7,
                "name": "7",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/7.jpg",
                "mobile_bg_url": "assets/img/backgrounds/7-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [8]
            },
            {
                "id": 8,
                "name": "8",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/8.jpg",
                "mobile_bg_url": "assets/img/backgrounds/8-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [9]
            },
            {
                "id": 9,
                "name": "9",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/9.jpg",
                "mobile_bg_url": "assets/img/backgrounds/9-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": [10]
            },
            {
                "id": 10,
                "name": "10",
                "require_point": 0,
                "desktop_bg_url": "assets/img/backgrounds/10.jpg",
                "mobile_bg_url": "assets/img/backgrounds/10-m.jpg",
                "characters": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "next_level": []
            },
        ];

        if(typeof levelID !== 'undefined'){
            return getObjectInArray(levels, 'id', parseInt(levelID));
        }else{
            return levels;
        }
    }
}