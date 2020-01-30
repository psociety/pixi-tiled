"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TiledMultiSheet_1 = require("./TiledMultiSheet");
var Utils_1 = require("./Utils");
var pixi_js_1 = require("pixi.js");
var TilesetManager = (function () {
    function TilesetManager(_tileSets, sheet) {
        this._tileSets = _tileSets;
        this._sheet = new TiledMultiSheet_1.MultiSpritesheet();
        this.baseUrl = '';
        this.loadUnknowImages = true;
        if (sheet) {
            this.register(sheet);
        }
    }
    TilesetManager.prototype.register = function (spritesheet) {
        this._sheet.add(spritesheet);
    };
    Object.defineProperty(TilesetManager.prototype, "spritesheet", {
        get: function () {
            return this._sheet;
        },
        enumerable: true,
        configurable: true
    });
    TilesetManager.prototype.getTextureByGid = function (gid, tryLoad) {
        if (tryLoad === void 0) { tryLoad = this.loadUnknowImages; }
        var tile = Utils_1.resolveImageUrl(this._tileSets, this.baseUrl, gid);
        return this.getTextureByTile(tile, tryLoad);
    };
    TilesetManager.prototype.getTextureByTile = function (tile, tryLoad) {
        if (tryLoad === void 0) { tryLoad = this.loadUnknowImages; }
        if (!tile || !tile.image) {
            return undefined;
        }
        var absUrl = this.baseUrl + tile.image;
        var texture = this.spritesheet.textures[tile.image];
        if (!texture && tryLoad) {
            texture = pixi_js_1.Texture.from(absUrl, {}, false);
            this._sheet.addTexture(texture, tile.image);
        }
        tile.texture = texture;
        return tile;
    };
    return TilesetManager;
}());
exports.TilesetManager = TilesetManager;
//# sourceMappingURL=TilesetManagers.js.map