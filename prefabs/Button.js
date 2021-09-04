class Button{
    constructor(ctx, x, y, obj){
        // validate
        this.ctx = ctx;
        this.atlas = obj.atlas || undefined;
        this.idleTexture = obj.idleTexture;
        this.activeTexture = obj.activeTexture;
        this.hasActiveState = typeof obj.activeTexture === 'string';
        this.isActive = false;
        this.originalScale = typeof obj.scale === 'number' ? obj.scale : 1;
        this.width = obj.width || 55;
        this.height = obj.height || 55;
        this.anchor = obj.anchor || {};
        this.depth = obj.depth || 1;
        this.disabled = obj.disabled || false;

        // create button using image object
        if(typeof this.atlas !== 'undefined'){
            this.button = this.ctx.add.image(x, y, this.atlas, this.idleTexture);
        }else{
            this.button = this.ctx.add.image(x, y, this.idleTexture)
        }

        this.button.setInteractive().setScale(this.originalScale).setDepth(this.depth);

        // update size
        this.button.setDisplaySize(this.width, this.height);

        // Event: pointer down
        this.button.on('pointerdown', () => {
            // click effect
            this.button.setDisplaySize(this.width * 0.9, this.height * 0.9);

            // click sound
            this.ctx.sys.game.CONFIG.sound.playSoundFx('click');

            // check disabled
            if(this.disabled) return;

            // callback
            if(typeof obj.pointerDown === 'function'){
                obj.pointerDown();
            }
        });

        // Event: pointer up
        this.button.on('pointerup', function(){
            // release effect
            this.button.setDisplaySize(this.width, this.height);

            // check disabled
            if(this.disabled) return;

            // change texture
            this.updateStatus(!this.isActive);

            // callback
            if(typeof obj.pointerUp === 'function'){
                obj.pointerUp();
            }
        }, this);

        // update status
        this.updateStatus(this.isActive);

        // anchor
        if(typeof this.anchor !== 'undefined'){
            this.ctx.plugins.get('rexanchorplugin').add(this.button, this.anchor);
        }
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