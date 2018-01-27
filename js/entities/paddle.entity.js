/**
 *
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Paddle(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'entity:paddle');
    this._init();
    this.minX = this.width / 2;
    this.maxX = this.game.world.width - this.width / 2;
}

/** @type {Phaser.Sprite} */
Paddle.prototype = Object.create(Phaser.Sprite.prototype);

/** @type {Paddle} */
Paddle.prototype.constructor = Paddle;

Paddle.prototype.update = function() {
    this.x = Math.max(this.minX, Math.min(this.game.input.x, this.maxX));
};

/**
 *
 * @private
 */
Paddle.prototype._init = function() {
    this.anchor.set(0.5, 1);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
};