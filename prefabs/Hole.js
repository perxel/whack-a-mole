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
        const x = this.holeContainer.x - this.holeContainer.width * 0.5;
        const y = this.holeContainer.y - this.holeContainer.height * 0.5;
        maskShape.fillRect(x, y, this.holeContainer.width, this.holeContainer.height);

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

        // align character
        const characters = [];
        for(let i = 0; i < this.characters.length; i++){
            characters.push(this.characters[i].character);
            const height = this.characters[i].character.height;
            this.characters[i].character.setPosition(0, height).setDisplayOrigin(0.5, 0.5).setDepth(2);
        }

        // create hole front & back
        this.holeBack = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-0`).setDepth(1);
        this.holeFront = this.scene.add.sprite(0, 113, 'whack', `bg/${this.level}-1`).setDepth(3);

        // create hole container todo: adjust hole size
        this.holeContainer = this.scene.add.container(0, 0, [this.holeBack, ...characters, this.holeFront]).setDepth(2).setSize(200, 200);

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

    updateTimeline(){
        this.setupHole();

        //if(DEV) console.log(`Setup timeline for hole #${this.order}`);
        this.timeline = this.scene.tweens.createTimeline(); // store animation for all character in this hole

        for(let i = 0; i < this.characters.length; i++){
            const character = this.characters[i].character;
            const showTime = this.characters[i].showtime; // time to show this character count from 0 [ms]
            const duration = 1100;
            const prevShowtime = i === 0 ? 0 : this.characters[i - 1].showtime;
            const offset = showTime - (prevShowtime + duration);

            // show
            this.timeline.add({
                targets: character,
                ease: 'Power0',
                offset: `+=${offset}`,
                duration: 300,
                y: 100
            });
            // hide
            this.timeline.add({
                targets: character,
                ease: 'Power0',
                offset: '+=500',
                duration: 300,
                y: character.height
            });
        }
    }

    play(){
        if(typeof this.timeline === 'undefined'){
            console.warn(`Cannot play hole #${this.order} due to missing timeline!`);
            return;
        }

        //if(DEV) console.log(`Play hole #${this.order}`);

        this.timeline.play();
    }
}