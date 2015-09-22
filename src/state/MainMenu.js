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
        this.state.start('Game', true, false, new Mosaic.Level(1, this.createSketchStub()));
    },

    createSketchStub:function(){
        var cells = new Mosaic.CellMap(2,2);
        var cell = new Mosaic.Cell(0, 0, [new Mosaic.Triangle(Mosaic.TriangleTypes.BOTTOM, 'red'), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, 'blue')]);
        cells.put(0, 0, cell);
        cells.put(1, 0, new Mosaic.Cell(0, 0, [new Mosaic.Triangle(Mosaic.TriangleTypes.BOTTOM, 'red'), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, 'blue')]));
        cells.put(1, 1, new Mosaic.Cell(0, 0, [new Mosaic.Triangle(Mosaic.TriangleTypes.BOTTOM, 'red'), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, 'blue')]));
        cells.put(0, 1, new Mosaic.Cell(0, 0, [new Mosaic.Triangle(Mosaic.TriangleTypes.BOTTOM, 'red'), new Mosaic.Triangle(Mosaic.TriangleTypes.LEFT, 'blue')]));
        return cells;
    }

};
