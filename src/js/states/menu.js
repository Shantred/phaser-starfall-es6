export default class Menu extends Phaser.State {

  create() {

    this.bg = this.game.add.image(0, 0, 'sky');

    this.playButton = new Phaser.Button(this.game, this.game.world.centerX, this.game.world.centerY + 55, 'ui', false, false, 6, 6, 5, 6);
    this.playButton.anchor.setTo(0.5, 0.5);
    this.playButton.scale.setTo( 0.5, 0.5);

    this.playButton.onInputUp.add(()=>{
      this.state.start('Play');
    });

    this.title = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-25, 'Phaser \nStarfall', {
      font: '28pt Paytone One',
      fill: 'white',
      align: 'center'
    });
    this.title.anchor.setTo(0.5, 0.5);
    this.title.setShadow(1,1,'#000',1);

    this.menuUI = this.add.group();
    this.menuUI.add(this.playButton);
    this.menuUI.add(this.title);
  }
}