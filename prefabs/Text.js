class Text{
    constructor(ctx, x, y, string, style, origin){
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.text = string;

        this.style = this.getStyle(style);
        this.origin = this.initOrigin(origin);

        // add text object
        this.obj = this.ctx.add.text(this.x, this.y, this.text, this.style);
        this.obj.setOrigin(this.origin.x, this.origin.y);
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

    // Getters -----------------
    get(){
        return this.obj;
    }

    getStyle(styleKey){
        let style = {
            align: 'center',
            fontSize: '80px',
            fontFamily: 'LuckiestGuy',
            color: '#f8e8ce',
            strokeThickness: 10,
            stroke: '#805b2d',
        }

        switch(styleKey.toLowerCase()){
            case 'title':
                // how to play, choose level
                style.fontSize = 96;
                style.strokeThickness = 20;
                style.lineSpacing = -30;
                //this.text = this.text.toUpperCase();
                break;
            case 'subtitle':
                // loading title, how to text
                style.fontSize = 36;
                style.strokeThickness = 8;
                style.lineSpacing = -5;
                //this.text = this.text.toUpperCase();
                break;
            case 'progress':
                // progress value
                style.fontSize = 20;
                style.stroke = '#fff';
                style.strokeThickness = 11;
                style.color = '#00b7ed';
                break;
            case 'levelName':
                // level button
                style.fontSize = 64;
                style.strokeThickness = 0;
                style.color = '#805b2d';
                break;
        }

        return style;
    }
}