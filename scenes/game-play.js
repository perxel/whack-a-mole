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
        const progress = new DOM({scene: this, html: 'Progress', className: 'game-timer'});

        /**
         * Images
         */
        // background
        this.bg = new Helpers({scene: this, key: 'getBackgroundImage'});

        /**
         * Create holes
         */
        this.createHoles();

        $('[data-button="pause"]').on('click', function(){
            timer.paused = true;
        });

        /**
         * Timer
         */
        this.fulltime = 60 * 1000;
        this.timeLeft = this.fulltime;
        this.countStep = 100;
        const timer = this.time.addEvent({
            delay: this.countStep,
            callback: onCountDown,
            callbackScope: this,
            loop: true
        });

        function onCountDown(){
            this.timeLeft -= this.countStep; // One second
            $('.w-progress text').html(formatMillisecond(this.timeLeft));
            $('.w-progress-bar').width(`${this.timeLeft * 100 / this.fulltime}%`);

            if(this.timeLeft <= 0){
                timer.stop();
                alert('Time up!');
            }
        }
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
        const tryTime = 60 * 1000; // total time of each try [ms]
        const waveTime = 700; // delay between each wave [ms]
        const waveCount = Math.round(tryTime / waveTime); // number of waves in each try
        const waveCharactersNumber = 1; // number of characters could appear in one wave
        const waves = []; // store each wave's data

        for(let i = 0; i < waveCount; i++){
            const waveBegin = i * waveTime;
            const waveEnd = waveBegin + waveTime;
            const waveCharacters = [];
            const waveHoles = [];

            for(let j = 0; j < waveCharactersNumber; j++){
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

        if(DEV) console.log(waves);

        // re-draw mask after alignment
        for(let i = 0; i < gameHoles.length; i++){
            // update timeline
            gameHoles[i].updateTimeline();

            // play game
            gameHoles[i].play();

            // get holes for alignment
            holesAlignment.push(gameHoles[i].get());
        }

        // align to grid
        this.gridAlign(this, holesAlignment);
        this.scale.on('resize', () => {
            this.gridAlign(this, holesAlignment);
        });
    }

    gridAlign(scene, array){
        const cols = 3;
        const rows = 3;
        const gap = 100;
        const space = 30;
        const width = 150;
        const height = 150;
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
}