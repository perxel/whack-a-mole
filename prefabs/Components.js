class Components{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.sceneKey = this.scene.scene.key;
        this.key = config.key;
        this.anchor = config.anchor || undefined;
        this.depth = config.depth || 3;

        // for background
        this.texture = config.texture;
        this.prevTexture = config.prevTexture || undefined;

        // switch
        switch(this.key){
            case 'goBackButton':
                return this.getGoBackButton();
            case 'getBackgroundImage':
                return this.getBackgroundImage();
            default:
                console.warn(`Component ${this.key} is not found!`);
        }
    }

    getGoBackButton(){
        this.previousScene = this.scene.sceneData.previousScene.name;

        return new Button(this.scene, 0, 0, {
            idleTexture: 'back',
            pointerUp: () => {
                if(!this.previousScene){
                    this.previousScene = "Menu";
                    if(DEV) console.log(`Undefined previous scene. Go back from ${this.sceneKey} to ${this.previousScene}.`);
                }else{
                    if(DEV) console.log(`Go back from ${this.sceneKey} to ${this.previousScene}`);
                }

                this.scene.scene.start(this.previousScene, {previousScene: this.scene.sceneData});
            },
            anchor: this.anchor,
            depth: this.depth
        }).get();
    }

    getBackgroundImage(){
        const hasBgTransition = this.texture !== this.prevTexture;
        if(DEV) console.log(`Add background image [${this.texture}] to scene ${this.sceneKey} ${hasBgTransition ? "with" : "without"} transition.`);

        // add background to scene
        const cameras = this.scene.cameras.main;
        const background = this.scene.add.image(cameras.width / 2, cameras.height / 2, this.texture);
        const scaleX = cameras.width / background.width;
        const scaleY = cameras.height / background.height;
        const scale = Math.max(scaleX, scaleY);
        background.setScale(scale).setScrollFactor(0);

        // animate
        if(hasBgTransition){
            this.scene.tweens.add({
                targets: background,
                ease: 'Linear',
                duration: 600,
                alpha: {
                    getStart: () => 0,
                    getEnd: () => 1
                },
            });
        }

        return background;
    }
}