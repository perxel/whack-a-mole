class GamePlay extends Phaser.Scene{
    constructor(){
        super({key: "GamePlay", active: false});
    }

    init(data){
        this.CONFIG = this.sys.game.CONFIG;

        this.sceneData = {
            name: this.scene.key,
            background: 'desktopBg',
            previousScene: generatePreviousSceneData(this, data)
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

        /**
         * Create holes
         */
        this.createHoles();
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

        // Button full screen
        this.btnQuestion = new Button(this, 0, 0, {
            idleTexture: 'fullscreen',
            pointerUp: () => {
                this.scale.toggleFullscreen();
            },
            anchor: {
                left: 'left+160',
                top: 'top+30'
            },
            depth: 3
        }).get();
    }

    createHoles(){
        // Hammer
        this.hammer = new Hammer({scene: this, name: '4'});


        // Character
        this.purcupine = new Character({
            scene: this,
            name: 'one'
        });

        this.purcupine2 = new Character({
            scene: this,
            name: 'two'
        });


        // Holes
        this.hole = new Hole({
            scene: this,
            character: this.purcupine,
            anchor: {
                centerX: '40%',
                centerY: '50%',
            }
        })

        this.hole2 = new Hole({
            scene: this,
            character: this.purcupine2,
            anchor: {
                centerX: '60%',
                centerY: '50%',
            }
        })
    }
}