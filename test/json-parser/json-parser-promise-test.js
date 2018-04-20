var JSONParserPromise = require('lib/json-parser').parsePromise;

describe('json-parser.parsePromise', () => {

    it(`
        shouldn't fail for valid json
    `, (done) => {
        JSONParserPromise('{"a":"asd", "b": 69}')
        .then((x) => {
            done();
        })
        .catch((x) => {
            done.fail();
        });
    });
});