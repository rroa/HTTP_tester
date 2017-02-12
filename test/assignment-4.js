process.env.NODE_ENV = 'test';

// deps
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const fs = require('fs');
const path = require('path');

// fwd declarations
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiThings);

// locals
let host = process.env.HOST;
let port = process.env.PORT;
let url = 'http://' + host + ':' + port;


describe('Assignment 4', function () {
    describe('/GET /image', function () {
        it('status code for /image should be 404', function (done) {
            chai.request(url)
                .get('/image')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/POST /image', function () {
        it('if content-type is not multipart/form-data status code for /image should be 400', function (done) {
            chai.request(url)
                .post('/image')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({test: 'test'})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/POST /image', function () {
        it('if content-type is multipart/form-data status code for /image should be 200', function (done) {
            chai.request(url)
                .post('/image')
                .set('content-type', 'multipart/form-data')
                .attach('image', fs.readFileSync(path.join(__dirname, 'matrix.jpg')), 'matrix.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET static /img', function () {
        it('uploaded image should exist', function (done) {
            chai.request(url)
                .get('/img/matrix.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.headers['content-type']).contains('image/jpeg');
                    done();
                });
        });
    });
});