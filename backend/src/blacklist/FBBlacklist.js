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
const Blacklist_1 = require("./Blacklist");
const BlacklistEntry_1 = require("./BlacklistEntry");
class FirebaseBlacklist extends Blacklist_1.Blacklist {
    constructor(ref) {
        super();
        this._ref = ref;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this._ref.once('value', (snapshot) => {
                this._entries = snapshot.val().map((a) => {
                    let newEntry = new BlacklistEntry_1.BlacklistEntry(a.hash);
                    newEntry.domain = a.domain;
                    return newEntry;
                });
            });
        });
    }
}
//# sourceMappingURL=FBBlacklist.js.map