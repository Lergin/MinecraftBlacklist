"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const ThrowawayMatcher_1 = require("../../src/throwawayMatcher/ThrowawayMatcher");
describe('ThrowawayMatcher', () => {
    let throwawayMatcher = new ThrowawayMatcher_1.ThrowawayMatcher(["test"]);
    describe('#consturctor()', () => {
        it('should have a string when the constructor is called with one', () => {
            chai_1.expect([...throwawayMatcher.strings]).to.contain("test");
        });
        it('should still have a string when the constructor is called again (singleton)', () => {
            chai_1.expect([...new ThrowawayMatcher_1.ThrowawayMatcher([]).strings]).to.be.length(1);
        });
    });
    describe('#strings', () => {
        it('should have no strings after set to an empty array', () => {
            throwawayMatcher.strings = new Set();
            chai_1.expect(throwawayMatcher.strings).to.be.empty;
        });
    });
    describe('#add()', () => {
        it('should add every string only once', () => {
            throwawayMatcher.add("test");
            throwawayMatcher.add("test");
            chai_1.expect([...throwawayMatcher.strings]).to.be.length(1);
        });
    });
    describe('#remove()', () => {
        it('should be able to remove a string', () => {
            throwawayMatcher.add("test");
            throwawayMatcher.remove("test");
            chai_1.expect([...throwawayMatcher.strings]).to.be.empty;
        });
    });
    describe('#doesMatch()', () => {
        it('should match the same string', () => {
            throwawayMatcher.add("test");
            chai_1.expect(throwawayMatcher.doesMatch("test")).to.be.true;
        });
        it('shouldn\'t match something completely different', () => {
            throwawayMatcher.add("test");
            chai_1.expect(throwawayMatcher.doesMatch("different")).to.be.false;
        });
        it('should support regex', () => {
            throwawayMatcher.add(".*");
            chai_1.expect(throwawayMatcher.doesMatch("regex")).to.be.true;
            throwawayMatcher.remove(".*");
        });
        it('should support multiple entries', () => {
            throwawayMatcher.add("true");
            throwawayMatcher.add("false");
            chai_1.expect(throwawayMatcher.doesMatch("false")).to.be.true;
            chai_1.expect(throwawayMatcher.doesMatch("true")).to.be.true;
        });
        it('should match any position', () => {
            throwawayMatcher.add("test");
            chai_1.expect(throwawayMatcher.doesMatch("_test")).to.be.true;
            chai_1.expect(throwawayMatcher.doesMatch("_test_")).to.be.true;
            chai_1.expect(throwawayMatcher.doesMatch("test_")).to.be.true;
        });
    });
});
//# sourceMappingURL=ThrowawayMatcher.test.js.map