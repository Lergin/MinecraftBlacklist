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
class Blacklist {
    constructor() {
        this._apiEndpoint = 'https://mcapi.ca/blockedservers/';
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this._apiEndpoint).then((res) => res.json());
            let entries = response.blocked.map((a) => new BlacklistEntry_1.BlacklistEntry(a));
            entries.forEach(addIpFromHashList(response.found));
            this._entries = entries;
        });
    }
    get all() {
        return this._entries;
    }
    get known() {
        return this.all.filter(isKnown);
    }
    get unknown() {
        return this.all.filter(isUnknown);
    }
    get throwaway() {
        return asyncFilter(this.all, isThrowaway);
    }
}
exports.Blacklist = Blacklist;
function asyncFilter(data, filter) {
    return Promise.all(data.map((element, index) => filter(element, index, data)))
        .then(result => {
        return data.filter((element, index) => {
            return result[index];
        });
    });
}
function isKnown(entry) {
    return entry.identified;
}
function isUnknown(entry) {
    return !entry.identified;
}
function isThrowaway(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        return !(yield entry.throwaway());
    });
}
function hashListToMap(hashlist) {
    let map = new Map();
    hashlist.forEach((e) => {
        map.set(e.sha1, e.ip);
    });
    return map;
}
function addIpFromHashList(hashlist) {
    let map = hashListToMap(Object.values(hashlist));
    return function (entry) {
        if (map.has(entry.hash)) {
            entry.domain = map.get(entry.hash);
        }
        return entry;
    };
}
//# sourceMappingURL=Blacklist.js.map