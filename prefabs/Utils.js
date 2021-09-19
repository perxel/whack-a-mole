/**
 * Resize app
 * https://browsergameshub.com/scale-html5-games-on-any-device/
 */
function resizeApp_James(){
    if(DEV) console.log('App resize()');

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


/**
 * Get container size todo: need re-calc
 * https://phasergames.com/phaser-3-container-size-get-height-and-width/
 * @param container
 * @param game
 */
function getContainerSize(container, game){
    //set the top position to the bottom of the game
    let top = game.config.responsiveheight;
    let bottom = 0;
    //set the left to the right of the game
    let left = game.config.responsivewidth;
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


/**
 * Generate previous scene data object (exclude the {previousScene} to avoid too much data)
 * @param scene
 * @param data
 * @returns {{}|undefined}
 */
function generatePreviousSceneData(scene, data){
    const prevScene = data.previousScene;
    if(prevScene){
        const object = {};

        for(let key in prevScene){
            if(prevScene.hasOwnProperty(key) && key !== 'previousScene'){
                object[key] = prevScene[key];
            }
        }

        return object;
    }
    return undefined;
}


/**
 * Generate ID
 * @param suffix
 * @returns {string}
 */
function generateID(suffix = ''){
    return (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16) + suffix;
}


/**
 * Background cover
 * https://github.com/studiometa/background-cover
 *
 * @param elementSizes
 * @param containerSizes
 * @returns {{width: number, height: number}}
 */
function getBackgroundCoverSizes(elementSizes, containerSizes){
    const elementRatio = elementSizes.width / elementSizes.height
    const containerRatio = containerSizes.width / containerSizes.height

    let width, height

    if(containerRatio > elementRatio){
        width = containerSizes.width
        height = containerSizes.width / elementRatio
    }else{
        width = containerSizes.height * elementRatio
        height = containerSizes.height
    }

    return {width, height}
}


/**
 * Keep background size cover the screen
 * @param scene
 * @param image
 */
function keepBackgroundCover(scene, image){
    // align center both
    scene.plugins.get('rexanchorplugin').add(image, {
        centerX: '50%',
        centerY: '50%',
    });

    // resize background to cover the screen
    function resize(){
        const newSize = getBackgroundCoverSizes(image, {width: window.innerWidth, height: window.innerHeight});
        image.setDisplaySize(newSize.width, newSize.height);
    }

    resize();

    // on game resize
    scene.scale.on('resize', resize);
}


/**
 * Check if pointer is inside zone
 * @param pointerX
 * @param pointerY
 * @param zoneX
 * @param zoneY
 * @param zoneWidth
 * @param zoneHeight
 * @returns {boolean}
 */
function isPointerInsideZone(pointerX, pointerY, zoneX, zoneY, zoneWidth, zoneHeight){
    const insideHorizontally = pointerX >= zoneX && pointerX <= zoneX + zoneWidth;
    const insideVertically = pointerY >= zoneY && pointerY <= zoneY + zoneHeight;

    // draw debug
    // const fill = scene.add.graphics();
    // fill.fillStyle(0xffffff, 1);
    // fill.fillRect(zoneX, zoneY, zoneWidth, zoneHeight);

    return insideHorizontally && insideVertically;
}


/**
 * Format millisecond to 00:00:00
 * @param millis
 * @returns {string}
 */
function formatMillisecond(millis){
    const minutes = Math.floor(millis / 60000).toString().padStart(2, '0');
    const seconds = ((millis % 60000) / 1000).toFixed(0).toString().padStart(2, '0');
    const ms = (((millis % 60000) % 1000) / 100).toString().padStart(2, '0');

    return `${minutes}:${seconds}:${ms}`;
}


/**
 * Get HTML
 * @param key
 * @returns {string}
 */
function getHtml(key){
    switch(key){
        case 'button-yes':
            return '<button class="button icon" data-button="yes">' +
                '<span class="w-bg-contain" style="background-image:url(assets/img/btn/yes.svg)">yes</span>' +
                '</button>';
        case 'button-no':
            return '<button class="button icon" data-button="no">' +
                '<span class="w-bg-contain" style="background-image:url(assets/img/btn/no.svg)">no</span>' +
                '</button>';
    }
}


/**
 * Get object in array with key => value
 * @param array
 * @param key
 * @param value
 * @returns {*}
 */
function getObjectInArray(array, key, value){
    return array.find(x => x[key] === value);
}


/**
 * Get responsive data by breakpoints
 * @param config
 * @param currentBreakpoint
 */
function getResponsiveData(config, currentBreakpoint = undefined){
    // map settings
    const mapNewSettings = (defaultConfig, newConfig) => {
        const object = {};

        // loop through all properties of default config
        for(let key in defaultConfig){
            // except property `responsive`
            if(key !== 'responsive'){
                object[key] = newConfig.hasOwnProperty(key) ? newConfig[key] : defaultConfig[key];
            }
        }

        return object;
    }

    // sort breakpoints
    config.responsive.sort((a, b) => a.breakpoint < b.breakpoint && 1 || -1);

    // matching function
    let hasMatch = false;
    let data = {breakpoint: currentBreakpoint};

    // loop through all breakpoints
    for(let i = 0; i < config.responsive.length; i++){
        const breakpoint = config.responsive[i];

        // get query
        let query = `screen and (max-width:${breakpoint.breakpoint}px)`;

        // set the min breakpoint if any
        const nextBreakpoint = config.responsive[i + 1];
        if(typeof nextBreakpoint !== 'undefined'){
            query += ` and (min-width:${nextBreakpoint.breakpoint + 1}px)`
        }

        // match query
        hasMatch = matchMedia(query).matches;

        // if matched
        if(hasMatch){
            // and is a new breakpoint
            if(currentBreakpoint !== breakpoint.breakpoint){
                // return new breakpoint
                data = {
                    type: 'responsive',
                    breakpoint: breakpoint.breakpoint,
                    settings: mapNewSettings(config, breakpoint.settings)
                };

                // callback
                if(typeof config.onMatched === 'function'){
                    config.onMatched(data);
                    return data;
                }
            }

            // stop looping once matched
            break;
        }
    }

    // if no matching
    if(!hasMatch && currentBreakpoint !== -1){
        // reset breakpoint to default
        data = {type: 'default', breakpoint: -1, settings: mapNewSettings(config, config)};

        // callback
        if(typeof config.onMatched === 'function'){
            config.onMatched(data);
            return data;
        }
    }

    return data;
}

// const config = {
//     bar: 'bar',
//     foo: 'foo',
//     onMatched: (data) => {
//         console.log('onMatched', data)
//     },
//     responsive: [
//         {
//             breakpoint: 768,
//             settings: {
//                 bar: 'bar',
//                 foo: 'foo'
//             }
//         },
//         {
//             breakpoint: 1280,
//             settings: {
//                 bar: 'bar',
//                 foo: 'foo'
//             }
//         }
//     ]
// };
//
//
// let lastBreakpoint = getResponsiveData(config).breakpoint;
// window.addEventListener('resize', () => {
//     lastBreakpoint = getResponsiveData(config, lastBreakpoint).breakpoint;
// });


/**
 * Resize SVG Text
 */
function resizeSvgText(){
    const $text = $('.w-point:not(.skip-resize) svg text');
    if($text.length){
        const resize = () => {
            $text.each((i, el) => {
                $(el).closest('svg').width(el.getBBox().width + 10);
                $(el).closest('svg').height(el.getBBox().height + 10);
            });

            requestAnimationFrame(resize);
        }
        resize();
    }
}