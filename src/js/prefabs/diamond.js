export default class Diamond extends Phaser.Sprite {

  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);

    this.game = game;

    // Holds reference to a timer before decay
    this.decayTimer = null;

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

  // In addition to the parent reset, set frame to 0
  // and end prevent flash
  reset(x, y) {

  	if( !this.animations.getAnimation('flash').isPlaying ) {
  		this.animations.stop();
  	}

  	this.frame = 0;

  	if( this.decayTimer !== null ) {
  		this.decayTimer.destroy();
  		this.decayTimer = null;
  	}

  	super.reset(x, y);
  }
}