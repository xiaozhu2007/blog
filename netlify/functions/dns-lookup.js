/**
 * DNS 动态查询
 * 
 */
const dns = require('dns');

exports.handler = function (event, context, callback) {
  let hostname = event.queryStringParameters.hostname
  let types = event.queryStringParameters.type

  dns.resolve(hostname, types, (err, records) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(records),
    });
  });
};
