class Popup{
    constructor(config){
        // validate
        if(!config.scene){
            console.warn("Missing scene!");
            return;
        }

        this.scene = config.scene;
        this.width = config.width;
        this.height = config.height;
        this.objects = config.objects || [];
        this.padding = config.padding || [0, 0, 0, 0]; // top right bottom left
        this.borderWidth = config.border || 15;
        this.radius = 30;
        this.offsetTop = config.offsetTop || 0;
        this.title = config.title || undefined;

        // re-calc size
        this.width += this.padding[1] + this.padding[3] + this.borderWidth * 2;
        this.height += this.padding[0] + this.padding[2] + this.borderWidth * 2;

        // Create border
        this.border = this.scene.add.graphics();
        this.border.fillStyle(0x754C29, 1);
        this.border.fillRoundedRect(0, 0, this.width, this.height, this.radius);
        this.border.setDepth(1);

        // Create box
        this.box = this.scene.add.graphics();
        this.box.fillStyle(0xF8E8CE, 1);
        this.box.fillRoundedRect(this.borderWidth, this.borderWidth, this.width - this.borderWidth * 2, this.height - this.borderWidth * 2, this.radius - this.borderWidth);
        this.box.setDepth(2);

        // Create title
        if(typeof this.title !== 'undefined'){
            this.title = new Text(this.scene, 0, 0, this.title, 'title').get();
            this.title.setOrigin(0.5, 1);
            this.title.setPosition(this.width / 2, this.title.displayHeight * 0.25)

            this.offsetTop += this.title.displayHeight * 0.25;

            this.objects.unshift(this.title);
        }

        // spread objects
        this.objects = [this.border, this.box, ...this.objects];

        // Dots container
        // todo: align container
        this.container = this.scene.add.container(0, 0, this.objects);
        this.scene.plugins.get('rexanchorplugin').add(this.container, {
            centerX: `50%-${(this.width / 2)}`,
            centerY: `50%-${(this.height / 2) - this.offsetTop}`
        });

        return this.container;
    }
}