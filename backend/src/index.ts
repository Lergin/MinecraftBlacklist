import * as admin from "firebase-admin";
import {FBThrowawayMatcher} from "./throwawayMatcher/FBThrowawayMatcher";
import {McApiBlacklist} from "./blacklist/McApiBlacklist";
import {FBBlacklist} from "./blacklist/FBBlacklist";
import {BlacklistEntry} from "./blacklist/BlacklistEntry";
const serviceAccount = require("../../firebase_service_account.json");

async function main(){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://minecraftblacklist-92f32.firebaseio.com"
    });

    let throwawayMatcher = new FBThrowawayMatcher(admin.database().ref("throwawayStrings"));
    await throwawayMatcher.loadingPromise;

    let list = new McApiBlacklist();
    let fbList = new FBBlacklist(admin.database().ref("entries"));

    list.update().then(async ()=>{
        list.addAddChangesToEntries();
        console.log(`Unknown: ${list.unknown.length}`);
        console.log(`Known: ${list.known.length}`);
        list.throwaway.then((a) => console.log(`Throwaways: ${a.length}`));

        fbList.addEntriesFromBlacklist(list);
        fbList.setEntriesNotInBlacklistToDeleted(list);
    });

}


main();
