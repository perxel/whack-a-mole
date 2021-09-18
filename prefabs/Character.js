class Character{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }
        if(!config.characterID){
            console.warn("Missing character ID!");
            return;
        }

        this.scene = config.scene;
        this.characterID = config.characterID || undefined;
        this.characterData = new GameData().getCharacters(this.characterID);

        this.gameSettings = this.scene.game._DATA.getSettings();
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.debug = config.debug || DEV;
        this.hurtTime = this.gameSettings.character_idle_duration; // ms
        this.point = this.characterData.point || 0;

        this.createAnimations();
        this.createPorcupine();

        return this.character;
    }

    createAnimations(){
        // create frames
        const idleFrames = this.scene.anims.generateFrameNames('charactersAtlas', {
            start: 1, end: 4,
            prefix: `${this.characterData.sprite_name}/smirky-`
        });
        const attackFrame = this.scene.anims.generateFrameNames('charactersAtlas', {
            frames: [1],
            prefix: `${this.characterData.sprite_name}/hurt-`
        });
        const hurtFrames = this.scene.anims.generateFrameNames('charactersAtlas', {
            start: 2, end: 3,
            prefix: `${this.characterData.sprite_name}/hurt-`
        });

        // create anims
        this.scene.anims.create({
            key: `${this.characterData.sprite_name}-idle`,
            frames: idleFrames,
            frameRate: 8,
            repeat: -1,
            yoyo: true
        });
        this.scene.anims.create({
            key: `${this.characterData.sprite_name}-attack`,
            frames: attackFrame,
            frameRate: 2,
            duration: 0.5
        });
        this.scene.anims.create({
            key: `${this.characterData.sprite_name}-hurt`,
            frames: hurtFrames,
            frameRate: 8,
            repeat: -1,
            yoyo: true
        });
    }

    createPorcupine(){
        this.character = this.scene.add.sprite(this.x, this.y, 'charactersAtlas', `${this.characterData.sprite_name}/normal-1`);
        this.hurtTimer = undefined;
        this.ratio = this.character.height / this.character.width;
        this.width = this.scene.sys.game._DATA.getConfig().character_width;
        this.height = this.width * this.ratio;
        this.character.setDisplaySize(this.width, this.height);

        // adjust the hit area
        const shape = new Phaser.Geom.Ellipse(
            this.scene.sys.game._DATA.getConfig().hit_x,
            this.scene.sys.game._DATA.getConfig().hit_y,
            this.scene.sys.game._DATA.getConfig().hit_width,
            this.scene.sys.game._DATA.getConfig().hit_height
        );
        this.character.setInteractive(shape, Phaser.Geom.Ellipse.Contains);


        // Play idle animation
        this.playAnimation('idle');

        // Show hit area
        if(this.debug){
            this.scene.input.enableDebug(this.character, 0xffff00);
        }


        // On attack
        this.character.on('pointerdown', (pointer) => {
            this.onAttack(pointer);
        });
    }

    playAnimation(key){
        // play animation
        this.character.anims.play(`${this.characterData.sprite_name}-${key}`);

        // on attack
        if(key === 'attack'){
            // sound fx
            this.scene.sys.game._SOUND.playSoundFx('die');

            // play hurt state
            setTimeout(() => {
                this.playAnimation('hurt');
            }, 100);

            // back to idle state
            if(this.hurtTimer){
                this.hurtTimer.remove();
            }
            this.hurtTimer = this.scene.time.addEvent({
                delay: this.hurtTime,
                callback: () => {
                    this.playAnimation('idle');
                }
            });
        }
    }

    onAttack(pointer){
        const container = this.character.parentContainer;
        const isGoodAttack = isPointerInsideZone(
            pointer.x,
            pointer.y,
            container.x - container.originX * container.width,
            container.y - container.originY * container.height,
            container.width,
            container.height
        );

        const isGameEnded = this.scene.gameControl.status.isEnd;
        const isPlaying = this.scene.gameControl.status.isPlaying;

        if(isGoodAttack && !isGameEnded && isPlaying){
            if(DEV) console.log(`Attack ${this.characterData.sprite_name}`);

            // play ani
            this.playAnimation('attack');

            // calculate gained point
            const multiplier = this.scene.hammer.multiplier;
            const gainedPoint = this.point > 0 ? this.point * multiplier : this.point; // do not multiply minus point

            // create html
            const pointText = gainedPoint > 0 ? '+' : '';
            const html = document.createElement('div');
            html.classList.add('w-point');
            html.innerHTML = `<svg width="150" height="150"><text x="75" y="75">${pointText}${gainedPoint}</text></svg>`;

            // display point
            const x = Phaser.Math.Between(pointer.x - container.width * 0.5, pointer.x + container.width * 0.5);
            const y = pointer.y - container.height * 0.5;
            const point = this.scene.add.dom(x, y, html);

            // update point
            this.scene.gameControl.updatePoint(gainedPoint);

            // animate
            this.scene.tweens.add({
                targets: point,
                ease: 'Power1',
                duration: 500,
                y: '-=80',
            });
            this.scene.tweens.add({
                targets: point,
                ease: 'Power1',
                delay: 300,
                duration: 200,
                alpha: 0,
                onComplete: () => {
                    point.destroy();
                }
            });
        }
    }
}