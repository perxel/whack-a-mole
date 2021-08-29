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

        // Play music
        const music = this.sound.add('bgMusic');
        music.play();

        // Music Control todo: clean up
        const soundOn = this.add.image(0, 0, 'soundOn').setInteractive();
        const soundOff = this.add.image(0, 0, 'soundOff').setInteractive().setAlpha(0);
        soundOff.setDepth(3)
        soundOn.setDepth(4)

        function soundCheck(){
            // click down
            this.setScale(1);

            // toggle sound
            if(music.isPlaying){
                music.pause();
                soundOff.setAlpha(1)
                soundOn.setAlpha(0)
            }else{
                music.resume();
                soundOff.setAlpha(0)
                soundOn.setAlpha(1)
            }
        }

        soundOn.on('pointerdown', function(){
            this.setScale(0.9);
        });
        soundOff.on('pointerdown', function(){
            this.setScale(0.9);
        });

        soundOn.on('pointerup', soundCheck);
        soundOff.on('pointerup', soundCheck);


        /**
         * Anchor
         */
        this.plugins.get('rexanchorplugin').add(soundOn, {
            right: 'right-30',
            top: 'top+30'
        });
        this.plugins.get('rexanchorplugin').add(soundOff, {
            right: 'right-30',
            top: 'top+30'
        });


        // Add background
        const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'desktopBg');
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.text = this.add.text(this.CONFIG.centerX, 0, 'Menu', new TextStyle('preload'));
        this.text.setOrigin(0.5);


        // Tweens
        this.tweens.add({
            targets: image,
            duration: 300,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
        });
        this.tweens.add({
            targets: this.text,
            duration: 300,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            y: {
                getStart: () => this.CONFIG.centerY - 100,
                getEnd: () => this.CONFIG.centerY
            },
        });
        this.tweens.add({
            targets: this.text,
            duration: 300,
            rotation: {
                getStart: () => -10,
                getEnd: () => 10
            },
            yoyo: true,
            repeat: -1
        });
    }

    goPlay(){
        this.scene.start("Play");
    }
}