function runApp(){
    'use strict';
    console.log('App run()');

    // Init the Phaser game app
    let app = new App().start();

    // Scale to device
    //window.addEventListener('resize', resizeApp);
    //resizeApp(app);
}

window.onload = function(){
    'use strict';

    // Check ES6
    try{
        eval('let i = 0;');
        eval('const _dev = true;')
    }catch(e){
        alert('This browser is not supported. Use Chrome or Firefox.');
        return false;
    }

    // Launch the gap
    runApp();
};