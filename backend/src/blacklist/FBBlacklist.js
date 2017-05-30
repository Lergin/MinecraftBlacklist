"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FBBlacklistEntry_1 = require("./FBBlacklistEntry");
const Blacklist_1 = require("./Blacklist");
class FBBlacklist extends Blacklist_1.Blacklist {
    constructor(ref) {
        super();
        this._ref = ref;
        this._ref.on("child_added", (snapshot) => {
            this._entries.push(new FBBlacklistEntry_1.FBBlacklistEntry(snapshot.ref));
        });
    }
}
exports.FBBlacklist = FBBlacklist;
//# sourceMappingURL=FBBlacklist.js.map