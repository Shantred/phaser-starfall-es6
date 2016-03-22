export default class Hud extends Phaser.Group {

  constructor({ game }) {
    super(game);
    this.game = game;

    this.timerPaused = false;

    // Score
    // this.score = 0;
    // this.scoreLabel = 'Score: ';
    // this.scoreText = new Phaser.Text(this.game, 16, 16, this.scoreLabel + this.score, {
    //   font: '18pt Passion One',
    //   fill: 'white',
    //   align: 'center'
    // });
    // this.scoreText.setShadow(2,2,'#000',0);

    // Diamond Counter
    this.diamondScore = 0;
    this.diamondsLabel = 'x ';
    this.diamondSprite = new Phaser.Sprite(this.game, this.game.world.width - 87, 16, 'diamond');
    this.diamondSprite.frame = 0;
    this.diamondSprite.scale.setTo(0.8, 0.8);
    this.diamondText = new Phaser.Text(this.game, this.game.world.width - 59, 16, this.diamondsLabel + this.diamondScore, {
      font: '18pt Passion One',
      fill: 'white',
      align: 'center'
    });
    this.diamondText.setShadow(2,2,'#000',0);

    // Elapsed Time
    this.startTime = this.game.time.now;
    this.minutes = 0;
    this.seconds = 0;
    this.timerText = new Phaser.Text(this.game, this.game.world.centerX-30, 16, '00:00', {
      font: '18pt Passion One',
      fill: 'white',
      align: 'center'
    });
    this.timerText.setShadow(2,2,'#000',0);

    //this.add(this.scoreText);
    this.add(this.diamondSprite);
    this.add(this.diamondText);
    this.add(this.timerText);

  }

  // Only use for an update loop here is to update the timer
  update() {

    if( !this.timerPaused ) {
      this.minutes = Math.floor((this.game.time.now - this.startTime) / 60000) % 60;
      this.seconds = Math.floor((this.game.time.now - this.startTime) / 1000) % 60;

      // Make sure both values are at least double digits ie 01:37
      if( this.minutes < 10 ) {
        this.minutes = '0' + this.minutes;
      }

      if( this.seconds < 10 ) {
        this.seconds = '0' + this.seconds;
      }

      this.timerText.text = this.minutes + ':' + this.seconds;
    }
  }

  // addScore(amount) {
  //   this.score += amount;
  //   this.scoreText.text = this.scoreLabel + this.score;
  // }

  addCollectable(amount) {
    this.diamondScore += amount;
    this.diamondText.text = this.diamondsLabel + this.diamondScore;
  }
}