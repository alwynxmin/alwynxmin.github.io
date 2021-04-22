const got = require('got')

const API_ENDPOINT = process.env.API_ENDPOINT

exports.handler = async function(event) {
  const { body: { guests } } = await got(API_ENDPOINT, { responseType: 'json' })
  const { queryStringParameters: { name } } = event
  const re = new RegExp(name, 'i')
  const matches = guests.filter(g => re.test(g.name))
  
  return {
    statusCode: 200,
    body: JSON.stringify(matches.length === 1 
      ? matches[0]
      : { message: matches.length === 0 ? 'No match found' : 'Too many matches, please try with your full name' }
    ),
  }
}