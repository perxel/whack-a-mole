class DOM{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        const scene = this.scene;
        this.key = config.key || undefined;

        // add DOM
        this.dom = this.scene.add.dom(0, 0).createFromCache(this.key).setClassName('scene-container');

        this.dom.addListener('click');

        // assign buttons
        const buttons = document.getElementsByClassName("button");
        for(let i = 0; i < buttons.length; i++){
            const button = buttons[i];
            const type = button.getAttributeNode("data-button").value;

            switch(type){
                case 'sound-toggle':
                    // update on load
                    if(scene.sys.game.CONFIG.sound.isPlaying()){
                        button.classList.add("active");
                    }

                    // toggle sound on click
                    button.addEventListener('click', function(e){
                        if(scene.sys.game.CONFIG.sound.isPlaying()){
                            scene.sys.game.CONFIG.sound.pause();
                            button.classList.remove("active");
                        }else{
                            scene.sys.game.CONFIG.sound.play();
                            button.classList.add("active");
                        }

                        // click sound
                        scene.sys.game.CONFIG.sound.playSoundFx('click');
                    });
                    break;
            }
        }
    }
}