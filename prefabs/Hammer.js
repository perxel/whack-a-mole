class Hammer{
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
        this.name = config.name || '';
        this.anchor = config.anchor || {};
        this.attackDuration = 100; // ms
        this.attackAnim = `${this.id}-attack`;

        this.createAnimations();
        this.createHammer();

        return this.hammer;
    }

    createAnimations(){
        // create frames
        const attackFrames = this.scene.anims.generateFrameNames('whack', {
            start: 2, end: 3,
            prefix: `hammers/${this.name}/`
        });

        // create anim
        this.scene.anims.create({key: this.attackAnim, frames: attackFrames, duration: this.attackDuration});
    }

    createHammer(){
        this.hammer = this.scene.add.sprite(this.x, this.y, 'whack', `hammers/${this.name}/1`).setDepth(4).setAlpha(0).setScale(0.5);
        this.attackTimer = undefined;

        this.scene.input.on("pointerdown", (data) => {
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