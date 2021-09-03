class Sound{
    constructor(){
        this.music = null;
        this.musicOn = true;
        this.isResume = false;
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
        if(DEV) console.log(this.music);

        if(!this.isResume){
            this.music.play();
            if(DEV) console.log(`music play`);
        }else{
            this.music.resume();
            if(DEV) console.log(`music resume`);
        }

        this.musicOn = true;
    }

    pause(){
        if(DEV) console.log(`music pause`);

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
}