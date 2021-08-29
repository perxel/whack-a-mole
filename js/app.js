const App = function(){
    'use strict';

    this.VERSION = '0.0.1';
    this.IS_DEV = true;
};

App.prototype.start = function(){
    'use strict';
    console.log('App start()');

    // Scenes
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);

    // Game config
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'Whack A Mole',
        url: 'https://phuc-dev.github.io/whack-a-mole/',
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: scenes,
        backgroundColor: '#c8e082'
    };

    // Create game app
    let game = new Phaser.Game(config);

    // Globals
    game.IS_DEV = this.IS_DEV;
    game.VERSION = this.VERSION;
    game.URL = '';
    game.gameVersion = this.VERSION;

    game.CONFIG = {
        width: game.config.width,
        height: game.config.height,
        centerX: Math.round(0.5 * game.config.width),
        centerY: Math.round(0.5 * game.config.height),
        soundOn: true
    };

    return game;
};