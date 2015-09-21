Mosaic.Cell = function (x, y, triangles) {
    this.x = x;
    this.y = y;
    this.map = new Mosaic.Map();
    triangles.forEach(function (entry) {
        this.map.put(entry.type, entry);
    }, this);
};

Mosaic.Cell.prototype = {
    getTriangle: function (type) {
        return this.map.get(type);
    }
};
