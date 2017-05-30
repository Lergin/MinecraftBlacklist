"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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