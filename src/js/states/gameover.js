import TextButton from '../extensions/textbutton';

export default class Gameover extends Phaser.State {

  create() {

    this.gameOverText = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY, 'Game Over!', {
      font: '32px Medula One',
      fill: 'white',
      align: 'center'
    });
    this.gameOverText.anchor.setTo(0.5, 0.5);
    this.gameOverText.setShadow(1,1,'#000',1);

    this.playAgain = new TextButton({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 55,
      asset: 'button_new',
      overFrame: 0,
      outFrame: 1,
      downFrame: 2,
      upFrame: 1,
      label: 'Restart',
      style: {
        font: '32px Medula One',
        fill: 'white',
        align: 'center'
      }
    });

    this.playAgain.onInputDown.add(()=>{
      this.state.start('Play');
    });

    this.gameOverUI = this.add.group();
    this.gameOverUI.add(this.gameOverText);
    this.gameOverUI.add(this.playAgain);

  }
}