"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@/lib/fesjs/mongo");
const model_1 = __importDefault(require("./model"));
class FileProvider extends mongo_1.Provider {
}
exports.default = new FileProvider(model_1.default);