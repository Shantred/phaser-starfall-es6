export default class Floor extends Phaser.Group {

  constructor({ game }) {
    super(game);
    this.game = game;

    this.floor = new Phaser.TileSprite(this.game, 0, this.game.world.height - 32, 400, 32, 'new_ground');
    this.game.physics.arcade.enable(this.floor);
    this.floor.body.allowGravity = false;
    this.floor.immovable = true;

    this.add(this.floor);
  }
}