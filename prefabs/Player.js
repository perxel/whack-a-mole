class Player{
    constructor(config = {}){
        this.uuid = config.uuid || generateID();
        this.display_name = config.display_name || "Andy";
        this.unlocked_level = config.unlocked_level || [
            {
                "id": 1,
                "timestamp": "",
                "turn_played": 0,
            },
            {
                "id": 2
            },
            {
                "id": 3
            }
        ];

        this.turn_left = config.turn_left || 10;
        this.turn_played = config.turn_played || 0;
        this.score_history = config.score_history || []; // {"score": 0, "level_id": 1, "timestamp": ""}
        this.high_score = config.high_score || 0;
        this.whack_coin = config.whack_coin || 0;
        this.wup_coin = config.wup_coin || 0;
        this.game_settings = config.game_settings || {
            music: false,
            music_vol: 0.5,
            sound_fx: true,
            sound_fx_vol: 0.5,
        };
        this.shopping_history = config.shopping_history || [
            {
                "item_id": "",
                "whack_paid": 0,
                "wup_paid": 0,
                "timestamp": "",
            }
        ];
    }

    get(){
        return this;
    }

    getLevels(){
        return this.unlocked_level;
    }

    getCharacterIDsByLevelID(levelID){
        levelID = parseInt(levelID);

        // check if player has unlocked this level
        if(getObjectInArray(this.unlocked_level, 'id', levelID) !== 'undefined'){
            return new GameData().getLevels(levelID).characters;
        }

        return false;
    }

    setScoreHistory(totalPoint, levelID){
        if(typeof totalPoint !== 'undefined'){
            // save new score
            this.score_history.push({
                "score": totalPoint,
                "level_id": parseInt(levelID),
                "timestamp": new Date(),
            });

            if(totalPoint > this.high_score){
                // update high score
                this.high_score = totalPoint;
                if(DEV) console.log('New high score', this.high_score);
            }else{
                if(DEV) console.log('New score', totalPoint);
            }
        }
    }

    getHighScore(){
        return this.high_score;
    }

    getScoreHistory(){
        return this.score_history;
    }
}