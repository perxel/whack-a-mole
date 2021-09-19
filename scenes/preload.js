class Preload extends Phaser.Scene{
    constructor(){
        super({key: "Preload", active: false});
    }

    init(){
        if(DEV) console.log('--------------------');
        if(DEV) console.log('Preload init()');
    }

    preload(){
        ///if(DEV) console.log('Preload preload()');

        /**
         * Load player
         */
        this.sys.game.PLAYER = new Player();
        this.sys.game._DATA = new GameData();


        /**
         * Load level background
         */
        const levels = new GameData().getLevels();
        for(let i = 0; i < levels.length; i++){
            this.load.image(`level${levels[i].id}`, levels[i].desktop_bg_url);
            this.load.image(`level${levels[i].id}-m`, levels[i].mobile_bg_url);
        }

        /**
         * Load hammer sounds
         */
        const hammers = new GameData().getHammers();
        for(let i = 0; i < hammers.length; i++){
            const key = `hammer-attack-${hammers[i].id}`;
            this.load.audio(key, [hammers[i].attack_sound_url]);
        }


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
        this.load.multiatlas('charactersAtlas', 'assets/sprites/characters.json', 'assets/sprites');
        this.load.multiatlas('holesAtlas', 'assets/sprites/holes.json', 'assets/sprites');
        this.load.multiatlas('hammersAtlas', 'assets/sprites/hammers.json', 'assets/sprites');

        /**
         * Music and Sound effects
         */
        // background music
        this.load.audio('bgMusic', ['assets/audio/music.mp3']);

        this.load.audio('click', ['assets/audio/click.mp3']);
        this.load.audio('die', ['assets/audio/die.mp3']);


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
        this.load.html('Progress', 'assets/dom/progress.html');

        /**
         * Load Popup HTML
         */
        this.load.html('Popup', 'assets/dom/popup.html');
        this.load.html('PopupNewHighScore', 'assets/dom/popup/new-high-score.html');
        this.load.html('PopupTimeOver', 'assets/dom/popup/time-over.html');
        this.load.html('PopupPause', 'assets/dom/popup/pause.html');
        this.load.html('PopupYourScore', 'assets/dom/popup/your-score.html');
        this.load.html('PopupBuyHammer', 'assets/dom/popup/buy-hammer.html');


        /**
         * Load CSS
         */
        // this.load.css('styles', 'assets/css/styles.css');
        // this.load.css('popup', 'assets/css/popup.css');


        /**
         * Progress bar
         */
        this.load.on('progress', this.onProgress, this);
    }

    create(){
        //if(DEV) console.log('Preload create()');
        const gameSettings = this.sys.game.PLAYER.get().game_settings;
        this.sys.game._SOUND.update('soundOn', gameSettings.sound_fx);

        // Add music
        this.sys.game._SOUND.set(this.sound.add('bgMusic', {volume: gameSettings.music_vol, loop: true}));

        // Play music by checking setting from Player
        if(gameSettings.music){
            this.sys.game._SOUND.play();
        }

        // Add sound
        this.sys.game._SOUND.setSoundFx('click', this.sound.add('click', {volume: gameSettings.sound_fx_vol}));
        this.sys.game._SOUND.setSoundFx('die', this.sound.add('die', {volume: gameSettings.sound_fx_vol}));

        /**
         * Load hammer sounds
         */
        const hammers = new GameData().getHammers();
        for(let i = 0; i < hammers.length; i++){
            const key = `hammer-attack-${hammers[i].id}`;

            this.sys.game._SOUND.setSoundFx(key, this.sound.add(key, {volume: gameSettings.sound_fx_vol}));
        }

        // Go Menu
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                $('.w-progress').detach();
                //this.scene.start("Menu");
                this.scene.start("GamePlay", {levelID: 1})
            },
            callbackScope: this
        });
    }

    onProgress(val){
        // update progress bar
        const text = Math.round(val * 100) + '%';
        $('.w-progress text').html(text);
        $('.w-progress-bar').width(text);
    }
}