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

        // create hole container
        this.hole = this.scene.add.container(0, 0, [this.character]).setDepth(3).setSize(200, 200);

        // align character
        this.character.setPosition(0, 100).setDisplayOrigin(0.5, 0.5);

        // anim
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
        this.hole.setInteractive();
        this.scene.input.enableDebug(this.hole, 0xffff00);


        // align
        console.log(this.hole)
        this.scene.plugins.get('rexanchorplugin').add(this.hole, this.anchor);
        console.log(this.hole)


        // set mask
        const maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(this.hole.x - this.hole.width * 0.5, this.hole.y - this.hole.height * 0.5, this.hole.width, this.hole.height);
        const mask = maskShape.createGeometryMask();
        this.hole.setMask(mask);
    }
}