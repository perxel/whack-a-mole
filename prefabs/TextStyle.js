class TextStyle{
    constructor(key){
        let style = {
            align: 'center',
            fontSize: '80px',
            fontFamily: 'LuckiestGuy',
            color: '#f8e8ce',
            strokeThickness: 10,
            stroke: '#805b2d'
        }

        switch(key.toLowerCase()){
            case 'title':
                style.fontSize = 30;
                break;
            case 'preload':
                style.fontSize = 60;
                break;
            case 'progress':
                style.fontSize = 20;
                style.stroke = '#fff';
                style.strokeThickness = 8;
                style.color = '#00b7ed';
        }

        return style;
    }
}