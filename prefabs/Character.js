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
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.showHitArea = config.showHitArea || false;
        this.name = config.name || '';
        this.anchor = config.anchor || {};

        this.createAnimations();
        this.createPorcupine();

        return this.character;
    }

    createAnimations(){
        // create frames
        const idleFrames = this.scene.anims.generateFrameNames('whack', {
            start: 1, end: 4, zeroPad: 0,
            prefix: `characters/${this.name}/smirky-`
        });
        const hurtFrames = this.scene.anims.generateFrameNames('whack', {
            start: 2, end: 3, zeroPad: 0,
            prefix: `characters/${this.name}/hurt-`
        });

        // create anims
        this.scene.anims.create({key: `${this.name}-idle`, frames: idleFrames, frameRate: 8, repeat: -1, yoyo: true});
        this.scene.anims.create({key: `${this.name}-hurt`, frames: hurtFrames, frameRate: 8, repeat: -1, yoyo: true});
    }

    createPorcupine(){
        this.character = this.scene.add.sprite(this.x, this.y, 'whack', `characters/${this.name}/normal-1`);

        // Set interactive
        this.character.setInteractive();
        this.character.input.hitArea.setTo(this.character.x, this.character.y, this.character.width, this.character.height);

        // Play idle animation
        this.playAnimation('idle');

        // Show hit area
        if(this.showHitArea){
            const hitArea = this.character.input.hitArea;
            const hitAreaGraphic = this.scene.add.rectangle(this.character.x, this.character.y, hitArea.width, hitArea.height, 0x00ff00, 0.1);
            hitAreaGraphic.setOrigin(this.character.originX, this.character.originY);
        }

        // On attack
        this.character.on('pointerdown', () => {
            this.attack();
        });
    }

    playAnimation(key){
        this.character.anims.play(`${this.name}-${key}`);
        this.scene.plugins.get('rexanchorplugin').add(this.character, this.anchor);
    }

    attack(){
        this.playAnimation('hurt');
    }
}