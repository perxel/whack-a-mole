class Boot extends Phaser.Scene{
    constructor(){
        super({key: "Boot", active: true});
    }

    init(){
        if(DEV) console.log('Boot init()');
    }

    preload(){
        if(DEV) console.log('Boot preload()');
    }

    create(){
        if(DEV) console.log('Boot create()');

        this.scene.start('Preload');
    }
}