class Hole{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.anchor = config.anchor || {};
        this.character = config.character;
        this.debug = config.debug || DEV;

        this.level = config.level || 1;

        // align character
        this.character.setPosition(0, 100).setDisplayOrigin(0.5, 0.5).setDepth(2);

        // create hole front & back
        this.holeBack = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-0`).setDepth(1);
        this.holeFront = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-1`).setDepth(3);

        // create hole container todo: adjust hole size
        this.hole = this.scene.add.container(0, 0, [this.holeBack, this.character, this.holeFront]).setDepth(2).setSize(200, 200);

        // anim todo: adjust anim
        const y = this.character.y;
        this.scene.tweens.add({
            targets: this.character,
            ease: 'Power0',
            duration: 1000,
            y: {
                getStart: () => this.character.height,
                getEnd: () => y
            },
            repeat: -1,
            yoyo: true
        });

        // debug
        if(this.debug){
            this.hole.setInteractive();
            this.scene.input.enableDebug(this.hole, 0xffff00);
        }

        // align hole
        this.scene.plugins.get('rexanchorplugin').add(this.hole, this.anchor);

        // mask and update on resize
        this.setMask();
        this.scene.scale.on('resize', () => {
            this.setMask();
        });
    }

    setMask(){
        // create mask
        const maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(this.hole.x - this.hole.width * 0.5, this.hole.y - this.hole.height * 0.5, this.hole.width, this.hole.height);

        // set mask
        this.character.setMask(maskShape.createGeometryMask());
    }
}