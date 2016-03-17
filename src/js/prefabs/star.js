export default class Star extends Phaser.Sprite {

  constructor({ game, x, y, asset, health}) {
    super(game, x, y, asset);

    this.game = game;
    this.health = health;

    this.anchor.setTo(0.5, 0.5);

    // Kill object when leaving the screen
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  damage(amount) {
    super.damage(amount);
  }
}