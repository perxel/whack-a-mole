class Hole{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.anchor = config.anchor || undefined;
        this.characters = config.characters || [];
        this.debug = config.debug || DEV;

        this.level = config.level || 1;
        this.order = config.order || undefined;
    }

    get(){
        if(typeof this.holeContainer === 'undefined'){
            console.warn(`Cannot return hole #${this.order} due to missing container!`);
            return;
        }

        return this.holeContainer;
    }

    setMask(){
        if(typeof this.holeContainer === 'undefined'){
            console.warn(`Cannot set mask for hole #${this.order} due to missing container!`);
            return;
        }

        // create mask
        const maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);
        const width = this.holeContainer.width * 1.2;
        const height = this.holeContainer.height * 1.2;
        const x = this.holeContainer.x - width * 0.5;
        const y = this.holeContainer.y - height * 0.5;
        maskShape.fillRect(x, y, width, height);

        // set mask
        for(let i = 0; i < this.characters.length; i++){
            this.characters[i].character.setMask(maskShape.createGeometryMask());
        }
    }

    addCharacter(character){
        //if(DEV) console.log(`Add [${character.name}] to hole #${this.order}`, character);
        this.characters.push(character);
    }

    setupHole(){
        //if(DEV) console.log(`Setup hole #${this.order}`);
        const gameConfig = this.scene.sys.game._DATA.getConfig();

        // align character
        const characters = [];
        for(let i = 0; i < this.characters.length; i++){
            characters.push(this.characters[i].character);
            this.characters[i].character.setPosition(0, gameConfig.character_hide_y).setDisplayOrigin(0.5, 0.5).setDepth(2);
        }

        // create hole front & back
        this.holeBack = this.scene.add.sprite(0, gameConfig.hole_sprite_y, 'holesAtlas', `${this.level}-0`).setDepth(1).setScale(gameConfig.hole_scale);
        this.holeFront = this.scene.add.sprite(0, gameConfig.hole_sprite_y, 'holesAtlas', `${this.level}-1`).setDepth(3).setScale(gameConfig.hole_scale);

        // create hole container
        this.holeContainer = this.scene.add.container(0, 0, [this.holeBack, ...characters, this.holeFront]).setDepth(2).setSize(gameConfig.hole_size, gameConfig.hole_size);

        // debug
        if(this.debug){
            this.holeContainer.setInteractive();
            this.scene.input.enableDebug(this.holeContainer, 0xffff00);
        }

        // align hole
        if(this.anchor){
            this.scene.plugins.get('rexanchorplugin').add(this.holeContainer, this.anchor);
        }

        // set mask and update on resize
        this.setMask();
        setTimeout(() => {
            this.setMask();
        }, 100)
        this.scene.scale.on('resize', () => {
            this.setMask();
        });
    }
}