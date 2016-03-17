import TextButton from '../extensions/textbutton';
import HUD from '../prefabs/hud';
import Floor from '../prefabs/floor';

export default class Gameover extends Phaser.State {

  create() {

    // Add Some things to make this more like the level

    // HUD
    this.hud = new HUD({
      game: this.game
    });

    // Create floor
    this.floor = new Floor({
      game: this.game,
      x: 0,
      y: this.game.world.height - 32,
      width: 400,
      height: 32,
      asset: 'new_ground'
    });

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
    this.gameOverUI.add(this.floor);
    this.gameOverUI.add(this.gameOverText);
    this.gameOverUI.add(this.playAgain);

  }
}