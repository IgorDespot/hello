let parse = require('lib/csv-parser').parse;

describe('csv-parser.parse', function () {

    it('puts the lotion on its skin', function () {
        expect().nothing();
    });

    it('should be a function', function () {
        expect(typeof parse).toMatch('function');
    });

    it(`
        should pass JSON converted valid csv input
        to the provided callback function
    `, function (done) {
        parse('"first","second"\n1,2', function (err, out) {
            expect(out).toEqual(jasmine.any(Array));
            done();
        });
    });

    it('should fail for an invalid csv input', function (done) {
        parse('"first","second"\n12', function (err, out) {
            expect(err).toBeTruthy();
            done();
        });
    });

    it('should consider empty values in input', function (done) {
        parse('"first","second"\n,2', function (err, out) {
            expect(out).toEqual(jasmine.any(Array));
            done();
        });
    });

    it('should have configurable delimiters', function (done) {
        parse('first;second\n1;2', function (err, out) {
            expect(out).toEqual(jasmine.any(Array));
            done();
        }, {delimiter: ';'});
    });

    it('should fail when given a number', function (done) {
        parse(69, function (err, out) {
            expect(err).toBeTruthy();
            done();
        });
    })
})