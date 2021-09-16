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
        this.score_history = config.score_history || [
            {
                "score": 120,
                "level_id": 1,
                "timestamp": "",
            }
        ];
        this.whack_coin = config.whack_coin || 0;
        this.wup_coin = config.wup_coin || 0;
        this.game_settings = config.game_settings || {"sound": MUSIC};
        this.shopping_history = config.shopping_history || [
            {
                "item_id": "",
                "whack_paid": 0,
                "wup_paid": 0,
                "timestamp": "",
            }
        ];

        // init game settings
        this.initGameSettings();
    }

    get(){
        return this;
    }

    getLevels(){
        return this.unlocked_level;
    }

    initGameSettings(){

    }

}