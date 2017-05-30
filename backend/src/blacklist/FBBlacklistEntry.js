"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlacklistEntry_1 = require("./BlacklistEntry");
class FBBlacklistEntry extends BlacklistEntry_1.BlacklistEntry {
    constructor(ref) {
        ref.child("hash").on("value", (hashSnapshot) => {
            this.hash = hashSnapshot.val();
        });
        ref.child("domain").on("value", (domainSnapshot) => {
            this.domain = domainSnapshot.val();
        });
        ref.child("server").on("value", (serverSnapshot) => {
            this.server = serverSnapshot.val();
        });
        ref.child("changes").on("child_added", (changeSnapshot) => {
            this.addChange(changeSnapshot.val().type, changeSnapshot.val().date);
        });
        super("");
    }
    set hash(value) {
        this._ref.child("hash").set(value);
    }
    set domain(value) {
        this._ref.child("domain").set(value);
    }
    addChange(type, date) {
        this._ref.child("changes").push({
            type: type,
            date: date
        });
    }
    set server(value) {
        this._ref.child("server").set(value);
    }
}
exports.FBBlacklistEntry = FBBlacklistEntry;
//# sourceMappingURL=FBBlacklistEntry.js.map