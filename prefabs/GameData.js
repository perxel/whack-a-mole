class GameData{
    constructor(){
    }

    getSettings(){
        // these are settings that admin can modify
        const settings = {
            game_duration: 10 * 1000,// total time of each try [ms]
            character_per_wave: 1, // number of characters could appear in one wave
            wave_duration: 2300, // duration of each wave [ms]
            character_show_duration: 300, // [ms]
            character_idle_duration: 2000, // [ms]
            character_hide_duration: 300 // [ms]
        };

        return settings;
    }

    getConfig(){
        // these are game config that dev can modify
        const config = {
            /** Hole **/
            hole_size: 150,
            hole_scale: 0.8,
            hole_sprite_y: 60,
            hole_gap: 100, // [px]
            hole_space: 30, // [px]

            /** Character **/
            character_width: 220,
            character_y: 80,
            character_hide_y: 80 * 4, // character_y * 4

            /** Hit area **/
            hit_width: 220, // character_width
            hit_height: 220 * 1.3, // hit_width * n
            hit_x: 220 * 0.67, // character_width * n
            hit_y: 220, // character_width

        };

        /** Responsive config **/
        if(window.matchMedia("(max-width:480px)").matches){
            config.hole_size = 90;
            config.hole_scale = 0.4;
            config.hole_sprite_y = 35;
            config.hole_gap = 20;
            config.hole_space = 30;

            config.character_width = 120;
            config.character_y = 50;

            config.hit_x = config.character_width * 1.1;
            config.hit_y = config.character_width * 1.5;
        }else if(window.matchMedia("(max-width:768px)").matches){
            config.hole_size = 120;
            config.hole_scale = 0.55;
            config.hole_sprite_y = 48;
            config.hole_gap = 40;
            config.hole_space = 40;

            config.character_width = 150;
            config.character_y = 65;

            config.hit_x = config.character_width * 0.9;
            config.hit_y = config.character_width * 1.25;
        }

        return config;
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