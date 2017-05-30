"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ThrowawayMatcher {
    constructor(strings) {
        this._strings = [];
        if (ThrowawayMatcher.instance !== null) {
            return ThrowawayMatcher.instance;
        }
        this._strings = strings;
        ThrowawayMatcher._instance = this;
    }
    static get instance() {
        return ThrowawayMatcher._instance;
    }
    ;
    get strings() {
        return this._strings;
    }
    set strings(value) {
        this._strings = value;
    }
    add(string) {
        this._strings.push(string);
    }
    remove(string) {
        let index = this._strings.indexOf(string);
        this._strings.splice(index, 1);
    }
    doesMatch(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.strings.some((a) => domain.match(a));
        });
    }
}
ThrowawayMatcher._instance = null;
exports.ThrowawayMatcher = ThrowawayMatcher;
//# sourceMappingURL=ThrowawayMatcher.js.map