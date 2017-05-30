import {Blacklist} from "../blacklist/Blacklist";
import {asyncFilter} from "../Utils";

export class Server{
    private _blacklist:Blacklist = null;
    private _hashs: Array<string> = [];
    private _domain: string = "";
    private _ip: string = "";
    private _port: number = 25565;

    constructor(blacklist) {
        this._blacklist = blacklist;
    }

    get hashs() {
        return this._hashs;
    }

    set hashs(value) {
        this._hashs = value;
    }

    get domain() {
        return this._domain;
    }

    set domain(value) {
        this._domain = value;
    }

    get ip() {
        return this._ip;
    }

    set ip(value) {
        this._ip = value;
    }

    get port(): number {
        return this._port;
    }

    set port(value: number) {
        this._port = value;
    }

    async hasTriedToCircumvent(){
        return (await asyncFilter(this.hashs,(h)=>this._blacklist.get(h).throwaway())).length > 0;
    }
}