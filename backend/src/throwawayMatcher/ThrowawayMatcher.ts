export class ThrowawayMatcher {
    private static _instance:ThrowawayMatcher = null;
    private _strings: Set<string> = new Set();

    static get instance(): ThrowawayMatcher{
        return ThrowawayMatcher._instance;
    };

    constructor(strings:Array<string>) {
        if(ThrowawayMatcher.instance !== null){
            return ThrowawayMatcher.instance;
        }

        this._strings = new Set(strings);

        ThrowawayMatcher._instance = this;
    }

    get strings() {
        return this._strings;
    }

    set strings(value) {
        this._strings = value;
    }

    add(string) {
        this._strings.add(string);
    }

    remove(string) {
        this._strings.delete(string);
    }

    doesMatch(domain){
        return [...this.strings].some((a)=>domain.match(a));
    }
}