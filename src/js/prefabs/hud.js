export default class Hud extends Phaser.Group {

  constructor({ game }) {
    super(game);
    this.game = game;

    // Create level, this probably later needs to be separated into it's own object
    this.bg = new Phaser.Image(this.game, 0, 0, 'sky');

    // this.floor = new Phaser.TileSprite(this.game, 0, this.game.world.height - 32, 400, 32, 'new_ground');
    // this.game.physics.arcade.enable(this.floor);
    // this.floor.body.allowGravity = false;
    // this.floor.immovable = true;

    // Score
    this.score = 0;
    this.scoreLabel = 'Score: ';
    this.scoreText = new Phaser.Text(this.game, 16, 16, this.scoreLabel + this.score, {
      font: '32px Medula One',
      fill: 'white',
      align: 'center'
    });
    this.scoreText.setShadow(1,1,'#000',1);

    this.add(this.bg);
    //this.add(this.floor);
    this.add(this.scoreText);

  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.text = this.scoreLabel + this.score;
  }
}