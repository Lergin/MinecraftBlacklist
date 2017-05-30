const sha1 = require("sha1");
import {ThrowawayMatcher} from "../throwawayMatcher/ThrowawayMatcher";

export class BlacklistEntry {
    private _domain: string;
    private _server: string;
    private _changes: any;
    private readonly _hash: string;

    constructor(hash){
        this._domain = "";
        this._server = "";
        this._changes = [];

        this._hash = hash;
    }

    get hash(){
        return this._hash;
    }

    get identified(){
        return this.domain !== undefined;
    }
    
    get domain(){
        return this._domain;
    }

    set domain(domain){
        if(isHash(this.hash, domain)){
            this._domain = domain;
        }
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
}

function isHash(hash, value) {
    return sha1(value) === hash;
}