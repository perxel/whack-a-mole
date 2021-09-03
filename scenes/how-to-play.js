class HowToPlay extends Phaser.Scene{
    constructor(){
        super({key: "HowToPlay", active: false});
    }

    init(){
        console.log('Scene: HowToPlay init()');
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload(){
        console.log('Scene: HowToPlay preload()');
    }

    create(){
        console.log('Scene: HowToPlay create()');

        /**
         * Images
         */
        // background
        this.bg = this.CONFIG.loadBackground(this, 'desktopBg');

        // Bomb
        this.bomb = this.add.sprite(400, 400, 'whack', 'characters/bomb/1').setDepth(3);
        let frameNames = this.anims.generateFrameNames('whack', {
            start: 1, end: 3, zeroPad: 0,
            prefix: 'characters/bomb/'
        });
        this.anims.create({key: 'walk', frames: frameNames, frameRate: 8, repeat: -1});
        this.bomb.anims.play('walk');
        this.plugins.get('rexanchorplugin').add(this.bomb, {
            centerX: '50%',
            centerY: '50%',
        });

        /**
         * Texts
         */
        this.title = new Text(this, 0, 0, "How To\nPlay", "title").get();
        this.plugins.get('rexanchorplugin').add(this.title, {
            centerX: '50%',
            top: '8%'
        });

        /**
         * Buttons
         */
        this.createButtons();

        /**
         * Slides
         */
        this.activeIndex = 0;
        this.createSlides();
    }

    createSlides(){
        this.slides = [
            {
                string: 'dont hit the boom.\n' +
                    'they will damage your hammer.'
            },
            {
                string: 'Score and Win with Just a Click!\n' +
                    'Each Porcupine Has Different Rarity and Point Level.\n' +
                    'Good Luck!'
            },
            {
                string: 'YOU HAVE ONLY 1 MINUTE TO PLAY EACH LEVEL\n' +
                    'HURRY UP AND SCORE THE HIGHEST POINT TOTAL POSSIBLE!'
            },
            {
                string: 'You can use your points to buy\n' +
                    'stronger hammers.'
            },
            {
                string: 'Are you ready?\n' +
                    'Let\'s play!'
            }
        ];


        // generate objects
        for(let i = 0; i < this.slides.length; i++){
            // create text
            this.slides[i].text = new Text(this, 0, 0, this.slides[i].string, 'subtitle').get();
            this.slides[i].text.setDepth(3);
            this.plugins.get('rexanchorplugin').add(this.slides[i].text, {
                centerX: '50%',
                bottom: 'bottom-150'
            });

            // set active
            if(i !== this.activeIndex){
                this.slides[i].text.setVisible(false);
            }
        }

        // dots
        this.drawDots(this.slides.length);

        // activate
        this.moveTo(this.activeIndex);
    }

    createButtons(){
        // Button music
        this.btnMusic = this.CONFIG.sound.getButton(this);

        // Button back
        this.btnBack = new Button(this, 0, 0, {
            idleTexture: 'back',
            pointerUp: () => {
                this.scene.start("Menu");
            },
            anchor: {
                left: 'left+30',
                top: 'top+30'
            },
            depth: 3
        }).get();

        // Button prev
        this.btnPrev = new Button(this, 0, 0, {
            idleTexture: 'prev',
            pointerUp: () => {
                this.moveTo(this.activeIndex - 1);
            },
            anchor: {
                centerX: 'center-40',
                bottom: 'bottom-30'
            },
            depth: 3
        }).get();

        // Button next
        this.btnNext = new Button(this, 0, 0, {
            idleTexture: 'next',
            pointerUp: () => {
                this.moveTo(this.activeIndex + 1);
            },
            anchor: {
                centerX: 'center+40',
                bottom: 'bottom-30'
            },
            depth: 3
        }).get();
    }

    drawDots(){
        this.dots = [];
        const dotW = 10;
        const dotMargin = 16;
        const containerWidth = dotW + this.slides.length * dotW + (this.slides.length - 1) * dotMargin;

        // dots
        for(let i = 0; i < this.slides.length; i++){
            const dotX = i * dotW + i * dotMargin;
            this.dots[i] = this.add.graphics();
            this.dots[i].clear();
            this.dots[i].fillStyle(i === this.activeIndex ? 0x805B2D : 0xffffff);
            this.dots[i].fillRoundedRect(dotX, 0, dotW, dotW, 2);
        }

        // Dots container
        // todo: align container
        this.plugins.get('rexanchorplugin').add(this.add.container(0, 0, this.dots), {
            centerX: '50%-' + (containerWidth / 2),
            bottom: 'bottom-125'
        });
    }

    moveTo(slideIndex){
        slideIndex = Math.min(this.slides.length - 1, Math.max(0, slideIndex));
        this.activeIndex = slideIndex;

        for(let i = 0; i < this.slides.length; i++){
            this.slides[i].text.setVisible(i === slideIndex);
        }

        this.drawDots();
    }
}