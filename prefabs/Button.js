class Button{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.sceneKey = this.scene.scene.key;

        // assign event to buttons
        this.assign();
    }

    assign(callback){
        const $buttons = $('.button');
        $buttons.each((i, el) => {
            const $button = $(el);
            const type = $button.attr("data-button");
            const isDisabled = $button.hasClass('disabled');

            // check flag
            if($button.hasClass("event-added")){
                return;
            }

            // set flag
            $button.addClass("event-added");

            $button.on('click', () => {
                // click sound
                this.scene.sys.game._SOUND.playSoundFx('click');

                // skip disabled
                if(isDisabled) return;

                // check type
                switch(type){
                    case 'sound-toggle':
                        // update on load
                        if(this.scene.sys.game._SOUND.isPlaying()){
                            $button.addClass("active");
                        }

                        // toggle sound on click
                        if(this.scene.sys.game._SOUND.isPlaying()){
                            this.scene.sys.game._SOUND.pause();
                            $button.removeClass("active");
                        }else{
                            this.scene.sys.game._SOUND.play();
                            $button.addClass("active");
                        }
                        break;
                    case 'back':
                        this.goBack();
                        break;
                    case 'how-to-play':
                        new Router({scene: this.scene, to: 'HowToPlay'});
                        break;
                    case 'choose-level':
                        new Router({scene: this.scene, to: 'ChooseLevel'});
                        break;
                    case 'menu':
                        new Router({scene: this.scene, to: 'Menu'});
                        break;
                    case 'full-screen-toggle':
                        // todo: DOM disappear in full screen
                        this.scene.scale.toggleFullscreen();
                        break;
                    case 'go-level':
                        const level = $button.attr("data-level");

                        // go to game with level
                        new Router({scene: this.scene, to: 'GamePlay', levelID: level});
                        break;
                    case 'buy-hammer':
                        const hammerID = $button.attr("data-buy-hammer");

                        // go to Choose level if buy successfully
                        if(this.scene.sys.game.PLAYER.buyHammer(hammerID)){
                            new Router({scene: this.scene, to: 'ChooseLevel'});
                        }
                        break;
                }
            });
        });

        this.updateButtonState();

        if(typeof callback === 'function'){
            callback();
        }
    }

    /**
     * Go back
     */
    goBack(){
        this.previousScene = this.scene.sceneData.previousScene || undefined;

        if(!this.previousScene.name){
            this.previousScene.name = "Menu";
            if(DEV) console.log(`Undefined previous scene. Go back from ${this.sceneKey} to ${this.previousScene.name}.`);
        }else{
            if(DEV) console.log(`Go back from ${this.sceneKey} to ${this.previousScene.name}`);
        }

        // go to previous scene
        new Router({scene: this, to: this.previousScene.name});
    }


    /**
     * Update button state
     */
    updateButtonState(){
        const $button = $('[data-button="sound-toggle"]');
        if(this.scene.sys.game._SOUND.isPlaying()){
            $button.addClass("active");
        }else{
            $button.removeClass("active");
        }
    }
}