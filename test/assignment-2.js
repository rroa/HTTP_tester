process.env.NODE_ENV = 'test';

// deps
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

// fwd declarations
let should = chai.should();
let expect = chai.expect;

// locals
let host = process.env.HOST;
let port = process.env.PORT;
let url = 'http://' + host + ':' + port;

describe('Assignment 2', function () {

  describe('/GET 404', function () {
    it('status code for 404 should be 404', function (done) {
        chai.request(url)
            .get('/404')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });
  });

  describe('/GET protected', function () {
    it('status code for /protected should be 401', function (done) {
        chai.request(url)
            .get('/protected')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
  });

  describe('/GET 500', function () {
    it('status code for /error should be 500', function (done) {
        chai.request(url)
            .get('/error')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(500);
                done();
            });
    });
  });

  describe('/PATCH GET POST PUT notimplemented', function () {
    it('status code for PATCH should be 501', function (done) {
        chai.request(url)
            .patch('/notimplemented')
            .end(function (err, res) {
                res.headers.should.have.property('allow');
                expect(res.statusCode).to.equal(501);
                done();
            });
    });

    it('status code for GET should be 200', function (done) {
        chai.request(url)
            .get('/notimplemented')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('status code for POST should be 200', function (done) {

        chai.request(url)
            .post('/notimplemented')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('status code for PUT should be 200', function (done) {
        chai.request(url)
            .put('/notimplemented')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
  });

describe('Login', function () {
  describe('/GET login', function () {
    it('content-type should be text/html', function (done) {
        chai.request(url)
            .get('/login')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).contains('text/html');
                done();
            });
    });
  });

  describe('/POST login', function () {
      it('login should return valid JSON object', function (done) {
        let login = {
            username: 'bartolo',
            password: 'colon'
        };

        chai.request(url)
            .post('/login')
            .send(login)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username').eql(login.username);
              res.body.should.have.property('password').eql(login.password);
              expect(res.headers['content-type']).contains('application/json');
              done();
            });
      });
    });
  });
});