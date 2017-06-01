"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FBBlacklistEntry_1 = require("./FBBlacklistEntry");
const Blacklist_1 = require("./Blacklist");
/**
 * a implementation of the [[Blacklist]] that uses [[https://firebase.google.com Firebase]] as a data source for the
 * entries, the data is also directly updated if a new entry is added to it in the firebase realtime database.
 */
class FBBlacklist extends Blacklist_1.Blacklist {
    /**
     * creates a new firebase blacklist and registers the listener to add new entries
     * @param ref the reference with the data about the entries
     */
    constructor(ref) {
        super();
        this._ref = ref;
        // this loads the current children and is also called for each new entry
        this._ref.on("child_added", (snapshot) => {
            this._entries.push(new FBBlacklistEntry_1.FBBlacklistEntry(snapshot.ref));
        });
    }
}
exports.FBBlacklist = FBBlacklist;
//# sourceMappingURL=FBBlacklist.js.map