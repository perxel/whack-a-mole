class Components{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.key = config.key;
        this.previousScene = config.previousScene;
        this.anchor = config.anchor || undefined;
        this.depth = config.depth || 3;

        // switch
        switch(this.key){
            case 'goBackButton':
                return this.getGoBackButton();
            default:
                console.warn(`Component ${this.key} is not found!`);
        }
    }

    getGoBackButton(){
        return new Button(this.scene, 0, 0, {
            idleTexture: 'back',
            pointerUp: () => {
                if(!this.previousScene){
                    this.previousScene = "Menu";
                    if(DEV) console.log(`Undefined previous scene. Go back from ${this.scene.scene.key} to ${this.previousScene}.`);
                }else{
                    if(DEV) console.log(`Go back from ${this.scene.scene.key} to ${this.previousScene}`);
                }

                this.scene.scene.start(this.previousScene);
            },
            anchor: this.anchor,
            depth: this.depth
        }).get();
    }
}