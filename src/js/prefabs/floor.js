export default class Floor extends Phaser.TileSprite {

  constructor({ game, x, y, width, height, asset }) {
    super(game, x, y, width, height, asset);

    this.game = game;

    // Floors are in set positions in world space and do not move
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }
}