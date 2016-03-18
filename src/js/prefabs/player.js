export default class Player extends Phaser.Sprite {

  constructor({ game, x, y, asset, health }) {
    super(game, x, y, asset);

    this.game = game;
    this.health = health;
    this.hasControl = true;

    // Enable physics and set physics properties of player
    this.game.physics.arcade.enable(this);
    this.body.bounce.y = 0;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0,1,2,3], 10, true);
    this.animations.add('right', [5,6,7,8], 10, true);

    // Adjust the hitbox slightly to better represent the visible portion of the sprite
    this.body.setSize(28, 36, 2, 12);
  }

  update() {

    // Always kill horizontal movement without accel/decel
    this.body.velocity.x = 0;

    // If player has 0 health, stop animations and disable controls
    if( this.health <= 0 ) {
      this.hasControl = false;
      this.animations.stop();
    }

    if( this.hasControl ) {
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ) {
        this.body.velocity.x = -275;
        this.animations.play('left');
      } else if( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) {
        this.body.velocity.x = 275;
        this.animations.play('right');
      } else {
        this.animations.stop();
        this.frame = 4;
      }
    }
    

  }

  damage(amount) {
    this.health -= amount;
  }
}