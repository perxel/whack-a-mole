const DEV = true;
const VERSION = '0.0.4';

const MUSIC = !DEV; // sound off in dev mode
const MUSIC_VOL = 0.5;
const SOUND_FX = true;
const SOUND_FX_VOL = 0.3;

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