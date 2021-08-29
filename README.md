# Whack A Mole

## Overview

whack-a-mole -> index.html -> main.js -> app.js

boot.js -> preload.js -> menu.js

## Scenes

boot.js -> preload.js -> menu.js

boot.js -> load assets

preload.js -> show loading screen

## Scripts

app.js -> init Phaser app, config Phaser app

new App();

app.start();

main.js

window.onload -> runApp() / resizeApp()

---

## Text

https://phaser.io/examples/v2/category/text

### Load local fonts

https://phaser.discourse.group/t/loading-oft-and-ttf-files-in-phaser3/3204/3

Load font via CSS first.

### Styles

https://photonstorm.github.io/phaser3-docs/Phaser.Types.GameObjects.Text.html#.TextStyle

## Image

### Background image cover

https://phaser.discourse.group/t/how-to-stretch-background-image-on-full-screen/1839

```js
const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'desktopBg');
const scaleX = this.cameras.main.width / image.width;
const scaleY = this.cameras.main.height / image.height;
const scale = Math.max(scaleX, scaleY);
image.setScale(scale).setScrollFactor(0);
```

## Loading

https://www.patchesoft.com/phaser-3-loading-screen

## Graphics

### Rounded Rect
https://phaser.io/examples/v3/view/game-objects/graphics/fill-rounded-rectangle

https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cgraphics%5Cfill%20rounded%20rectangle.js