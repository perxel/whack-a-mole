class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu", active: false});
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
        //if(DEV) console.log('Menu preload()');
    }

    create(){
        //if(DEV) console.log('Menu create()');

        /**
         * Music
         */
        if(this.CONFIG.sound.isMusicOn() && !this.CONFIG.sound.isPlaying()){
            // play
            if(!this.CONFIG.sound.get().locked){
                // already unlocked so play
                this.CONFIG.sound.play();
            }else{
                // wait for 'unlocked' to fire and then play
                this.CONFIG.sound.get().once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.CONFIG.sound.play();
                })
            }
        }

        /**
         * Load HTML
         */
        const dom = new DOM({scene: this, key: 'sceneMenu'});


        /**
         * Images
         */
        // background
        this.bg = new Components({scene: this, key: 'getBackgroundImage', texture: this.sceneData.background});

        // title
        this.titleImage = this.add.image(0, 0, 'welcomeWhack').setScale(0.9);
        this.plugins.get('rexanchorplugin').add(this.titleImage, {
            centerX: '48%',
            top: '8%'
        });


        /**
         * Buttons
         */
        this.createButtons();


        /**
         * Animations
         */
        this.createAnimations();
    }

    createButtons(){
        // Button play
        this.btnPlay = new Button(this, 0, 0, {
            idleTexture: 'play',
            width: 136, height: 132,
            pointerUp: () => {
                this.goPlay();
            },
            anchor: {
                centerX: '50%',
                top: 'top+' + (this.titleImage.displayHeight * this.titleImage.originY + this.titleImage.y + 65)
            },
            depth: 3
        }).get();


        // Button question
        this.btnHowTo = new Button(this, 0, 0, {
            idleTexture: 'question',
            width: 94, height: 90,
            pointerUp: () => {
                this.goHowToPlay();
            },
            anchor: {
                centerX: '50%',
                bottom: 'bottom-30'
            },
            depth: 3
        }).get();
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

        // Button how to
        this.btnHowTo.setAlpha(0);
        this.timeline.add({
            targets: this.btnHowTo,
            ease: 'Power4',
            duration: 600,
            offset: '-=600',
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
        });

        this.timeline.play();
    }

    goPlay(){
        this.scene.start("ChooseLevel", {previousScene: this.sceneData});
    }

    goHowToPlay(){
        this.scene.start("HowToPlay", {previousScene: this.sceneData});
    }
}