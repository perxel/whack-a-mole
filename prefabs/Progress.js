class Progress{
    constructor(ctx, x, y){
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.progress = this.createProgress();
    }

    createProgress(){
        const shadow = this.ctx.add.graphics();
        const border = this.ctx.add.graphics();
        const fill = this.ctx.add.graphics();

        shadow.fillStyle(0xffffff, 1);
        shadow.fillRoundedRect(0, 0, 440, 60, 10);
        shadow.setDepth(1);

        border.fillStyle(0xf3cdd5, 1);
        border.fillRoundedRect(6, 6, 440 - 6 - 6, 60 - 6 - 6, 10);
        border.setDepth(2);

        fill.fillStyle(0xe78598, 1);
        fill.fillRoundedRect(15, 15, 440 - 15 - 15, 60 - 15 - 15, 5);
        fill.setDepth(3);

        return this.ctx.add.container(100, 100, [shadow, border, fill]);
    }

    setPercentage(val){
        this.progress.list[2].clear();
        this.progress.list[2].fillStyle(0xe78598, 1);
        this.progress.list[2].fillRoundedRect(15, 15, val * (440 - 15 - 15), 60 - 15 - 15, 5);
    }

    setDepth(depth){
        this.progress.setDepth(depth);
    }

    setScale(scaleX, scaleY){
        this.progress.setScale(scaleX, scaleY);
    }
}