class BuyHammer extends Phaser.Scene{
    constructor(){
        super({key: "BuyHammer", active: false});
    }

    init(data){
        this.sceneData = {
            name: this.scene.key,
            background: 'desktopBg',
            previousScene: generatePreviousSceneData(this, data)
        };

        if(DEV) console.log('--------------------');
        if(DEV) console.log(`${this.sceneData.name} init()`, this.sceneData);
    }

    preload(){
        //if(DEV) console.log('BuyHammer preload()');
    }

    create(){
        //if(DEV) console.log('BuyHammer create()');


        /**
         * Images
         */
        // background
        this.bg = new Helpers({scene: this}).getBackgroundImage();

        /**
         * Load HTML
         */
        const popupBuyHammer = new Popup({
            scene: this,
            name: 'PopupBuyHammer',
            visible: true,
            manipulateHtml: ($popup) => new Helpers({scene: this}).generateBuyHammerPopupHtml($popup),
            onNoClick: (thisPopup) => {
                thisPopup.hide();
            }
        });

        //const dom = new DOM({scene: this, depth: 2});
    }


    goPlay(level){
        this.scene.start("ChooseLevel", {previousScene: this.sceneData});
    }
}