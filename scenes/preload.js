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

        /**
         * Plugins
         */
        this.load.plugin('rexanchorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexanchorplugin.min.js', true);


        /**
         * Load SVG
         */
        this.load.svg('soundOn', 'assets/img/btn/sound-on.svg');
        this.load.svg('soundOff', 'assets/img/btn/sound-off.svg');
        this.load.svg('play', 'assets/img/btn/play.svg');
        this.load.svg('pause', 'assets/img/btn/pause.svg');
        this.load.svg('menu', 'assets/img/btn/menu.svg');
        this.load.svg('prev', 'assets/img/btn/prev.svg');
        this.load.svg('next', 'assets/img/btn/next.svg');
        this.load.svg('question', 'assets/img/btn/question.svg');
        this.load.svg('close', 'assets/img/btn/close.svg');

        /**
         * Load sound
         */
        // Load sound
        this.load.audio('bgMusic', [
            'assets/aux/music.mp3',
        ]);

        /**
         * Load image
         */
        // Load background image
        this.load.image('desktopBg', 'assets/img/desktop-bg.jpg');
        this.load.image('welcomeWhack', 'assets/img/welcome/whack.png');


        /**
         * Progress bar
         */
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