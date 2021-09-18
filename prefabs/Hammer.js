class Hammer{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }
        if(!config.id){
            console.warn("Hammer is undefined!");
            return;
        }

        this.scene = config.scene;
        this.id = config.id || undefined;

        // sprite
        this.sprite_name = new GameData().getHammers(this.id).sprite_name;

        // animation
        this.attackDuration = 100; // ms
        this.attackAnim = `${this.id}-attack`;

        this.createAnimations();
        this.createHammer();

        return this.hammer;
    }

    createAnimations(){
        // create frames
        const attackFrames = this.scene.anims.generateFrameNames('hammersAtlas', {
            start: 2, end: 3,
            prefix: `${this.sprite_name}/`
        });

        // create anim
        this.scene.anims.create({key: this.attackAnim, frames: attackFrames, duration: this.attackDuration});
    }

    createHammer(){
        this.hammer = this.scene.add.sprite(0, 0, 'hammersAtlas', `${this.sprite_name}/1`).setDepth(4).setAlpha(0).setScale(0.5);
        this.attackTimer = undefined;

        this.scene.input.on("pointerdown", (data) => {
            // sound fx
            this.scene.sys.game._SOUND.playSoundFx(`hammer-attack-${this.id}`);

            // update position
            this.hammer.setPosition(data.position.x + this.hammer.displayWidth * 0.5, data.position.y + this.hammer.displayHeight * 0.5).setAlpha(1);

            // play attach anim
            this.hammer.anims.play(this.attackAnim);

            // hide hammer
            if(this.attackTimer){
                this.attackTimer.remove();
            }
            this.attackTimer = this.scene.time.addEvent({
                delay: this.attackDuration,
                callback: () => {
                    this.hammer.setAlpha(0);
                }
            });
        })
    }
}