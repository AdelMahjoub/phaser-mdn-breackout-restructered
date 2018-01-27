const Breakout = {};

Breakout.Start = function() {

    /** @type {Phaser.Sprite} */
    this.startButton = null;
};

Breakout.Start.prototype = {
    init: function() {
        console.log('state:start -> init');
    },

    preload: function() {
        Breakout.scale(this.game);
        this.load.path = 'images/';
        this.load.spritesheet('button:start', 'button.png', 120, 40);
    },

    create: function() {
        this.stage.backgroundColor = '#eee';
        this.startButton = this.add.button(this.world.centerX, this.world.centerY, 'button:start', this._start, this, 1, 0, 2);
        this.startButton.anchor.set(0.5, 0.5);
    },

    _start: function() {
        this.state.start('state:play');
    }
};


/**
 * @param {Phaser.Game} game
 */
Breakout.scale = function(game) {
    game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
};