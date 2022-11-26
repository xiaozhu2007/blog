exports.handler = async function (event, context) {
  if (event.queryStringParameters.msg != null) {
    var custom_message = event.queryStringParameters.msg
  } else {
    var custom_message = 'Pong!'
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: custom_message,
      code: 0
    }),
  };
};
