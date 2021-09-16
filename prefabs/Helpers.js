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
        this.key = config.key;
        this.anchor = config.anchor || undefined;
        this.depth = config.depth || 3;

        // for background
        this.texture = this.scene.sceneData.background;
        this.textureMobile = this.scene.sceneData.backgroundMobile || undefined;

        // switch
        switch(this.key){
            case 'getBackgroundImage':
                return this.getBackgroundImage();
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

        // add background to scene // todo update bg on resize
        const isMobile = window.innerWidth <= 768;
        const background = this.scene.add.image(0, 0, isMobile ? this.textureMobile : this.texture);


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