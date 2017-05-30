"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThrowawayMatcher_1 = require("./ThrowawayMatcher");
class FBThrowawayMatcher extends ThrowawayMatcher_1.ThrowawayMatcher {
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
                });
            });
        });
        ref.on('child_removed', (data) => {
            this.remove(data.val());
        });
        // wait for the data to load
        this._loadingPromise = ref.once('value', () => { });
    }
    get loadingPromise() {
        return this._loadingPromise;
    }
    doesMatch(domain) {
        return super.doesMatch(domain);
    }
}
exports.FBThrowawayMatcher = FBThrowawayMatcher;
//# sourceMappingURL=FBThrowawayMatcher.js.map