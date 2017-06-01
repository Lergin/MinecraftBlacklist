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
/**
 * an entry of a [[Blacklist]] that has all the data about a specific hash, like the domain and the server of it (if
 * known)
 */
class BlacklistEntry {
    constructor(hash) {
        /**
         * the domain of the entry (aka. the stuff that hashes to the hash)
         */
        this._domain = "";
        /**
         * the [[Server]] the entry is assigned to
         */
        this._server = "";
        /**
         * an array with all the changes to this entry, all changes can happen multiple times as a hash can be deleted from
         * the list and later added again
         */
        this._changes = [];
        this._hash = hash;
    }
    get hash() {
        return this._hash;
    }
    set hash(value) {
        this._hash = value;
    }
    /**
     * returns true if the hash of the domain is equal to the hash
     * @return is the entry identified?
     */
    get identified() {
        return BlacklistEntry.isHash(this.hash, this.domain);
    }
    get domain() {
        return this._domain;
    }
    set domain(value) {
        this._domain = value;
    }
    /**
     * tests if the domain is a throwaway domain with the existing [[ThrowawayMatcher]] instance
     * if no domain is set the return value is false
     *
     * @return a Promise that evaluates to true if the domain is a throwaway domain
     */
    throwaway() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domain && (yield ThrowawayMatcher_1.ThrowawayMatcher.instance.doesMatch(this.domain));
        });
    }
    get changes() {
        return this._changes;
    }
    /**
     * adds a new change of the entry
     */
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
    /**
     * tests if the hash is the hash of the value
     * @return true if they match, false otherwise
     */
    static isHash(hash, value) {
        return sha1(value) === hash;
    }
}
exports.BlacklistEntry = BlacklistEntry;
//# sourceMappingURL=BlacklistEntry.js.map