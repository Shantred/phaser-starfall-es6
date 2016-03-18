export default class Diamond extends Phaser.Sprite {

  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);

    this.game = game;

    this.anchor.setTo(0.5, 0.5);
    this.scale.set(0.8);

    this.animations.add('flash', [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], 15, false);
    
  }

  flash() {
  	
    // Make sure flash animation is not already playing for some reason
    if( !this.animations.getAnimation('flash').isPlaying ) {
    	this.animations.getAnimation('flash').play(15, false, true);
    }
  }
}