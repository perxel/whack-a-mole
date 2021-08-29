class Boot extends Phaser.Scene{
    constructor(){
        super({key: "Boot", active: true});
    }

    init(){
        console.log('Scene: Boot init()');
    }

    preload(){
        console.log('Scene: Boot preload()');
    }

    create(){
        console.log('Scene: Boot create()');

        this.scene.start('Preload');
    }
}