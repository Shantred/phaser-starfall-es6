(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _states = require('./states');

var states = _interopRequireWildcard(_states);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GAME = new Phaser.Game(400, 480, Phaser.AUTO, '');

Object.keys(states).forEach(function (state) {
  return GAME.state.add(state, states[state]);
});

GAME.state.start('Boot');

},{"./states":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Diamond = function (_Phaser$Sprite) {
  _inherits(Diamond, _Phaser$Sprite);

  function Diamond(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;
    var frame = _ref.frame;

    _classCallCheck(this, Diamond);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Diamond).call(this, game, x, y, asset, frame));

    _this.game = game;

    // Holds reference to a timer before decay
    _this.decayTimer = null;

    _this.anchor.setTo(0.5, 0.5);
    _this.scale.set(0.8);

    _this.animations.add('flash', [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 15, false);

    return _this;
  }

  _createClass(Diamond, [{
    key: 'reset',
    value: function reset(x, y) {
      this.resetDecay();
      _get(Object.getPrototypeOf(Diamond.prototype), 'reset', this).call(this, x, y);
    }
  }, {
    key: 'flash',
    value: function flash() {
      // Make sure flash animation is not already playing for some reason
      if (!this.animations.getAnimation('flash').isPlaying) {
        this.animations.getAnimation('flash').play(15, false, true);
      }
    }

    // When decay needs resetting, we need to stop any animation that's playing and set the active frame to 0
    // and destroy the decay timer if it is present.

  }, {
    key: 'resetDecay',
    value: function resetDecay() {
      console.log('resetDecay called');
      if (this.animations.getAnimation('flash').isPlaying) {
        this.animations.stop();
        this.frame = 0;
      }

      if (this.decayTimer !== null) {
        console.log('attempting to clear timer', this.decayTimer);
        this.game.time.events.destroy(this.decayTimer);
        this.decayTimer = null;
      }
    }
  }, {
    key: 'collect',
    value: function collect() {
      this.resetDecay();
      this.exists = false;
    }

    // Begin decay if not already in progress

  }, {
    key: 'decay',
    value: function decay() {

      if (this.decayTimer === null) {
        console.log("initializing decay timer");
        this.decayTimer = this.game.time.create(true);
        this.decayTimer.add(2000, this.flash, this);
        this.decayTimer.start();
      }
    }
  }]);

  return Diamond;
}(Phaser.Sprite);

exports.default = Diamond;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Floor = function (_Phaser$TileSprite) {
    _inherits(Floor, _Phaser$TileSprite);

    function Floor(_ref) {
        var game = _ref.game;
        var x = _ref.x;
        var y = _ref.y;
        var width = _ref.width;
        var height = _ref.height;
        var asset = _ref.asset;

        _classCallCheck(this, Floor);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Floor).call(this, game, x, y, width, height, asset));

        _this.game = game;

        // Image is slightly too large, let's re-adjust to fit the screen
        _this.scale.setTo(0.5, 0.35);

        // Floors are in set positions in world space and do not move
        _this.game.physics.arcade.enable(_this);
        _this.body.allowGravity = false;
        _this.body.immovable = true;
        return _this;
    }

    return Floor;
}(Phaser.TileSprite);

exports.default = Floor;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hud = function (_Phaser$Group) {
  _inherits(Hud, _Phaser$Group);

  function Hud(_ref) {
    var game = _ref.game;

    _classCallCheck(this, Hud);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hud).call(this, game));

    _this.game = game;

    _this.timerPaused = false;

    // Score
    // this.score = 0;
    // this.scoreLabel = 'Score: ';
    // this.scoreText = new Phaser.Text(this.game, 16, 16, this.scoreLabel + this.score, {
    //   font: '18pt Passion One',
    //   fill: 'white',
    //   align: 'center'
    // });
    // this.scoreText.setShadow(2,2,'#000',0);

    // Diamond Counter
    _this.diamondScore = 0;
    _this.diamondsLabel = 'x ';
    _this.diamondSprite = new Phaser.Sprite(_this.game, _this.game.world.width - 87, 16, 'diamond');
    _this.diamondSprite.frame = 0;
    _this.diamondSprite.scale.setTo(0.8, 0.8);
    _this.diamondText = new Phaser.Text(_this.game, _this.game.world.width - 59, 16, _this.diamondsLabel + _this.diamondScore, {
      font: '18pt Passion One',
      fill: 'white',
      align: 'center'
    });
    _this.diamondText.setShadow(2, 2, '#000', 0);

    // Elapsed Time
    _this.startTime = _this.game.time.now;
    _this.minutes = 0;
    _this.seconds = 0;
    _this.timerText = new Phaser.Text(_this.game, _this.game.world.centerX - 30, 16, '00:00', {
      font: '18pt Passion One',
      fill: 'white',
      align: 'center'
    });
    _this.timerText.setShadow(2, 2, '#000', 0);

    //this.add(this.scoreText);
    _this.add(_this.diamondSprite);
    _this.add(_this.diamondText);
    _this.add(_this.timerText);

    return _this;
  }

  // Only use for an update loop here is to update the timer


  _createClass(Hud, [{
    key: 'update',
    value: function update() {

      if (!this.timerPaused) {
        this.minutes = Math.floor((this.game.time.now - this.startTime) / 60000) % 60;
        this.seconds = Math.floor((this.game.time.now - this.startTime) / 1000) % 60;

        // Make sure both values are at least double digits ie 01:37
        if (this.minutes < 10) {
          this.minutes = '0' + this.minutes;
        }

        if (this.seconds < 10) {
          this.seconds = '0' + this.seconds;
        }

        this.timerText.text = this.minutes + ':' + this.seconds;
      }
    }

    // addScore(amount) {
    //   this.score += amount;
    //   this.scoreText.text = this.scoreLabel + this.score;
    // }

  }, {
    key: 'addCollectable',
    value: function addCollectable(amount) {
      this.diamondScore += amount;
      this.diamondText.text = this.diamondsLabel + this.diamondScore;
    }
  }]);

  return Hud;
}(Phaser.Group);

