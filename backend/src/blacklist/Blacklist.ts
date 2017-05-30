import * as fetch from "node-fetch";
import {BlacklistEntry} from "./BlacklistEntry";

export class Blacklist {
    _apiEndpoint: string;
    _entries: [BlacklistEntry];

    constructor(){
        this._apiEndpoint = 'https://mcapi.ca/blockedservers/'
    }

    async update(){
        const response = await fetch(this._apiEndpoint).then((res) => res.json());

        let entries = response.blocked.map((a)=>new BlacklistEntry(a));

        entries.forEach(addIpFromHashList(response.found));

        this._entries = entries;
    }

    get all(){
        return this._entries;
    }

    get known(){
        return this.all.filter(isKnown);
    }

    get unknown(){
        return this.all.filter(isUnknown)
    }

    get throwaway(){
        return asyncFilter(this.all, isThrowaway)
    }
}

function asyncFilter(data, filter){
    return Promise.all(data.map((element, index) => filter(element, index, data)))
    .then(result => {
        return data.filter((element, index) => {
            return result[index];
        });
    });
}

function isKnown(entry) {
    return entry.identified;
}
function isUnknown(entry) {
    return !entry.identified;
}
async function isThrowaway(entry) {
    return !await entry.throwaway();
}

function hashListToMap(hashlist){
    let map = new Map();

    hashlist.forEach((e) => {
        map.set(e.sha1, e.ip);
    });

    return map;
}

function addIpFromHashList(hashlist){
    let map = hashListToMap(Object.values(hashlist));

    return function(entry) {
        if(map.has(entry.hash)){
            entry.domain = map.get(entry.hash);
        }

        return entry
    }
}