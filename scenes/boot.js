class Boot extends Phaser.Scene{
    constructor(){
        super({key: "Boot", active: true});
    }

    init(){
        console.log('Scene: Boot');
    }

    preload(){
        console.log('Scene: Boot');
    }

    create(){
        this.scene.start('Preload');
    }
}