exports.default = Hud;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;
    var health = _ref.health;

    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, game, x, y, asset));

    _this.game = game;
    _this.health = health;
    _this.hasControl = true;

    // Enable physics and set physics properties of player
    _this.game.physics.arcade.enable(_this);
    _this.body.bounce.y = 0;
    _this.body.gravity.y = 300;
    _this.body.collideWorldBounds = true;

    _this.animations.add('left', [0, 1, 2, 3], 10, true);
    _this.animations.add('right', [5, 6, 7, 8], 10, true);

    // Adjust the hitbox slightly to better represent the visible portion of the sprite
    _this.body.setSize(28, 36, 2, 12);
    return _this;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {

      // Always kill horizontal movement without accel/decel
      this.body.velocity.x = 0;

      // If player has 0 health, stop animations and disable controls
      if (this.health <= 0) {
        this.hasControl = false;
        this.animations.stop();
      }

      if (this.hasControl) {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
          this.body.velocity.x = -275;
          this.animations.play('left');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
          this.body.velocity.x = 275;
          this.animations.play('right');
        } else {
          this.animations.stop();
          this.frame = 4;
        }
      }
    }
  }, {
    key: 'damage',
    value: function damage(amount) {
      this.health -= amount;
    }
  }]);

  return Player;
}(Phaser.Sprite);

exports.default = Player;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Star = function (_Phaser$Sprite) {
  _inherits(Star, _Phaser$Sprite);

  function Star(_ref) {
    var game = _ref.game;
    var x = _ref.x;
    var y = _ref.y;
    var asset = _ref.asset;
    var health = _ref.health;

    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Star).call(this, game, x, y, asset));

    _this.game = game;
    _this.health = health;

    _this.anchor.setTo(0.5, 0.5);

    // Kill object when leaving the screen
    _this.checkWorldBounds = true;
    _this.outOfBoundsKill = true;
    return _this;
  }

  _createClass(Star, [{
    key: "damage",
    value: function damage(amount) {
      //super.damage(amount);
      this.health -= amount;
    }
  }]);

  return Star;
}(Phaser.Sprite);

exports.default = Star;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = function (_Phaser$State) {
  _inherits(Boot, _Phaser$State);

  function Boot() {
    _classCallCheck(this, Boot);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Boot).apply(this, arguments));
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {
      this.game.stage.backgroundColor = '#000';
      this.load.image('loaderBg', 'img/loader-bg.png');
      this.load.image('loaderBar', 'img/loader-bar.png');
    }
  }, {
    key: 'create',
    value: function create() {
      //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.state.start('Preload');
    }
  }]);

  return Boot;
}(Phaser.State);

exports.default = Boot;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gameover = function (_Phaser$State) {
  _inherits(Gameover, _Phaser$State);

  function Gameover() {
    _classCallCheck(this, Gameover);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Gameover).apply(this, arguments));
  }

  _createClass(Gameover, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      console.log('hit create');
      this.gameOverText = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY, 'Game Over!', {
        font: '24pt Paytone One',
        fill: 'white',
        align: 'center'
      });
      this.gameOverText.anchor.setTo(0.5, 0.5);
      this.gameOverText.setShadow(2, 2, '#000', 0);

      // Restart buttons are frame 7 and 8 of the 'ui' texture atlas
      this.restart = new Phaser.Button(this.game, this.game.world.centerX, this.game.world.centerY + 55, 'ui', false, false, 8, 8, 7, 8);
      this.restart.anchor.setTo(0.5, 0.5);
      this.restart.scale.setTo(0.5, 0.5);

      this.restart.onInputUp.add(function () {
        _this2.state.start('Play');
      });

      this.gameOverUI = this.add.group();
      this.gameOverUI.add(this.gameOverText);
      this.gameOverUI.add(this.restart);
    }
  }]);

  return Gameover;
}(Phaser.State);

exports.default = Gameover;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boot = require('./boot');

Object.defineProperty(exports, 'Boot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_boot).default;
  }
});

var _preload = require('./preload');

Object.defineProperty(exports, 'Preload', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preload).default;
  }
});

var _play = require('./play');

Object.defineProperty(exports, 'Play', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_play).default;
  }
});

var _gameover = require('./gameover');

Object.defineProperty(exports, 'Gameover', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_gameover).default;
  }
});

var _menu = require('./menu');

Object.defineProperty(exports, 'Menu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_menu).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./boot":7,"./gameover":8,"./menu":10,"./play":11,"./preload":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
    _inherits(Menu, _Phaser$State);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.bg = this.game.add.image(0, 0, 'sky');

            this.playButton = new Phaser.Button(this.game, this.game.world.centerX, this.game.world.centerY + 35, 'ui', false, false, 6, 6, 5, 6);
            this.playButton.anchor.setTo(0.5, 0.5);
            this.playButton.scale.setTo(0.5, 0.5);

            this.playButton.onInputUp.add(function () {
                _this2.state.start('Play');
            });

            this.title = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY - 75, 'Phaser \nStarfall', {
                font: '28pt Paytone One',
                fill: 'white',
                align: 'center'
            });
            this.title.anchor.setTo(0.5, 0.5);
            this.title.setShadow(2, 2, '#000', 0);

            this.menuUI = this.add.group();
            this.menuUI.add(this.playButton);
            this.menuUI.add(this.title);
        }
    }]);

    return Menu;
}(Phaser.State);

exports.default = Menu;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = require('../prefabs/player');

var _player2 = _interopRequireDefault(_player);

var _star = require('../prefabs/star');

var _star2 = _interopRequireDefault(_star);

var _diamond = require('../prefabs/diamond');

var _diamond2 = _interopRequireDefault(_diamond);

var _hud = require('../prefabs/hud');

var _hud2 = _interopRequireDefault(_hud);

var _floor = require('../prefabs/floor');

