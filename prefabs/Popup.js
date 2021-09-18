/**
 * Popup
 */

// const $popup = new Popup({
//     scene: this,
//     className: 'popup-choose-level',
//     titleHtml: 'Choose<br>Level',
//     innerHtml: this.getLevelsHtml()
// });

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
        this.className += ' w-popup-wrapper';
        this.className += ' ' + this.uniqueClass;

        this.depth = config.depth || 2;
        this.name = config.name || 'Popup';
        this.titleHtml = config.titleHtml || undefined;
        this.innerHtml = config.innerHtml || undefined;

        this.visible = config.visible || false;
        this.size = config.size || '';
        this.className += ' ' + this.size;

        // load popup to the DOM
        const popup = new DOM({
            scene: this.scene,
            html: this.name,
            className: this.className,
            depth: this.depth
        });


        // get popup jQuery element
        this.$popup = $(`.${this.uniqueClass}`);

        // check visible
        if(this.visible){
            this.show();
        }

        // inject dynamic HTML if any
        if(this.titleHtml){
            this.$popup.find('[data-popup-title]').html(this.titleHtml);
        }
        if(this.innerHtml){
            this.$popup.find('[data-popup-content]').html(this.innerHtml);
        }
    }

    get(){
        return this.$popup;
    }

    show(){
        this.$popup.addClass('show-popup');
    }

    hide(){
        this.$popup.removeClass('show-popup');
    }

    toggle(){
        if(!this.$popup.hasClass('show-popup')){
            this.show();
        }else{
            this.hide();
        }
    }
}