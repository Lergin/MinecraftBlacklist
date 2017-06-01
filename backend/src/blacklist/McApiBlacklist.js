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
/**
 * a implementation of the [[Blacklist]] that gets it data from the [[https://mcapi.ca MCAPI]] endpoint for the
 * blacklist entries that also contains identified domains of the hashes ([[https://mcapi.ca/blockedservers/]]).
 */
class McApiBlacklist extends Blacklist_1.Blacklist {
    constructor() {
        super();
        /**
         * the url of the api endpoint
         */
        this._apiEndpoint = 'https://mcapi.ca/blockedservers/';
        this._loadingPromise = this.update();
    }
    /**
     * Fetches the data from the [[_apiEndpoint api endpoint]] and then converts it's data into
     * [[BlacklistEntry BlacklistEntries]].
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this._apiEndpoint).then((res) => res.json());
            let entries = response.blocked.map((a) => new BlacklistEntry_1.BlacklistEntry(a));
            entries.forEach(McApiBlacklist.addIpFromHashList(response.found));
            this._entries = entries;
        });
    }
    /**
     * the promise that is resolved after the initial data is loaded
     * @return a promise that is resolved as soon as the initial dat is loaded
     */
    get loadingPromise() {
        return this._loadingPromise;
    }
    /**
     * adds all
     * @param hashList
     * @return {(entry:any)=>any}
     */
    static addIpFromHashList(hashList) {
        let map = McApiBlacklist.hashListToMap(Object.values(hashList));
        return function (entry) {
            if (map.has(entry.hash)) {
                entry.domain = map.get(entry.hash);
            }
            return entry;
        };
    }
    /**
     * converts a list of hashes that have the form `{"sha1": "???", "ip": "???"}` into a map that uses the `sha1`
     * property as key and the `ip` as value
     * @return the converted data as a Map
     */
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