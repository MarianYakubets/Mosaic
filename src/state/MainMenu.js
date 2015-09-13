Mosaic.MainMenu = function (game) {
    this.playButton = null;
};

Mosaic.MainMenu.prototype = {

    create: function () {
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
        //this.add.sprite(0, 0, 'green');
        //var pom = this.add.sprite(30,30,"square");
        this.startGame();
    },

    update: function () {
        //	Do some nice funky main menu effect here
    },

    startGame: function (pointer) {
        //	And start the actual game
        this.state.start('Game', true, false, new Mosaic.Level(1, 2, 3,
            [new Mosaic.Tile([new Mosaic.Triangle(Mosaic.TriangleTypes.TOP, Mosaic.Colors.BLUE), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, Mosaic.Colors.BLUE), new Mosaic.Triangle(Mosaic.TriangleTypes.RIGHT, Mosaic.Colors.BLUE)], 0, 0)], [new Mosaic.Tile([new Mosaic.Triangle(Mosaic.TriangleTypes.TOP, Mosaic.Colors.BLUE), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, Mosaic.Colors.BLUE)], 0, 0), new Mosaic.Tile([new Mosaic.Triangle(Mosaic.TriangleTypes.RIGHT, Mosaic.Colors.BLUE),new Mosaic.Triangle(Mosaic.TriangleTypes.TOP, Mosaic.Colors.BLUE)], 0, 0)]));
    }

};
