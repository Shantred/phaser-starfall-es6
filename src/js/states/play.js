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
    //this.score = 0;

    this.platforms = this.add.group();

    // Create floor
    this.floor = new Floor({
      game: this.game,
      x: 0,
      y: this.game.world.height - 43,
      width: 800,
      height: 124,
      asset: 'ground_sheet'
    });
    this.platforms.add(this.floor);

    // Add player to world
    this.player = this.add.group();

    var player = new Player({
      game: this.game,
      x: this.game.world.width/2 - 32,
      y: this.game.world.height - 90,
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

    // Stars should begin by spawning every 500ms. Our target for difficulty is for the game to start off fairly easy,
    // but plateau in difficulty after 40 seconds. We achieve this by decreasing the star spawn timer by 3ms every time
    // we spawn a star in until we hit 100ms. 

    this.starLevel = 0; // Used to determine time between star spawns. Higher level = faster spawn time on new games
    this.starSpawnDelay = 500; // Delay between star spawns at beginning of the game
    this.minStarDelay = 100; // The lowest (in time) delay between star spawns

    this.starTimer = this.game.time.create(true);
    this.starTimer.add(500, this.spawnStar, this);
    this.starTimer.start();
    
    // Make sure hud is always on top
    this.game.world.bringToTop(this.hud);

  }

  update() {

    // Collisions
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.diamonds, this.platforms, this.collectableDecay, null, this)
    this.game.physics.arcade.overlap(this.player, this.stars, this.starCollision, null, this);
    this.game.physics.arcade.overlap(this.diamonds, this.player, this.collectItem, null, this);
  }

  spawnStar() {

    this.starLevel++;

    // Every time a star spawns, there is a chance for a diamond to spawn in it's place
    let diamondChance = this.game.rnd.integerInRange(1, 15);

    if( diamondChance === 1 ) {
      let diamond = this.diamonds.getFirstExists(false);

      if( !diamond ) {
        console.log("Creating new diamond");
        diamond = new Diamond({
          game: this.game,
          x: this.game.rnd.integerInRange(10, this.game.world.width-22),
          y: 1,
          asset: 'diamond',
          frame: 0
        });

        this.diamonds.add(diamond);
        diamond.body.gravity.y = this.maxXGravity;
      } else {
        console.log("Using existing diamond", diamond);
        diamond.reset(this.game.rnd.integerInRange(1, this.game.world.width-22), 1);
      }
    } else {

      // Spawn a star instead
      let star = this.stars.getFirstExists(false);

      if( !star ) {
        star = new Star({
          game: this.game,
          x: this.game.rnd.integerInRange(10, this.game.world.width-22),
          y: 1,
          asset: 'star',
          health: 1
        });

        this.stars.add(star);
        star.body.gravity.y = this.game.rnd.integerInRange(600, 800);
      } else {
        star.reset(this.game.rnd.integerInRange(1, this.game.world.width-22), 1);
      }
    }

    // The old timer should already be over and destroyed. Create a new one
    // Limit the lowest time to this.minStarDelay
    var delay = this.starSpawnDelay - ( this.starLevel * 3 );
    if( delay < this.minStarDelay )
        delay = this.minStarDelay;
    this.starTimer = this.game.time.create(true);
    this.starTimer.add(delay, this.spawnStar, this);
    this.starTimer.start();
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
    this.hud.timerPaused = true;
    this.state.start('Gameover', false, false);
  }

  // increaseScore(amount) {
  //   this.hud.addScore(amount);
  //   this.score += amount;
  // }

  // Collectables decay over a period of 3 seconds. They remain on the ground
  // for 2 seconds and blink for 1 before being removed
  collectableDecay(collectable) {
    collectable.decay();
  }

  collectItem(collectable) {
    //this.hud.addScore(100);
    this.hud.addCollectable(1);
    //this.score += 100;

    collectable.collect();

  }
}