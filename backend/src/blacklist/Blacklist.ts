import {BlacklistEntry} from "./BlacklistEntry";
import {asyncFilter} from "../Utils";

export abstract class Blacklist{
    protected _entries: BlacklistEntry[] = [];

    get entries(){
        return this._entries;
    }

    get known(){
        return this.entries.filter((e)=>e.identified);
    }

    get unknown(){
        return this.entries.filter((e)=>!e.identified)
    }

    get throwaway(){
        return asyncFilter(this.entries, async (e)=>!await e.throwaway())
    }

    get(hash:string) : BlacklistEntry{
        return this.entries.find((entry) => entry.hash === hash);
    }
}
