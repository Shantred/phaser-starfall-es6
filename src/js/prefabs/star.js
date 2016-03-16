export default class Star extends Phaser.Sprite {

  constructor({ game, x, y, asset, health }) {
    super(game, x, y, asset);

    // Debug
    //this.anchor.setTo(0.5, 0.5);

    this.health = health;
    this.game = game;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  damage(amount) {
    super.damage(amount);
  }

  update() {
    console.log("updating star!");
  }
}