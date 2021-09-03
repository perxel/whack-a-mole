class Progress{
    constructor(ctx, x, y){
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 440;
        this.height = 60;
        this.shadowRadius = 15;
        this.borderRadius = 10;
        this.fillRadius = 6;

        this.progress = this.createProgress();
    }

    createProgress(){
        const shadow = this.ctx.add.graphics();
        const border = this.ctx.add.graphics();
        const fill = this.ctx.add.graphics();

        shadow.fillStyle(0xffffff, 1);
        shadow.fillRoundedRect(0, 0, this.width, this.height, this.shadowRadius);
        shadow.setDepth(1);

        border.fillStyle(0xf3cdd5, 1);
        border.fillRoundedRect(6, 6, this.width - 6 - 6, this.height - 6 - 6, this.borderRadius);
        border.setDepth(2);

        fill.fillStyle(0xe78598, 1);
        fill.fillRoundedRect(15, 15, this.width - 15 - 15, this.height - 15 - 15, this.fillRadius);
        fill.setDepth(3);

        // Progress text
        const text = new Text(this.ctx, 0, 0, '...', 'progress').get();

        // Container
        const container = this.ctx.add.container(this.x, this.y, [shadow, border, fill, text]);

        // Align text
        const x = Math.floor(this.width / 2);
        const y = Math.floor(this.height / 2) * 0.9;
        text.setOrigin(0.5);
        text.setPosition(x, y)

        return container;
    }

    // Setters -----------------
    setPercentage(val){
        this.progress.list[2].clear();
        this.progress.list[2].fillStyle(0xe78598, 1);
        this.progress.list[2].fillRoundedRect(15, 15, val * (this.width - 15 - 15), this.height - 15 - 15, this.fillRadius);
    }

    setText(string){
        this.progress.list[3].setText(string);
    }

    // Getters -----------------
    get(){
        return this.progress;
    }
}