/**
 * Resize app
 * https://browsergameshub.com/scale-html5-games-on-any-device/
 */
function resizeApp_James(){
    console.log('App resize()');

    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = window.innerWidth / window.innerHeight;

    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-app');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';

    // Check if device DPI messes up the width-height-ratio
    let canvas = document.getElementsByTagName('canvas')[0];

    let dpi_w = parseInt(div.style.width) / canvas.width;
    let dpi_h = parseInt(div.style.height) / canvas.height;

    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = height * game_ratio;

    // Scale canvas
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}


function resizeApp(){

}


/**
 * Get container size todo: need re-calc
 * https://phasergames.com/phaser-3-container-size-get-height-and-width/
 * @param container
 * @param game
 */
function getContainerSize(container, game){
    //set the top position to the bottom of the game
    let top = game.config.height;
    let bottom = 0;
    //set the left to the right of the game
    let left = game.config.width;
    let right = 0;
    //
    //
    //loop through the children
    //
    container.iterate(function(child){
        //get the positions of the child
        const childX = child.x;
        const childY = child.y;
        //
        //
        //
        const childW = child.displayWidth;
        const childH = child.displayHeight;
        //
        //
        //calculate the child position
        //based on the origin
        //
        //
        const childTop = childY - (childH * child.originY);
        const childBottom = childY + (childH * (1 - child.originY));
        const childLeft = childX - (childW * child.originX);
        const childRight = childX + (childW * (1 - child.originY));
        //test the positions against
        //top, bottom, left and right
        //
        if(childBottom > bottom){
            bottom = childBottom;
        }
        if(childTop < top){
            top = childTop;
        }
        if(childLeft < left){
            left = childLeft;
        }
        if(childRight > right){
            right = childRight;
        }
    }.bind(this));
    //
    //calculate the square
    const h = Math.abs(top - bottom);
    const w = Math.abs(right - left);

    //set the container size
    container.setSize(w, h);

    return {width: w, height: h};
}