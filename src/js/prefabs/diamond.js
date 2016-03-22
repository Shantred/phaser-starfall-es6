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

  reset(x, y) {
    this.resetDecay();
    super.reset(x, y);
    
    
  }

  flash() {
    // Make sure flash animation is not already playing for some reason
    if( !this.animations.getAnimation('flash').isPlaying ) {
    	this.animations.getAnimation('flash').play(15, false, true);
    }
  }

  // When decay needs resetting, we need to stop any animation that's playing and set the active frame to 0
  // and destroy the decay timer if it is present.
  resetDecay() {
    console.log('resetDecay called');
    if( this.animations.getAnimation('flash').isPlaying ) {
      this.animations.stop();
      this.frame = 0;
    }

    if( this.decayTimer !== null ) {
      console.log('attempting to clear timer', this.decayTimer);
      this.game.time.events.destroy( this.decayTimer );
      this.decayTimer = null;
    }
  }

  collect() {
    this.resetDecay();
    this.exists = false;
  }

  // Begin decay if not already in progress
  decay() {

    if( this.decayTimer === null ) {
      console.log("initializing decay timer");
      this.decayTimer = this.game.time.create(true);
      this.decayTimer.add(2000, this.flash, this);
      this.decayTimer.start();
    }
  }
}