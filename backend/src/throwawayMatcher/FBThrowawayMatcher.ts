import {ThrowawayMatcher} from "./ThrowawayMatcher";
import {Loading} from "../Utils";

/**
 * a ThrowawayMatcher that uses Firebase as a data source for the strings
 *
 * the method doesMatch shouldn't be used before loadingPromise was resolved
 */
export class FBThrowawayMatcher extends ThrowawayMatcher implements Loading{
    private _loadingPromise: Promise<any>;

    /**
     * creates a new ThrowawayMatcher using a firebase database reference that contains a list of strings that should be
     * used for the matching.
     *
     * If the data in the firebase changes these changes automatically get reflected to the instance.
     *
     * @param ref the firebase database reference
     */
    constructor(ref:admin.database.Reference) {
        super([]);

        this._loadingPromise = null;

        ref.on('child_added', (data) => {
            this.add(data.val())
        });

        // workaround as we only get the new data and aren't saving the keys
        ref.on('child_changed', () => {
            this.strings = new Set();

            this._loadingPromise = ref.once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    this.add(childSnapshot.val());

                    return true;
                });

            });
        });

        ref.on('child_removed', (data) => {
            this.remove(data.val());
        });

        // wait for the data to load
        this._loadingPromise = ref.once('value', () => {});
    }

    /**
     * a promise that is resolved if all the data is loaded
     * @return {Promise<any>}
     */
    get loadingPromise() {
        return this._loadingPromise;
    }
}
