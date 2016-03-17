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
        this.game.load.image('new_ground', 'img/Basic_Ground_Top_Pixel.png');
        this.game.load.image('star', 'img/star.png');

        // Sprites
        this.game.load.spritesheet('diamond', 'img/diamond.png', 32, 28);
        this.game.load.spritesheet('dude', 'img/dude.png', 32, 48);
        this.game.load.spritesheet('restart', 'img/blue_button.png', 200, 48);

        this.load.atlasJSONArray('button', 'img/spritesheet/button.png', 'data/spritesheet/button.json');

    }

    create() {
      this.state.start('Play');
    }
}