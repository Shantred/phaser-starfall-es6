import TextButton from '../extensions/textbutton';

export default class Gameover extends Phaser.State {

  create() {

    this.gameOverText = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY, 'Game Over!', {
      font: '32px Medula One',
      fill: 'black',
      align: 'center'
    });

    this.start = new TextButton({
      game: this.game,
      x: this.game.world.centerX - 100,
      y: this.game.world.centerY + 55,
      asset: 'button',
      overFrame: 2,
      outFrame: 1,
      downFrame: 0,
      upFrame: 1,
      label: 'Restart',
      style: {
        font: '16px Medula One',
        fill: 'white',
        align: 'center'
      }
    });

    this.start.onInputDown.add(()=>{
      this.state.start('Play');
    });

  }
}