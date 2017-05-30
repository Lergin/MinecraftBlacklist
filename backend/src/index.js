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
const admin = require("firebase-admin");
const FBThrowawayMatcher_1 = require("./throwawayMatcher/FBThrowawayMatcher");
const McApiBlacklist_1 = require("./blacklist/McApiBlacklist");
const serviceAccount = require("./minecraftblacklist-92f32-firebase-adminsdk-a6wx7-113e00dcc2.json");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://minecraftblacklist-92f32.firebaseio.com"
        });
        let throwawayMatcher = new FBThrowawayMatcher_1.FBThrowawayMatcher(admin.database().ref("throwawayStrings"));
        yield throwawayMatcher.loadingPromise;
        let list = new McApiBlacklist_1.McApiBlacklist();
        list.update().then(() => __awaiter(this, void 0, void 0, function* () {
            console.log(list.unknown.length);
            console.log(list.known.length);
            console.log((yield list.throwaway).length);
        }));
    });
}
main();
//# sourceMappingURL=index.js.map