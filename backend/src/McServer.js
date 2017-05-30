class McServer{
    constructor(ip, domain){
        this._ip = ip;
        this._domain = domain;
    }

    get ip(){
        return this._ip;
    }

    get domain(){
        return this._domain;
    }
}