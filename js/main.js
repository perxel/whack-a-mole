const DEV = true;
const VERSION = '0.0.6';


const GAME_DURATION = 300 * 1000; // [ms]
const CHARACTER_PER_WAVE = 1;
const WAVE_TIME = 2300; // [ms]
const CHARACTER_SHOW = 300; // [ms]
const CHARACTER_IDLE = 2000; // [ms]
const CHARACTER_HIDE = 300; // [ms]

let HOLE_SIZE = 150;
let HOLE_SCALE = 0.8; // scale
let HOLE_SPRITE_Y = 60; // scale
let HOLE_GAP = 100;
let HOLE_SPACE = 30;
let CHARACTER_WIDTH = 220;
let CHARACTER_Y = 80;
let CHARACTER_HIDE_Y = CHARACTER_Y * 4;
let HIT_WIDTH = 220;
let HIT_HEIGHT = HIT_WIDTH * 1.3;
let HIT_X = CHARACTER_WIDTH * 0.67;
let HIT_Y = CHARACTER_WIDTH;

if(window.matchMedia("(max-width:480px)").matches){
    HOLE_SIZE = 90;
    HOLE_SCALE = 0.4;
    HOLE_SPRITE_Y = 35;
    HOLE_GAP = 20;
    HOLE_SPACE = 30;
    CHARACTER_WIDTH = 120;
    CHARACTER_Y = 50;
    HIT_X = CHARACTER_WIDTH * 1.1;
    HIT_Y = CHARACTER_WIDTH * 1.5;
}else if(window.matchMedia("(max-width:768px)").matches){
    HOLE_SIZE = 120;
    HOLE_SCALE = 0.55;
    HOLE_SPRITE_Y = 48;
    HOLE_GAP = 40;
    HOLE_SPACE = 40;
    CHARACTER_WIDTH = 150;
    CHARACTER_Y = 65;
    HIT_X = CHARACTER_WIDTH * 0.9;
    HIT_Y = CHARACTER_WIDTH * 1.25;
}

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