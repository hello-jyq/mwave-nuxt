const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')

const nuxt = require('./nuxt_ssr')
const handler = sls(nuxt, {
  type: 'edge-origin-request',
  platform: 'aws'
});

module.exports.nuxt_ssr = async (event, context) => {
  console.log("Starting ssr lambda");
  // Make sure nuxt is ready to handle requests
  await nuxt.ready();
  // execute handler
  return await handler(event, context);
};
