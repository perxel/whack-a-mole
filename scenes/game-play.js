class GamePlay extends Phaser.Scene{
    constructor(){
        super({key: "GamePlay", active: false});
    }

    init(data){
        this.CONFIG = this.sys.game.CONFIG;
        this.level = data.levelId || 1;
        this.sceneData = {
            name: this.scene.key,
            background: `level${this.level}`,
            previousScene: generatePreviousSceneData(this, data)
        };

        if(DEV) console.log('--------------------');
        if(DEV) console.log(`${this.sceneData.name} init()`, this.sceneData);
    }

    preload(){
        //if(DEV) console.log('Play preload()');
    }

    create(){
        //if(DEV) console.log('Play create()');

        /**
         * Load HTML
         */
        const dom = new DOM({scene: this});

        /**
         * Images
         */
        // background
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});

        /**
         * Create holes
         */
        this.createHoles();
    }


    createHoles(){
        // Characters
        this.characters = ['one', 'two']; // list of characters in this level

        // Hammer
        this.hammer = new Hammer({scene: this, name: '1'});

        // Waves
        const holeCount = 9;
        const charactersTime = 1100; // total time of each character from show to hide
        const tryTime = 60 * 1000; // total time of each try [ms]
        const waveTime = 5000; // delay between each wave [ms]
        const waveCount = Math.round(tryTime / waveTime); // number of waves in each try
        const waveCharactersNumber = 3; // number of characters could appear in one wave
        const waves = [];

        for(let i = 0; i < waveCount; i++){
            const waveBegin = i * waveTime;
            const waveEnd = waveBegin + waveTime;
            const characters = [];
            const eachTime = waveTime / (waveCharactersNumber + 1);
            const waveHoles = [];

            for(let j = 0; j < waveCharactersNumber; j++){
                const characterTimeMark = waveBegin + (eachTime * (j + 1));
                const characterTimeMin = characterTimeMark - charactersTime * 0.5;
                const characterTimeMax = characterTimeMark + charactersTime * 0.5;
                const characterTime = Phaser.Math.Between(characterTimeMin, characterTimeMax);

                // get random character
                const characterIndex = Phaser.Math.Between(0, this.characters.length - 1);
                const characterName = this.characters[characterIndex];

                // find random unique hole
                let holeIndex = Phaser.Math.Between(0, holeCount - 1);
                while(waveHoles.includes(holeIndex)){
                    holeIndex = Phaser.Math.Between(0, holeCount - 1);
                }
                waveHoles.push(holeIndex);

                // save character
                characters.push({showtime: characterTime, name: characterName, holeIndex: holeIndex});
            }


            // save wave
            waves.push({waveBegin, waveEnd, characters});
        }
        console.log(waves);

        // Holes
        this.holesAlign = [];
        this.holes = [];
        for(let i = 0; i < holeCount; i++){
            const porcupine = new Character({scene: this, name: 'one'});

            // create hole
            const hole = new Hole({
                scene: this,
                characters: [porcupine],
                level: this.level
            });

            // save
            this.holes.push(hole);
            this.holesAlign.push(hole.get());
        }

        // todo: add character to hole

        // align to grid
        const cols = 3;
        const rows = 3;
        const gap = 80;
        const space = 30;
        const width = 200;
        const height = 200;
        const cellWidth = width + gap;
        const cellHeight = height + space;
        const gridWidth = cols * cellWidth - gap;
        const gridHeight = rows * cellHeight - space;
        gridAlign(this, this.holesAlign, cols, rows, gridWidth, gridHeight, cellWidth, cellHeight);
        this.scale.on('resize', () => {
            gridAlign(this, this.holesAlign, cols, rows, gridWidth, gridHeight, cellWidth, cellHeight);
        });

        // re-draw mask after alignment
        for(let i = 0; i < this.holes.length; i++){
            this.holes[i].setMask();
        }

        // align grid
        function gridAlign(scene, array, cols, rows, gridWidth, gridHeight, cellWidth, cellHeight){
            const center = {
                x: window.innerWidth * 0.5,
                y: window.innerHeight * 0.5
            };
            const position = {
                x: center.x + cellWidth * 0.5 - gridWidth * 0.5,
                y: center.y + cellHeight * 0.5 - gridHeight * 0.5,
            };
            // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Actions.html#.GridAlignConfig
            Phaser.Actions.GridAlign(array, {
                width: cols,
                height: rows,
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                x: position.x,
                y: position.y
            });
        }
    }

}