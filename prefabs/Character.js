class Character{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }
        if(!config.name){
            console.warn("Missing character name!");
            return;
        }

        this.scene = config.scene;
        this.id = config.id || generateID();
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.debug = config.debug || DEV;
        this.name = config.name || '';
        this.hurtTime = CHARACTER_IDLE; // ms
        this.point = config.point || 10;

        this.createAnimations();
        this.createPorcupine();

        return this.character;
    }

    createAnimations(){
        // create frames
        const idleFrames = this.scene.anims.generateFrameNames('whack', {
            start: 1, end: 4,
            prefix: `characters/${this.name}/smirky-`
        });
        const attackFrame = this.scene.anims.generateFrameNames('whack', {
            frames: [1],
            prefix: `characters/${this.name}/hurt-`
        });
        const hurtFrames = this.scene.anims.generateFrameNames('whack', {
            start: 2, end: 3,
            prefix: `characters/${this.name}/hurt-`
        });

        // create anims
        this.scene.anims.create({key: `${this.name}-idle`, frames: idleFrames, frameRate: 8, repeat: -1, yoyo: true});
        this.scene.anims.create({key: `${this.name}-attack`, frames: attackFrame, frameRate: 2, duration: 0.5});
        this.scene.anims.create({key: `${this.name}-hurt`, frames: hurtFrames, frameRate: 8, repeat: -1, yoyo: true});
    }

    createPorcupine(){
        this.character = this.scene.add.sprite(this.x, this.y, 'whack', `characters/${this.name}/normal-1`);
        this.hurtTimer = undefined;
        this.ratio = this.character.height / this.character.width;
        this.width = CHARACTER_WIDTH;
        this.height = this.width * this.ratio;
        this.character.setDisplaySize(this.width, this.height);

        // adjust the hit area
        const hitAreaX = this.width * 0.67;
        const hitAreaY = this.height;
        const shape = new Phaser.Geom.Ellipse(hitAreaX, hitAreaY, this.width, this.height * 1.3);
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
        this.character.anims.play(`${this.name}-${key}`);

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
            if(DEV) console.log(`Attack ${this.name}`);

            // play anim
            this.playAnimation('attack');

            // create html
            const html = document.createElement('div');
            html.classList.add('w-point');
            html.innerText = `+${this.point}`;
            html.innerHTML = `<svg width="150" height="150"><text x="75" y="75">+${this.point}</text></svg>`;

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