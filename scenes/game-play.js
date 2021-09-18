class GamePlay extends Phaser.Scene{
    constructor(){
        super({key: "GamePlay", active: false});
    }

    init(data){
        this.gameConfig = this.sys.game._DATA.getConfig();
        this.levelID = data.levelID || 1;
        this.sceneData = {
            name: this.scene.key,
            background: `level${this.levelID}`,
            backgroundMobile: `level${this.levelID}-m`,
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
        this.bg = new Helpers({scene: this}).getBackgroundImage();


        /**
         * Load Popup HTML
         */
        const popupPause = new Popup({
            scene: this,
            size: 'small-popup',
            name: 'PopupPause',
        });

        // Popup Time over
        const popupTimeOver = new Popup({
            scene: this,
            size: 'small-popup',
            name: 'PopupTimeOver'
        });

        // Popup New high score
        const popupHighScore = new Popup({
            scene: this,
            size: 'medium-popup',
            name: 'PopupNewHighScore'
        });

        // Popup Your score
        const popupYourScore = new Popup({
            scene: this,
            size: 'medium-popup',
            name: 'PopupYourScore'
        });

        const dom = new DOM({scene: this, depth: 1});
        const progress = new DOM({scene: this, html: 'Progress', className: 'game-timer', depth: 1});


        /**
         * Init game
         */
        this.gameControl = new Game({
            scene: this,
            holes: this.createHoles(),
            onEndGame: (status) => {
                if(status.isNewHighScore){
                    const $text = popupHighScore.get().find('[data-text]');
                    const letterWidth = parseInt(popupHighScore.get().find('.high-score-point').css('--letter-width'));
                    popupHighScore.get().find('.high-score-point svg').attr('width', letterWidth * status.point.toString().length);
                    $text.text(status.point);
                    popupHighScore.show();
                }else{
                    popupTimeOver.show();
                }
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
            this.scene.start("GamePlay", {previousScene: this.sceneData, levelID: this.levelID});
        });

        // button high score no
        popupHighScore.get().find('[data-button="no"]').click(() => {
            this.goChooseLevel();
        });

        // button pause
        $('[data-button="pause"]').on('click', () => {
            this.gameControl.pause();
            popupPause.toggle();
        });

        // button high score
        $('[data-button="high-score"]').on('click', () => {
            this.gameControl.pause();
            popupYourScore.show();
        });
        // button high score no
        popupYourScore.get().find('[data-button="no"]').click(() => {
            popupYourScore.hide();
            this.gameControl.play();
        });
    }


    /**
     * Create game holes
     * @returns {*[]}
     */
    createHoles(){
        // Characters
        const availableCharacterIDs = this.sys.game.PLAYER.getCharacterIDsByLevelID(this.levelID); // list of characters in this level
        this.rareArray = new Helpers({scene: this}).generateCharacterRareArray(availableCharacterIDs);

        // Hammer
        this.hammer = new Hammer({scene: this, id: this.sys.game.PLAYER.getHammer()});

        // Holes
        const holeCount = 9;
        const holesAlignment = []; // for alignment purpose
        const gameHoles = []; // store each hole's data
        for(let i = 0; i < holeCount; i++){
            // create hole
            const hole = new Hole({
                scene: this,
                level: this.levelID,
                order: i + 1
            });

            // save
            gameHoles.push(hole);
        }

        // Waves
        const tryTime = this.sys.game._DATA.getSettings().game_duration;
        const waveTime = this.sys.game._DATA.getSettings().wave_duration;
        const waveCount = Math.round(tryTime / waveTime); // number of waves in each try
        const characterPerWave = this.sys.game._DATA.getSettings().character_per_wave;
        const waves = []; // store each wave's data

        for(let i = 0; i < waveCount; i++){
            const waveBegin = i * waveTime;
            const waveEnd = waveBegin + waveTime;
            const waveCharacters = [];
            const waveHoles = [];

            for(let j = 0; j < characterPerWave; j++){
                const characterTime = waveBegin;

                // get random character
                const characterID = this.rareArray[Phaser.Math.Between(0, this.rareArray.length - 1)];

                // find random unique hole
                let holeIndex = Phaser.Math.Between(0, holeCount - 1);
                while(waveHoles.includes(holeIndex)){
                    holeIndex = Phaser.Math.Between(0, holeCount - 1);
                }
                waveHoles.push(holeIndex);

                // save character to wave
                waveCharacters.push({
                    showtime: characterTime,
                    characterID: characterID,
                    holeIndex: holeIndex
                });

                // save character to hole
                const character = new Character({scene: this, characterID: characterID});
                gameHoles[holeIndex].addCharacter({
                    showtime: characterTime,
                    character: character,
                    characterID: characterID
                });
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
        const gap = scene.sys.game._DATA.getConfig().hole_gap;
        const space = scene.sys.game._DATA.getConfig().hole_space;
        const width = scene.sys.game._DATA.getConfig().hole_size;
        const height = scene.sys.game._DATA.getConfig().hole_size;
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