import {Blacklist} from "../blacklist/Blacklist";

export class Server{
    private _blacklist:Blacklist = null;
    private _hashs: Array<string>;
    private _domain: string;
    private _ip: string;
    private _port: number;

    constructor(blacklist) {
        this._blacklist = blacklist;
        this._hashs = [];
        this._domain = "";
        this._ip = "";
        this._port = 25565;
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

    get hasTriedToCircumvent(){
        return null; //this._blacklist this.hashs
    }
}