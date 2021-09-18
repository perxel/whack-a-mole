class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu", active: false});
    }

    init(data){
        this.sceneData = {
            name: this.scene.key,
            background: 'desktopBg',
            previousScene: generatePreviousSceneData(this, data)
        };

        if(DEV) console.log('--------------------');
        if(DEV) console.log(`${this.sceneData.name} init()`, this.sceneData);
    }

    preload(){
        //if(DEV) console.log('Menu preload()');
    }

    create(){
        //if(DEV) console.log('Menu create()');

        /**
         * Music
         */
        if(this.sys.game._SOUND.isMusicOn() && !this.sys.game._SOUND.isPlaying()){
            // play
            if(!this.sys.game._SOUND.get().locked){
                // already unlocked so play
                this.sys.game._SOUND.play();
            }else{
                // wait for 'unlocked' to fire and then play
                this.sys.game._SOUND.get().once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.sys.game._SOUND.play();
                })
            }
        }

        /**
         * Load HTML
         */
        const dom = new DOM({scene: this});


        /**
         * Images
         */
        // background
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});
    }

    createAnimations(){
        this.timeline = this.tweens.createTimeline();

        // Title image
        this.titleImage.setAlpha(0);
        this.timeline.add({
            targets: this.titleImage,
            ease: 'Bounce',
            duration: 600,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            y: {
                getStart: () => this.titleImage.y - 100,
                getEnd: () => this.titleImage.y
            },
        });

        // Button play
        this.btnPlay.setAlpha(0);
        this.timeline.add({
            targets: this.btnPlay,
            ease: 'Power4',
            duration: 600,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
        });

        this.timeline.play();
    }
}