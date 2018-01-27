window.onload = function() {

    const game = new Phaser.Game(480, 320, Phaser.CANVAS);
    game.state.add('state:start', Breakout.Start);
    game.state.add('state:play', Breakout.Play);
    game.state.start('state:start');
};