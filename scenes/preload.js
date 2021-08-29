class Preload extends Phaser.Scene{
    constructor(){
        super({key: "Preload", active: false});
    }

    init(){
        console.log('Scene: Preload init()');

        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
        console.log('Scene: Preload preload()');

        // Load background image
        this.load.image('desktopBg', 'assets/img/desktop-bg.jpg');

        // Create loading bar
        this.createLoadingBar();

        // Spritesheets
        //this.load.setPath(this.URL + 'assets/img');

        // Progress callback
        this.load.on('progress', this.onProgress, this);
        //this.load.on('complete', this.onComplete, this);
    }

    create(){
        console.log('Scene: Preload create()');

        // Add background
        const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'desktopBg');
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        //this.scene.start('Menu');
    }

    createLoadingBar(){
        // title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY,
            'Loading Game',
            'preload',
            0.5
        );
        this.title.setDepth(1);

        // Progress text
        this.text_progress = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY * .2,
            'Loading ...',
            'preload',
            0.5
        );
        this.text_progress.setDepth(1);

        // Progress bar
    }

    onProgress(val){
        // Width

        // Percentage
        this.text_progress.setText(Math.round(val * 100) + '%');

        console.log(this.text_progress.text);
    }
}