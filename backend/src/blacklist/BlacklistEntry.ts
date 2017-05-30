const sha1 = require("sha1");
import {ThrowawayMatcher} from "../throwawayMatcher/ThrowawayMatcher";

export class BlacklistEntry {
    private _domain: string = "";
    private _server: string = "";
    private _changes: any = [];
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
        return this.domain !== undefined;
    }
    
    get domain(){
        return this._domain;
    }

    set domain(domain){
        this._domain = domain;
    }

    async throwaway(){
        return this.domain && await ThrowawayMatcher.instance.doesMatch(this.domain);
    }

    get changes() {
        return this._changes;
    }

    addChange(type, date){
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
