class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu", active: false});
    }

    init(){
        console.log('Scene: Menu init()');

        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
        console.log('Scene: Menu preload()');
    }

    create(){
        console.log('Scene: Menu create()');

        // Objects
        this.btnPlay = null;
        this.btnHowTo = null;
        this.titleImage = null;
        this.bg = null;

        // Play music
        const music = this.sound.add('bgMusic');
        if(this.CONFIG.soundOn && !music.isPlaying){
            music.play();
        }
        music.loop = true;


        /**
         * Images
         */
        // background
        this.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'desktopBg');
        const scaleX = this.cameras.main.width / this.bg.width;
        const scaleY = this.cameras.main.height / this.bg.height;
        const scale = Math.max(scaleX, scaleY);
        this.bg.setScale(scale).setScrollFactor(0);

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
        console.log(this.titleImage)
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
            pointerUp: function(){
                console.log('question')
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

        // Background
        this.timeline.add({
            targets: this.bg,
            ease: 'Linear',
            duration: 600,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
        });

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
            offset: '-=400',
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
        });

        this.timeline.play();
    }

    goPlay(){
        this.scene.start("Play");
    }
}