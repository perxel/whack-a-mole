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
        if(this.CONFIG.soundOn && !music.isPlaying){
            music.play();
        }
        music.loop = true;


        /**
         * Buttons
         */

            // Button music
        let buttonSound = new Button(this, 0, 0, {
                idleTexture: 'soundOn',
                activeTexture: 'soundOff',
                pointerUp: function(){
                    // toggle sound
                    if(music.isPlaying){
                        music.pause();
                    }else if(music.isPaused){
                        music.resume();
                    }else{
                        music.play();
                    }
                }
            });
        buttonSound.updateStatus(!music.isPlaying);
        buttonSound = buttonSound.get();
        buttonSound.setDepth(3);
        this.plugins.get('rexanchorplugin').add(buttonSound, {
            right: 'right-30',
            top: 'top+30'
        });


        // Button pause
        const buttonPause = new Button(this, 0, 0, {
            idleTexture: 'pause',
            pointerUp: function(){
                console.log('pause')
            }
        }).get();
        buttonPause.setDepth(3);
        this.plugins.get('rexanchorplugin').add(buttonPause, {
            right: 'right-100',
            top: 'top+30'
        });

        // Button menu
        const buttonMenu = new Button(this, 0, 0, {
            idleTexture: 'menu',
            pointerUp: function(){
                console.log('menu')
            }
        }).get();
        buttonMenu.setDepth(3);
        this.plugins.get('rexanchorplugin').add(buttonMenu, {
            left: 'left+30',
            top: 'top+30'
        });

        // Button question
        const buttonQuestion = new Button(this, 0, 0, {
            idleTexture: 'question',
            pointerUp: function(){
                console.log('question')
            }
        }).get();
        buttonQuestion.setDepth(3);
        this.plugins.get('rexanchorplugin').add(buttonQuestion, {
            left: 'left+100',
            top: 'top+30'
        });


        // Button play
        const buttonPlay = new Button(this, 0, 0, {
            idleTexture: 'play',
            scale: 1.3,
            pointerUp: function(){
                console.log('play')
            }
        }).get();
        buttonPlay.setDepth(3);
        this.plugins.get('rexanchorplugin').add(buttonPlay, {
            centerX: '50%',
            centerY: '50%'
        });


        // Add background
        const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'desktopBg');
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        // Image: Whack
        const welcomeWhack = this.add.image(0, 0, 'welcomeWhack');
        welcomeWhack.setScale(0.6);
        this.plugins.get('rexanchorplugin').add(welcomeWhack, {
            centerX: '50%',
            top: '15%'
        });


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
    }

    goPlay(){
        this.scene.start("Play");
    }
}