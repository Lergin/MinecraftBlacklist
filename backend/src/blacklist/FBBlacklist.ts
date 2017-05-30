import {Blacklist} from "./Blacklist";
import {BlacklistEntry} from "./BlacklistEntry";

class FirebaseBlacklist extends Blacklist{
    private _ref;

    constructor(ref) {
        super();
        this._ref = ref;
    }

    async update() {
        this._ref.once('value', (snapshot)=>{
            this._entries = snapshot.val().map((a)=>{
                let newEntry = new BlacklistEntry(a.hash);
                newEntry.domain = a.domain;

                return newEntry;
            });
        })
    }
}
