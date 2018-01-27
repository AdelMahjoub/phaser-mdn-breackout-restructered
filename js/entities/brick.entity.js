/**
 *
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Brick(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'entity:brick');
    this._init();
}

/** @type {Phaser.Sprite} */
Brick.prototype = Object.create(Phaser.Sprite.prototype);

/** @type {Brick} */
Brick.prototype.constructor = Brick;

/**
 *
 * @private
 */
Brick.prototype._init = function() {
    this.anchor.set(0.5, 1);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
};