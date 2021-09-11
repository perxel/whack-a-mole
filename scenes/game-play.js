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
         * Load HTML
         */
        const dom = new DOM({scene: this});

        /**
         * Images
         */
        // background
        this.bg = new Components({scene: this, key: 'getBackgroundImage', texture: this.sceneData.background});

        /**
         * Create holes
         */
        this.createHoles();
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