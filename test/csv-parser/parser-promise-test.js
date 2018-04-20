let parsePromise = require('lib/csv-parser').parsePromise;

describe('csv-parser.parsePromise', function () {

    it('puts the lotion on its skin', function () {
        expect().nothing();
    });

    it('should be a function', function () {
        expect(typeof parsePromise).toMatch('function');
    });

    it('should return a Promise object', function () {
        expect(parsePromise('')).toEqual(jasmine.any(Promise));
    })

    it(`
        should return a Promise object
        even without arguments
    `, function () {
        var temp = parsePromise().catch(()=>{});
        expect(temp).toEqual(jasmine.any(Promise));
    })

    it(`
        should pass JSON converted valid string csv
        to the success function as an Array
    `, function (done) {
        parsePromise('"first","second"\n1,2')
        .then( function success(data) {
            expect(data).toEqual([{first:'1',second:'2'}]);
            done();
        }).catch( function () {
            done.fail("This shouldn't happen");
        })
    });

    it('should fail for an invalid csv file', function (done) {
        parsePromise('"first","second"\n12')
        .then( function success(data) {
            done.fail("This shouldn't happen");
        }).catch( function (err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should consider empty values in input', function (done) {
        parsePromise('first,second\n,2')
        .then( function success(data) {
            expect(data).toEqual([{first:'',second:'2'}]);
            done();
        }).catch( function () {
            done.fail("This shouldn't happen");
        })
    });

    it('should have configurable delimiters', function (done) {
        parsePromise('first;second\n1;2', {delimiter: ';'})
        .then( function success(data) {
            expect(data).toEqual([{first:'1',second:'2'}]);
            done();
        }).catch( function () {
            done.fail("This shouldn't happen");
        })
    });
});