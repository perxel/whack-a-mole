class Popup{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.sceneKey = this.scene.scene.key;

        this.uniqueClass = this.sceneKey + '-' + generateID();

        this.className = config.className || '';
        this.className += ' ' + this.uniqueClass;

        this.depth = config.depth || 1;
        this.titleHtml = config.titleHtml || undefined;
        this.innerHtml = config.innerHtml || undefined;

        // load popup to dom
        const popup = new DOM({scene: this.scene, html: 'Popup', className: this.className, depth: this.depth});

        // update popup html
        const $popup = $(`.${this.uniqueClass}`);

        if(this.titleHtml){
            $popup.find('[data-popup-title]').html(this.titleHtml);
        }
        if(this.innerHtml){
            $popup.find('[data-popup-content]').html(this.innerHtml);
        }

        return $popup;
    }
}