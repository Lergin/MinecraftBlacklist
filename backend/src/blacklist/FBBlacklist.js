import * as Blacklist from "./Blacklist";
import * as BlacklistEntry from "./BlacklistEntry";

class FirebaseBlacklist extends Blacklist{
    constructor(ref) {
        super("");
        this._ref = ref;
    }

    async update() {
        this._ref.once('value', (snapshot)=>{
            this._entries = snapshot.val().map((a)=>new BlacklistEntry(a.hash, a.domain));
        })
    }
}
