class Preload extends Phaser.Scene{
    constructor(){
        super({key: "Preload", active: false});
    }

    init(){
        console.log('Scene: Preload');
    }

    preload(){

    }

    create(){
        this.scene.start('Menu');
    }
}