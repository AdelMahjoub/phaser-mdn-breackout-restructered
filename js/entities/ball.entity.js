/**
 *
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Ball(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'entity:ball');
    this._init();
}

/** @type {Phaser.Sprite} */
Ball.prototype = Object.create(Phaser.Sprite.prototype);

/** @type {Ball} */
Ball.prototype.constructor = Ball;

/**
 *
 * @private
 */
Ball.prototype._init = function() {
    this.anchor.set(0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.velocity.set(150, -150);
    this.body.bounce.set(1);
    this.checkWorldBounds = true;

    this.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 30);
};