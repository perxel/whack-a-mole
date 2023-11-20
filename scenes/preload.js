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
        this.sys.game._SETTINGS = new GameData().getSettings();


        // Creating a GUI with options.
        const gui = new dat.GUI({name: 'Whack', width: 400, useLocalStorage: true});
        const guiGame = gui.addFolder('Game settings');
        guiGame.add(this.sys.game._SETTINGS, 'game_duration').step(1000).min(2000).max(60000).name('Game duration [ms]');
        guiGame.add(this.sys.game._SETTINGS, 'wave_duration').step(100).min(1000).max(9000).name('Wave duration [ms]');
        guiGame.add(this.sys.game._SETTINGS, 'character_per_wave').step(1).min(1).max(9).name('Characters per wave');
        const guiTiming = gui.addFolder('Character timing');
        guiTiming.add(this.sys.game._SETTINGS, 'character_show_duration').step(100).min(100).max(3000).name('Appear [ms]');
        guiTiming.add(this.sys.game._SETTINGS, 'character_idle_duration').step(100).min(100).max(3000).name('Smirky (waiting) [ms]');
        guiTiming.add(this.sys.game._SETTINGS, 'character_hurt_duration').step(100).min(100).max(3000).name('Hurt [ms]');
        guiTiming.add(this.sys.game._SETTINGS, 'character_hide_duration').step(100).min(100).max(3000).name('Run away [ms]');
        guiGame.open();
        guiTiming.open();
        gui.hide();

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
         * Load character sounds
         */
        const characters = new GameData().getCharacters();
        for(let i = 0; i < characters.length; i++){
            const hurt_sound_url = characters[i].hurt_sound_url;
            if(hurt_sound_url){
                const key = `character-hurt-${characters[i].id}`;
                this.load.audio(key, [hurt_sound_url]);
            }
        }


        /**
         * Music and Sound effects
         */
        // background music
        this.load.audio('bgMusic', ['assets/audio/music.mp3']);
        this.load.audio('click', ['assets/audio/click.mp3']);
        this.load.audio('character-die', ['assets/audio/die.mp3']);


        /**
         * Plugins
         */
        // https://github.com/rexrainbow/phaser3-rex-notes
        this.load.plugin('rexanchorplugin', 'libs/rexanchorplugin.min.js', true);


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
         * Load image
         */
        // Load background image
        this.load.image('defaultBackground', 'assets/img/backgrounds/default.jpg');
        this.load.image('defaultBackgroundMobile', 'assets/img/backgrounds/default-m.jpg');
        this.load.image('welcomeWhack', 'assets/img/welcome/whack.png');

        /**
         * Load Component HTML
         */
        this.load.html('Progress', 'assets/dom/component/progress.html');
        this.load.html('Popup', 'assets/dom/component/popup.html');

        /**
         * Load Scene HTML
         */
        this.load.html('Menu', 'assets/dom/scene/menu.html');
        this.load.html('HowToPlay', 'assets/dom/scene/how-to-play.html');
        this.load.html('GamePlay', 'assets/dom/scene/game-play.html');
        this.load.html('ChooseLevel', 'assets/dom/scene/choose-level.html');

        /**
         * Load Popup HTML
         */
        this.load.html('PopupNewHighScore', 'assets/dom/popup/new-high-score.html');
        this.load.html('PopupTimeOver', 'assets/dom/popup/time-over.html');
        this.load.html('PopupPause', 'assets/dom/popup/pause.html');
        this.load.html('PopupYourScore', 'assets/dom/popup/your-score.html');
        this.load.html('PopupBuyHammer', 'assets/dom/popup/buy-hammer.html');
        this.load.html('PopupMobileMenu', 'assets/dom/popup/mobile-menu.html');
        this.load.html('PopupLeaveGame', 'assets/dom/popup/leave-game.html');


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
        this.sys.game._SOUND.setSoundFx('click', this);
        this.sys.game._SOUND.setSoundFx('character-die', this);

        /**
         * Add hammer sounds
         */
        const hammers = new GameData().getHammers();
        for(let i = 0; i < hammers.length; i++){
            const key = `hammer-attack-${hammers[i].id}`;

            this.sys.game._SOUND.setSoundFx(key, this);
        }

        /**
         * Add character sounds
         */
        const characters = new GameData().getCharacters();
        for(let i = 0; i < characters.length; i++){
            if(characters[i].hurt_sound_url){
                const key = `character-hurt-${characters[i].id}`;
                this.sys.game._SOUND.setSoundFx(key, this);
            }
        }

        // Go Menu
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                $('.w-progress').detach();
                new Router({scene: this, to: 'Menu'});
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