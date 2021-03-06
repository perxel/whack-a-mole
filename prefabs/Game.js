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
        this.gameDuration = this.scene.sys.game._SETTINGS.game_duration;
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
        this.startGame();
        this.updateDisplay();
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
                    duration: this.scene.game._SETTINGS.character_show_duration,
                    y: this.scene.game._DATA.getConfig().character_y
                });
                // tween hide
                timeline.add({
                    targets: character,
                    ease: 'Power0',
                    offset: `+=${this.scene.game._SETTINGS.character_idle_duration}`,
                    duration: this.scene.game._SETTINGS.character_hide_duration,
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


    startGame(){
        // Update player's hammer usage
        this.scene.sys.game.PLAYER.setHammerUsage();

        //  Update player's turn played
        this.scene.sys.game.PLAYER.setTurnPlayed(this.scene.levelID);
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

        if(DEV) console.log('Game ended!');
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

        this.updateDisplay();
    }


    /**
     * Update HTML data
     */
    updateDisplay(){
        /** Whack **/
        const $whack = $('.w-stat.whack [data-text]');
        $whack.text(this.scene.sys.game.PLAYER.get().whack_coin);

        // update display
        const $hammer = $('.w-stat.hammer [data-text]');
        $hammer.text(Math.max(0, this.scene.sys.game.PLAYER.get().hammer_usage_left));


        /** Point **/
        const $pointTarget = $('.w-stat.point [data-text]');
        $pointTarget.text(this.status.point);
    }


    /**
     * Check is good to play
     * @returns {boolean}
     */
    isGoodToPlay(){
        // check usage
        if(!this.scene.sys.game.PLAYER.checkHammer()){
            if(DEV) console.warn('Please buy more hammer to continue');

            // go to buy hammer
            new Router({scene: this.scene, to: 'BuyHammer'});

            return false;
        }

        return true;
    }
}