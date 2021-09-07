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
        this.showHitArea = config.showHitArea || false;
        this.name = config.name || '';
        this.anchor = config.anchor || {};
        this.hurtTime = 2000; // ms

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
        this.width = 250;
        this.height = this.width * this.ratio;
        this.character.setDisplaySize(this.width, this.height);

        // adjust the hit area
        const hitAreaDiameter = this.height * 0.8;
        const hitAreaX = this.width * 0.6;
        const shape = new Phaser.Geom.Circle(hitAreaX, this.height * 0.8, hitAreaDiameter * 0.5);
        this.character.setInteractive(shape, Phaser.Geom.Circle.Contains);

        // Play idle animation
        this.playAnimation('idle');

        // Show hit area
        if(this.showHitArea){
            this.scene.input.enableDebug(this.character, 0xffff00);
        }


        // On attack
        this.character.on('pointerdown', () => {
            this.attack();
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

        // re-align
        this.scene.plugins.get('rexanchorplugin').add(this.character, this.anchor);
    }

    attack(){
        this.playAnimation('attack');
    }
}