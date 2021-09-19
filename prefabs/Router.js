class Router{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.to = config.to;
        this.levelID = config.levelID;

        this.go();
    }

    go(){
        this.scene.scene.start(this.to, {previousScene: this.scene.sceneData, levelID: this.levelID});
    }
}