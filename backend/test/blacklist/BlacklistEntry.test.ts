import { expect } from 'chai';
import 'mocha';
import {BlacklistEntry} from "../../src/blacklist/BlacklistEntry";

describe('BlacklistEntry', () => {
    describe('#consturctor()', () => {
        it('should set the hash', () => {
            expect(new BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0").hash).to.be.equal("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
        });
    });

    describe('#identified', () => {
        it('should be false if the domain isn\'t set', () => {
            expect(new BlacklistEntry("").identified).to.be.false;
        });

        it('should be true if the domain hashes to the hash', () => {
            let entry = new BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
            entry.domain = "*.example.com";

            expect(entry.identified).to.be.true;
        });

        it('should be false if the domain doesn\'t hash to the hash', () => {
            let entry = new BlacklistEntry("8c7122d652cb7be22d1986f1f30b07fd5108d9c0");
            entry.domain = "test.com";

            expect(entry.identified).to.be.false;
        });
    });

    describe('#changes', () => {
        it('should be empty after initialization', () => {
            expect(new BlacklistEntry("").changes).to.be.empty;
        });

        it('should be able to add new values', () => {
            let entry = new BlacklistEntry("");

            entry.addChange("ADD", new Date());
            entry.addChange("DELETE", new Date());
            entry.addChange("ADD", new Date());

            expect(entry.changes).to.be.length(3);
        });
    });

    describe('#isHash()', () => {
        it('should be true if the first value is the sha1 hash of the second', () => {
            expect(BlacklistEntry.isHash("8c7122d652cb7be22d1986f1f30b07fd5108d9c0", "*.example.com")).to.be.true;
        });

        it('should be false if the first value isn\'t the hash of the second', () => {
            expect(BlacklistEntry.isHash("0caaf24ab1a0c33440c06afe99df986365b0781f", "*.example.com")).to.be.false;
        });
    });
});