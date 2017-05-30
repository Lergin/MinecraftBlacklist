import {Blacklist} from "./Blacklist";
import {FBBlacklistEntry} from "./FBBlacklistEntry";

export class FBBlacklist extends Blacklist{
    private _ref: admin.database.Reference;

    constructor(ref) {
        super();

        this._ref = ref;

        this._ref.on("child_added", (snapshot)=>{
            this._entries.push(new FBBlacklistEntry(snapshot.ref))
        })
    }

    async update() {}
}
