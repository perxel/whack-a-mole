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


        this.load.svg('soundOn', 'assets/img/sound-on.svg');
        this.load.svg('soundOff', 'assets/img/sound-off.svg');

        // Load sound
        this.load.audio('bgMusic', [
            'assets/aux/music.mp3',
        ]);

        // Load background image
        this.load.image('desktopBg', 'assets/img/desktop-bg.jpg');
        for(let i = 0; i < 5; i++){
            this.load.image('desktopBg_' + i, 'assets/img/test-load.png');
        }

        // Create loading bar
        this.createLoadingBar();

        // Progress callback
        this.load.on('progress', this.onProgress, this);
    }

    create(){
        console.log('Scene: Preload create()');

        // Go Menu
        this.time.addEvent({
            delay: 1000,
            callback: () => this.scene.start('Menu'),
            callbackScope: this
        });
    }

    createLoadingBar(){
        // title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 20,
            'Loading',
            'preload',
            0.5
        ).get();
        this.title.setDepth(1);

        // Progress bar
        this.progress = new Progress(this, this.CONFIG.centerX - 220, this.CONFIG.centerY + 30);
        this.progressContainer = this.progress.get();
        this.progressContainer.setDepth(2);
    }

    onProgress(val){
        // update progress bar
        this.progress.setPercentage(val);
        this.progress.setText(Math.round(val * 100) + '%');
    }
}