"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Blacklist_1 = require("../../src/blacklist/Blacklist");
const BlacklistEntry_1 = require("../../src/blacklist/BlacklistEntry");
/**
 * simple [[Blacklist]] implementation for testing purposes
 */
class BlacklistImpl extends Blacklist_1.Blacklist {
    add(entry) {
        this._entries.push(entry);
    }
}
describe('Blacklist', () => {
    describe('#consturctor()', () => {
        it('should be initialized empty', () => {
            chai_1.expect(new BlacklistImpl().entries).to.be.empty;
        });
    });
    describe('#entries', () => {
        it('should have all entries that are added', () => {
            let blacklist = new BlacklistImpl();
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('1'));
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('2'));
            chai_1.expect(blacklist.entries).to.have.length(2);
        });
    });
    describe('#unknown', () => {
        it('should have all entries that are unknown', () => {
            let blacklist = new BlacklistImpl();
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('1'));
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('2'));
            chai_1.expect(blacklist.unknown).to.have.length(2);
        });
        it('shouldn\'t have the identified entries', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('356a192b7913b04c54574d18c28d46e6395428ab');
            entry.domain = "1";
            blacklist.add(entry);
            chai_1.expect(blacklist.unknown).to.be.empty;
        });
        it('should only not have right identified entries', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('356a192b7913b04c54574d18c28d46e6395428ab');
            entry.domain = "1";
            blacklist.add(entry);
            let entry2 = new BlacklistEntry_1.BlacklistEntry('da4b9237bacccdf19c0760cab7aec4a8359010b0');
            entry2.domain = "3";
            blacklist.add(entry2);
            chai_1.expect(blacklist.unknown).to.be.length(1);
        });
    });
    describe('#known', () => {
        it('should have no entries that are unknown', () => {
            let blacklist = new BlacklistImpl();
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('1'));
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('2'));
            chai_1.expect(blacklist.known).to.be.empty;
        });
        it('should have the identified entries', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('356a192b7913b04c54574d18c28d46e6395428ab');
            entry.domain = "1";
            blacklist.add(entry);
            chai_1.expect(blacklist.known).to.have.length(1);
        });
        it('should only have right identified entries', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('356a192b7913b04c54574d18c28d46e6395428ab');
            entry.domain = "1";
            blacklist.add(entry);
            let entry2 = new BlacklistEntry_1.BlacklistEntry('da4b9237bacccdf19c0760cab7aec4a8359010b0');
            entry2.domain = "3";
            blacklist.add(entry2);
            chai_1.expect(blacklist.known).to.be.length(1);
        });
        it('should have together with unknown the same amount as entries', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('356a192b7913b04c54574d18c28d46e6395428ab');
            entry.domain = "1";
            blacklist.add(entry);
            let entry2 = new BlacklistEntry_1.BlacklistEntry('da4b9237bacccdf19c0760cab7aec4a8359010b0');
            entry2.domain = "3";
            blacklist.add(entry2);
            chai_1.expect(blacklist.known.length + blacklist.unknown.length).to.be.equal(blacklist.entries.length);
        });
    });
    describe('#get()', () => {
        it('should get the entry with the matching hash', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('1');
            blacklist.add(entry);
            chai_1.expect(blacklist.get('1')).to.be.equal(entry);
        });
        it('should get only one entry with the matching hash', () => {
            let blacklist = new BlacklistImpl();
            let entry = new BlacklistEntry_1.BlacklistEntry('1');
            blacklist.add(entry);
            blacklist.add(entry);
            chai_1.expect(blacklist.get('1')).to.be.equal(entry);
        });
        it('should be undefined if there is none', () => {
            let blacklist = new BlacklistImpl();
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('2'));
            blacklist.add(new BlacklistEntry_1.BlacklistEntry('3'));
            chai_1.expect(blacklist.get('1')).to.be.undefined;
        });
    });
});
//# sourceMappingURL=Blacklist.test.js.map