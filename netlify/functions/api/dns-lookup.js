/**
 * DNS 动态查询
 * 
 * 权限：公开
 */
const dns = require('dns');

exports.handler = function (event, context, callback) {
  dns.resolve(event.queryStringParameters.hostname, 'ANY', (err, records) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(records),
    });
  });
};