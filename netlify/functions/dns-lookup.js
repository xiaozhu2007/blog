/**
 * DNS 动态查询
 * 
 */
const dns = require('dns');

exports.handler = function (event, context, callback) {
  dns.lookup(event.queryStringParameters.hostname, function onLookup(err, address, family) {

  });
  /*
  dns.resolve(event.queryStringParameters.hostname, 'A', (err, hostnames) {
    if (!err) {
      return hostnames
    } else {
      return err
    }
  });*/
  dns.resolve(event.queryStringParameters.hostname, 'ANY', (err, records) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(records),
    });
  });
};