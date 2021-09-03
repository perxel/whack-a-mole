class Play extends Phaser.Scene{
    constructor(){
        super({key: "Play", active: false});
    }

    init(){
        if(DEV) console.log('Play init()');

        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
        if(DEV) console.log('Play preload()');
    }

    create(){
        if(DEV) console.log('Play create()');

        /**
         * Images
         */
        // background
        this.bg = this.CONFIG.loadBackground(this, 'desktopBg');

        /**
         * Buttons
         */
        this.createButtons();
    }

    createButtons(){
    }
}