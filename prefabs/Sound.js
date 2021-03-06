class Sound{
    constructor(){
        this.music = undefined;
        this.musicOn = false;
        this.soundOn = false;

        this.isResume = false;

        // sound effects
        this.soundFx = [];
    }

    update(key, value){
        this[key] = value;
    }

    isMusicOn(){
        return this.musicOn;
    }

    isPlaying(){
        if(this.music === undefined) return false;
        return this.music.isPlaying;
    }

    set(obj){
        this.music = obj;
    }

    get(){
        return this.music;
    }

    play(){
        if(!this.isResume){
            this.music.play();
            if(DEV) console.log(`Music play()`);
        }else{
            this.music.resume();
            if(DEV) console.log(`Music resume()`);
        }

        this.musicOn = true;
    }

    pause(){
        if(DEV) console.log(`Music pause()`);

        this.music.pause();
        this.musicOn = false;
        this.isResume = true;
    }

    setSoundFx(name, scene){
        this.soundFx[name] = scene.sound.add(name, {volume: scene.sys.game.PLAYER.get().game_settings.sound_fx_vol});
    }

    playSoundFx(name){
        if(this.soundOn) this.soundFx[name].play();
    }
}