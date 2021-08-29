class Text{
    constructor(ctx, x, y, string, key, origin){
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.text = string;

        this.style = new TextStyle(key);
        this.origin = this.initOrigin(origin);

        this.obj = this.createText();
    }

    // Init -----------------
    initOrigin(origin){
        if(typeof origin === 'number'){
            return {x: origin, y: origin};
        }

        if(typeof origin === 'object'){
            return origin;
        }

        return {x: 0.5, y: 0.5};
    }

    // Text object -----------------
    createText(){
        let obj = this.ctx.add.text(
            this.x,
            this.y,
            this.text,
            this.style
        );

        obj.setOrigin(this.origin.x, this.origin.y);

        return obj;
    }

    destroy(){
        this.obj.destroy();

        this.obj = false;
    }

    // Getters -----------------
    get(){
        return this.obj;
    }

    getCenter(){
        return this.obj.getCenter();
    }

    getTopLeft(){
        return this.obj.getTopLeft();
    }

    getTopRight(){
        return this.obj.getTopRight();
    }

    getBottomLeft(){
        return this.obj.getBottomLeft();
    }

    getBottomRight(){
        return this.obj.getBottomRight();
    }
}