import * as admin from "firebase-admin";
import {Blacklist} from "./blacklist/Blacklist";
import {FBThrowawayMatcher} from "./throwawayMatcher/FBThrowawayMatcher";
const serviceAccount = require("./minecraftblacklist-92f32-firebase-adminsdk-a6wx7-113e00dcc2.json");

async function main(){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://minecraftblacklist-92f32.firebaseio.com"
    });

    let throwawayMatcher = new FBThrowawayMatcher(admin.database().ref("throwawayStrings"));
    await throwawayMatcher.loadingPromise;

    let list = new Blacklist();

    list.update().then(async ()=>{
        console.log(list.unknown.length);
        console.log(list.known.length);
        console.log((await list.throwaway).length);
    });
}


main();
