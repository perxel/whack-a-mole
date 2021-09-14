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
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});

        /**
         * Load HTML
         */
        const $popup = new Popup({
            scene: this,
            className: 'popup-choose-level',
            titleHtml: 'Choose<br>Level',
            innerHtml: this.getLevelsHtml(),
            visible: true
        });
        const dom = new DOM({scene: this, depth: 2});
    }


    getLevelsHtml(){
        let html = '';

        const level_count = [
            {order: 1, is_unlocked: true,},
            {order: 2, is_unlocked: true,},
            {order: 3, is_unlocked: true,},
            {order: 4, is_unlocked: true,},
            {order: 5, is_unlocked: true,},
            {order: 6, is_unlocked: true,},
            {order: 7, is_unlocked: true,},
            {order: 8, is_unlocked: true,},
            {order: 9, is_unlocked: true,},
            {order: 10, is_unlocked: true,},
        ];

        html += '<div class="w-level-grid w-flex w-flex--wrap w-flex--justify-center">';
        for(let i = 0; i < level_count.length; i++){
            const imageUrl = level_count[i].is_unlocked ? 'assets/img/btn/level.svg' : 'assets/img/btn/level-locked.svg';
            const className = level_count[i].is_unlocked ? 'unlocked' : 'locked disabled';
            const text = level_count[i].is_unlocked ? i + 1 : '';

            html += '<div class="w-level-grid-item">';
            html += `<button data-button="go-level" data-level="${i + 1}" class="button level ${className}">`;
            html += `<span class="w-bg-contain w-flex w-flex--justify-center w-flex--align-center" style="background-image:url(${imageUrl})">`;
            html += text;
            html += `</span>`;
            html += `</button>`;
            html += '</div>';
        }
        html += '</div>';

        return html;
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
    }

    goPlay(level){
        if(DEV) console.log(`Go to level ${level}`);
        this.scene.start("GamePlay", {previousScene: this.sceneData, levelId: level});
    }
}