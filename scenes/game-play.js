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
         * Images
         */
        // background
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});


        /**
         * Load HTML
         */
            // Popup pause
        let pauseHtml = '<div class="pause-html">';
        pauseHtml += '<div class="txt-center">DO YOU WANT TO CONTINUE?</div>';
        pauseHtml += '<div class="popup-yes-no">';
        pauseHtml += getHtml('button-no',);
        pauseHtml += getHtml('button-yes');
        pauseHtml += '</div>';
        pauseHtml += '</div>';
        const popupPause = new Popup({
            scene: this,
            className: 'popup-pause small-popup',
            titleHtml: 'Pause',
            innerHtml: pauseHtml,
            depth: 2
        });

        // Popup Time over
        let timeOverHtml = '<div class="pause-html">';
        timeOverHtml += '<div class="txt-center">Your time is over. Play again?</div>';
        timeOverHtml += '<div class="popup-yes-no">';
        timeOverHtml += getHtml('button-no',);
        timeOverHtml += getHtml('button-yes');
        timeOverHtml += '</div>';
        timeOverHtml += '</div>';
        const popupTimeOver = new Popup({
            scene: this,
            className: 'popup-time-over small-popup',
            titleHtml: 'Time Over',
            innerHtml: timeOverHtml,
            depth: 2
        });

        const dom = new DOM({scene: this, depth: 1});
        const progress = new DOM({scene: this, html: 'Progress', className: 'game-timer', depth: 1});


        /**
         * Init game
         */
        this.gameControl = new Whack({
            scene: this,
            holes: this.createHoles(),
            onEndGame: (status) => {
                popupTimeOver.show();
            }
        });
        this.gameControl.play();


        /**
         * Buttons
         */
        // button pause no
        popupPause.get().find('[data-button="no"]').click(() => {
            this.goChooseLevel();
        });

        // button pause yes
        popupPause.get().find('[data-button="yes"]').click(() => {
            this.gameControl.play();
            popupPause.hide();
        });

        // button time over no
        popupTimeOver.get().find('[data-button="no"]').click(() => {
            this.goChooseLevel();
        });

        // button time over yes
        popupTimeOver.get().find('[data-button="yes"]').click(() => {
            this.scene.start("GamePlay", {previousScene: this.sceneData, levelId: this.level});
        });

        // button pause
        $('[data-button="pause"]').on('click', () => {
            this.gameControl.pause();
            popupPause.toggle();
        });
    }

    createHoles(){
        // Characters
        this.characters = ['one', 'two']; // list of characters in this level

        // Hammer
        this.hammer = new Hammer({scene: this, name: '1'});

        // Holes
        const holeCount = 9;
        const holesAlignment = []; // for alignment purpose
        const gameHoles = []; // store each hole's data
        for(let i = 0; i < holeCount; i++){
            // create hole
            const hole = new Hole({
                scene: this,
                level: this.level,
                order: i + 1
            });

            // save
            gameHoles.push(hole);
        }

        // Waves
        const tryTime = GAME_DURATION; // total time of each try [ms]
        const waveTime = WAVE_TIME; // delay between each wave [ms]
        const waveCount = Math.round(tryTime / waveTime); // number of waves in each try
        const characterPerWave = CHARACTER_PER_WAVE; // number of characters could appear in one wave
        const waves = []; // store each wave's data

        for(let i = 0; i < waveCount; i++){
            const waveBegin = i * waveTime;
            const waveEnd = waveBegin + waveTime;
            const waveCharacters = [];
            const waveHoles = [];

            for(let j = 0; j < characterPerWave; j++){
                const characterTime = waveBegin;

                // get random character
                const characterIndex = Phaser.Math.Between(0, this.characters.length - 1);
                const characterName = this.characters[characterIndex];

                // find random unique hole
                let holeIndex = Phaser.Math.Between(0, holeCount - 1);
                while(waveHoles.includes(holeIndex)){
                    holeIndex = Phaser.Math.Between(0, holeCount - 1);
                }
                waveHoles.push(holeIndex);

                // save character to wave
                waveCharacters.push({showtime: characterTime, name: characterName, holeIndex: holeIndex});

                // save character to hole
                const character = new Character({scene: this, name: characterName});
                gameHoles[holeIndex].addCharacter({showtime: characterTime, character: character, name: characterName});
            }


            // save wave
            waves.push({waveBegin, waveEnd, characters: waveCharacters});
        }

        if(DEV) console.log(gameHoles);

        // re-draw mask after alignment
        for(let i = 0; i < gameHoles.length; i++){
            // setup hole
            gameHoles[i].setupHole();

            // get holes for alignment
            holesAlignment.push(gameHoles[i].get());
        }

        // align to grid
        this.gridAlign(this, holesAlignment);
        this.scale.on('resize', () => {
            this.gridAlign(this, holesAlignment);
        });

        return gameHoles;
    }

    gridAlign(scene, array){
        const cols = 3;
        const rows = 3;
        const gap = HOLE_GAP;
        const space = HOLE_SPACE;
        const width = HOLE_SIZE;
        const height = HOLE_SIZE;
        const cellWidth = width + gap;
        const cellHeight = height + space;
        const gridWidth = cols * cellWidth - gap;
        const gridHeight = rows * cellHeight - space;

        // game center
        const center = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5
        };

        // grid position
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

    goChooseLevel(){
        this.scene.start('ChooseLevel', {previousScene: this.sceneData});
    }
}