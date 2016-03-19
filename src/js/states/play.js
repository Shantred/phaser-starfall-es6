import Player from '../prefabs/player';
import Star from '../prefabs/star';
import Diamond from '../prefabs/diamond';
import HUD from '../prefabs/hud';
import Floor from '../prefabs/floor';

export default class Play extends Phaser.State {

  create() {
    this.bg = this.game.add.image(0, 0, 'sky');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // HUD
    this.hud = new HUD({
      game: this.game
    });
    this.score = 0;

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
    this.player = this.add.group();

    var player = new Player({
      game: this.game,
      x: this.game.world.width/2 - 32,
      y: this.game.world.height - 80,
      asset: 'dude',
      health: 10
    });

    this.player.add(player);

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
    
    // Make sure hud is always on top
    this.game.world.bringToTop(this.hud);

  }

  update() {

    this.starTimer += this.game.time.elapsed;
    this.currentLevelTimer += this.game.time.elapsed;

    // Increase current level
    if( this.currentLevelTimer > this.starNextLevelDelay ) {
      this.currentLevelTimer = 0;
      this.starLevel++;
    }

    // Spawn star if it's time
    // Stars start by spawning every starSpawnDelay ms and spawn 20ms faster for every star level
    var startTimeToSpawn = this.starSpawnDelay - (this.starLevel * 20);

    // Make sure we do not spawn faster than the fastest delay setting
    if( startTimeToSpawn < this.minStarDelay ) {
      startTimeToSpawn = this.minStarDelay;
    }

    if( this.starTimer >= startTimeToSpawn ) {

      // For every time a star spawns, there should be a chance to spawn a collectable diamond instead
      let diamondChance = this.game.rnd.integerInRange(1, 20);

      if( diamondChance === 1 ) {
        let diamond = this.diamonds.getFirstExists(false);

        if( !diamond ) {
          console.log("creating new diamond");
          diamond = new Diamond({
            game: this.game,
            x: this.game.rnd.integerInRange(1, this.game.world.width-22),
            y: 1,
            asset: 'diamond',
            frame: 0
          });

          // diamond.events.onKilled.add(() => {
          //   diamond.resetDecay();
          // });

          this.diamonds.add(diamond);
          diamond.body.gravity.y = this.maxXGravity;
        } else {
          console.log("using existing diamond ", diamond);
          diamond.reset(this.game.rnd.integerInRange(1, this.game.world.width-22), 1);
        }
      } else {

        // Spawn a new star randomly on the Y axis and just above the viewport
        let star = this.stars.getFirstExists(false);

        if( !star ) {
          star = new Star({
            game: this.game,
            x: this.game.rnd.integerInRange(1, this.game.world.width-22),
            y: 1,
            asset: 'star',
            health: 1
          });

          star.events.onKilled.add(() => {
            this.increaseScore(10);
          });

          this.stars.add(star);
          star.body.gravity.y = this.game.rnd.integerInRange(600, 800);
        } else {
          star.reset(this.game.rnd.integerInRange(1, this.game.world.width-22), 1);
        }
      }

      this.starTimer = 0;
    }

    // Collisions
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.diamonds, this.platforms, this.collectableDecay, null, this)
    this.game.physics.arcade.overlap(this.player, this.stars, this.starCollision, null, this);
    this.game.physics.arcade.overlap(this.diamonds, this.player, this.collectItem, null, this);
  }

  // Player collision with a star does 10 damage
  starCollision(player, star) {
    player.damage(10);
    star.damage(10);

    // When the player "dies", pause all physics and switch to gameover state
    if(player.health <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.game.physics.arcade.isPaused = true;
    this.state.start('Gameover', false, false);
  }

  increaseScore(amount) {
    this.hud.addScore(amount);
    this.score += amount;
  }

  // Collectables decay over a period of 3 seconds. They remain on the ground
  // for 2 seconds and blink for 1 before being removed
  collectableDecay(collectable) {
    collectable.decay();
  }

  collectItem(collectable) {
    this.hud.addScore(100);
    this.hud.addCollectable(1);
    this.score += 100;

    collectable.collect();

  }
}