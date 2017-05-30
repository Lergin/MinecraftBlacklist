"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
class Server {
    constructor(blacklist) {
        this._blacklist = null;
        this._hashs = [];
        this._domain = "";
        this._ip = "";
        this._port = 25565;
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
    get port() {
        return this._port;
    }
    set port(value) {
        this._port = value;
    }
    hasTriedToCircumvent() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Utils_1.asyncFilter(this.hashs, (h) => this._blacklist.get(h).throwaway())).length > 0;
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map