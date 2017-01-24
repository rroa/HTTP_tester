process.env.NODE_ENV = 'test';

// deps
let chai = require('chai');
var request = require('request');

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
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  
    // Check response object integrity
    it('object structure should be correct', function (done) {
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.have.property('method');
        expect(response).to.have.property('path');
        expect(response).to.have.property('host');
        expect(response).to.have.property('port');
        expect(response).to.have.property('header');
        done();
      });
    });

    // Check method is correct
    it('method should be GET', function (done) {
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.not.be.undefined;
        expect(response.method).to.not.be.undefined;
        expect(response.method).to.equal('GET');
        done();
      });
    });

    // Check host is correct
    it('host should be ' + host, function (done) {
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.not.be.undefined;
        expect(response.host).to.not.be.undefined;
        expect(response.host).to.equal(host);
        done();
      });
    });

    // Check port is correct
    it('port should be ' + port, function (done) {
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.not.be.undefined;
        expect(response.port).to.not.be.undefined;
        expect(response.port).to.equal(port);
        done();
      });
    });

    // Check path is correct
    it('path should be test', function (done) {
      var options = {
        url: url + '/test',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.not.be.undefined;
        expect(response.path).to.not.be.undefined;
        expect(response.path).to.equal('/test');
        done();
      });
    });

    // Check header is an array
    it('header should be an array', function (done) {
      var options = {
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request.get(options, function (err, res, body) {
        let response = JSON.parse(res.body);
        expect(response).to.not.be.undefined;
        expect(response.header).to.not.be.undefined;
        expect(response.header).to.be.a('array');
        done();
      });
    });
  });
});
