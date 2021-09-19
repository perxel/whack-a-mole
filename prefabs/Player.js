class Player{
    constructor(config = {}){
        // ID
        this.uuid = config.uuid || generateID();
        this.display_name = config.display_name || "Felix";

        // Game
        this.unlocked_level = config.unlocked_level || [
            {
                id: 1,
                timestamp: "",
                total_turn_played: 0,
            },
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6},
            {id: 7},
            {id: 8},
            {id: 9},
            {id: 10},
        ];
        this.total_turn_played = config.total_turn_played || 0;

        // Score
        this.score_history = config.score_history || []; // {"score": 0, "level_id": 1, "timestamp": ""}
        this.high_score = config.high_score || 0;

        // Hammer
        this.hammer_id = config.hammer_id || undefined; // no hammer by default
        this.hammer_usage_left = config.hammer_usage_left || 0;

        // Coin
        this.whack_coin = config.whack_coin || 100;
        this.wup_coin = config.wup_coin || 0;

        // Setting
        this.game_settings = config.game_settings || {
            music: true,
            music_vol: 0.5,
            sound_fx: true,
            sound_fx_vol: 0.5,
        };

        // Shop
        this.shopping_history = config.shopping_history || [
            {
                "item_id": "",
                "whack_paid": 0,
                "wup_paid": 0,
                "timestamp": "",
            }
        ];
    }

    /*************************** GETTERS ******************************/

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

    getHighScore(){
        return this.high_score;
    }

    getScoreHistory(){
        return this.score_history;
    }

    getTurnPlayed(levelID){
        if(typeof levelID === 'undefined'){
            // return total
            return this.total_turn_played;
        }

        // turn by level ID
        const level = getObjectInArray(this.unlocked_level, 'id', parseInt(levelID));
        if(level !== 'undefined'){
            return level.total_turn_played || 0;
        }
    }

    getHammer(){
        return this.hammer_id;
    }

    checkHammer(){
        // fail if no hammer
        if(typeof this.hammer_id === 'undefined'){
            return false;
        }

        // fail if no any turns left
        if(this.hammer_usage_left < 0){
            return false;
        }

        return true;
    }

    /*************************** SETTERS ******************************/

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

            return true;
        }

        return false;
    }

    setWhackCoin(number){
        this.whack_coin += parseInt(number);
        return true;
    }

    setTurnPlayed(levelID){
        if(typeof levelID === 'undefined'){
            console.warn('Missing level ID');
            return false;
        }

        // set turn by level
        this.setLevel(levelID, 'total_turn_played', this.getTurnPlayed(levelID) + 1);

        // set total
        this.total_turn_played += 1;

        return true;
    }

    setLevel(levelID, key, value){
        for(let i = 0; i < this.unlocked_level.length; i++){
            if(parseInt(this.unlocked_level[i].id) === parseInt(levelID)){

                this.unlocked_level[i][key] = value;

                return true;
            }
        }
        return false;
    }

    setHammerUsage(){
        // update hammer usage
        this.hammer_usage_left -= 1;
        return true;
    }

    buyHammer(hammer_id){
        hammer_id = parseInt(hammer_id);
        if(hammer_id === this.hammer_id){
            // add more usage if is duplicated
            if(DEV) console.warn('Cannot buy the same hammer!');
        }else{
            // validate hammer
            const newHammer = new GameData().getHammers(hammer_id);
            if(typeof newHammer === 'undefined'){
                if(DEV) console.warn('This hammer is not available!');
                return false;
            }

            // check whack
            if(this.whack_coin < newHammer.whack_cost){
                if(DEV) console.warn('Not enough $WHACK to buy this hammer!');
                return false;
            }

            // pay for new hammer
            this.whack_coin -= newHammer.whack_cost;

            // update new hammer
            this.hammer_id = hammer_id;
            this.hammer_usage_left = parseInt(newHammer.usage_gain);

            if(DEV) console.log(`Buy hammer [${newHammer.display_name}] successfully.`);

            return true;
        }
    }
}