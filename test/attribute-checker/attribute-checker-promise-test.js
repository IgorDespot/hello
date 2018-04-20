var fileParser = require('lib/csv-file-parser');
var attrChecker = require('lib/attribute-checker');

var promise = attrChecker.promise;

describe('attribute-checker.promise', function () {

    it('should be a function', function () {
        expect(promise).toEqual(jasmine.any(Function));
    });

    it(`
        shouldn't throw an error on correct csv input
        with preset attribute ruleset (in this case DepositPointType)
    `, function (done) {
        fileParser.parsePromise(
            './test/attribute-checker/test-2.csv',{
                delimiter: ';'
            }
        )
            .then(function (roughJson) {
                return promise(roughJson);
            })
            .then(function (data) {
                expect(data).toBeTruthy();
                done();
            })
            .catch(function () {
                done.fail("This shouldn't happen");
            });
    });
    it(`
        should pass an array of errors when strictEntityCheck is enabled
        if some entities have invalid(null or undefined) property values,
        but also provide entities with valid properties even when failing
    `, function (done) {
        fileParser.parsePromise(
            './test/attribute-checker/err-test.csv', {
                delimiter: ';'
            }
        )
            .then((data)=>promise(data, {strictEntityCheck: true}))
            .then((notExpected)=>{done.fail();})
            .catch((composite)=>{
                expect(composite.err.length).toBeGreaterThan(0);
                expect(composite.result).toBeTruthy();
                done();
            });
    });
});