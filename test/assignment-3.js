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


describe('Assignment 3', function () {
    describe('/GET /movies', function () {
        it('content type for /movies should be text/html', function (done) {
            chai.request(url)
                .get('/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.headers['content-type']).contains('text/html');
                    done();
                });
        });
    });

    describe('/GET /movies/json', function () {
        it('content type for /movies/json should be application/json', function (done) {
            chai.request(url)
                .get('/movies/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.all.have.property('name');
                    res.body.should.all.have.property('description');
                    res.body.should.all.have.property('keywords');
                    res.body.should.all.have.property('image');
                    expect(res.headers['content-type']).contains('application/json');
                    done();
                });
        });
    });

    describe('/GET /movies/create', function () {
        it('content type for /movies/create should be text/html', function (done) {
            chai.request(url)
                .get('/movies/create')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.headers['content-type']).contains('text/html');
                    done();
                });
        });
    });

    describe('/POST /movies/create', function () {
        it('should create a new movie entry', function (done) {
            chai.request(url)
                .post('/movies/create')
                .field('name', 'The Matrix')
                .field('Description', 'We are all in the Matrix!')
                .field('keywords', 'action, fiction, drama')
                .attach('image', fs.readFileSync(path.join(__dirname, 'matrix.jpg')), 'matrix.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.headers['content-type']).contains('text/html');
                    done();
                });
        });

        it('should NOT create a new movie entry', function (done) {
            chai.request(url)
                .post('/movies/create')
                .field('Description', 'We are all in the Matrix!')
                .field('keywords', 'action, fiction, drama')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.text).to.not.be.null;
                    expect(res.text).to.have.string('form-control');
                    expect(res.text).to.have.string('has-error');
                    expect(res.headers['content-type']).contains('text/html');
                    done();
                });
        });

        it('the new movie entry should exist', function (done) {
            chai.request(url)
                .get('/movies/json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.contain.a.thing.with.property('name', 'The Matrix');
                    expect(res.headers['content-type']).contains('application/json');
                    done();
                });
        });
    });

    describe('/GET /movies/details', function () {
        it('status code for /movies/details without argument should be 404 ', function (done) {
            chai.request(url)
                .get('/movies/id')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});