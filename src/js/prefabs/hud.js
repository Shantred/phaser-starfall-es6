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

    this.add(this.scoreText);

  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.text = this.scoreLabel + this.score;
  }
}