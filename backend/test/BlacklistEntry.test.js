const assert = require('assert');
const rewire = require('rewire');
const sha1 = require('sha1');
const BlacklistEntry = rewire('../src/BlacklistEntry.ts');

describe('BlacklistEntry', function() {
    describe('#isThrowawayDomain()', function() {
        it('should return true when the string contains ddns', function() {
            assert.equal(true, BlacklistEntry.__get__("isThrowawayDomain")("mehashd231.ddns.net"));
        });
        it('should return true when the string contains serveftp.com', function() {
            assert.equal(true, BlacklistEntry.__get__("isThrowawayDomain")("mehashd231.serveftp.com"));
        });
    });
    describe('#isHash()', function() {
        it('should return true if the value is equal to the hash of the value', function() {
            assert.equal(true, BlacklistEntry.__get__("isHash")(sha1("random text"), "random text"));
        });
    });
});