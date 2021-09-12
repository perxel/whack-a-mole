class GamePlay extends Phaser.Scene{
    constructor(){
        super({key: "GamePlay", active: false});
    }

    init(data){
        this.CONFIG = this.sys.game.CONFIG;
        this.level = data.levelId || 1;
        this.sceneData = {
            name: this.scene.key,
            background: `level${this.level}`,
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
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});

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
            level: this.level,
            anchor: {
                centerX: '40%',
                centerY: '50%',
            }
        })

        this.hole2 = new Hole({
            scene: this,
            level: this.level,
            character: this.purcupine2,
            anchor: {
                centerX: '60%',
                centerY: '50%',
            }
        })
    }
}