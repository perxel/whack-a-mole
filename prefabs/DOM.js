class DOM{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.previousScene = this.scene.sceneData.previousScene || undefined;
        this.sceneKey = this.scene.scene.key;
        this.return = config.return || true;

        // localize
        const scene = this.scene;
        const _this = this;

        // add DOM
        this.dom = this.scene.add.dom(0, 0).createFromCache(this.sceneKey).setClassName('scene-container');
        this.dom.addListener('click');

        // assign buttons
        const buttons = document.getElementsByClassName("button");
        for(let i = 0; i < buttons.length; i++){
            const button = buttons[i];
            const type = button.getAttributeNode("data-button").value;

            button.addEventListener('click', () => {
                // click sound
                scene.sys.game.CONFIG.sound.playSoundFx('click');

                // check type
                switch(type){
                    case 'sound-toggle':
                        // update on load
                        if(scene.sys.game.CONFIG.sound.isPlaying()){
                            button.classList.add("active");
                        }

                        // toggle sound on click
                        if(scene.sys.game.CONFIG.sound.isPlaying()){
                            scene.sys.game.CONFIG.sound.pause();
                            button.classList.remove("active");
                        }else{
                            scene.sys.game.CONFIG.sound.play();
                            button.classList.add("active");
                        }
                        break;
                    case 'back':
                        _this.goBack();
                        break;
                    case 'how-to-play':
                        this.scene.scene.start('HowToPlay', {previousScene: this.scene.sceneData});
                        break;
                    case 'choose-level':
                        this.scene.scene.start('ChooseLevel', {previousScene: this.scene.sceneData});
                        break;
                    case 'full-screen-toggle':
                        // todo: DOM disappear in full screen
                        this.scene.scale.toggleFullscreen();
                        break;
                }
            });
        }

        // return
        if(this.return){
            return this.dom;
        }
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

    /**
     * Go back
     */
    goBack(){
        if(!this.previousScene.name){
            this.previousScene.name = "Menu";
            if(DEV) console.log(`Undefined previous scene. Go back from ${this.sceneKey} to ${this.previousScene.name}.`);
        }else{
            if(DEV) console.log(`Go back from ${this.sceneKey} to ${this.previousScene.name}`);
        }

        this.scene.scene.start(this.previousScene.name, {previousScene: this.scene.sceneData});
    }
}