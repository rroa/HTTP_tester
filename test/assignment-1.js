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

// Response
describe('Assignment 1', function () {
    describe('/GET /', function () {
        // Check status
        it('status code should be 200', function (done) {
            chai.request(url)
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    expect(response).to.have.status(200);
                    done();
                });
        });

        // Check response object integrity
        it('object structure should be correct', function (done) {
            chai.request(url)
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    expect(response.body).to.not.be.undefined;
                    expect(response.body).to.have.property('method');
                    expect(response.body).to.have.property('path');
                    expect(response.body).to.have.property('host');
                    expect(response.body).to.have.property('port');
                    expect(response.body).to.have.property('header');
                    done();
                });
        });

        // Check method is correct
        it('method should be GET', function (done) {
            chai.request(url)
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    expect(response.body).to.not.be.undefined;
                    expect(response.body.method).to.not.be.undefined;
                    expect(response.body.method).to.equal('GET');
                    done();
                });
        });

        // Check host is correct
        it('host should be ' + host, function (done) {
            chai.request(url)
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    let responseBody = response.body;
                    expect(responseBody).to.not.be.undefined;
                    expect(responseBody.host).to.not.be.undefined;
                    expect(responseBody.host).to.equal(host);
                    done();
                });
        });

        // Check port is correct
        it('port should be ' + port, function (done) {
            chai.request(url)
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    let responseBody = response.body;
                    expect(responseBody).to.not.be.undefined;
                    expect(responseBody.port).to.not.be.undefined;
                    expect(responseBody.port).to.equal(port);
                    done();
                });
        });

        // Check path is correct
        it('path should be test', function (done) {
            chai.request(url)
                .get('/test')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    let responseBody = response.body;
                    expect(responseBody).to.not.be.undefined;
                    expect(responseBody.path).to.not.be.undefined;
                    expect(responseBody.path).to.equal('/test');
                    done();
                });
        });

        // Check header is an array
        it('header should be an array', function (done) {
            chai.request(url + '/test')
                .get('/')
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                    let responseBody = response.body;
                    expect(responseBody).to.not.be.undefined;
                    expect(responseBody.header).to.not.be.undefined;
                    expect(responseBody.header).to.be.a('array');
                    done();
                });
        });
    });
});
