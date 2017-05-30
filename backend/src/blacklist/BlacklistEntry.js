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
const sha1 = require("sha1");
const ThrowawayMatcher_1 = require("../throwawayMatcher/ThrowawayMatcher");
class BlacklistEntry {
    constructor(hash) {
        this._domain = "";
        this._server = "";
        this._changes = [];
        this._hash = hash;
    }
    get hash() {
        return this._hash;
    }
    get identified() {
        return this.domain !== undefined;
    }
    get domain() {
        return this._domain;
    }
    set domain(domain) {
        if (isHash(this.hash, domain)) {
            this._domain = domain;
        }
    }
    throwaway() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domain && (yield ThrowawayMatcher_1.ThrowawayMatcher.instance.doesMatch(this.domain));
        });
    }
    get changes() {
        return this._changes;
    }
    addChange(type, date) {
        this._changes.push({
            type: type,
            date: date
        });
    }
    get server() {
        return this._server;
    }
    set server(value) {
        this._server = value;
    }
}
exports.BlacklistEntry = BlacklistEntry;
function isHash(hash, value) {
    return sha1(value) === hash;
}
//# sourceMappingURL=BlacklistEntry.js.map