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
const fetch = require("node-fetch");
const BlacklistEntry_1 = require("./BlacklistEntry");
const Blacklist_1 = require("./Blacklist");
class McApiBlacklist extends Blacklist_1.Blacklist {
    constructor() {
        super();
        this._apiEndpoint = 'https://mcapi.ca/blockedservers/';
        this._loadingPromise = this.update();
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this._apiEndpoint).then((res) => res.json());
            let entries = response.blocked.map((a) => new BlacklistEntry_1.BlacklistEntry(a));
            entries.forEach(McApiBlacklist.addIpFromHashList(response.found));
            this._entries = entries;
        });
    }
    get loadingPromise() {
        return this._loadingPromise;
    }
    static addIpFromHashList(hashList) {
        let map = McApiBlacklist.hashListToMap(Object.values(hashList));
        return function (entry) {
            if (map.has(entry.hash)) {
                entry.domain = map.get(entry.hash);
            }
            return entry;
        };
    }
    static hashListToMap(hashList) {
        let map = new Map();
        hashList.forEach((e) => {
            map.set(e.sha1, e.ip);
        });
        return map;
    }
}
exports.McApiBlacklist = McApiBlacklist;
//# sourceMappingURL=McApiBlacklist.js.map