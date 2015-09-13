function Utils() {
}
Utils.polyForTriangle = function (tile, type, size, moveX, moveY) {
    var x = tile.x * size + moveX;
    var y = tile.y * size + moveY;
    var halfSize = size / 2;

    if (type == Mosaic.TriangleTypes.LEFT)
        return new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Mosaic.TriangleTypes.TOP)
        return new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x + size, y), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Mosaic.TriangleTypes.RIGHT)
        return new Phaser.Polygon([new Phaser.Point(x + size, y), new Phaser.Point(x + size, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Mosaic.TriangleTypes.BOTTOM)
        return new Phaser.Polygon([new Phaser.Point(x, y + size), new Phaser.Point(x + size, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

};

Utils.coordinateToKey = function (x, y, type) {
    return type + x + y;
};
