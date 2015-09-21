Mosaic.CellMap = function (width, heigth) {
    this.width = width;
    this.height = heigth;
    this.entries = new Array();
};

Mosaic.CellMap.prototype = {
    put: function (x, y, tile) {
        this.entries[x + this.width * y] = tile;
    },

    remove: function (x, y) {
        this.entries[x + this.width * y] = null;
    },

    get: function (x, y) {
        return this.entries[x + this.width * y];
    },

    each: function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.entries.length;
        for (var i = 0; i < len; i++) {
            var e = this.entries[i];
            fn(e);
        }
    },

    isEmpty: function () {
        return this.entries.length == 0;
    },

    size: function () {
        return this.entries.length;
    }
};
