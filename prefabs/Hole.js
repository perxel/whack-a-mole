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
        this.anchor = config.anchor || undefined;
        this.characters = config.characters || [];
        this.debug = config.debug || false;

        this.level = config.level || 1;

        // align character
        for(let i = 0; i < this.characters.length; i++){
            this.characters[i].setPosition(0, 100).setDisplayOrigin(0.5, 0.5).setDepth(2);
        }

        // create hole front & back
        this.holeBack = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-0`).setDepth(1);
        this.holeFront = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-1`).setDepth(3);

        // create hole container todo: adjust hole size
        this.holeContainer = this.scene.add.container(0, 0, [this.holeBack, ...this.characters, this.holeFront]).setDepth(2).setSize(200, 200);

        // porcupine animation
        for(let i = 0; i < this.characters.length; i++){
            const timeline = this.scene.tweens.createTimeline({loop: -1});
            const y = this.characters[i].y;

            // show
            timeline.add({
                targets: this.characters[i],
                ease: 'Power0',
                duration: 300,
                y: {
                    getStart: () => this.characters[i].height,
                    getEnd: () => y
                }
            });
            // hide
            timeline.add({
                targets: this.characters[i],
                ease: 'Power0',
                delay: 500,
                duration: 300,
                y: {
                    getStart: () => y,
                    getEnd: () => this.characters[i].height
                }
            });
            timeline.play();
        }

        // debug
        if(this.debug){
            this.holeContainer.setInteractive();
            this.scene.input.enableDebug(this.holeContainer, 0xffff00);
        }

        // align hole
        if(this.anchor){
            this.scene.plugins.get('rexanchorplugin').add(this.holeContainer, this.anchor);
        }

        // mask and update on resize
        this.setMask();
        this.scene.scale.on('resize', () => {
            this.setMask();
        });
    }

    get(){
        return this.holeContainer;
    }

    setMask(){
        // create mask
        const maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);
        const x = this.holeContainer.x - this.holeContainer.width * 0.5;
        const y = this.holeContainer.y - this.holeContainer.height * 0.5;
        maskShape.fillRect(x, y, this.holeContainer.width, this.holeContainer.height);

        // set mask
        for(let i = 0; i < this.characters.length; i++){
            this.characters[i].setMask(maskShape.createGeometryMask());
        }
    }
}