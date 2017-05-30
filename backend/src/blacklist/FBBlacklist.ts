import {FBBlacklistEntry} from "./FBBlacklistEntry";
import {Blacklist} from "./Blacklist";

export class FBBlacklist extends Blacklist{
    private _ref: admin.database.Reference;

    constructor(ref) {
        super();

        this._ref = ref;

        this._ref.on("child_added", (snapshot)=>{
            this._entries.push(new FBBlacklistEntry(snapshot.ref));
        })
    }
}
