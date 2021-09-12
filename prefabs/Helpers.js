class Helpers{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.previousScene = this.scene.sceneData.previousScene || undefined;
        this.sceneKey = this.scene.scene.key;
        this.key = config.key;
        this.anchor = config.anchor || undefined;
        this.depth = config.depth || 3;

        // for background
        this.texture = this.scene.sceneData.background;

        // switch
        switch(this.key){
            case 'getBackgroundImage':
                return this.getBackgroundImage();
            default:
                console.warn(`Component ${this.key} is not found!`);
        }
    }

    /**
     * Get Background Image
     * @returns {*}
     */
    getBackgroundImage(){
        // check if the prev scene is available
        const hasBgTransition = this.previousScene && this.texture !== this.previousScene.background;
        if(DEV) console.log(`Add background image [${this.texture}] to scene ${this.sceneKey} ${hasBgTransition ? "with" : "without"} transition.`);

        // add background to scene
        const background = this.scene.add.image(0, 0, this.texture);

        // resize background to cover the screen
        keepBackgroundCover(this.scene, background);

        // animate
        if(hasBgTransition){
            this.scene.tweens.add({
                targets: background,
                ease: 'Linear',
                duration: 300,
                alpha: {
                    getStart: () => 0,
                    getEnd: () => 1
                },
            });
        }

        return background;
    }
}