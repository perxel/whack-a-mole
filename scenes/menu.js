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

        this.text = this.add.text(this.CONFIG.centerX, this.CONFIG.centerY, 'Menu', {
            fontSize: '80px',
            fontFamily: 'LuckiestGuy',
            color: '#f8e8ce',
            strokeThickness: 10,
            stroke: '#805B2D'
        });
        this.text.setOrigin(0.5);
    }
}