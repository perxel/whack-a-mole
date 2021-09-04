class Grid{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.height = config.height || window.innerHeight;
        this.width = config.width || window.innerWidth;
        this.rows = config.rows || 3;
        this.cols = config.cols || 3;
        this.alpha = config.alpha || 1;

        //this.ratioX = this.width / window.innerWidth;
        //this.ratioY = this.height / window.innerHeight;

        // Cell
        this.cellWidth = this.width / this.cols;
        this.cellHeight = this.height / this.rows;
    }

    showGrid(){
        // clear
        if(typeof this.graphics !== 'undefined') this.graphics.clear();

        // draw grid
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, this.alpha);

        //this.graphics.beginPath();
        for(let i = 0; i < this.width; i += this.cellWidth){
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.height);
        }
        for(let i = 0; i < this.height; i += this.cellHeight){
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.width, i);
        }
        this.graphics.strokePath();

        // cell index
        let n = 0;
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                let numText = this.scene.add.text(0, 0, n, {
                    color: 'red'
                });
                numText.setOrigin(0.5, 0.5);
                this.add(j, i, numText);
                n++;
            }
        }
    }

    add(x, y, obj, w, h){
        const width = w || obj.width;
        const height = h || obj.height;
        const centerX = this.cellWidth * x + this.cellWidth / 2;//- width / 2;
        const centerY = this.cellHeight * y + this.cellHeight / 2;// - height / 2;

        obj.x = centerX;
        obj.y = centerY;
    }

    addAtIndex(index, obj, w, h){
        const y = Math.floor(index / this.cols);
        const x = index - (y * this.cols);
        this.add(x, y, obj, w, h);
    }
}