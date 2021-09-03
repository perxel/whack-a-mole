class Play extends Phaser.Scene{
    constructor(){
        super({key: "Play", active: false});
    }

    init(){
    }

    preload(){
    }

    create(){
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
            },
            anchor: {
                right: 'right-30',
                top: 'top+30'
            },
            depth: 3
        });
        buttonSound.updateStatus(!music.isPlaying);
        //buttonSound = buttonSound.get();

        // Button pause
        const buttonPause = new Button(this, 0, 0, {
            idleTexture: 'pause',
            pointerUp: function(){
                if(DEV) console.log('pause')
            },
            anchor: {
                right: 'right-100',
                top: 'top+30'
            },
            depth: 3
        }).get();

        // Button menu
        const buttonMenu = new Button(this, 0, 0, {
            idleTexture: 'menu',
            pointerUp: function(){
                if(DEV) console.log('menu')
            },
            anchor: {
                left: 'left+30',
                top: 'top+30'
            },
            depth: 3
        }).get();
    }
}