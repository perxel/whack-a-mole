class GameData{
    constructor(){
    }


    /**
     * Game settings
     * @note these are settings that admin can modify
     * @returns {{}}
     */
    getSettings(){
        const settings = {
            game_duration: 60 * 1000,// total time of each try [ms]
            character_per_wave: 1, // number of characters could appear in one wave
            wave_duration: 2300, // Duration of each wave [ms]
            character_show_duration: 300, // [ms]
            character_idle_duration: 2000, // [ms]
            character_hurt_duration: 600, // [ms]
            character_hide_duration: 300 // [ms]
        };

        return settings;
    }

    /**
     * Game configurations
     * @note these are game config that dev can modify
     * @returns {{}|*}
     */
    getConfig(){
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

            /** Mobile **/
            background_breakpoint: 768, // change background on this breakpoint

            /** Responsive config **/
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        hole_size: 90,
                        hole_scale: 0.4,
                        hole_sprite_y: 35,
                        hole_gap: 20,
                        hole_space: 30,

                        character_width: 120,
                        character_y: 50,

                        hit_x: 120 * 1.1,
                        hit_y: 120 * 1.5,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        hole_size: 120,
                        hole_scale: 0.55,
                        hole_sprite_y: 48,
                        hole_gap: 40,
                        hole_space: 40,

                        character_width: 150,
                        character_y: 65,

                        hit_x: 150 * 0.9,
                        hit_y: 150 * 1.25,
                    }
                }
            ]
        };

        // return config base on responsive
        return getResponsiveData(config).settings;
    }


    /**
     * Game character
     * @param characterID
     * @returns {*}
     */
    getCharacters(characterID){
        const characters = [
            {
                "id": 1,
                "name": "1",
                "point": 10,
                "rare_level": 0.18,
                "sprite_name": "1",
                "hurt_sound_url": "assets/audio/head-explode.mp3",
            },
            {
                "id": 2,
                "name": "2",
                "point": 20,
                "rare_level": 0.16,
                "sprite_name": "2",
                "hurt_sound_url": "assets/audio/goblin-vomit.mp3",
            },
            {
                "id": 3,
                "name": "3",
                "point": 30,
                "rare_level": 0.15,
                "sprite_name": "3",
                "hurt_sound_url": "assets/audio/woman-hey.mp3",
            },
            {
                "id": 4,
                "name": "4",
                "point": 40,
                "rare_level": 0.13,
                "sprite_name": "4",
                "hurt_sound_url": "assets/audio/male-ouch.mp3",
            },
            {
                "id": 5,
                "name": "5",
                "point": 50,
                "rare_level": 0.10,
                "sprite_name": "5",
                "hurt_sound_url": "assets/audio/goblin-vomit.mp3",
            },
            {
                "id": 6,
                "name": "6",
                "point": 60,
                "rare_level": 0.09,
                "sprite_name": "6",
                "hurt_sound_url": "assets/audio/male-kidding-me.mp3",
            },
            {
                "id": 7,
                "name": "7",
                "point": 80,
                "rare_level": 0.07,
                "sprite_name": "7",
                "hurt_sound_url": "assets/audio/woman-why.mp3",
            },
            {
                "id": 8,
                "name": "8",
                "point": 80,
                "rare_level": 0.06,
                "sprite_name": "8",
                "hurt_sound_url": "assets/audio/woman-screaming.mp3",
            },
            {
                "id": 9,
                "name": "9",
                "point": 90,
                "rare_level": 0.04,
                "sprite_name": "9",
                "hurt_sound_url": "assets/audio/woman-why.mp3",
            },
            {
                "id": 10,
                "name": "10",
                "point": 100,
                "rare_level": 0.02,
                "sprite_name": "10",
                "hurt_sound_url": "assets/audio/woman-screaming.mp3",
            },
            {
                "id": 11,
                "name": "Bomb",
                "point": -50,
                "rare_level": 0.15,
                "sprite_name": "bomb",
                "hurt_sound_url": "assets/audio/boom.mp3",
            }
        ]

        if(typeof characterID !== 'undefined'){
            return getObjectInArray(characters, 'id', parseInt(characterID));
        }else{
            return characters;
        }
    }


    /**
     * Game levels
     * @param levelID
     * @returns {{}}
     */
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


    /**
     * Hammers
     * @param hammerID
     * @returns {*}
     */
    getHammers(hammerID){
        const hammers = [
            {
                id: 1,
                display_name: 'POWER: X1',
                display_image_url: 'assets/img/hammers/1.png',
                attack_sound_url: 'assets/audio/zap.mp3',
                whack_cost: 5,
                usage_gain: 5,
                sprite_name: '1',
                multiplier: 1
            },
            {
                id: 2,
                display_name: 'POWER: X2',
                display_image_url: 'assets/img/hammers/2.png',
                attack_sound_url: 'assets/audio/electric-zap.mp3',
                whack_cost: 10,
                usage_gain: 5,
                sprite_name: '2',
                multiplier: 2
            },
            {
                id: 3,
                display_name: 'POWER: X3',
                display_image_url: 'assets/img/hammers/3.png',
                attack_sound_url: 'assets/audio/zap.mp3',
                whack_cost: 20,
                usage_gain: 5,
                sprite_name: '3',
                multiplier: 3
            },
            {
                id: 4,
                display_name: 'POWER: X4',
                display_image_url: 'assets/img/hammers/4.png',
                attack_sound_url: 'assets/audio/hammer-flesh.mp3',
                whack_cost: 30,
                usage_gain: 5,
                sprite_name: '4',
                multiplier: 4
            },
            {
                id: 5,
                display_name: 'POWER: X5',
                display_image_url: 'assets/img/hammers/5.png',
                attack_sound_url: 'assets/audio/electric-zap.mp3',
                whack_cost: 50,
                usage_gain: 5,
                sprite_name: '5',
                multiplier: 5
            },
        ];

        if(typeof hammerID !== 'undefined'){
            return getObjectInArray(hammers, 'id', parseInt(hammerID));
        }else{
            return hammers;
        }
    }
}