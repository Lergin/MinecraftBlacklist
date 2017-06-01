import * as fetch from "node-fetch";
import {BlacklistEntry} from "./BlacklistEntry";
import {Blacklist} from "./Blacklist";
import {Loading} from "../Utils";

/**
 * the layout of the response for the blacklist data from MCAPI
 */
type McApiBlacklistResponse = {blocked: string[], found: {[s:string]:McApiBlacklistEntryFound},
    unknown: {[s:string]:McApiBlacklistEntryUnknown}};

/**
 * the layout of the response of the identified hashes form MCAPI
 */
type McApiBlacklistEntryFound = {sha1:string, ip:string};

/**
 * the layout of the response of the unidentified hashes from MCAPI
 */
type McApiBlacklistEntryUnknown = {sha1:string};

/**
 * a implementation of the [[Blacklist]] that gets it data from the [[https://mcapi.ca MCAPI]] endpoint for the
 * blacklist entries that also contains identified domains of the hashes ([[https://mcapi.ca/blockedservers/]]).
 */
export class McApiBlacklist extends Blacklist implements Loading {
    /**
     * the url of the api endpoint
     */
    private _apiEndpoint: string = 'https://mcapi.ca/blockedservers/';
    /**
     * a promise that is resolved as soon as the data is loaded
     */
    private _loadingPromise: Promise<any>;

    constructor(){
        super();
        this._loadingPromise = this.update();
    }

    /**
     * Fetches the data from the [[_apiEndpoint api endpoint]] and then converts it's data into
     * [[BlacklistEntry BlacklistEntries]].
     */
    async update(){
        const response : McApiBlacklistResponse = await fetch(this._apiEndpoint).then((res) => res.json());

        let entries = response.blocked.map((a)=>new BlacklistEntry(a));

        entries.forEach(McApiBlacklist.addIpFromHashList(response.found));

        this._entries = entries;
    }

    /**
     * the promise that is resolved after the initial data is loaded
     * @return a promise that is resolved as soon as the initial dat is loaded
     */
    get loadingPromise() {
        return this._loadingPromise;
    }

    /**
     * adds all
     * @param hashList
     * @return {(entry:any)=>any}
     */
    private static addIpFromHashList(hashList){
        let map = McApiBlacklist.hashListToMap(Object.values(hashList));

        return function(entry) {
            if(map.has(entry.hash)){
                entry.domain = map.get(entry.hash);
            }

            return entry
        }
    }

    /**
     * converts a list of hashes that have the form of [[McApiBlacklistEntryFount]] into a map that uses the `sha1`
     * property as key and the `ip` as value
     * @return the converted data as a Map
     */
    private static hashListToMap(hashList: McApiBlacklistEntryFound[]) : Map<string,string> {
        let map = new Map();

        hashList.forEach((e) => {
            map.set(e.sha1, e.ip);
        });

        return map;
    }
}
