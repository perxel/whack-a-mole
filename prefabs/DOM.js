class DOM{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.sceneKey = this.scene.scene.key;
        this.className = config.className || 'scene-container';
        this.className += ' ' + this.sceneKey;
        this.html = config.html || this.sceneKey;
        this.depth = config.depth || 1;

        // add DOM
        this.dom = this.scene.add.dom(0, 0).createFromCache(this.html).setClassName(this.className).setDepth(this.depth);
        this.dom.addListener('click');

        // assign buttons events
        new Button({scene: this.scene});
    }
}