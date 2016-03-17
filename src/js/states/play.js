import Player from '../prefabs/player';
import Star from '../prefabs/star';
import Diamond from '../prefabs/diamond';
import HUD from '../prefabs/hud';
import Floor from '../prefabs/floor';

export default class Play extends Phaser.State {

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // HUD
    this.hud = new HUD({
      game: this.game
    });

    this.platforms = this.add.group();

    // Create floor
    this.floor = new Floor({
      game: this.game,
      x: 0,
      y: this.game.world.height - 32,
      width: 400,
      height: 32,
      asset: 'new_ground'
    });

    this.platforms.add(this.floor);

    // Add player to world
    this.player = new Player({
      game: this.game,
      x: this.game.world.width/2 - 32,
      y: this.game.world.height - 150,
      asset: 'dude',
      health: 10
    });

    this.game.stage.addChild(this.player);

    // Create groups to hold our spawnable units
    this.stars = this.add.group();
    this.stars.enableBody = true;

    this.diamonds = this.add.group();
    this.diamonds.enableBody = true;

    // Game Settings
    this.minXGravity = 800;
    this.maxXGravity = 600;

    this.starLevel = 0; // Used to determine time between star spawns. Higher level = faster spawn time on new games
    this.starSpawnDelay = 500; // Delay between star spawns at beginning of the game
    this.starNextLevelDelay = 3000; // How often starLevel is incremented
    this.minStarDelay = 100; // The lowest (in time) delay between star spawns

    this.starTimer = 0; // Time since last star spawn
    this.currentLevelTimer = 0; // Time since last level increase
  }

  update() {

    this.starTimer += this.game.time.elapsed;
    this.currentLevelTimer += this.game.time.elapsed;

    // Increase current level
    if( this.currentLevelTimer > this.starNextLevelDelay ) {
      this.currentLevelTimer = 0;
      this.starLevel++;
      console.log("Star level increased!");
    }

    // Spawn star if it's time
    // Stars start by spawning every starSpawnDelay ms and spawn 20ms faster for every star level
    var startTimeToSpawn = this.starSpawnDelay - (this.starLevel * 20);

    // Make sure we do not spawn faster than the fastest delay setting
    if( startTimeToSpawn < this.minStarDelay ) {
      startTimeToSpawn = this.minStarDelay;
    }

    if( this.starTimer >= startTimeToSpawn ) {

      // Spawn a new star randomly on the Y axis and just above the viewport
      var star = new Star({
        game: this.game,
        x: this.game.rnd.integerInRange(1, this.game.world.width-22),
        y: -22,
        asset: 'star',
        health: 1
      });

      this.stars.add(star);
      star.body.gravity.y = this.game.rnd.integerInRange(600, 800);

      this.starTimer = 0;
    }

    // Collisions
    this.game.physics.arcade.collide(this.player, this.platforms);
    // TODO: DIAMOND COLLISION
    this.game.physics.arcade.overlap(this.player, this.stars, this.starCollision, null, this);
    // TODO: DIAMOND COLLECTIONs
  }

  // Player collision with a star does 10 damage
  starCollision(player, star) {
    player.damage(10);
    star.damage(10);

    if(!player.alive) {
      this.gameOver();
    }
  }

  gameOver() {
    this.game.state.start('Gameover');
  }
}