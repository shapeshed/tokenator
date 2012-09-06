var connect = require('connect'),
    http = require('http'),
    assert = require('assert'),
    tokenator = require('../lib/tokenator');

function accessGranted(req, res){
  res.end('Tokenator says yes!');
}

var app = connect()
  .use(tokenator(['5917f138c80b512d14a4ee2fe05a17dc', '7b1a47ab847f7534b507c6ae4a763118']))
  .use(accessGranted)


describe('Making a get request', function(){
  before(function(){
    http.Server(app).listen(3000);
  })
  describe('with a valid token', function(){
    it('should get return a 200 response', function(done){
      http.get( { 
        host: '127.0.0.1', 
        port: '3000', 
        headers: { 
          'api-token': '7b1a47ab847f7534b507c6ae4a763118' 
        } 
      }, function(res){
        assert.strictEqual(res.statusCode, 200);
        done();
      })
    })
    it('should return the correct body content', function(done){
      http.get( { 
        host: '127.0.0.1', 
        port: '3000', 
        headers: { 
          'api-token': '7b1a47ab847f7534b507c6ae4a763118' 
        } 
      }, function(res){
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          assert.strictEqual(body, 'Tokenator says yes!');
          done();
        });
      })
    })
  })
  describe('with no token', function(){
    it('should get return a 401 response', function(done){
      http.get( { host: '127.0.0.1', port: '3000' }, function(res){
        assert.strictEqual(res.statusCode, 401);
        done();
      })
    })
    it('should have an application/json header', function(done){
      http.get( { host: '127.0.0.1', port: '3000' }, function(res){
        assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
        done();
      })
    })
    it('should return an error message as json', function(done){
      http.get( { host: '127.0.0.1', port: '3000' }, function(res){
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          assert.strictEqual(body, '{"errors":"An API token is required."}');
          done();
        });
      })
    })
  })
  describe('with a invalid token', function(){
    it('should get return a 401 response', function(done){
      http.get( { 
        host: '127.0.0.1', 
        port: '3000', 
        headers: { 
          'api-token': 'invalidtoken' 
        } 
      }, function(res){
        assert.strictEqual(res.statusCode, 401);
        done();
      })
    })
    it('should have an application/json header', function(done){
      http.get( { 
        host: '127.0.0.1', 
        port: '3000', 
        headers: { 
          'api-token': 'invalidtoken' 
        } 
      }, function(res){
        assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
        done();
      })
    })
    it('should return an error message as json', function(done){
      http.get( { 
        host: '127.0.0.1', 
        port: '3000', 
        headers: { 
          'api-token': 'invalidtoken' 
        } 
      }, function(res){
        var body = '';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', function () {
          assert.strictEqual(body, '{"errors":"Your API token is invalid."}');
          done();
        });
      })
    })
  })
})
