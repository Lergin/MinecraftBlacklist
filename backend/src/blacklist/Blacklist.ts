import {BlacklistEntry, BlacklistEntryChangeTypes} from "./BlacklistEntry";
import {asyncFilter} from "../Utils";

/**
 * this class represents a list of [[BlacklistEntry BlacklistEntries]] and provides some methods to filter these
 */
export abstract class Blacklist {
    /**
     * the list of the blacklist entries of this blacklist
     */
    protected _entries: BlacklistEntry[] = [];

    /**
     * gets all entries of the blacklist
     * @return all entries
     */
    get entries(){
        return this._entries;
    }

    /**
     * gets the entries that are identified (the string that hashes to the hash is known)
     * @return the identified entries
     */
    get known(){
        return this.entries.filter((e)=>e.identified);
    }

    /**
     * gets the unidentified entries (it's unknown what creates the hash)
     * @return the unidentified entries
     */
    get unknown(){
        return this.entries.filter((e)=>!e.identified)
    }

    /**
     * gets the known entries whose domain is a typical throwaway domain, identified by a [[ThrowawayMatcher]]
     * @return a Promise with the throwaway entries
     */
    get throwaway(){
        return asyncFilter(this.entries, async (e)=>await e.throwaway())
    }

    /**
     * gets the [[BlacklistEntry]] of the hash if one is existing
     * @param hash the hash whose entry should be returned
     * @return the assigned entry or nothing
     */
    get(hash:string) : BlacklistEntry{
        return this.entries.find((entry) => entry.hash === hash);
    }

    /**
     * creates a filter function that filters a entry by the latest [[BlacklistEntryChange]] that has happened to it, so
     * that only entries return true that do not have the change, given to the function, as latest change.
     * @param change the change to filter out
     * @return a filter function that filters according to the given change
     */
    static filterEntrysByLatestChangeUnequal(change: BlacklistEntryChangeTypes){
        return (entry)=>{
            if(entry.changes.length === 0) return true;

            return entry.changes.sort(BlacklistEntry.sortChangesByDate)[0].type !== change;
        }
    }
}
