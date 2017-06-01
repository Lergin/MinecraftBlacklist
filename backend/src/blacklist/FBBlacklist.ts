import {FBBlacklistEntry} from "./FBBlacklistEntry";
import {Blacklist} from "./Blacklist";

/**
 * a implementation of the [[Blacklist]] that uses [[https://firebase.google.com Firebase]] as a data source for the
 * entries, the data is also directly updated if a new entry is added to it in the firebase realtime database.
 */
export class FBBlacklist extends Blacklist{
    /**
     * the firebase reference that has the data about the entries
     */
    private _ref: admin.database.Reference;

    /**
     * creates a new firebase blacklist and registers the listener to add new entries
     * @param ref the reference with the data about the entries
     */
    constructor(ref) {
        super();

        this._ref = ref;

        // this loads the current children and is also called for each new entry
        this._ref.on("child_added", (snapshot)=>{
            this._entries.push(new FBBlacklistEntry(snapshot.ref));
        })
    }
}
