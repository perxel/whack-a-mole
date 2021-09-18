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
        if(DEV) console.log(`Add background image [${this.textureDesktop}] to scene ${this.sceneKey}`);

        // add background to scene
        const backgroundDesktop = this.scene.add.image(0, 0, this.textureDesktop).setAlpha(0);
        const backgroundMobile = this.scene.add.image(0, 0, this.textureMobile).setAlpha(0);


        // resize background to cover the screen
        keepBackgroundCover(this.scene, backgroundDesktop);
        keepBackgroundCover(this.scene, backgroundMobile);

        const isMobile = window.innerWidth <= 768;

        // animate
        this.scene.tweens.add({
            targets: isMobile ? backgroundMobile : backgroundDesktop,
            ease: 'Linear',
            duration: hasBgTransition ? 300 : 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
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
}