class DOM{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.sceneKey = this.scene.scene.key;
        this.className = config.className || 'scene-container';
        this.className += ' ' + this.sceneKey;
        this.html = config.html || this.sceneKey;
        this.depth = config.depth || 1;

        // add DOM
        this.dom = this.scene.add.dom(0, 0).createFromCache(this.html).setClassName(this.className).setDepth(this.depth);
        this.dom.addListener('click');

        // assign buttons
        this.assignButtonEvents();
    }

    /**
     * Callback on button click
     * @param type
     * @param callback
     */
    onButtonClick(type, callback){
        document.querySelectorAll(`[data-button="${type}"]`)[0].addEventListener('click', () => {
            callback();
        });
    }

    assignButtonEvents(){
        const buttons = document.getElementsByClassName("button");
        for(let i = 0; i < buttons.length; i++){
            const button = buttons[i];
            const type = button.getAttributeNode("data-button").value;
            const isDisabled = button.classList.contains('disabled');

            // check flag
            if(button.classList.contains("event-added")){
                continue;
            }

            // set flag
            button.classList.add("event-added");

            button.addEventListener('click', () => {
                // click sound
                this.scene.sys.game._SOUND.playSoundFx('click');


                // skip disabled
                if(isDisabled) return;

                // check type
                switch(type){
                    case 'sound-toggle':
                        // update on load
                        if(this.scene.sys.game._SOUND.isPlaying()){
                            button.classList.add("active");
                        }

                        // toggle sound on click
                        if(this.scene.sys.game._SOUND.isPlaying()){
                            this.scene.sys.game._SOUND.pause();
                            button.classList.remove("active");
                        }else{
                            this.scene.sys.game._SOUND.play();
                            button.classList.add("active");
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
                        const level = button.getAttributeNode("data-level").value;
                        if(DEV) console.log(`Go to level ${level}`);
                        this.scene.scene.start("GamePlay", {previousScene: this.scene.sceneData, levelID: level});
                        break;
                }
            });
        }

        this.updateButtonState();
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

    updateButtonState(){
        const $button = $('[data-button="sound-toggle"]');
        if(this.scene.sys.game._SOUND.isPlaying()){
            $button.addClass("active");
        }else{
            $button.removeClass("active");
        }
    }
}