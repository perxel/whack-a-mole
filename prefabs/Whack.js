class Whack{
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

        // Countdown
        this.gameDuration = 60 * 1000; // 1 minute
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
        };
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
                    duration: 300,
                    y: 100
                });
                // tween hide
                timeline.add({
                    targets: character,
                    ease: 'Power0',
                    offset: '+=500',
                    duration: 300,
                    y: character.height
                });

            }
        }

        timeline.pause();

        return timeline;
    }

    createCountDown(){
        function onCountDown(){
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

            // timeout
            if(this.timeLeft <= 0){
                this.endGame();
            }

            // rushing
            if(this.status.progress <= this.rushTime){
                this.triggerRushingTime();
            }
        }

        return this.scene.time.addEvent({
            delay: this.loopStep,
            callback: onCountDown,
            callbackScope: this,
            loop: true,
            paused: true
        });
    }

    play(){
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
        this.countdown.remove();
        alert('Time up!');
    }

    triggerRushingTime(){
        this.status.isRushing = true;
        $('.w-progress').addClass('rushing');
    }
}