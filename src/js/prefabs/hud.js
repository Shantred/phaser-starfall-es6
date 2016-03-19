export default class Hud extends Phaser.Group {

  constructor({ game }) {
    super(game);
    this.game = game;

    // Score
    this.score = 0;
    this.scoreLabel = 'Score: ';
    this.scoreText = new Phaser.Text(this.game, 16, 16, this.scoreLabel + this.score, {
      font: '18pt Passion One',
      fill: 'white',
      align: 'center'
    });
    this.scoreText.setShadow(1,1,'#000',1);

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
    this.diamondText.setShadow(1,1,'#000',1);

    this.add(this.scoreText);
    this.add(this.diamondSprite);
    this.add(this.diamondText);
  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.text = this.scoreLabel + this.score;
  }

  addCollectable(amount) {
    this.diamondScore += amount;
    this.diamondText.text = this.diamondsLabel + this.diamondScore;
  }
}