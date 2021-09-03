class HowToPlay extends Phaser.Scene{
    constructor(){
        super({key: "HowToPlay", active: false});
    }

    init(){
        console.log('Scene: HowToPlay init()');

        this.CONFIG = this.sys.game.CONFIG;
        this.METHODS = this.sys.game.METHODS;
    }

    preload(){
        console.log('Scene: HowToPlay preload()');
    }

    create(){
        console.log('Scene: HowToPlay create()');

        /**
         * Images
         */
        // background
        this.bg = this.METHODS.loadBackground(this, 'desktopBg');

        // Bomb
        this.bomb = this.add.sprite(400, 400, 'whack', 'characters/bomb/1').setDepth(3);
        let frameNames = this.anims.generateFrameNames('whack', {
            start: 1, end: 3, zeroPad: 0,
            prefix: 'characters/bomb/'
        });
        this.anims.create({key: 'walk', frames: frameNames, frameRate: 8, repeat: -1});
        this.bomb.anims.play('walk');
        this.plugins.get('rexanchorplugin').add(this.bomb, {
            centerX: '50%',
            centerY: '50%',
        });

        /**
         * Texts
         */
        this.title = new Text(this, 0, 0, "How To\nPlay", "title").get();
        this.plugins.get('rexanchorplugin').add(this.title, {
            centerX: '50%',
            top: '8%'
        });

        /**
         * Buttons
         */
        this.createButtons();
    }

    createButtons(){
        // Button back
        this.btnBack = new Button(this, 0, 0, {
            idleTexture: 'back',
            pointerUp: () => {
                this.scene.start("Menu");
            },
            anchor: {
                left: 'left+30',
                top: 'top+30'
            },
            depth: 3
        }).get();
    }
}