class Preload extends Phaser.Scene{
    constructor(){
        super({key: "Preload", active: false});
    }

    init(){
        this.CONFIG = this.sys.game.CONFIG;

        if(DEV) console.log('--------------------');
        if(DEV) console.log('Preload init()');
    }

    preload(){
        ///if(DEV) console.log('Preload preload()');

        /**
         * Plugins
         */
        this.load.plugin('rexanchorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexanchorplugin.min.js', true);


        /**
         * Load SVG
         */
        const btnSize = {
            small: {width: 55, height: 55},
            medium: {width: 100, height: 100},
            level: {width: 120, height: 120},
            big: {width: 150, height: 150},
        };
        this.load.svg('soundOn', 'assets/img/btn/sound-on.svg', btnSize.small);
        this.load.svg('soundOff', 'assets/img/btn/sound-off.svg', btnSize.small);
        this.load.svg('play', 'assets/img/btn/play.svg', btnSize.big);
        this.load.svg('pause', 'assets/img/btn/pause.svg', btnSize.small);
        this.load.svg('menu', 'assets/img/btn/menu.svg', btnSize.small);
        this.load.svg('prev', 'assets/img/btn/prev.svg', btnSize.small);
        this.load.svg('next', 'assets/img/btn/next.svg', btnSize.small);
        this.load.svg('question', 'assets/img/btn/question.svg', btnSize.medium);
        this.load.svg('close', 'assets/img/btn/close.svg', btnSize.small);
        this.load.svg('back', 'assets/img/btn/back.svg', btnSize.small);
        this.load.svg('fullscreen', 'assets/img/btn/fullscreen.svg', btnSize.small);


        /**
         * Atlas
         */
        this.load.multiatlas('whack', 'assets/sprites/sprites.json', 'assets/sprites');

        /**
         * Music and Sound effects
         */
        // background music
        this.load.audio('bgMusic', ['assets/aux/music.mp3']);
        this.load.audio('click', ['assets/aux/click.mp3']);
        this.load.audio('zap', ['assets/aux/hammer-flesh.mp3']);
        this.load.audio('die', ['assets/aux/die.mp3']);

        /**
         * Load image
         */
        // Load background image
        this.load.image('desktopBg', 'assets/img/desktop-bg.jpg');
        this.load.image('welcomeWhack', 'assets/img/welcome/whack.png');


        /**
         * Load HTML
         */
        this.load.html('Menu', 'assets/dom/menu.html');
        this.load.html('HowToPlay', 'assets/dom/how-to-play.html');
        this.load.html('GamePlay', 'assets/dom/game-play.html');
        this.load.html('ChooseLevel', 'assets/dom/choose-level.html');


        /**
         * Load CSS
         */
        this.load.css('variables', 'assets/css/variables.css');
        this.load.css('styles', 'assets/css/styles.css');


        /**
         * Progress bar
         */
        // Create loading bar
        this.createLoadingBar();

        // Progress callback
        this.load.on('progress', this.onProgress, this);
    }

    create(){
        //if(DEV) console.log('Preload create()');


        // Add music
        this.sys.game.CONFIG.sound.set(this.sound.add('bgMusic', {volume: MUSIC_VOL, loop: true}));

        // Add sound
        this.sys.game.CONFIG.sound.setSoundFx('click', this.sound.add('click', {volume: SOUND_FX_VOL}));
        this.sys.game.CONFIG.sound.setSoundFx('zap', this.sound.add('zap', {volume: SOUND_FX_VOL}));
        this.sys.game.CONFIG.sound.setSoundFx('die', this.sound.add('die', {volume: 1.5}));


        // Go Menu
        this.time.addEvent({
            delay: 1000,
            callback: () => this.scene.start("Menu"),
            //callback: () => this.scene.start("GamePlay", {levelId: 1}),
            callbackScope: this
        });
    }

    createLoadingBar(){
        // title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 10,
            'Loading',
            'subtitle',
            0.5
        ).get();
        this.title.setDepth(1);

        // Progress bar
        // todo: align container
        this.progress = new Progress(this, this.CONFIG.centerX - 220, this.CONFIG.centerY + 20);
        this.progressContainer = this.progress.get();
        this.progressContainer.setDepth(2);
    }

    onProgress(val){
        // update progress bar
        this.progress.setPercentage(val);
        this.progress.setText(Math.round(val * 100) + '%');
    }
}