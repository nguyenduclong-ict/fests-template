"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(schema) {
    schema.pre("save", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            let slug = this.get("slug");
            // find slug in database
            const sample = yield this.model("Shop").find({
                userId: this.get("userId"),
                slug: this.get("slug"),
            });
            if (sample.length > 0) {
                slug += "-" + sample.length;
            }
            this.set("slug", slug);
            next();
        });
    });
}
exports.default = default_1;