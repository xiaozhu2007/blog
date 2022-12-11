/**
 * DNS 动态查询
 * 
 * 权限：公开
 */
const dns = require('dns');

let hostname = event.queryStringParameters.hostname

exports.handler = function (event, context, callback) {
  dns.resolve(hostname, 'ANY', (err, records) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(records),
    });
  });
};

function lookup(hostname) {
  dns.lookup(hostname, function onLookup(err, address, family) {
    // console.log(address);
    dns.reverse(address, function (err, hostnames) {
      if (err) {
        console.log(err.stack);
      }
      // console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
    });
  });
}