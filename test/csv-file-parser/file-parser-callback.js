var csvFileParser = require('lib/csv-file-parser').parse;

describe('csv-file-parser.parse', function () {

    it('should be a function', function () {
        expect(typeof csvFileParser).toBe('function');
    });

    it('should parse a valid csv file', function (done) {
        csvFileParser(
            './test/csv-file-parser/test.csv',
            function (err, data) {
                expect(data).toBeTruthy();
                done();
            }
        );
    });

    it(`
        should parse a valid csv file with custom delimiter
        and blank values
    `, function (done) {
        csvFileParser(
            './test/csv-file-parser/test-2.csv',
            function (err, data) {
                expect(data).toEqual(jasmine.any(Array));
                done();
            }, {
                delimiter: ';'
            }
        );
    });
})