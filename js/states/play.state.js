Breakout.Play = function() {

    /** @type {Ball} */
    this.ball = null;

    /** @type {Paddle} */
    this.paddle = null;

    /** @type {Phaser.Group} */
    this.bricks = null;

    this.brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 3,
            col: 7
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };

    /** @type {number} */
    this.scoreCount = 0;

    /** @type {Phaser.Text} */
    this.scoreText = null;

    /** @type {number} */
    this.livesCount = 3;

    /** @type {Phaser.Text} */
    this.livesText = null;

    /** @type {Phaser.Text} */
    this.lifeLostText = null;

    this.textStyle = { font: '18px Arial', fill: '#0095DD' };
};

Breakout.Play.prototype = {

    init: function() {
        console.log('state:play -> init');
    },

    preload: function() {
        Breakout.scale(this.game);
        this._preloadAssets();
    },

    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.checkCollision.down = false;
        this._loadLevel();
        this.ball.events.onOutOfBounds.add(this._onBallLeaveScreen, this);
    },

    update: function() {
        this.physics.arcade.collide(this.paddle, this.ball, this._onBallVsPaddle, null, this);
        this.physics.arcade.collide(this.ball, this.bricks, this._onBallVsBrick, null, this);
    },

    /**
     *
     * @param {Paddle} paddle
     * @param {Ball} ball
     * @private
     */
    _onBallVsPaddle: function(paddle, ball) {
        this.ball.animations.play('wobble');
        this.ball.body.velocity.x = -1 * 5 * (this.paddle.x - this.ball.x);
    },

    /**
     *
     * @param {Ball} ball
     * @param {Brick} brick
     * @private
     */
    _onBallVsBrick: function(ball, brick) {
        this.ball.animations.play('wobble');
        this.scoreCount += 10;
        this.scoreText.text = this.scoreCount;

        let killTween = this.game.add.tween(brick.scale);
        killTween.to({x: 0, y: 0}, 100, Phaser.Easing.Linear.None);
        killTween.onComplete.addOnce(function() {
            brick.kill();
            if(!this.bricks.total)  {
                alert('Congratulations ! you won !');
                window.location.reload();
            }
        }, this);
        killTween.start();
    },

    /**
     *
     * @private
     */
    _onBallLeaveScreen : function() {
        this.livesCount--;
        if(this.livesCount) {
            this.livesText.text = 'Lives: ' + this.livesCount;
            this.lifeLostText.visible = true;
            this.paddle.reset(this.world.centerX, this.world.height - 5);
            this.ball.reset(this.world.centerX, this.world.height - 25);

            this.input.onDown.addOnce(function() {
                this.lifeLostText.visible = false;
                this.ball.body.velocity.set(150, -150);
            }, this);
        } else {

            alert('Game over');
            window.location.reload();
        }
    },

    /**
     *
     * @private
     */
    _loadLevel: function() {
        this._spawnPaddle();
        this._spawnBall();
        this._spawnBricks();
        this._spawnHud();
    },

    /**
     *
     * @private
     */
    _spawnPaddle: function() {
        this.paddle = new Paddle(this.game, this.world.centerX, this.world.height - 5);
        this.game.add.existing(this.paddle);
    },

    /**
     *
     * @private
     */
    _spawnBall: function() {
        this.ball = new Ball(this.game, this.world.centerX, this.world.height - 25);
        this.game.add.existing(this.ball);
    },

    /**
     *
     * @private
     */
    _spawnBricks: function() {
        this.bricks = this.add.group();
        for(let c = 0; c < this.brickInfo.count.col; c++) {
            for(let r = 0; r < this.brickInfo.count.row; r++) {
                let x = c * (this.brickInfo.padding + this.brickInfo.width) + this.brickInfo.offset.left;
                let y = r * (this.brickInfo.padding + this.brickInfo.height) + this.brickInfo.offset.top;
                let brick = new Brick(this.game, x, y);
                this.bricks.add(brick);
            }
        }
    },

    /**
     *
     * @private
     */
    _spawnHud: function() {
        this.scoreText = this.add.text(this.world.centerX, 5, '0', this.textStyle);
        this.scoreText.anchor.set(0.5, 0);

        this.livesText = this.add.text(this.world.width -5, 5, 'Lives: ' + this.livesCount, this.textStyle);
        this.livesText.anchor.set(1,0);

        this.lifeLostText = this.add.text(this.world.centerX, this.world.centerY, 'Life lost, click to continue', this.textStyle);
        this.lifeLostText.anchor.set(0.5);
        this.lifeLostText.visible = false;

    },

    /**
     * Preload the game assets
     * @private
     */
    _preloadAssets: function() {
        this.load.path = 'images/';
        this.load.spritesheet('entity:ball', 'wobble.png', 20, 20);
        this.load.image('entity:paddle', 'paddle.png');
        this.load.image('entity:brick', 'brick.png');
    }
};