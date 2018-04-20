var fileParser = require('lib/csv-file-parser');
var attrChecker = require('lib/attribute-checker');

describe('attribute-checker', function () {

    it('should be a function', function () {
        expect(attrChecker).toEqual(jasmine.any(Function));
    });

    it(`
        shouldn't throw an error on correct csv input
        with preset attribute ruleset (in this case DepositPointType)
    `, function (done) {
        fileParser.parse(
            './test/attribute-checker/test-2.csv',
            function (err, data) {
                attrChecker(data, function (err, data) {
                    expect(err).toBeFalsy();
                    done();
                });
            }, {
                delimiter: ';'
            }
        );
    });

    it(`
        shouldn't throw an error on correct csv input
        with preset attribute ruleset (in this case DepositPoint)
    `, function (done) {
        fileParser.parse(
            './test/attribute-checker/test-3.csv',
            function (err, data) {
                attrChecker(data, function (err, data) {
                    expect(err).toBeFalsy();
                    done();
                });
            }, {
                delimiter: ';'
            }
        );
    });

    it(`
        should provide an error when the ruleset
        doesn't exist
    `, function (done) {
        attrChecker([
            {type:'lolzor'}
        ], function (err, data) {
            expect(err).toMatch("not defined");
            done();
        });
    });

    it(`
        should pass an array of errors when strictEntityCheck is enabled
        if some entities have invalid(null or undefined) property values,
        but also provide entities with valid properties
    `, function (done) {
        fileParser.parse(
            './test/attribute-checker/err-test.csv',
            function (err, data) {
                attrChecker(data, function (err, data) {
                    expect(err.length).toBeGreaterThan(0);
                    expect(data).toBeTruthy();
                    done();
                }, {
                    strictEntityCheck: true
                });
            }, {
                delimiter: ';'
            }
        );
    });

    it(`
        should throw an error on csv input if
        strictEntityPropertyCheck is enabled and
        properties are not identical case-wise
    `, function (done) {
        fileParser.parse(
            './test/attribute-checker/test-strict-err.csv',
            function (err, data) {
                attrChecker(
                    data,
                    function (err, data) {
                        expect(err).toBeTruthy();
                        done();
                    }, {
                        strictEntityPropertyCheck: true,
                        strictEntityCheck: true
                    }
                );
            }, {
                delimiter: ';'
            }
        );
    });

    describe('addAttributeRuleSet', function () {
        var addAttributeRuleSet = attrChecker.addAttributeRuleSet;

        it(`
            should return true if it adds a new ruleset
            and should throw an exception if the ruleset
            with the same name already exists
        `, function () {
            expect(addAttributeRuleSet('lol', {})).toBe(true);
            expect(
                () => addAttributeRuleSet('lol', {})
            ).toThrow();
        });
    });
});