const sha1 = require("sha1");
import {ThrowawayMatcher} from "../throwawayMatcher/ThrowawayMatcher";

export type BlacklistEntryChangeTypes = "ADD" | "DELETE";

export type BlacklistEntryChange = {
    type: BlacklistEntryChangeTypes,
    date: Date
}

export class BlacklistEntry {
    private _domain: string = "";
    private _server: string = "";
    private _changes: Array<BlacklistEntryChange> = [];
    private _hash: string;

    constructor(hash){
        this._hash = hash;
    }

    get hash(){
        return this._hash;
    }

    set hash(value: string) {
        this._hash = value;
    }

    get identified(){
        return BlacklistEntry.isHash(this.hash, this.domain);
    }

    get domain(){
        return this._domain;
    }

    set domain(value){
        this._domain = value;
    }

    async throwaway(){
        return this.domain && await ThrowawayMatcher.instance.doesMatch(this.domain);
    }

    get changes() {
        return this._changes;
    }

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

    static isHash(hash, value){
        return sha1(value) === hash;
    }
}
