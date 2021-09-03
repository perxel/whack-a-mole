class App{
    constructor(){
        'use strict';
        if(DEV) console.log('App start()');

        // Scenes
        let scenes = [];
        scenes.push(Boot);
        scenes.push(Preload);
        scenes.push(Menu);
        scenes.push(HowToPlay);

        // Game config
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-app',
            title: `Whack A Mole v${VERSION}${DEV ? ' (DEV)' : ''}`,
            url: 'https://phuc-dev.github.io/whack-a-mole/',
            width: window.innerWidth,
            height: window.innerHeight,
            scale: {
                mode: Phaser.Scale.ENVELOP,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            scene: scenes,
            backgroundColor: '#c8e082',
            pixelArt: false,
            //resolution: window.devicePixelRatio
        };

        // Create game app
        let game = new Phaser.Game(config);

        // Globals
        game.URL = '';
        game.gameVersion = VERSION;

        game.CONFIG = {
            width: game.config.width,
            height: game.config.height,
            centerX: Math.round(0.5 * game.config.width),
            centerY: Math.round(0.5 * game.config.height),
            loadBackground: (ctx, texture) => {
                // add background to scene
                const background = ctx.add.image(ctx.cameras.main.width / 2, ctx.cameras.main.height / 2, texture);
                const scaleX = ctx.cameras.main.width / background.width;
                const scaleY = ctx.cameras.main.height / background.height;
                const scale = Math.max(scaleX, scaleY);
                background.setScale(scale).setScrollFactor(0);

                // animate
                ctx.tweens.add({
                    targets: background,
                    ease: 'Linear',
                    duration: 600,
                    alpha: {
                        getStart: () => 0,
                        getEnd: () => 1
                    },
                });

                return background;
            },
            sound: new Sound()
        };

        return game;
    }
}