import * as sha1 from "sha1";
import {ThrowawayMatcher} from "../throwawayMatcher/ThrowawayMatcher";

/**
 * the types of changes that can happen to a [[BlacklistEntry]]
 *
 * * *ADD* is for the time the entry was added to the blacklist
 * * *DELETE* is for the time the entry was deleted from the blacklist
 */
export type BlacklistEntryChangeTypes = "ADD" | "DELETE";

/**
 * this class represents a change to a [[BlacklistEntry]]
 */
export type BlacklistEntryChange = {
    /**
     * the type of the change
     */
    type: BlacklistEntryChangeTypes,
    /**
     * the date of the change
     */
    date: Date
}

/**
 * an entry of a [[Blacklist]] that has all the data about a specific hash, like the domain and the server of it (if
 * known)
 */
export class BlacklistEntry {
    /**
     * the domain of the entry (aka. the stuff that hashes to the hash)
     */
    protected _domain: string = "";

    /**
     * the [[Server]] the entry is assigned to
     */
    protected _server: string = "";

    /**
     * an array with all the changes to this entry, all changes can happen multiple times as a hash can be deleted from
     * the list and later added again
     */
    protected _changes: Array<BlacklistEntryChange> = [];

    /**
     * the hash of the entry, all the information Mojang provides us with...
     */
    protected _hash: string;

    constructor(hash){
        this._hash = hash;
    }

    get hash(){
        return this._hash;
    }

    set hash(value: string) {
        this._hash = value;
    }

    /**
     * returns true if the hash of the domain is equal to the hash
     * @return is the entry identified?
     */
    get identified(){
        return BlacklistEntry.isHash(this.hash, this.domain);
    }

    get domain(){
        return this._domain;
    }

    set domain(value){
        this._domain = value;
    }

    /**
     * tests if the domain is a throwaway domain with the existing [[ThrowawayMatcher]] instance
     * if no domain is set the return value is false
     *
     * @return a Promise that evaluates to true if the domain is a throwaway domain
     */
    async throwaway(){
        return this.domain && await ThrowawayMatcher.instance.doesMatch(this.domain);
    }

    get changes() {
        return this._changes;
    }

    set changes(value: Array<BlacklistEntryChange>) {
        this._changes = value;
    }

    /**
     * adds a new change of the entry
     */
    addChange(type: BlacklistEntryChangeTypes, date: Date){
        this._changes.push({
            type: type,
            date: date
        });
    }

    get server() {
        return this._server;
    }

    set server(value) {
        this._server = value;
    }

    /**
     * tests if the hash is the hash of the value
     * @return true if they match, false otherwise
     */
    static isHash(hash, value){
        return sha1(value) === hash;
    }

    /**
     * a sort method that sorts [[BlacklistEntryChange BlacklistEntryChanges]] by the date so that the most recent
     * change is in the beginning
     * @param c1
     * @param c2
     * @return {number}
     */
    static sortChangesByDate(c1: BlacklistEntryChange, c2: BlacklistEntryChange){
        return c2.date.valueOf() - c1.date.valueOf();
    }
}
