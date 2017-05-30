"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThrowawayMatcher {
    constructor(strings) {
        this._strings = new Set();
        if (ThrowawayMatcher.instance !== null) {
            return ThrowawayMatcher.instance;
        }
        this._strings = new Set(strings);
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
        this._strings.add(string);
    }
    remove(string) {
        this._strings.delete(string);
    }
    doesMatch(domain) {
        return [...this.strings].some((a) => domain.match(a));
    }
}
ThrowawayMatcher._instance = null;
exports.ThrowawayMatcher = ThrowawayMatcher;
//# sourceMappingURL=ThrowawayMatcher.js.map