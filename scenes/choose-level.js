class ChooseLevel extends Phaser.Scene{
    constructor(){
        super({key: "ChooseLevel", active: false});
    }

    init(){
        if(DEV) console.log('ChooseLevel init()');

        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
        if(DEV) console.log('ChooseLevel preload()');
    }

    create(){
        if(DEV) console.log('ChooseLevel create()');

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