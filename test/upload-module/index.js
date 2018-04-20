let upload = require('lib/upload-module');
let config = require('../../config.json');
let path = require('path');
const FormData = require('form-data');
const fs = require('fs');
const frisby = require('frisby');

var superagent = require('superagent').agent();

const fileExtentions = config['file-extentions'];

describe('Upload module', function () {

    it('should be a function', function () {
        expect(upload).toEqual(jasmine.any(Function));
    });

    it('should be a function', function () {
        expect(upload.multer).toEqual(jasmine.any(Function));
    });

    it('should be a object', function () {
        expect(upload.multer.memoryStorage()).toEqual(jasmine.any(Object));
    });

    it('should be a function', function () {
        expect(upload.fileFilter).toEqual(jasmine.any(Function));
    });

    it('should be defined', function () {
        expect(upload.fileFilter).toBeDefined();
    });

    it('should be a function', function () {
        expect(upload.fileFilter).toEqual(jasmine.any(Function));
    });

    it('should recive 1 argument', function () {
        expect(upload.fileFilter.length).not.toBeLessThan(1);
    });

    it('should be array', function () {
        expect(fileExtentions).toEqual(jasmine.any(Array));
    });

    it('should be defined', function () {
        expect(fileExtentions).toBeDefined();
    });

    it('should be defined', function () {
        expect(config).toBeDefined();
    });

    it('should contain Content-Type', function () {
        expect(config).toEqual(jasmine.objectContaining({
            "file-extentions": jasmine.any(Array)
        }));
    });
});

xdescribe('Upload module route handle', function () {
    describe(" /upload", () => {
        it("Should redirect to /upload - right credentials", function (done) {
            superagent.post("http://localhost:3000/users/login")
                .send({
                    'username': 'zamudio',
                    'password': '123'
                })
                .end(function (err, res) {
                    expect(res.redirects[0]).toBe('http://localhost:3000/upload');
                    done();
                })
        });
       
        it('should return 200 because it redirects to /users/login', function (done) {
            frisby.get('http://localhost:3000/upload')
                .expect('status', 200)
                .done(done);
            });
    });
});

xdescribe('File-upload', () => {
    let file, form;
    
    it('POST file valid csv for client and API', done => {
        file = path.resolve(__dirname, './test.csv')
        form = new FormData()
        form.append('file', fs.createReadStream(file))

        frisby.post('http://localhost:3000/upload', {
                headers: form.getHeaders(),
                body: form
            })
            .expect('status', 200)
            .done(done)
    });
});