export interface Loading {
    readonly loadingPromise:Promise<any>;
}

export function asyncFilter<T>(data:Array<T>, filter: ((T)=>Promise<boolean>)){
    return Promise.all(data.map((element, index) => filter(element)))
        .then(result => {
            return data.filter((element, index) => {
                return result[index];
            });
        });
}