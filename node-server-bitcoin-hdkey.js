var http = require('http');
var url = require('url');
var querystring = require('querystring');
var bitcore = require('bitcore-lib');

var server = http.createServer(function(req, res) {

    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    if ('offset' in params && 'count' in params && 'hdkey' in params) {
    
		var offset= Number(params['offset']);
		var count = Number(params['count']);

		var xpub = new bitcore.HDPublicKey(params['hdkey']);
		
		var i=Number(offset);
		for(;i< (offset+count);++i) {

			var derivedAddress = new bitcore.Address(xpub.derive(i).publicKey, bitcore.Networks.livenet);
			res.write(derivedAddress.toString()); 
			res.write('\n');
		}
	} else {
        res.write('Params offset, count and hdkey are mandatory');
    }
    res.end();
});

server.listen(9666);
