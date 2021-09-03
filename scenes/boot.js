class Boot extends Phaser.Scene{
    constructor(){
        super({key: "Boot", active: true});
    }

    init(){
        if(DEV) console.log('Scene: Boot init()');
    }

    preload(){
        if(DEV) console.log('Scene: Boot preload()');
    }

    create(){
        if(DEV) console.log('Scene: Boot create()');

        this.scene.start('Preload');
    }
}