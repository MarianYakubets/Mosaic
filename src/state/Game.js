Mosaic.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game = game; //  a reference to the currently running game (Phaser.Game)
    this.add; //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera; //  a reference to the game camera (Phaser.Camera)
    this.cache; //  the game cache (Phaser.Cache)
    this.input; //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load; //  for preloading assets (Phaser.Loader)
    this.math; //  lots of useful common math operations (Phaser.Math)
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage; //  the game stage (Phaser.Stage)
    this.time; //  the clock (Phaser.Time)
    this.tweens; //  the tween manager (Phaser.TweenManager)
    this.state; //  the state manager (Phaser.StateManager)
    this.world; //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics; //  the physics manager (Phaser.Physics)
    this.rnd; //  the repeatable random number generator (Phaser.RandomDataGenerator)
    //Own
    this.map;
    this.level;
    this.tileSize = 128;
    this.halfTileSize = this.tileSize / 2;

    this.hexagonWidth = 80;
    this.hexagonHeight = 70;
    this.gridSizeX = 10;
    this.gridSizeY = 12;
    this.columns = [Math.ceil(this.gridSizeY / 2), Math.floor(this.gridSizeY / 2)];
    this.moveIndex;
    this.sectorWidth = this.hexagonWidth / 4 * 3;
    this.sectorHeight = this.hexagonHeight;
    this.gradient = (this.hexagonWidth / 4) / (this.hexagonHeight / 2);
    this.marker;
    this.hexagonGroup;
    this.hexagonArray = [];

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Mosaic.Game.prototype = {
    init: function (level) {
        this.level = level;
    },

    create: function () {
        this.game.add.sprite(0, 0, 'alizarin');
        this.hexagonGroup = this.game.add.group();
        for (var i = 0; i < this.gridSizeX / 2; i++) {
            this.hexagonArray[i] = [];
            for (var j = 0; j < this.gridSizeY; j++) {
                if (this.gridSizeX % 2 == 0 || i + 1 < this.gridSizeX / 2 || j % 2 == 0) {
                    var hexagonX = this.hexagonWidth * i * 1.5 + (this.hexagonWidth / 4 * 3) * (j % 2);
                    var hexagonY = this.hexagonHeight * j / 2;
                    var hexagon = this.game.add.sprite(hexagonX, hexagonY, "hex");
                    hexagon.scale.setTo(this.hexagonWidth / hexagon.width, this.hexagonHeight / hexagon.height);
                    this.hexagonGroup.add(hexagon);
                    this.hexagonArray[i][j] = hexagon;

                    var hexagonText = this.game.add.text(hexagonX + this.hexagonWidth / 4 + 5, hexagonY + 5, i + "," + j);
                    hexagonText.font = "arial";
                    hexagonText.fontSize = 12;
                    this.hexagonGroup.add(hexagonText);
                }
            }
        }
        this.hexagonGroup.y = (this.game.height - this.hexagonHeight * Math.ceil(this.gridSizeY / 2)) / 2;
        if (this.gridSizeY % 2 == 0) {
            this.hexagonGroup.y -= this.hexagonHeight / 4;
        }
        this.hexagonGroup.x = (this.game.width - Math.ceil(this.gridSizeX / 2) * this.hexagonWidth - Math.floor(this.gridSizeX / 2) * this.hexagonWidth / 2) / 2;
        if (this.gridSizeX % 2 == 0) {
            this.hexagonGroup.x -= this.hexagonWidth / 8;
        }
        this.marker = this.game.add.sprite(0, 0, "hex");
        this.marker.scale.setTo(this.hexagonWidth / this.marker.width, this.hexagonHeight / this.marker.height);
        this.marker.tint = 0x234155;
        this.marker.anchor.setTo(0.5);
        this.marker.visible = false;
        this.hexagonGroup.add(this.marker);
        this.moveIndex = this.game.input.addMoveCallback(this.checkHex, this);
    },

    update: function () {

    },

    checkHex: function () {
        var candidateX = Math.floor((this.game.input.worldX - this.hexagonGroup.x) / this.sectorWidth);
        var candidateY = Math.floor((this.game.input.worldY - this.hexagonGroup.y) / this.sectorHeight);
        var deltaX = (this.game.input.worldX - this.hexagonGroup.x) % this.sectorWidth;
        var deltaY = (this.game.input.worldY - this.hexagonGroup.y) % this.sectorHeight;
        if (candidateX % 2 == 0) {
            if (deltaX < ((this.hexagonWidth / 4) - deltaY * this.gradient)) {
                candidateX--;
                candidateY--;
            }
            if (deltaX < ((-this.hexagonWidth / 4) + deltaY * this.gradient)) {
                candidateX--;
            }
        } else {
            if (deltaY >= this.hexagonHeight / 2) {
                if (deltaX < (this.hexagonWidth / 2 - deltaY * this.gradient)) {
                    candidateX--;
                }
            } else {
                if (deltaX < deltaY * this.gradient) {
                    candidateX--;
                } else {
                    candidateY--;
                }
            }
        }
        this.placeMarker(candidateX, candidateY);
    },

    placeMarker: function (posX, posY) {
        for (var i = 0; i < this.gridSizeX / 2; i++) {
            for (var j = 0; j < this.gridSizeY; j++) {
                if (this.gridSizeX % 2 == 0 || i + 1 < this.gridSizeX / 2 || j % 2 == 0) {
                    this.hexagonArray[i][j].tint = 0xffffff;
                }
            }
        }
        if (posX < 0 || posY < 0 || posX >= this.gridSizeX || posY > this.columns[posX % 2] - 1) {
            this.marker.visible = false;
        } else {
            this.marker.visible = true;
            this.marker.x = this.hexagonWidth / 4 * 3 * posX + this.hexagonWidth / 2;
            this.marker.y = this.hexagonHeight * posY;
            if (posX % 2 == 0) {
                this.marker.y += this.hexagonHeight / 2;
            } else {
                this.marker.y += this.hexagonHeight;
            }
            var markerX = Math.floor(posX / 2);
            var markerY = posY * 2 + posX % 2;
            this.hexagonArray[markerX][markerY].tint = 0x244166;
            // up
            if (markerY - 2 >= 0) {
                this.hexagonArray[markerX][markerY - 2].tint = 0x244166;
            }
            // down
            if (markerY + 2 < this.gridSizeY) {
                this.hexagonArray[markerX][markerY + 2].tint = 0x244166;
            }
            // right
            if (markerX + markerY % 2 < this.gridSizeX / 2 && (this.gridSizeX % 2 == 0 || markerX < Math.floor(this.gridSizeX / 2))) {
                //up
                if (markerY - 1 >= 0) {
                    this.hexagonArray[markerX + markerY % 2][markerY - 1].tint = 0x244166;
                }
                // down
                if (markerY + 1 < this.gridSizeY) {
                    this.hexagonArray[markerX + markerY % 2][markerY + 1].tint = 0x244166;
                }
            }
            // left
            if (markerX - 1 + markerY % 2 >= 0) {
                // up
                if (markerY - 1 >= 0) {
                    this.hexagonArray[markerX - 1 + markerY % 2][markerY - 1].tint = 0x244166;
                }
                // down
                if (markerY + 1 < this.gridSizeY) {
                    this.hexagonArray[markerX - 1 + markerY % 2][markerY + 1].tint = 0x244166;
                }
            }
        }
    }
}
