/*    
*	tokenator
*	Limits access to APIs based on a token
*
*/
module.exports = function(tokens){
  var tokens = tokens || false;
  return function(req, res, next){
    var token = req.headers['api-token'] || false;
    if (!token) { 
      res.writeHead(401, {  'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ errors: 'An API token is required.'}));
    }
    else if (tokens.indexOf(token) === -1) {
      res.writeHead(401, {  'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ errors: 'Your API token is invalid.'}));
    }
    else {
      req.token = token;
      next();
    } 
  } 
};
