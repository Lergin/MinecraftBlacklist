"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlacklistEntry_1 = require("./BlacklistEntry");
/**
 * A [[BlacklistEntry]] that keeps it data synchronised with a [[https://firebase.google.com Firebase]] realtime
 * database.
 */
class FBBlacklistEntry extends BlacklistEntry_1.BlacklistEntry {
    /**
     * creates a new firebase blacklist entry and registers the listener for updates of the data in the firebase
     * @param ref the reference to the data in the firebase realtime database
     */
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
    /**
     * sets the hash in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set hash(value) {
        this._ref.child("hash").set(value);
    }
    /**
     * sets the domain in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set domain(value) {
        this._ref.child("domain").set(value);
    }
    /**
     * adds a change of the entry to the firebase, this calls the registered listener and updates the array saved in the
     * instance through it
     */
    addChange(type, date) {
        this._ref.child("changes").push({
            type: type,
            date: date
        });
    }
    /**
     * sets the server in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set server(value) {
        this._ref.child("server").set(value);
    }
}
exports.FBBlacklistEntry = FBBlacklistEntry;
//# sourceMappingURL=FBBlacklistEntry.js.map