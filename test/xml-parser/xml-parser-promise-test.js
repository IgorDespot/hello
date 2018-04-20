var xmlParserPromise = require('lib/xml-parser').parsePromise;
var fs = require('fs');

describe('xml-parser.parsePromise', () => {

    it('Should be a function', () => {
        expect(xmlParserPromise).toEqual(jasmine.any(Function));
    });

    it('Should pass an Array to "then" callback', (done) => {
        fs.readFile(
            './test/xml-parser/custom-test-data.xml',
            'utf-8',
            (err, x) => {
                xmlParserPromise(x)
                .then((data) => {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch((data) => {
                    done.fail("Shouldn't happen");
                })
            }
        )
    });

    it(`
        Should pass an Array to "then" callback
        even if the Array contains a single object
    `, (done) => {
        fs.readFile(
            './test/xml-parser/custom-test-data2.xml',
            'utf-8',
            (err, x) => {
                xmlParserPromise(x)
                .then((data) => {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch((data) => {
                    done.fail("Shouldn't happen");
                })
            }
        )
    });
});