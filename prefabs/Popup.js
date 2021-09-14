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

        this.depth = config.depth || 1;
        this.titleHtml = config.titleHtml || undefined;
        this.innerHtml = config.innerHtml || undefined;

        this.visible = config.visible || false;

        // load popup to dom
        const popup = new DOM({
            scene: this.scene,
            html: 'Popup',
            className: this.className,
            depth: this.depth
        });

        // update popup html
        this.$popup = $(`.${this.uniqueClass}`);

        if(this.visible){
            this.show();
        }

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