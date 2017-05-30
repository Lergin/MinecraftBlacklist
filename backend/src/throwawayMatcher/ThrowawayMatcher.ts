export class ThrowawayMatcher {
    private static _instance:ThrowawayMatcher = null;
    private _strings: string[] = [];

    static get instance(): ThrowawayMatcher{
        return ThrowawayMatcher._instance;
    };

    constructor(strings) {
        if(ThrowawayMatcher.instance !== null){
            return ThrowawayMatcher.instance;
        }

        this._strings = strings;

        ThrowawayMatcher._instance = this;
    }

    get strings() {
        return this._strings;
    }

    set strings(value) {
        this._strings = value;
    }

    add(string) {
        this._strings.push(string);
    }

    remove(string) {
        let index = this._strings.indexOf(string);

        this._strings.splice(index, 1);
    }

    async doesMatch(domain){
        return this.strings.some((a)=>domain.match(a));
    }
}