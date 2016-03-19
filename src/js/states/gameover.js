export default class Gameover extends Phaser.State {

  create() {
    console.log('hit create');
    this.gameOverText = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY, 'Game Over!', {
      font: '24pt Paytone One',
      fill: 'white',
      align: 'center'
    });
    this.gameOverText.anchor.setTo(0.5, 0.5);
    this.gameOverText.setShadow(1,1,'#000',1);

    // Restart buttons are frame 7 and 8 of the 'ui' texture atlas
    this.restart = new Phaser.Button(this.game, this.game.world.centerX, this.game.world.centerY + 55, 'ui', false, false, 8, 8, 7, 8);
    this.restart.anchor.setTo(0.5, 0.5);
    this.restart.scale.setTo( 0.5, 0.5);

    this.restart.onInputUp.add(()=>{
      this.state.start('Play');
    });

    this.gameOverUI = this.add.group();
    this.gameOverUI.add(this.gameOverText);
    this.gameOverUI.add(this.restart);

  }
}