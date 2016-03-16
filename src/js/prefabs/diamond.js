export default class Diamond extends Phaser.Sprite {

  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);

    this.game = game;

    this.body.gravity.y = 600;
    this.scale.set(0.8);

    this.animations.add('blink', [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], 15, false);
    
  }
}