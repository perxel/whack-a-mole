class Preload extends Phaser.Scene{
    constructor(){
        super({key: "Preload", active: false});
    }

    init(){
        console.log('Scene: Preload init()');
    }

    preload(){
        console.log('Scene: Preload preload()');
    }

    create(){
        console.log('Scene: Preload create()');

        this.scene.start('Menu');
    }
}