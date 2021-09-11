class ChooseLevel extends Phaser.Scene{
    constructor(){
        super({key: "ChooseLevel", active: false});
    }

    init(data){
        this.CONFIG = this.sys.game.CONFIG;

        this.sceneData = {
            name: this.scene.key,
            background: 'desktopBg',
            previousScene: generatePreviousSceneData(this, data)
        };

        if(DEV) console.log('--------------------');
        if(DEV) console.log(`${this.sceneData.name} init()`, this.sceneData);
    }

    preload(){
        //if(DEV) console.log('ChooseLevel preload()');
    }

    create(){
        //if(DEV) console.log('ChooseLevel create()');

        /**
         * Images
         */
        // background
        this.bg = new Components({scene: this, key: 'getBackgroundImage', texture: this.sceneData.background});

        /**
         * Load HTML
         */
        const dom = new DOM({scene: this});

        /**
         * Levels
         */
        this.createLevels();

        /**
         * Popup
         */
    }


    createLevels(){
        const level_count = [
            {order: 1, is_unlocked: true,},
            {order: 2, is_unlocked: true,},
            {order: 3, is_unlocked: false,},
            {order: 4, is_unlocked: false,},
            {order: 5, is_unlocked: false,},
            {order: 6, is_unlocked: false,},
            {order: 7, is_unlocked: false,},
            {order: 8, is_unlocked: false,},
            {order: 9, is_unlocked: false,},
            {order: 10, is_unlocked: false,},
        ];

        const cols = 5;
        const rows = Math.ceil(level_count.length / cols);
        const itemWidth = window.innerWidth > 1024 ? 116 : 80;
        const itemHeight = window.innerWidth > 1024 ? 112 : 60;
        const itemMarginSide = 16;
        const itemMarginTop = 40;
        const width = itemWidth * cols + (cols - 1) * itemMarginSide;
        const height = itemHeight * rows + (rows - 1) * itemMarginTop;

        // level buttons
        this.levelButtons = [];
        for(let i = 0; i < level_count.length; i++){
            // Button level
            this.levelButtons[i] = new Button(this, 0, 0, {
                atlas: 'whack',
                idleTexture: level_count[i].is_unlocked ? 'levels/btn/' + (i + 1) : "levels/btn/0",
                disabled: !level_count[i].is_unlocked,
                width: itemWidth, height: itemHeight,
                pointerUp: () => {
                    this.goPlay(i + 1);
                },
                depth: 3
            });
            this.levelButtons[i] = this.levelButtons[i].get();
        }

        // align to grid
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Actions.html#.GridAlignConfig
        Phaser.Actions.GridAlign(this.levelButtons, {
            width: cols,
            height: rows,
            cellWidth: itemWidth + itemMarginSide,
            cellHeight: itemHeight + itemMarginTop,
            x: itemMarginSide + 110,
            y: itemMarginTop + 95
        });


        // popup
        const popup = new Popup({
            scene: this,
            width: width,
            height: height,
            padding: [90, 90, 70, 90],
            objects: [...this.levelButtons],
            title: 'Choose\nLevel'
        });
    }

    goPlay(level){
        if(DEV) console.log(`Go to level ${level}`);
        this.scene.start("GamePlay", {previousScene: this.sceneData, levelId: level});
    }
}