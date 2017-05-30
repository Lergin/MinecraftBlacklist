import * as fetch from "node-fetch";
import {BlacklistEntry} from "./BlacklistEntry";
import {Blacklist} from "./Blacklist";
import {Loading} from "../Utils";

export class McApiBlacklist extends Blacklist implements Loading {
    private _apiEndpoint: string;
    private _loadingPromise: Promise<any>;

    constructor(){
        super();
        this._apiEndpoint = 'https://mcapi.ca/blockedservers/';

        this._loadingPromise = this.update();
    }

    async update(){
        const response = await fetch(this._apiEndpoint).then((res) => res.json());

        let entries = response.blocked.map((a)=>new BlacklistEntry(a));

        entries.forEach(McApiBlacklist.addIpFromHashList(response.found));

        this._entries = entries;
    }


    get loadingPromise() {
        return this._loadingPromise;
    }

    private static addIpFromHashList(hashList){
        let map = McApiBlacklist.hashListToMap(Object.values(hashList));

        return function(entry) {
            if(map.has(entry.hash)){
                entry.domain = map.get(entry.hash);
            }

            return entry
        }
    }

    private static hashListToMap(hashList){
        let map = new Map();

        hashList.forEach((e) => {
            map.set(e.sha1, e.ip);
        });

        return map;
    }
}
