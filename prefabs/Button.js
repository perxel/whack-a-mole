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
            const type = $button.attr("data-button").value;
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
                        this.scene.scene.start('HowToPlay', {previousScene: this.scene.sceneData});
                        break;
                    case 'choose-level':
                        this.scene.scene.start('ChooseLevel', {previousScene: this.scene.sceneData});
                        break;
                    case 'menu':
                        this.scene.scene.start('Menu', {previousScene: this.scene.sceneData});
                        break;
                    case 'full-screen-toggle':
                        // todo: DOM disappear in full screen
                        this.scene.scale.toggleFullscreen();
                        break;
                    case 'go-level':
                        const level = $button.attr("data-level").value;
                        if(DEV) console.log(`Go to level ${level}`);
                        this.scene.scene.start("GamePlay", {previousScene: this.scene.sceneData, levelID: level});
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

        this.scene.scene.start(this.previousScene.name, {previousScene: this.scene.sceneData});
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