class Sound{
    constructor(){
        this.music = null;
        this.musicOn = MUSIC;
        this.isResume = false;

        // sound effects
        this.soundFx = [];
    }

    isMusicOn(){
        return this.musicOn;
    }

    isPlaying(){
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

    getButton(ctx){
        // Button music
        const button = new Button(ctx, 0, 0, {
            idleTexture: 'soundOn',
            activeTexture: 'soundOff',
            pointerUp: () => {
                // toggle sound on click
                if(ctx.sys.game.CONFIG.sound.isPlaying()){
                    ctx.sys.game.CONFIG.sound.pause();
                }else{
                    ctx.sys.game.CONFIG.sound.play();
                }
            },
            anchor: {
                right: 'right-30',
                top: 'top+30'
            },
            depth: 3
        });
        button.updateStatus(!ctx.sys.game.CONFIG.sound.isPlaying());

        return button;
    }

    setSoundFx(name, obj){
        this.soundFx[name] = obj;
    }

    playSoundFx(name){
        if(SOUND_FX) this.soundFx[name].play();
    }
}