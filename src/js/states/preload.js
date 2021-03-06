export default class Preload extends Phaser.State {

    preload() {

        // External Scripts
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        // Static Images
        this.game.load.image('sky', 'img/day.png');
        this.game.load.image('star', 'img/star.png');

        // Sprites
        this.game.load.spritesheet('diamond', 'img/diamond.png', 32, 28);
        this.game.load.spritesheet('dude', 'img/dude.png', 32, 48);
        this.game.load.spritesheet('ground_sheet', 'img/spritesheet/ground_sheet.png', 260, 124);

        this.load.atlasJSONArray('ui', 'img/spritesheet/ui.png', 'data/spritesheet/ui.json');
        //this.load.atlasJSONArray('ground_sheet', 'img/spritesheet/ground_sheet.png', 'data/spritesheet/ground_sheet.json');

    }

    create() {
      this.state.start('Menu');
    }
}