class Button{
    constructor(ctx, x, y, obj){
        this.ctx = ctx;

        this.idleTexture = obj.idleTexture;
        this.activeTexture = obj.activeTexture;
        this.hasActiveState = typeof obj.activeTexture === 'string';
        this.isActive = false;
        this.originalScale = typeof obj.scale === 'number' ? obj.scale : 1;

        // create button using image object
        this.button = this.ctx.add.image(x, y, this.idleTexture).setInteractive().setScale(this.originalScale);

        // pointer down
        this.button.on('pointerdown', function(){
            // callback
            if(typeof obj.pointerDown === 'function'){
                obj.pointerDown();
            }

            // effect
            this.button.setScale(this.originalScale * 0.9);
        }, this);

        // pointer up
        this.button.on('pointerup', function(){
            // callback
            if(typeof obj.pointerUp === 'function'){
                obj.pointerUp();
            }

            // effect
            this.button.setScale(this.originalScale);

            // change texture
            this.updateStatus(!this.isActive);
        }, this);

        // update status
        this.updateStatus(this.isActive);
    }

    get(){
        return this.button;
    }

    updateStatus(active){
        if(this.hasActiveState){
            this.isActive = active;
            if(this.isActive){
                this.button.setTexture(this.activeTexture);
            }else{
                this.button.setTexture(this.idleTexture);
            }
        }
    }
}