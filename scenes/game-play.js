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
         * Update player data
         */
        this.sys.game.PLAYER.setTurnPlayed(this.levelID);


        /**
         * Images
         */
        // background
        this.bg = new Helpers({scene: this}).getBackgroundImage();


        /**
         * Load HTML
         */
            // Popup pause
        let pauseHtml = '<div class="pause-html">';
        pauseHtml += '<div class="txt-center">DO YOU WANT TO CONTINUE?</div>';
        pauseHtml += '<div class="popup-yes-no">';
        pauseHtml += getHtml('button-no');
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
        let timeOverHtml = '<div class="time-over-html">';
        timeOverHtml += '<div class="txt-center">Your time is over. Play again?</div>';
        timeOverHtml += '<div class="popup-yes-no">';
        timeOverHtml += getHtml('button-no');
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

        // Popup New high score
        let highScoreHtml = '<div class="high-score-html">';
        highScoreHtml += '<div class="popup-close-button">';
        highScoreHtml += getHtml('button-no');
        highScoreHtml += '</div>';
        highScoreHtml += '<div class="txt-center">congratulation! you have new high score! \n' +
            'Share it now!</div>';
        highScoreHtml += '<div class="your-score txt-center">';
        highScoreHtml += '<div class="high-score-icon w-bg-contain" style="background-image:url(assets/img/btn/point.svg)"></div>\n' +
            '        <div class="high-score-point w-point">\n' +
            '          <svg width="150" height="70">\n' +
            '            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" data-text>00</text>\n' +
            '          </svg>\n' +
            '        </div>';
        highScoreHtml += '</div>';
        highScoreHtml += '</div>';
        const popupHighScore = new Popup({
            scene: this,
            className: 'popup-high-score small-popup',
            titleHtml: 'New High<br>Score',
            innerHtml: highScoreHtml,
            depth: 2
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
                    // todo: style popup
                    const $text = popupHighScore.get().find('[data-text]');
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
    }

    createHoles(){
        // Characters
        const availableCharacterIDs = this.sys.game.PLAYER.getCharacterIDsByLevelID(this.levelID); // list of characters in this level
        this.rareArray = new Helpers({scene: this}).generateCharacterRareArray(availableCharacterIDs);

        // Hammer
        this.hammer = new Hammer({scene: this, name: '3'});

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