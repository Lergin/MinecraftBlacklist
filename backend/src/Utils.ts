/**
 * an interface for classes that will need to load data before it can be used
 */
export interface Loading {
    /**
     * the promise that is resolved as soon as the data is loaded
     */
    readonly loadingPromise:Promise<any>;
}

/**
 * filters an array with a async filter function and returns the filtered array as a promise
 * @param data
 * @param filter
 * @return the filtered data
 */
export function asyncFilter<T>(data:Array<T>, filter: ((T)=>Promise<boolean>)){
    return Promise.all(data.map((element, index) => filter(element)))
        .then(result => {
            return data.filter((element, index) => {
                return result[index];
            });
        });
}