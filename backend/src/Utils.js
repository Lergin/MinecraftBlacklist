"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * filters an array with a async filter function and returns the filtered array as a promise
 * @param data
 * @param filter
 * @return the filtered data
 */
function asyncFilter(data, filter) {
    return Promise.all(data.map((element, index) => filter(element)))
        .then(result => {
        return data.filter((element, index) => {
            return result[index];
        });
    });
}
exports.asyncFilter = asyncFilter;
//# sourceMappingURL=Utils.js.map