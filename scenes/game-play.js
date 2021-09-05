class GamePlay extends Phaser.Scene{
    constructor(){
        super({key: "GamePlay", active: false});
    }

    init(data){
        this.CONFIG = this.sys.game.CONFIG;

        this.sceneData = {
            name: this.scene.key,
            previousScene: data.previousScene,
            background: 'desktopBg'
        };

        if(DEV) console.log('--------------------');
        if(DEV) console.log(`${this.sceneData.name} init()`, this.sceneData);
    }

    preload(){
        //if(DEV) console.log('Play preload()');
    }

    create(){
        //if(DEV) console.log('Play create()');

        /**
         * Images
         */
        // background
        this.bg = new Components({scene: this, key: 'getBackgroundImage', texture: this.sceneData.background});

        /**
         * Buttons
         */
        this.createButtons();
    }

    createButtons(){
        // Button choose level
        this.btnChooseLevel = new Button(this, 0, 0, {
            idleTexture: 'menu',
            pointerUp: () => {
                this.scene.start("ChooseLevel", {previousScene: this.sceneData});
            },
            anchor: {
                left: 'left+30',
                top: 'top+30'
            },
            depth: 3
        }).get();

        // Button question
        this.btnQuestion = new Button(this, 0, 0, {
            idleTexture: 'question',
            pointerUp: () => {
                this.scene.start("HowToPlay", {previousScene: this.sceneData});
            },
            anchor: {
                left: 'left+100',
                top: 'top+30'
            },
            depth: 3
        }).get();
    }
}