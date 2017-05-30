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
            this.strings = [];
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
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loadingPromise) {
                yield this._loadingPromise;
            }
            return _super("doesMatch").call(this, domain);
        });
    }
}
exports.FBThrowawayMatcher = FBThrowawayMatcher;
//# sourceMappingURL=FBThrowawayMatcher.js.map