var _floor2 = _interopRequireDefault(_floor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Play = function (_Phaser$State) {
  _inherits(Play, _Phaser$State);

  function Play() {
    _classCallCheck(this, Play);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Play).apply(this, arguments));
  }

  _createClass(Play, [{
    key: 'create',
    value: function create() {
      this.bg = this.game.add.image(0, 0, 'sky');

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // HUD
      this.hud = new _hud2.default({
        game: this.game
      });
      //this.score = 0;

      this.platforms = this.add.group();

      // Create floor
      this.floor = new _floor2.default({
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

      var player = new _player2.default({
        game: this.game,
        x: this.game.world.width / 2 - 32,
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
  }, {
    key: 'update',
    value: function update() {

      // Collisions
      this.game.physics.arcade.collide(this.player, this.platforms);
      this.game.physics.arcade.collide(this.diamonds, this.platforms, this.collectableDecay, null, this);
      this.game.physics.arcade.overlap(this.player, this.stars, this.starCollision, null, this);
      this.game.physics.arcade.overlap(this.diamonds, this.player, this.collectItem, null, this);
    }
  }, {
    key: 'spawnStar',
    value: function spawnStar() {

      this.starLevel++;

      // Every time a star spawns, there is a chance for a diamond to spawn in it's place
      var diamondChance = this.game.rnd.integerInRange(1, 15);

      if (diamondChance === 1) {
        var diamond = this.diamonds.getFirstExists(false);

        if (!diamond) {
          console.log("Creating new diamond");
          diamond = new _diamond2.default({
            game: this.game,
            x: this.game.rnd.integerInRange(10, this.game.world.width - 22),
            y: 1,
            asset: 'diamond',
            frame: 0
          });

          this.diamonds.add(diamond);
          diamond.body.gravity.y = this.maxXGravity;
        } else {
          console.log("Using existing diamond", diamond);
          diamond.reset(this.game.rnd.integerInRange(1, this.game.world.width - 22), 1);
        }
      } else {

        // Spawn a star instead
        var star = this.stars.getFirstExists(false);

        if (!star) {
          star = new _star2.default({
            game: this.game,
            x: this.game.rnd.integerInRange(10, this.game.world.width - 22),
            y: 1,
            asset: 'star',
            health: 1
          });

          this.stars.add(star);
          star.body.gravity.y = this.game.rnd.integerInRange(600, 800);
        } else {
          star.reset(this.game.rnd.integerInRange(1, this.game.world.width - 22), 1);
        }
      }

      // The old timer should already be over and destroyed. Create a new one
      // Limit the lowest time to this.minStarDelay
      var delay = this.starSpawnDelay - this.starLevel * 3;
      if (delay < this.minStarDelay) delay = this.minStarDelay;
      this.starTimer = this.game.time.create(true);
      this.starTimer.add(delay, this.spawnStar, this);
      this.starTimer.start();
    }

    // Player collision with a star does 10 damage

  }, {
    key: 'starCollision',
    value: function starCollision(player, star) {
      player.damage(10);
      star.damage(10);

      // When the player "dies", pause all physics and switch to gameover state
      if (player.health <= 0) {
        this.gameOver();
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
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

  }, {
    key: 'collectableDecay',
    value: function collectableDecay(collectable) {
      collectable.decay();
    }
  }, {
    key: 'collectItem',
    value: function collectItem(collectable) {
      //this.hud.addScore(100);
      this.hud.addCollectable(1);
      //this.score += 100;

      collectable.collect();
    }
  }]);

  return Play;
}(Phaser.State);

exports.default = Play;

},{"../prefabs/diamond":2,"../prefabs/floor":3,"../prefabs/hud":4,"../prefabs/player":5,"../prefabs/star":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preload = function (_Phaser$State) {
        _inherits(Preload, _Phaser$State);

        function Preload() {
                _classCallCheck(this, Preload);

                return _possibleConstructorReturn(this, Object.getPrototypeOf(Preload).apply(this, arguments));
        }

        _createClass(Preload, [{
                key: 'preload',
                value: function preload() {

                        // External Scripts
                        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

                        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
                        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
                        this.loaderBg.anchor.setTo(0.5);
                        this.loaderBar.anchor.setTo(0.5);

                        this.load.setPreloadSprite(this.loaderBar);

                        // Static Images
                        this.game.load.image('sky', 'img/day.png');
                        this.game.load.image('star', 'img/star.png');

                        // Sprites
                        this.game.load.spritesheet('diamond', 'img/diamond.png', 32, 28);
                        this.game.load.spritesheet('dude', 'img/dude.png', 32, 48);
                        this.game.load.spritesheet('ground_sheet', 'img/spritesheet/ground_sheet.png', 260, 124);

                        this.load.atlasJSONArray('ui', 'img/spritesheet/ui.png', 'data/spritesheet/ui.json');
                        //this.load.atlasJSONArray('ground_sheet', 'img/spritesheet/ground_sheet.png', 'data/spritesheet/ground_sheet.json');
                }
        }, {
                key: 'create',
                value: function create() {
                        this.state.start('Menu');
                }
        }]);

        return Preload;
}(Phaser.State);

exports.default = Preload;

},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9wcmVmYWJzL2RpYW1vbmQuanMiLCJzcmMvanMvcHJlZmFicy9mbG9vci5qcyIsInNyYy9qcy9wcmVmYWJzL2h1ZC5qcyIsInNyYy9qcy9wcmVmYWJzL3BsYXllci5qcyIsInNyYy9qcy9wcmVmYWJzL3N0YXIuanMiLCJzcmMvanMvc3RhdGVzL2Jvb3QuanMiLCJzcmMvanMvc3RhdGVzL2dhbWVvdmVyLmpzIiwic3JjL2pzL3N0YXRlcy9pbmRleC5qcyIsInNyYy9qcy9zdGF0ZXMvbWVudS5qcyIsInNyYy9qcy9zdGF0ZXMvcGxheS5qcyIsInNyYy9qcy9zdGF0ZXMvcHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0lBQVk7Ozs7QUFDWixJQUFNLE9BQU8sSUFBSSxPQUFPLElBQVAsQ0FBWSxHQUFoQixFQUFxQixHQUFyQixFQUEwQixPQUFPLElBQVAsRUFBYSxFQUF2QyxDQUFQOztBQUVOLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsT0FBcEIsQ0FBNEI7U0FBUyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixFQUFzQixPQUFPLEtBQVAsQ0FBdEI7Q0FBVCxDQUE1Qjs7QUFFQSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDTHFCOzs7QUFFbkIsV0FGbUIsT0FFbkIsT0FBMEM7UUFBNUIsaUJBQTRCO1FBQXRCLFdBQXNCO1FBQW5CLFdBQW1CO1FBQWhCLG1CQUFnQjtRQUFULG1CQUFTOzswQkFGdkIsU0FFdUI7O3VFQUZ2QixvQkFHWCxNQUFNLEdBQUcsR0FBRyxPQUFPLFFBRGU7O0FBR3hDLFVBQUssSUFBTCxHQUFZLElBQVo7OztBQUh3QyxTQU14QyxDQUFLLFVBQUwsR0FBa0IsSUFBbEIsQ0FOd0M7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TCxDQUFVLElBQVYsQ0FBZSxLQUFmLENBQXFCLE1BQXJCLEVBQTZCLGNBQTdCOzs7QUFkTSw0QkFpQk4sQ0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLFdBQWYsQ0FBMkIsU0FBM0IsRUFBc0MsaUJBQXRDLEVBQXlELEVBQXpELEVBQTZELEVBQTdELEVBakJNO0FBa0JOLDZCQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsV0FBZixDQUEyQixNQUEzQixFQUFtQyxjQUFuQyxFQUFtRCxFQUFuRCxFQUF1RCxFQUF2RCxFQWxCTTtBQW1CTiw2QkFBSyxJQUFMLENBQVUsSUFBVixDQUFlLFdBQWYsQ0FBMkIsY0FBM0IsRUFBMkMsa0NBQTNDLEVBQStFLEdBQS9FLEVBQW9GLEdBQXBGLEVBbkJNOztBQXFCTiw2QkFBSyxJQUFMLENBQVUsY0FBVixDQUF5QixJQUF6QixFQUErQix3QkFBL0IsRUFBeUQsMEJBQXpEOzs7QUFyQk07O3lDQTBCRDtBQUNQLDZCQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCLEVBRE87Ozs7ZUE1QlE7RUFBZ0IsT0FBTyxLQUFQOztrQkFBaEIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgc3RhdGVzIGZyb20gJy4vc3RhdGVzJztcclxuY29uc3QgR0FNRSA9IG5ldyBQaGFzZXIuR2FtZSg0MDAsIDQ4MCwgUGhhc2VyLkFVVE8sICcnKTtcclxuXHJcbk9iamVjdC5rZXlzKHN0YXRlcykuZm9yRWFjaChzdGF0ZSA9PiBHQU1FLnN0YXRlLmFkZChzdGF0ZSwgc3RhdGVzW3N0YXRlXSkpO1xyXG5cclxuR0FNRS5zdGF0ZS5zdGFydCgnQm9vdCcpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERpYW1vbmQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoeyBnYW1lLCB4LCB5LCBhc3NldCwgZnJhbWUgfSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYXNzZXQsIGZyYW1lKTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIC8vIEhvbGRzIHJlZmVyZW5jZSB0byBhIHRpbWVyIGJlZm9yZSBkZWNheVxyXG4gICAgdGhpcy5kZWNheVRpbWVyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICB0aGlzLnNjYWxlLnNldCgwLjgpO1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2ZsYXNoJywgWzAsMSwwLDEsMCwxLDAsMSwwLDEsMCwxLDAsMSwwXSwgMTUsIGZhbHNlKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgcmVzZXQoeCwgeSkge1xyXG4gICAgdGhpcy5yZXNldERlY2F5KCk7XHJcbiAgICBzdXBlci5yZXNldCh4LCB5KTtcclxuICAgIFxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmbGFzaCgpIHtcclxuICAgIC8vIE1ha2Ugc3VyZSBmbGFzaCBhbmltYXRpb24gaXMgbm90IGFscmVhZHkgcGxheWluZyBmb3Igc29tZSByZWFzb25cclxuICAgIGlmKCAhdGhpcy5hbmltYXRpb25zLmdldEFuaW1hdGlvbignZmxhc2gnKS5pc1BsYXlpbmcgKSB7XHJcbiAgICBcdHRoaXMuYW5pbWF0aW9ucy5nZXRBbmltYXRpb24oJ2ZsYXNoJykucGxheSgxNSwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gV2hlbiBkZWNheSBuZWVkcyByZXNldHRpbmcsIHdlIG5lZWQgdG8gc3RvcCBhbnkgYW5pbWF0aW9uIHRoYXQncyBwbGF5aW5nIGFuZCBzZXQgdGhlIGFjdGl2ZSBmcmFtZSB0byAwXHJcbiAgLy8gYW5kIGRlc3Ryb3kgdGhlIGRlY2F5IHRpbWVyIGlmIGl0IGlzIHByZXNlbnQuXHJcbiAgcmVzZXREZWNheSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdyZXNldERlY2F5IGNhbGxlZCcpO1xyXG4gICAgaWYoIHRoaXMuYW5pbWF0aW9ucy5nZXRBbmltYXRpb24oJ2ZsYXNoJykuaXNQbGF5aW5nICkge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMuc3RvcCgpO1xyXG4gICAgICB0aGlzLmZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiggdGhpcy5kZWNheVRpbWVyICE9PSBudWxsICkge1xyXG4gICAgICBjb25zb2xlLmxvZygnYXR0ZW1wdGluZyB0byBjbGVhciB0aW1lcicsIHRoaXMuZGVjYXlUaW1lcik7XHJcbiAgICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5kZXN0cm95KCB0aGlzLmRlY2F5VGltZXIgKTtcclxuICAgICAgdGhpcy5kZWNheVRpbWVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxlY3QoKSB7XHJcbiAgICB0aGlzLnJlc2V0RGVjYXkoKTtcclxuICAgIHRoaXMuZXhpc3RzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyBCZWdpbiBkZWNheSBpZiBub3QgYWxyZWFkeSBpbiBwcm9ncmVzc1xyXG4gIGRlY2F5KCkge1xyXG5cclxuICAgIGlmKCB0aGlzLmRlY2F5VGltZXIgPT09IG51bGwgKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdGlhbGl6aW5nIGRlY2F5IHRpbWVyXCIpO1xyXG4gICAgICB0aGlzLmRlY2F5VGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUodHJ1ZSk7XHJcbiAgICAgIHRoaXMuZGVjYXlUaW1lci5hZGQoMjAwMCwgdGhpcy5mbGFzaCwgdGhpcyk7XHJcbiAgICAgIHRoaXMuZGVjYXlUaW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29yIGV4dGVuZHMgUGhhc2VyLlRpbGVTcHJpdGUge1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7IGdhbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGFzc2V0IH0pIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGFzc2V0KTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIC8vIEltYWdlIGlzIHNsaWdodGx5IHRvbyBsYXJnZSwgbGV0J3MgcmUtYWRqdXN0IHRvIGZpdCB0aGUgc2NyZWVuXHJcbiAgICB0aGlzLnNjYWxlLnNldFRvKDAuNSwgMC4zNSk7XHJcblxyXG4gICAgLy8gRmxvb3JzIGFyZSBpbiBzZXQgcG9zaXRpb25zIGluIHdvcmxkIHNwYWNlIGFuZCBkbyBub3QgbW92ZVxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzKTtcclxuICAgIHRoaXMuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1ZCBleHRlbmRzIFBoYXNlci5Hcm91cCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHsgZ2FtZSB9KSB7XHJcbiAgICBzdXBlcihnYW1lKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy50aW1lclBhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFNjb3JlXHJcbiAgICAvLyB0aGlzLnNjb3JlID0gMDtcclxuICAgIC8vIHRoaXMuc2NvcmVMYWJlbCA9ICdTY29yZTogJztcclxuICAgIC8vIHRoaXMuc2NvcmVUZXh0ID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgMTYsIDE2LCB0aGlzLnNjb3JlTGFiZWwgKyB0aGlzLnNjb3JlLCB7XHJcbiAgICAvLyAgIGZvbnQ6ICcxOHB0IFBhc3Npb24gT25lJyxcclxuICAgIC8vICAgZmlsbDogJ3doaXRlJyxcclxuICAgIC8vICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAvLyB9KTtcclxuICAgIC8vIHRoaXMuc2NvcmVUZXh0LnNldFNoYWRvdygyLDIsJyMwMDAnLDApO1xyXG5cclxuICAgIC8vIERpYW1vbmQgQ291bnRlclxyXG4gICAgdGhpcy5kaWFtb25kU2NvcmUgPSAwO1xyXG4gICAgdGhpcy5kaWFtb25kc0xhYmVsID0gJ3ggJztcclxuICAgIHRoaXMuZGlhbW9uZFNwcml0ZSA9IG5ldyBQaGFzZXIuU3ByaXRlKHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gODcsIDE2LCAnZGlhbW9uZCcpO1xyXG4gICAgdGhpcy5kaWFtb25kU3ByaXRlLmZyYW1lID0gMDtcclxuICAgIHRoaXMuZGlhbW9uZFNwcml0ZS5zY2FsZS5zZXRUbygwLjgsIDAuOCk7XHJcbiAgICB0aGlzLmRpYW1vbmRUZXh0ID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gNTksIDE2LCB0aGlzLmRpYW1vbmRzTGFiZWwgKyB0aGlzLmRpYW1vbmRTY29yZSwge1xyXG4gICAgICBmb250OiAnMThwdCBQYXNzaW9uIE9uZScsXHJcbiAgICAgIGZpbGw6ICd3aGl0ZScsXHJcbiAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRpYW1vbmRUZXh0LnNldFNoYWRvdygyLDIsJyMwMDAnLDApO1xyXG5cclxuICAgIC8vIEVsYXBzZWQgVGltZVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmdhbWUudGltZS5ub3c7XHJcbiAgICB0aGlzLm1pbnV0ZXMgPSAwO1xyXG4gICAgdGhpcy5zZWNvbmRzID0gMDtcclxuICAgIHRoaXMudGltZXJUZXh0ID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgtMzAsIDE2LCAnMDA6MDAnLCB7XHJcbiAgICAgIGZvbnQ6ICcxOHB0IFBhc3Npb24gT25lJyxcclxuICAgICAgZmlsbDogJ3doaXRlJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9KTtcclxuICAgIHRoaXMudGltZXJUZXh0LnNldFNoYWRvdygyLDIsJyMwMDAnLDApO1xyXG5cclxuICAgIC8vdGhpcy5hZGQodGhpcy5zY29yZVRleHQpO1xyXG4gICAgdGhpcy5hZGQodGhpcy5kaWFtb25kU3ByaXRlKTtcclxuICAgIHRoaXMuYWRkKHRoaXMuZGlhbW9uZFRleHQpO1xyXG4gICAgdGhpcy5hZGQodGhpcy50aW1lclRleHQpO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIE9ubHkgdXNlIGZvciBhbiB1cGRhdGUgbG9vcCBoZXJlIGlzIHRvIHVwZGF0ZSB0aGUgdGltZXJcclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgaWYoICF0aGlzLnRpbWVyUGF1c2VkICkge1xyXG4gICAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aGlzLmdhbWUudGltZS5ub3cgLSB0aGlzLnN0YXJ0VGltZSkgLyA2MDAwMCkgJSA2MDtcclxuICAgICAgdGhpcy5zZWNvbmRzID0gTWF0aC5mbG9vcigodGhpcy5nYW1lLnRpbWUubm93IC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMCkgJSA2MDtcclxuXHJcbiAgICAgIC8vIE1ha2Ugc3VyZSBib3RoIHZhbHVlcyBhcmUgYXQgbGVhc3QgZG91YmxlIGRpZ2l0cyBpZSAwMTozN1xyXG4gICAgICBpZiggdGhpcy5taW51dGVzIDwgMTAgKSB7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gJzAnICsgdGhpcy5taW51dGVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiggdGhpcy5zZWNvbmRzIDwgMTAgKSB7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gJzAnICsgdGhpcy5zZWNvbmRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpbWVyVGV4dC50ZXh0ID0gdGhpcy5taW51dGVzICsgJzonICsgdGhpcy5zZWNvbmRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYWRkU2NvcmUoYW1vdW50KSB7XHJcbiAgLy8gICB0aGlzLnNjb3JlICs9IGFtb3VudDtcclxuICAvLyAgIHRoaXMuc2NvcmVUZXh0LnRleHQgPSB0aGlzLnNjb3JlTGFiZWwgKyB0aGlzLnNjb3JlO1xyXG4gIC8vIH1cclxuXHJcbiAgYWRkQ29sbGVjdGFibGUoYW1vdW50KSB7XHJcbiAgICB0aGlzLmRpYW1vbmRTY29yZSArPSBhbW91bnQ7XHJcbiAgICB0aGlzLmRpYW1vbmRUZXh0LnRleHQgPSB0aGlzLmRpYW1vbmRzTGFiZWwgKyB0aGlzLmRpYW1vbmRTY29yZTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoeyBnYW1lLCB4LCB5LCBhc3NldCwgaGVhbHRoIH0pIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGFzc2V0KTtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XHJcbiAgICB0aGlzLmhhc0NvbnRyb2wgPSB0cnVlO1xyXG5cclxuICAgIC8vIEVuYWJsZSBwaHlzaWNzIGFuZCBzZXQgcGh5c2ljcyBwcm9wZXJ0aWVzIG9mIHBsYXllclxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzKTtcclxuICAgIHRoaXMuYm9keS5ib3VuY2UueSA9IDA7XHJcbiAgICB0aGlzLmJvZHkuZ3Jhdml0eS55ID0gMzAwO1xyXG4gICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgnbGVmdCcsIFswLDEsMiwzXSwgMTAsIHRydWUpO1xyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZCgncmlnaHQnLCBbNSw2LDcsOF0sIDEwLCB0cnVlKTtcclxuXHJcbiAgICAvLyBBZGp1c3QgdGhlIGhpdGJveCBzbGlnaHRseSB0byBiZXR0ZXIgcmVwcmVzZW50IHRoZSB2aXNpYmxlIHBvcnRpb24gb2YgdGhlIHNwcml0ZVxyXG4gICAgdGhpcy5ib2R5LnNldFNpemUoMjgsIDM2LCAyLCAxMik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgLy8gQWx3YXlzIGtpbGwgaG9yaXpvbnRhbCBtb3ZlbWVudCB3aXRob3V0IGFjY2VsL2RlY2VsXHJcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcblxyXG4gICAgLy8gSWYgcGxheWVyIGhhcyAwIGhlYWx0aCwgc3RvcCBhbmltYXRpb25zIGFuZCBkaXNhYmxlIGNvbnRyb2xzXHJcbiAgICBpZiggdGhpcy5oZWFsdGggPD0gMCApIHtcclxuICAgICAgdGhpcy5oYXNDb250cm9sID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIHRoaXMuaGFzQ29udHJvbCApIHtcclxuICAgICAgaWYoIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLkxFRlQpICkge1xyXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLTI3NTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xyXG4gICAgICB9IGVsc2UgaWYoIHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLlJJR0hUKSApIHtcclxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDI3NTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgncmlnaHQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuZnJhbWUgPSA0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgfVxyXG5cclxuICBkYW1hZ2UoYW1vdW50KSB7XHJcbiAgICB0aGlzLmhlYWx0aCAtPSBhbW91bnQ7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuICBjb25zdHJ1Y3Rvcih7IGdhbWUsIHgsIHksIGFzc2V0LCBoZWFsdGh9KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBhc3NldCk7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuXHJcbiAgICAvLyBLaWxsIG9iamVjdCB3aGVuIGxlYXZpbmcgdGhlIHNjcmVlblxyXG4gICAgdGhpcy5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgIHRoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRhbWFnZShhbW91bnQpIHtcclxuICAgIC8vc3VwZXIuZGFtYWdlKGFtb3VudCk7XHJcbiAgICB0aGlzLmhlYWx0aCAtPSBhbW91bnQ7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkZXJCZycsICdpbWcvbG9hZGVyLWJnLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkZXJCYXInLCAnaW1nL2xvYWRlci1iYXIucG5nJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICAvL3RoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuXHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQcmVsb2FkJyk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZW92ZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnaGl0IGNyZWF0ZScpO1xyXG4gICAgdGhpcy5nYW1lT3ZlclRleHQgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdHYW1lIE92ZXIhJywge1xyXG4gICAgICBmb250OiAnMjRwdCBQYXl0b25lIE9uZScsXHJcbiAgICAgIGZpbGw6ICd3aGl0ZScsXHJcbiAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdhbWVPdmVyVGV4dC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgdGhpcy5nYW1lT3ZlclRleHQuc2V0U2hhZG93KDIsMiwnIzAwMCcsMCk7XHJcblxyXG4gICAgLy8gUmVzdGFydCBidXR0b25zIGFyZSBmcmFtZSA3IGFuZCA4IG9mIHRoZSAndWknIHRleHR1cmUgYXRsYXNcclxuICAgIHRoaXMucmVzdGFydCA9IG5ldyBQaGFzZXIuQnV0dG9uKHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZICsgNTUsICd1aScsIGZhbHNlLCBmYWxzZSwgOCwgOCwgNywgOCk7XHJcbiAgICB0aGlzLnJlc3RhcnQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgIHRoaXMucmVzdGFydC5zY2FsZS5zZXRUbyggMC41LCAwLjUpO1xyXG5cclxuICAgIHRoaXMucmVzdGFydC5vbklucHV0VXAuYWRkKCgpPT57XHJcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1BsYXknKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZ2FtZU92ZXJVSSA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLmdhbWVPdmVyVUkuYWRkKHRoaXMuZ2FtZU92ZXJUZXh0KTtcclxuICAgIHRoaXMuZ2FtZU92ZXJVSS5hZGQodGhpcy5yZXN0YXJ0KTtcclxuXHJcbiAgfVxyXG59IiwiZXhwb3J0IHtkZWZhdWx0IGFzIEJvb3R9IGZyb20gJy4vYm9vdCc7XHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQcmVsb2FkfSBmcm9tICcuL3ByZWxvYWQnO1xyXG5leHBvcnQge2RlZmF1bHQgYXMgUGxheX0gZnJvbSAnLi9wbGF5JztcclxuZXhwb3J0IHtkZWZhdWx0IGFzIEdhbWVvdmVyfSBmcm9tICcuL2dhbWVvdmVyJztcclxuZXhwb3J0IHtkZWZhdWx0IGFzIE1lbnV9IGZyb20gJy4vbWVudSc7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuXHJcbiAgICB0aGlzLmJnID0gdGhpcy5nYW1lLmFkZC5pbWFnZSgwLCAwLCAnc2t5Jyk7XHJcblxyXG4gICAgdGhpcy5wbGF5QnV0dG9uID0gbmV3IFBoYXNlci5CdXR0b24odGhpcy5nYW1lLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgKyAzNSwgJ3VpJywgZmFsc2UsIGZhbHNlLCA2LCA2LCA1LCA2KTtcclxuICAgIHRoaXMucGxheUJ1dHRvbi5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgdGhpcy5wbGF5QnV0dG9uLnNjYWxlLnNldFRvKCAwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5wbGF5QnV0dG9uLm9uSW5wdXRVcC5hZGQoKCk9PntcclxuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnUGxheScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy50aXRsZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWS03NSwgJ1BoYXNlciBcXG5TdGFyZmFsbCcsIHtcclxuICAgICAgZm9udDogJzI4cHQgUGF5dG9uZSBPbmUnLFxyXG4gICAgICBmaWxsOiAnd2hpdGUnLFxyXG4gICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH0pO1xyXG4gICAgdGhpcy50aXRsZS5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRTaGFkb3coMiwyLCcjMDAwJywwKTtcclxuXHJcbiAgICB0aGlzLm1lbnVVSSA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLm1lbnVVSS5hZGQodGhpcy5wbGF5QnV0dG9uKTtcclxuICAgIHRoaXMubWVudVVJLmFkZCh0aGlzLnRpdGxlKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4uL3ByZWZhYnMvcGxheWVyJztcclxuaW1wb3J0IFN0YXIgZnJvbSAnLi4vcHJlZmFicy9zdGFyJztcclxuaW1wb3J0IERpYW1vbmQgZnJvbSAnLi4vcHJlZmFicy9kaWFtb25kJztcclxuaW1wb3J0IEhVRCBmcm9tICcuLi9wcmVmYWJzL2h1ZCc7XHJcbmltcG9ydCBGbG9vciBmcm9tICcuLi9wcmVmYWJzL2Zsb29yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXkgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmJnID0gdGhpcy5nYW1lLmFkZC5pbWFnZSgwLCAwLCAnc2t5Jyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICAvLyBIVURcclxuICAgIHRoaXMuaHVkID0gbmV3IEhVRCh7XHJcbiAgICAgIGdhbWU6IHRoaXMuZ2FtZVxyXG4gICAgfSk7XHJcbiAgICAvL3RoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHRoaXMucGxhdGZvcm1zID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgZmxvb3JcclxuICAgIHRoaXMuZmxvb3IgPSBuZXcgRmxvb3Ioe1xyXG4gICAgICBnYW1lOiB0aGlzLmdhbWUsXHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA0MyxcclxuICAgICAgd2lkdGg6IDgwMCxcclxuICAgICAgaGVpZ2h0OiAxMjQsXHJcbiAgICAgIGFzc2V0OiAnZ3JvdW5kX3NoZWV0J1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBsYXRmb3Jtcy5hZGQodGhpcy5mbG9vcik7XHJcblxyXG4gICAgLy8gQWRkIHBsYXllciB0byB3b3JsZFxyXG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKHtcclxuICAgICAgZ2FtZTogdGhpcy5nYW1lLFxyXG4gICAgICB4OiB0aGlzLmdhbWUud29ybGQud2lkdGgvMiAtIDMyLFxyXG4gICAgICB5OiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gOTAsXHJcbiAgICAgIGFzc2V0OiAnZHVkZScsXHJcbiAgICAgIGhlYWx0aDogMTBcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGxheWVyLmFkZChwbGF5ZXIpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBncm91cHMgdG8gaG9sZCBvdXIgc3Bhd25hYmxlIHVuaXRzXHJcbiAgICB0aGlzLnN0YXJzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICAgIHRoaXMuc3RhcnMuZW5hYmxlQm9keSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5kaWFtb25kcyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLmRpYW1vbmRzLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG5cclxuICAgIC8vIEdhbWUgU2V0dGluZ3NcclxuICAgIHRoaXMubWluWEdyYXZpdHkgPSA4MDA7XHJcbiAgICB0aGlzLm1heFhHcmF2aXR5ID0gNjAwO1xyXG5cclxuICAgIC8vIFN0YXJzIHNob3VsZCBiZWdpbiBieSBzcGF3bmluZyBldmVyeSA1MDBtcy4gT3VyIHRhcmdldCBmb3IgZGlmZmljdWx0eSBpcyBmb3IgdGhlIGdhbWUgdG8gc3RhcnQgb2ZmIGZhaXJseSBlYXN5LFxyXG4gICAgLy8gYnV0IHBsYXRlYXUgaW4gZGlmZmljdWx0eSBhZnRlciA0MCBzZWNvbmRzLiBXZSBhY2hpZXZlIHRoaXMgYnkgZGVjcmVhc2luZyB0aGUgc3RhciBzcGF3biB0aW1lciBieSAzbXMgZXZlcnkgdGltZVxyXG4gICAgLy8gd2Ugc3Bhd24gYSBzdGFyIGluIHVudGlsIHdlIGhpdCAxMDBtcy4gXHJcblxyXG4gICAgdGhpcy5zdGFyTGV2ZWwgPSAwOyAvLyBVc2VkIHRvIGRldGVybWluZSB0aW1lIGJldHdlZW4gc3RhciBzcGF3bnMuIEhpZ2hlciBsZXZlbCA9IGZhc3RlciBzcGF3biB0aW1lIG9uIG5ldyBnYW1lc1xyXG4gICAgdGhpcy5zdGFyU3Bhd25EZWxheSA9IDUwMDsgLy8gRGVsYXkgYmV0d2VlbiBzdGFyIHNwYXducyBhdCBiZWdpbm5pbmcgb2YgdGhlIGdhbWVcclxuICAgIHRoaXMubWluU3RhckRlbGF5ID0gMTAwOyAvLyBUaGUgbG93ZXN0IChpbiB0aW1lKSBkZWxheSBiZXR3ZWVuIHN0YXIgc3Bhd25zXHJcblxyXG4gICAgdGhpcy5zdGFyVGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUodHJ1ZSk7XHJcbiAgICB0aGlzLnN0YXJUaW1lci5hZGQoNTAwLCB0aGlzLnNwYXduU3RhciwgdGhpcyk7XHJcbiAgICB0aGlzLnN0YXJUaW1lci5zdGFydCgpO1xyXG4gICAgXHJcbiAgICAvLyBNYWtlIHN1cmUgaHVkIGlzIGFsd2F5cyBvbiB0b3BcclxuICAgIHRoaXMuZ2FtZS53b3JsZC5icmluZ1RvVG9wKHRoaXMuaHVkKTtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgLy8gQ29sbGlzaW9uc1xyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm1zKTtcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMuZGlhbW9uZHMsIHRoaXMucGxhdGZvcm1zLCB0aGlzLmNvbGxlY3RhYmxlRGVjYXksIG51bGwsIHRoaXMpXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5zdGFycywgdGhpcy5zdGFyQ29sbGlzaW9uLCBudWxsLCB0aGlzKTtcclxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuZGlhbW9uZHMsIHRoaXMucGxheWVyLCB0aGlzLmNvbGxlY3RJdGVtLCBudWxsLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHNwYXduU3RhcigpIHtcclxuXHJcbiAgICB0aGlzLnN0YXJMZXZlbCsrO1xyXG5cclxuICAgIC8vIEV2ZXJ5IHRpbWUgYSBzdGFyIHNwYXducywgdGhlcmUgaXMgYSBjaGFuY2UgZm9yIGEgZGlhbW9uZCB0byBzcGF3biBpbiBpdCdzIHBsYWNlXHJcbiAgICBsZXQgZGlhbW9uZENoYW5jZSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMSwgMTUpO1xyXG5cclxuICAgIGlmKCBkaWFtb25kQ2hhbmNlID09PSAxICkge1xyXG4gICAgICBsZXQgZGlhbW9uZCA9IHRoaXMuZGlhbW9uZHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG5cclxuICAgICAgaWYoICFkaWFtb25kICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IGRpYW1vbmRcIik7XHJcbiAgICAgICAgZGlhbW9uZCA9IG5ldyBEaWFtb25kKHtcclxuICAgICAgICAgIGdhbWU6IHRoaXMuZ2FtZSxcclxuICAgICAgICAgIHg6IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMTAsIHRoaXMuZ2FtZS53b3JsZC53aWR0aC0yMiksXHJcbiAgICAgICAgICB5OiAxLFxyXG4gICAgICAgICAgYXNzZXQ6ICdkaWFtb25kJyxcclxuICAgICAgICAgIGZyYW1lOiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlhbW9uZHMuYWRkKGRpYW1vbmQpO1xyXG4gICAgICAgIGRpYW1vbmQuYm9keS5ncmF2aXR5LnkgPSB0aGlzLm1heFhHcmF2aXR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgZXhpc3RpbmcgZGlhbW9uZFwiLCBkaWFtb25kKTtcclxuICAgICAgICBkaWFtb25kLnJlc2V0KHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMSwgdGhpcy5nYW1lLndvcmxkLndpZHRoLTIyKSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBTcGF3biBhIHN0YXIgaW5zdGVhZFxyXG4gICAgICBsZXQgc3RhciA9IHRoaXMuc3RhcnMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG5cclxuICAgICAgaWYoICFzdGFyICkge1xyXG4gICAgICAgIHN0YXIgPSBuZXcgU3Rhcih7XHJcbiAgICAgICAgICBnYW1lOiB0aGlzLmdhbWUsXHJcbiAgICAgICAgICB4OiB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDEwLCB0aGlzLmdhbWUud29ybGQud2lkdGgtMjIpLFxyXG4gICAgICAgICAgeTogMSxcclxuICAgICAgICAgIGFzc2V0OiAnc3RhcicsXHJcbiAgICAgICAgICBoZWFsdGg6IDFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFycy5hZGQoc3Rhcik7XHJcbiAgICAgICAgc3Rhci5ib2R5LmdyYXZpdHkueSA9IHRoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoNjAwLCA4MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXIucmVzZXQodGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgxLCB0aGlzLmdhbWUud29ybGQud2lkdGgtMjIpLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBvbGQgdGltZXIgc2hvdWxkIGFscmVhZHkgYmUgb3ZlciBhbmQgZGVzdHJveWVkLiBDcmVhdGUgYSBuZXcgb25lXHJcbiAgICAvLyBMaW1pdCB0aGUgbG93ZXN0IHRpbWUgdG8gdGhpcy5taW5TdGFyRGVsYXlcclxuICAgIHZhciBkZWxheSA9IHRoaXMuc3RhclNwYXduRGVsYXkgLSAoIHRoaXMuc3RhckxldmVsICogMyApO1xyXG4gICAgaWYoIGRlbGF5IDwgdGhpcy5taW5TdGFyRGVsYXkgKVxyXG4gICAgICAgIGRlbGF5ID0gdGhpcy5taW5TdGFyRGVsYXk7XHJcbiAgICB0aGlzLnN0YXJUaW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSh0cnVlKTtcclxuICAgIHRoaXMuc3RhclRpbWVyLmFkZChkZWxheSwgdGhpcy5zcGF3blN0YXIsIHRoaXMpO1xyXG4gICAgdGhpcy5zdGFyVGltZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8vIFBsYXllciBjb2xsaXNpb24gd2l0aCBhIHN0YXIgZG9lcyAxMCBkYW1hZ2VcclxuICBzdGFyQ29sbGlzaW9uKHBsYXllciwgc3Rhcikge1xyXG4gICAgcGxheWVyLmRhbWFnZSgxMCk7XHJcbiAgICBzdGFyLmRhbWFnZSgxMCk7XHJcblxyXG4gICAgLy8gV2hlbiB0aGUgcGxheWVyIFwiZGllc1wiLCBwYXVzZSBhbGwgcGh5c2ljcyBhbmQgc3dpdGNoIHRvIGdhbWVvdmVyIHN0YXRlXHJcbiAgICBpZihwbGF5ZXIuaGVhbHRoIDw9IDApIHtcclxuICAgICAgdGhpcy5nYW1lT3ZlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2FtZU92ZXIoKSB7XHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5odWQudGltZXJQYXVzZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZW92ZXInLCBmYWxzZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gaW5jcmVhc2VTY29yZShhbW91bnQpIHtcclxuICAvLyAgIHRoaXMuaHVkLmFkZFNjb3JlKGFtb3VudCk7XHJcbiAgLy8gICB0aGlzLnNjb3JlICs9IGFtb3VudDtcclxuICAvLyB9XHJcblxyXG4gIC8vIENvbGxlY3RhYmxlcyBkZWNheSBvdmVyIGEgcGVyaW9kIG9mIDMgc2Vjb25kcy4gVGhleSByZW1haW4gb24gdGhlIGdyb3VuZFxyXG4gIC8vIGZvciAyIHNlY29uZHMgYW5kIGJsaW5rIGZvciAxIGJlZm9yZSBiZWluZyByZW1vdmVkXHJcbiAgY29sbGVjdGFibGVEZWNheShjb2xsZWN0YWJsZSkge1xyXG4gICAgY29sbGVjdGFibGUuZGVjYXkoKTtcclxuICB9XHJcblxyXG4gIGNvbGxlY3RJdGVtKGNvbGxlY3RhYmxlKSB7XHJcbiAgICAvL3RoaXMuaHVkLmFkZFNjb3JlKDEwMCk7XHJcbiAgICB0aGlzLmh1ZC5hZGRDb2xsZWN0YWJsZSgxKTtcclxuICAgIC8vdGhpcy5zY29yZSArPSAxMDA7XHJcblxyXG4gICAgY29sbGVjdGFibGUuY29sbGVjdCgpO1xyXG5cclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuXHJcbiAgICBwcmVsb2FkKCkge1xyXG5cclxuICAgICAgICAvLyBFeHRlcm5hbCBTY3JpcHRzXHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuc2NyaXB0KCd3ZWJmb250JywgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvd2ViZm9udC8xLjQuNy93ZWJmb250LmpzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkZXJCZyA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdsb2FkZXJCZycpO1xyXG4gICAgICAgIHRoaXMubG9hZGVyQmFyID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ2xvYWRlckJhcicpO1xyXG4gICAgICAgIHRoaXMubG9hZGVyQmcuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICAgICAgdGhpcy5sb2FkZXJCYXIuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHRoaXMubG9hZGVyQmFyKTtcclxuXHJcbiAgICAgICAgLy8gU3RhdGljIEltYWdlc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdza3knLCAnaW1nL2RheS5wbmcnKTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnc3RhcicsICdpbWcvc3Rhci5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gU3ByaXRlc1xyXG4gICAgICAgIHRoaXMuZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdkaWFtb25kJywgJ2ltZy9kaWFtb25kLnBuZycsIDMyLCAyOCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2R1ZGUnLCAnaW1nL2R1ZGUucG5nJywgMzIsIDQ4KTtcclxuICAgICAgICB0aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnZ3JvdW5kX3NoZWV0JywgJ2ltZy9zcHJpdGVzaGVldC9ncm91bmRfc2hlZXQucG5nJywgMjYwLCAxMjQpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuYXRsYXNKU09OQXJyYXkoJ3VpJywgJ2ltZy9zcHJpdGVzaGVldC91aS5wbmcnLCAnZGF0YS9zcHJpdGVzaGVldC91aS5qc29uJyk7XHJcbiAgICAgICAgLy90aGlzLmxvYWQuYXRsYXNKU09OQXJyYXkoJ2dyb3VuZF9zaGVldCcsICdpbWcvc3ByaXRlc2hlZXQvZ3JvdW5kX3NoZWV0LnBuZycsICdkYXRhL3Nwcml0ZXNoZWV0L2dyb3VuZF9zaGVldC5qc29uJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnTWVudScpO1xyXG4gICAgfVxyXG59Il19
