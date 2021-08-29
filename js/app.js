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
    console.log(scenes)

    // Game config
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-app',
        title: 'Whack A Mole',
        url: 'https://github.com/phuc-dev/whack-a-mole',
        width: 1440,
        height: 1024,
        scenes: scenes,
        backgroundColor: '#fff'
    };

    // Create game app
    let game = new Phaser.Game(config);

    // Globals
    game.IS_DEV = this.IS_DEV;
    game.VERSION = this.VERSION;

    game.URL = '';

    game.CONFIG = {
        width: config.width,
        height: config.height,
        centerX: Math.round(0.5 * config.width),
        centerY: Math.round(0.5 * config.height),
        tile: 16, // ??
        fps: 12,
    };

    // Sound
    game.sound_on = true;
};