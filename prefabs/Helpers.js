class Helpers{
    constructor(config){
        // validate
        if(typeof config === 'undefined' || !config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.previousScene = this.scene.sceneData.previousScene || undefined;
        this.sceneKey = this.scene.scene.key;
    }

    /**
     * Get Background Image
     * @returns {*}
     */
    getBackgroundImage(){
        // get background texture
        this.textureDesktop = this.scene.sceneData.background;
        this.textureMobile = this.scene.sceneData.backgroundMobile || this.textureDesktop;

        // check if the prev scene is available
        const hasBgTransition = this.previousScene && this.textureDesktop !== this.previousScene.background;
        //if(DEV) console.log(`Add background image [${this.textureDesktop}] to scene ${this.sceneKey}`);

        // add background to scene
        const backgroundDesktop = this.scene.add.image(0, 0, this.textureDesktop).setAlpha(0);
        const backgroundMobile = this.scene.add.image(0, 0, this.textureMobile).setAlpha(0);

        // resize background to cover the screen
        keepBackgroundCover(this.scene, backgroundDesktop);
        keepBackgroundCover(this.scene, backgroundMobile);

        // change background on resize
        const breakpoint = this.scene.sys.game._DATA.getConfig().background_breakpoint;
        const bgConfig = {
            showBackground: backgroundDesktop,
            hideBackground: backgroundMobile,
            hasBgTransition: hasBgTransition,
            scene: this.scene,
            onMatched: (data) => {
                // hide background
                data.settings.scene.tweens.add({
                    targets: data.settings.hideBackground,
                    ease: 'Linear',
                    duration: data.settings.hasBgTransition ? 300 : 0,
                    alpha: {
                        getStart: () => 1,
                        getEnd: () => 0
                    },
                });

                // show background
                data.settings.scene.tweens.add({
                    targets: data.settings.showBackground,
                    ease: 'Linear',
                    duration: data.settings.hasBgTransition ? 300 : 0,
                    alpha: {
                        getStart: () => 0,
                        getEnd: () => 1
                    },
                });
            },
            responsive: [
                {
                    breakpoint: breakpoint,
                    settings: {
                        showBackground: backgroundMobile,
                        hideBackground: backgroundDesktop,
                    }
                }
            ]
        };

        let lastBreakpoint = getResponsiveData(bgConfig).breakpoint;
        window.addEventListener('resize', () => {
            lastBreakpoint = getResponsiveData(bgConfig, lastBreakpoint).breakpoint;
        });

        return {backgroundDesktop, backgroundMobile};
    }


    /**
     * Generate array of character IDs by rare level
     * @param characterIDs
     * @returns {*[]}
     */
    generateCharacterRareArray(characterIDs){
        const rareIDsArray = [];
        for(let i = 0; i < characterIDs.length; i++){
            const character = new GameData().getCharacters(characterIDs[i]);
            const quantity = parseFloat(character.rare_level) * 100;

            for(let j = 0; j < quantity; j++){
                rareIDsArray.push(characterIDs[i]);
            }
        }

        return rareIDsArray;
    }


    /**
     * Generate HTML for Buy Hammer Popup
     * @param $popup
     */
    generateBuyHammerPopupHtml($popup){
        const hammers = new GameData().getHammers();
        const $item = $popup.find('[data-hammer-item]').detach();
        const $list = $popup.find('.hammer-list');

        // get current whack of player
        const whackCoin = this.scene.sys.game.PLAYER.get().whack_coin;
        $popup.find('[data-your-whack]').html(whackCoin);

        // get current hammer
        const hammerID = this.scene.sys.game.PLAYER.get().hammer_id;

        // generate hammers
        for(let i in hammers){
            // skip the current hammer
            if(hammerID === hammers[i].id) continue;

            const $thisHammer = $item.clone();

            $thisHammer.find('[data-thumb]').attr('src', hammers[i].display_image_url);
            $thisHammer.find('[data-thumb]').attr('alt', hammers[i].display_name);
            $thisHammer.find('[data-name]').html(hammers[i].display_name);
            $thisHammer.find('[data-price]').html(hammers[i].whack_cost);
            $thisHammer.find('[data-buy-hammer]').attr('data-buy-hammer', hammers[i].id);
            $thisHammer.find('[data-buy-hammer]').removeClass('event-added');

            $thisHammer.appendTo($list);
        }

        resizeSvgText();


        // assign buttons events
        new Button({scene: this.scene});
    }
}