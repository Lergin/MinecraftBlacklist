import {FBBlacklistEntry} from "./FBBlacklistEntry";
import {Blacklist} from "./Blacklist";
import {BlacklistEntry} from "./BlacklistEntry";

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

    /**
     * adds all the entries that are in the given [[Blacklist]] and adds them to this [[FBBlacklist]]
     *
     * @param blacklist the [[Blacklist]] whose entries should be copied
     */
    addEntriesFromBlacklist(blacklist: Blacklist){
        blacklist.entries.map((e) => this.add(e));
    }

    /**
     * adds a deleted change to all entries in this blacklist that are not in the blacklist given by the parameter
     *
     * @param blacklist
     */
    setEntriesNotInBlacklistToDeleted(blacklist: Blacklist){
        this.getDifference(blacklist).map((entry)=>entry.addChange("DELETE", new Date()));
    }

    /**
     * adds the given blacklist entry to the blacklist
     *
     * @param blacklistEntry
     */
    add(blacklistEntry: BlacklistEntry){
        FBBlacklist.blacklistEntryToFBBlacklistEntry(this._ref)(blacklistEntry);
    }

    /**
     * Creates a function that creates a [[FBBlacklistEntry]] from a [[BlacklistEntry]].
     *
     * This is done by creating a new [[FBBlacklistEntry]] with a child reference from the given reference that is using
     * the hash as child path and then setting the coping the data to the new [[FBBlacklistEntry]]
     *
     * @param ref the root reference for all the blacklist entries (the new entries are created as children of this ref)
     * @return {(entry:BlacklistEntry)=>FBBlacklistEntry} a function that takes a [[BlacklistEntry]] and then converts
     * it into a [[FBBlacklistEntry]]
     */
    private static blacklistEntryToFBBlacklistEntry(ref: admin.database.Reference){
        return (entry: BlacklistEntry) => {
            let fbBlacklistEntry = new FBBlacklistEntry(ref.child(entry.hash));

            fbBlacklistEntry.hash = entry.hash;
            fbBlacklistEntry.domain = entry.domain;
            fbBlacklistEntry.addChange("ADD", new Date());

            return fbBlacklistEntry;
        }
    }
}
