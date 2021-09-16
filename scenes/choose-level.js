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
        const levels = new GameData().getLevels();
        const playerLevels = this.sys.game.PLAYER.getLevels();

        html += '<div class="w-level-grid w-flex w-flex--wrap w-flex--justify-center">';
        for(let i = 0; i < levels.length; i++){
            const levelID = typeof playerLevels[i] !== 'undefined' ? playerLevels[i].id : generateID();
            const isUnlocked = typeof playerLevels[i] !== 'undefined';

            const imageUrl = isUnlocked ? 'assets/img/btn/level.svg' : 'assets/img/btn/level-locked.svg';
            const className = isUnlocked ? 'unlocked' : 'locked disabled';
            const text = isUnlocked ? levels[i].name : '';

            html += '<div class="w-level-grid-item">';
            html += `<button data-button="go-level" data-level="${levelID}" class="button level ${className}">`;
            html += `<span class="w-bg-contain w-flex w-flex--justify-center w-flex--align-center" style="background-image:url(${imageUrl})">`;
            html += text;
            html += `</span>`;
            html += `</button>`;
            html += '</div>';
        }
        html += '</div>';

        return html;
    }


    goPlay(level){
        if(DEV) console.log(`Go to level ${level}`);
        this.scene.start("GamePlay", {previousScene: this.sceneData, levelID: level});
    }
}