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

        this.x = config.x || 0;
        this.y = config.y || 0;
        this.debug = config.debug || DEV;
        this.hurtTime = CHARACTER_IDLE; // ms
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
        this.width = CHARACTER_WIDTH;
        this.height = this.width * this.ratio;
        this.character.setDisplaySize(this.width, this.height);

        // adjust the hit area
        const hitAreaX = this.width * 0.67;
        const hitAreaY = this.height;
        const shape = new Phaser.Geom.Ellipse(HIT_X, HIT_Y, HIT_WIDTH, HIT_HEIGHT);
        this.character.setInteractive(shape, Phaser.Geom.Ellipse.Contains);


        // Play idle animation
        this.playAnimation('idle');

        // Show hit area
        if(this.debug){
            this.scene.input.enableDebug(this.character, 0xffff00);
        }


        // On attack
        this.character.on('pointerdown', (pointer) => {
            this.attack(pointer);
        });
    }

    playAnimation(key){
        // play animation
        this.character.anims.play(`${this.characterData.sprite_name}-${key}`);

        // on attack
        if(key === 'attack'){
            // sound fx
            this.scene.sys.game.CONFIG.sound.playSoundFx('die');

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

    attack(pointer){
        const container = this.character.parentContainer;
        const isGoodAttack = isPointerInsideZone(
            pointer.x,
            pointer.y,
            container.x - container.originX * container.width,
            container.y - container.originY * container.height,
            container.width,
            container.height
        );

        if(isGoodAttack){
            if(DEV) console.log(`Attack ${this.characterData.sprite_name}`);

            // play anim
            this.playAnimation('attack');

            // create html
            const pointText = this.point > 0 ? '+' : '';
            const html = document.createElement('div');
            html.classList.add('w-point');
            html.innerHTML = `<svg width="150" height="150"><text x="75" y="75">${pointText}${this.point}</text></svg>`;

            // show point
            const x = Phaser.Math.Between(pointer.x - container.width * 0.5, pointer.x + container.width * 0.5);
            const y = pointer.y - container.height * 0.5;
            const point = this.scene.add.dom(x, y, html);

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