var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EthereumBip44 = require('ethereum-bip44');

var server = http.createServer(function(req, res) {

    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    if ('offset' in params && 'count' in params && 'hdkey' in params) {

		var offset= Number(params['offset']);
		var count = Number(params['count']);

		var i=Number(offset);

		var wallet = EthereumBip44.fromPublicSeed(params['hdkey']);

		for(;i< (offset+count);++i) {
			res.write(wallet.getAddress(i));
			res.write('\n');
		}      
    }
    else {
        res.write('KO');
    }
    res.end();

});

server.listen(9667);
