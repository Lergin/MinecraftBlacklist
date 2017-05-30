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
const Utils_1 = require("../Utils");
class Blacklist {
    constructor() {
        this._entries = [];
    }
    get entries() {
        return this._entries;
    }
    get known() {
        return this.entries.filter((e) => e.identified);
    }
    get unknown() {
        return this.entries.filter((e) => !e.identified);
    }
    get throwaway() {
        return Utils_1.asyncFilter(this.entries, (e) => __awaiter(this, void 0, void 0, function* () { return !(yield e.throwaway()); }));
    }
    get(hash) {
        return this.entries.find((entry) => entry.hash === hash);
    }
}
exports.Blacklist = Blacklist;
//# sourceMappingURL=Blacklist.js.map