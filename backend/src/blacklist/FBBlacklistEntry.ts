import {BlacklistEntry} from "./BlacklistEntry";
import * as admin from "firebase-admin";

/**
 * A [[BlacklistEntry]] that keeps it data synchronised with a [[https://firebase.google.com Firebase]] realtime
 * database.
 */
export class FBBlacklistEntry extends BlacklistEntry{
    /**
     * the reference of the database that has the data about this entry
     */
    private _ref : admin.database.Reference;

    /**
     * creates a new firebase blacklist entry and registers the listener for updates of the data in the firebase
     * @param ref the reference to the data in the firebase realtime database
     */
    constructor(ref: admin.database.Reference) {
        super("");

        this._ref = ref;

        this._ref.child("hash").on("value",(hashSnapshot)=>{
            this._hash = hashSnapshot.val();
        });

        this._ref.child("domain").on("value", (domainSnapshot)=> {
            this._domain = domainSnapshot.val();
        });

        this._ref.child("server").on("value", (serverSnapshot)=> {
            this._server = serverSnapshot.val();
        });

        this._ref.child("changes").on("child_added", (changeSnapshot)=> {
            this._changes.push({type: changeSnapshot.val().type, date: new Date(changeSnapshot.val().date)});
        });
    }

    /**
     * sets the hash in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set hash(value: string) {
        this._ref.child("hash").set(value);
    }

    /**
     * sets the domain in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set domain(value) {
        this._ref.child("domain").set(value);
    }

    /**
     * adds a change of the entry to the firebase, this calls the registered listener and updates the array saved in the
     * instance through it
     *
     * the date property is ignored and it uses the ServerValue.TIMESTAMP date from firebase
     */
    addChange(type, date) {
        this._ref.child("changes").transaction((data)=>{
            if(data && data.length > 0){
                if(data.sort(BlacklistEntry.sortChangesByDate)[0].type !== type){
                    data.push({
                        type: type,
                        date: admin.database.ServerValue.TIMESTAMP
                    });
                    return data;
                }
            }else{
                return [{
                    type: type,
                    date: admin.database.ServerValue.TIMESTAMP
                }];
            }
        });
    }

    /**
     * sets the server in the firebase, this calls the registered listener and updates the data saved in the instance
     * through it
     */
    set server(value) {
        this._ref.child("server").set(value);
    }

    get hash(): string {
        return super.hash;
    }

    get domain(): string {
        return super.domain;
    }

    get server(): string {
        return super.server;
    }
}