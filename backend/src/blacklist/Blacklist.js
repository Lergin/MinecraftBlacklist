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
/**
 * this class represents a list of [[BlacklistEntry BlacklistEntries]] and provides some methods to filter these
 */
class Blacklist {
    constructor() {
        /**
         * the list of the blacklist entries of this blacklist
         */
        this._entries = [];
    }
    /**
     * gets all entries of the blacklist
     * @return all entries
     */
    get entries() {
        return this._entries;
    }
    /**
     * gets the entries that are identified (the string that hashes to the hash is known)
     * @return the identified entries
     */
    get known() {
        return this.entries.filter((e) => e.identified);
    }
    /**
     * gets the unidentified entries (it's unknown what creates the hash)
     * @return the unidentified entries
     */
    get unknown() {
        return this.entries.filter((e) => !e.identified);
    }
    /**
     * gets the known entries whose domain is a typical throwaway domain, identified by a [[ThrowawayMatcher]]
     * @return a Promise with the throwaway entries
     */
    get throwaway() {
        return Utils_1.asyncFilter(this.entries, (e) => __awaiter(this, void 0, void 0, function* () { return !(yield e.throwaway()); }));
    }
    /**
     * gets the [[BlacklistEntry]] of the hash if one is existing
     * @param hash the hash whose entry should be returned
     * @return the assigned entry or nothing
     */
    get(hash) {
        return this.entries.find((entry) => entry.hash === hash);
    }
}
exports.Blacklist = Blacklist;
//# sourceMappingURL=Blacklist.js.map