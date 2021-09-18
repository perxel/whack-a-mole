class Game{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.holes = config.holes || undefined;

        // callbacks
        this.onPlaying = config.onPlaying || function(){
        };
        this.onBegin = config.onBegin || function(){
        };
        this.onPause = config.onPause || function(){
        };
        this.onResume = config.onResume || function(){
        };
        this.onEndGame = config.onEndGame || function(){
        };

        // Countdown
        this.gameDuration = this.scene.sys.game._DATA.getSettings().game_duration;
        this.timeLeft = this.gameDuration;
        this.loopStep = 100;
        this.countdown = this.createCountDown();
        this.rushTime = 0.3; // percentage of time left to trigger rush state

        // Timeline
        this.timeline = this.createTimeline();

        // Status
        this.status = {
            isStarted: false,
            isPlaying: this.countdown.paused,
            pauseTime: 0,
            timeLeft: this.timeLeft,
            prettyTime: formatMillisecond(this.timeLeft),
            isRushing: false,
            isEnd: false,
            point: 0
        };

        // Init
        this.updatePoint();
        this.updateWhackCoin();
        this.updatePlayerTurnPlayed();
        this.updatePlayerHammer();
    }

    getStatus(){
        return this.status;
    }

    createTimeline(){
        const timeline = this.scene.tweens.createTimeline();

        // loop through all characters in all holes
        for(let holeIndex = 0; holeIndex < this.holes.length; holeIndex++){
            for(let characterIndex = 0; characterIndex < this.holes[holeIndex].characters.length; characterIndex++){
                const character = this.holes[holeIndex].characters[characterIndex].character;
                const showtime = this.holes[holeIndex].characters[characterIndex].showtime;

                // tween show
                timeline.add({
                    targets: character,
                    ease: 'Power0',
                    offset: showtime,
                    duration: this.scene.game._DATA.getSettings().character_show_duration,
                    y: this.scene.game._DATA.getConfig().character_y
                });
                // tween hide
                timeline.add({
                    targets: character,
                    ease: 'Power0',
                    offset: `+=${this.scene.game._DATA.getSettings().character_idle_duration}`,
                    duration: this.scene.game._DATA.getSettings().character_hide_duration,
                    y: this.scene.game._DATA.getConfig().character_hide_y
                });

            }
        }

        timeline.pause();

        return timeline;
    }

    onCountDown(){
        // update time left
        this.timeLeft -= this.loopStep;
        this.status.timeLeft = this.timeLeft;
        this.status.prettyTime = formatMillisecond(this.timeLeft);
        this.status.progress = this.timeLeft / this.gameDuration;

        // update countdown html
        $('.w-progress text').html(this.status.prettyTime);
        $('.w-progress-bar').width(`${this.status.progress * 100}%`);

        // callback
        this.onPlaying(this.status);

        // rushing
        if(this.status.progress <= this.rushTime && !this.status.isRushing){
            this.triggerRushingTime(true);
        }

        // timeout
        if(this.timeLeft <= 0){
            this.endGame();
        }
    }

    createCountDown(){
        return this.scene.time.addEvent({
            delay: this.loopStep,
            callback: this.onCountDown,
            callbackScope: this,
            loop: true,
            paused: true
        });
    }

    play(){
        // check
        if(this.isGoodToPlay()){
            // update status
            this.status.isPlaying = true;

            // resume timer
            this.countdown.paused = false;

            // resume timeline
            if(this.status.isStarted){
                this.timeline.resume();

                // callback
                this.onResume(this.status);
            }else{
                // update status
                this.status.isStarted = true;

                this.timeline.play();

                // callback
                this.onBegin(this.status);
            }
        }
    }

    pause(){
        // update status
        this.status.isPlaying = false;
        this.status.pauseTime += 1;

        // pause timer
        this.countdown.paused = true;

        // pause timeline
        this.timeline.pause();

        // callback
        this.onPause(this.status);
    }

    endGame(){
        // update status
        this.status.isPlaying = false;
        this.status.isEnd = true;

        this.countdown.remove();
        this.triggerRushingTime(false);


        // check high score
        this.status.isNewHighScore = this.status.point > this.scene.sys.game.PLAYER.getHighScore();

        // update player data
        this.scene.sys.game.PLAYER.setScoreHistory(this.status.point, this.scene.levelID);

        // callback
        this.onEndGame(this.status);
    }

    triggerRushingTime(bool){
        this.status.isRushing = bool;
        if(bool){
            $('.w-progress').addClass('rushing');
        }else{
            $('.w-progress').removeClass('rushing');
        }
    }

    /**
     * Update display point in the current game
     * @param point
     */
    updatePoint(point){
        if(typeof point !== 'undefined'){
            this.status.point += parseInt(point);
        }

        // update display
        const $pointTarget = $('.w-stat.point [data-text]');
        $pointTarget.text(this.status.point);
    }

    /**
     * Update display whack coin in the current game
     * Update player's whack coin amount
     * @param number
     */
    updateWhackCoin(number){
        if(typeof number !== 'undefined'){
            // update whack coin
            this.scene.sys.game.PLAYER.setWhackCoin(number);
        }

        // get current whack of player
        const whackCoin = this.scene.sys.game.PLAYER.get().whack_coin;

        // update display
        const $target = $('.w-stat.whack [data-text]');
        $target.text(whackCoin);
    }

    /**
     * Update player's turn played
     */
    updatePlayerTurnPlayed(){
        this.scene.sys.game.PLAYER.setTurnPlayed(this.scene.levelID);
    }

    updatePlayerHammer(){
        this.scene.sys.game.PLAYER.setHammerUsage();

        // update display
        const $target = $('.w-stat.hammer [data-text]');
        $target.text(Math.max(0, this.scene.sys.game.PLAYER.get().hammer_usage_left));
    }

    isGoodToPlay(){
        let isGood = true;

        // check usage
        if(this.scene.sys.game.PLAYER.get().hammer_usage_left < 0){
            if(DEV) console.warn('Please buy more hammer to continue');
            isGood = false;
        }

        return isGood;
    }
}