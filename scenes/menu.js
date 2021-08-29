class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu", active: false});
    }

    init(){
        console.log('Scene: Menu');
        this.CONFIG = this.sys.game.CONFIG;
        console.log(this.CONFIG)
    }

    preload(){

    }

    create(){
        this.text = this.add.text(this.CONFIG.centerX, this.CONFIG.centerY, 'Menu');
        this.text.setOrigin(0.5);
        this.text.setColor('#000');
    }
}