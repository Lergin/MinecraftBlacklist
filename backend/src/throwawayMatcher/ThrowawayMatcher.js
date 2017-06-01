"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * its a singleton that matches strings against a list of strings that identify throwaway domains
 */
class ThrowawayMatcher {
    /**
     * creates a new ThrowawayMatcher if no exists and returns the current one if one is there
     * @param strings an array of strings that throwaway domains may match
     * @return {ThrowawayMatcher}
     */
    constructor(strings) {
        this._strings = new Set();
        if (ThrowawayMatcher.instance !== null) {
            return ThrowawayMatcher.instance;
        }
        this._strings = new Set(strings);
        ThrowawayMatcher._instance = this;
    }
    /**
     * gets the instance if one was created
     * @return {ThrowawayMatcher} the current ThrowawayMatcher instance
     */
    static get instance() {
        return ThrowawayMatcher._instance;
    }
    ;
    /**
     * the strings that a throwaway domain may match against
     * @return {Set<string>}
     */
    get strings() {
        return this._strings;
    }
    set strings(value) {
        this._strings = value;
    }
    /**
     * add a new string to the set of the strings a throwaway domain may match against
     * @param string
     */
    add(string) {
        this._strings.add(string);
    }
    /**
     * remove a string from the set of strings a throwaway domain may match against
     * @param string
     */
    remove(string) {
        this._strings.delete(string);
    }
    /**
     * test if the domain is a throwaway domain
     * @param domain the domain to test
     * @return {boolean} true if it is a throwaway domain
     */
    doesMatch(domain) {
        return [...this.strings].some((a) => domain.match(a));
    }
}
ThrowawayMatcher._instance = null;
exports.ThrowawayMatcher = ThrowawayMatcher;
//# sourceMappingURL=ThrowawayMatcher.js.map