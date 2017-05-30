"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const BlacklistEntry_1 = require("../../src/blacklist/BlacklistEntry");
describe('BlacklistEntry', () => {
    describe('#consturctor()', () => {
        it('should set the hash', () => {
            chai_1.expect(new BlacklistEntry_1.BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0").hash).to.be.equal("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
        });
    });
    describe('#identified', () => {
        it('should be false if the domain isn\'t set', () => {
            chai_1.expect(new BlacklistEntry_1.BlacklistEntry("").identified).to.be.false;
        });
        it('should be true if the domain hashes to the hash', () => {
            let entry = new BlacklistEntry_1.BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
            entry.domain = "*.example.com";
            chai_1.expect(entry.identified).to.be.true;
        });
        it('should be false if the domain doesn\'t hash to the hash', () => {
            let entry = new BlacklistEntry_1.BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
            entry.domain = "test.com";
            chai_1.expect(entry.identified).to.be.false;
        });
    });
    describe('#changes', () => {
        it('should be empty after initialization', () => {
            chai_1.expect(new BlacklistEntry_1.BlacklistEntry("").changes).to.be.empty;
        });
        it('should be able to add new values', () => {
            let entry = new BlacklistEntry_1.BlacklistEntry("");
            entry.addChange("ADD", new Date());
            entry.addChange("DELETE", new Date());
            entry.addChange("ADD", new Date());
            chai_1.expect(entry.changes).to.be.length(3);
        });
    });
    describe('#isHash', () => {
        it('should be true if the first value is the sha1 hash of the second', () => {
            chai_1.expect(BlacklistEntry_1.BlacklistEntry.isHash("8c7122d652cb7be22d1986f1f30b07fd5108d9c0", "*.example.com")).to.be.true;
        });
        it('should be false if the first value isn\'t the hash of the second', () => {
            chai_1.expect(BlacklistEntry_1.BlacklistEntry.isHash("0caaf24ab1a0c33440c06afe99df986365b0781f", "*.example.com")).to.be.false;
        });
    });
});
//# sourceMappingURL=BlacklistEntry.test.js.map