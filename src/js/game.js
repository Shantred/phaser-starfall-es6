import * as states from './states';
const GAME = new Phaser.Game(400, 480, Phaser.AUTO);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');