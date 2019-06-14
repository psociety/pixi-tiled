"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ContainerExt_1 = __importDefault(require("./ContainerExt"));
var DisplayExt_1 = __importDefault(require("./DisplayExt"));
var EventEmitterExt_1 = __importDefault(require("./EventEmitterExt"));
var path = function () {
    ContainerExt_1.default();
    DisplayExt_1.default();
    EventEmitterExt_1.default();
};
exports.default = path;
//# sourceMappingURL=index.js.map