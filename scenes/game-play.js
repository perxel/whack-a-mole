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
        // Hammer
        this.hammer = new Hammer({scene: this, name: '4'});

        // Holes
        const holeCount = 9;
        this.holeObjects = [];
        this.holes = [];
        for(let i = 0; i < holeCount; i++){
            const porcupine = new Character({
                scene: this,
                name: 'one'
            });

            const hole = new Hole({
                scene: this,
                character: porcupine,
                level: this.level
            });

            this.holes.push(hole);
            this.holeObjects.push(hole.get());
        }

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
        gridAlign(this, this.holeObjects, cols, rows, gridWidth, gridHeight, cellWidth, cellHeight);
        this.scale.on('resize', () => {
            gridAlign(this, this.holeObjects, cols, rows, gridWidth, gridHeight, cellWidth, cellHeight);
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