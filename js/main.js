const DEV = true;
const VERSION = '0.0.5';

const MUSIC = !DEV; // sound off in dev mode
const MUSIC_VOL = 0.5;
const SOUND_FX = true;
const SOUND_FX_VOL = 0.3;

const GAME_DURATION = 10 * 1000; // [ms]
const CHARACTER_PER_WAVE = 1;
const WAVE_TIME = 1300; // [ms]
const CHARACTER_SHOW = 300; // [ms]
const CHARACTER_IDLE = 1000; // [ms]
const CHARACTER_HIDE = 300; // [ms]

window.onload = function(){
    'use strict';

    // Check ES6
    try{
        eval('let i = 0;');
        eval('const _dev = true;')
    }catch(e){
        alert('This browser is not supported. Use Chrome or Firefox.');
        return false;
    }

    // Init the Phaser game app
    let app = new App();

    // Update page title
    document.title = `Whack Game ${VERSION}`;
};