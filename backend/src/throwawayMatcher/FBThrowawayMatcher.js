"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThrowawayMatcher_1 = require("./ThrowawayMatcher");
/**
 * a [[ThrowawayMatcher]] that uses [[https://firebase.google.com Firebase]] as a data source for the strings
 *
 * the method [[doesMatch]] shouldn't be used before [[loadingPromise]] was resolved
 */
class FBThrowawayMatcher extends ThrowawayMatcher_1.ThrowawayMatcher {
    /**
     * creates a new [[ThrowawayMatcher]] using a [[admin.database.Reference firebase database reference]] that contains
     * a list of strings that should be used for the matching.
     *
     * If the data in the firebase changes these changes automatically get reflected to the instance.
     *
     * @param ref the firebase database reference with the data
     */
    constructor(ref) {
        super([]);
        this._loadingPromise = null;
        ref.on('child_added', (data) => {
            this.add(data.val());
        });
        // workaround as we only get the new data and aren't saving the keys
        ref.on('child_changed', () => {
            this.strings = new Set();
            this._loadingPromise = ref.once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    this.add(childSnapshot.val());
                    return true;
                });
            });
        });
        ref.on('child_removed', (data) => {
            this.remove(data.val());
        });
        // wait for the data to load
        this._loadingPromise = ref.once('value', () => { });
    }
    /**
     * a promise that is resolved if all the data is loaded
     * @return a promise that is resolved if the data is loaded
     */
    get loadingPromise() {
        return this._loadingPromise;
    }
}
exports.FBThrowawayMatcher = FBThrowawayMatcher;
//# sourceMappingURL=FBThrowawayMatcher.js.map