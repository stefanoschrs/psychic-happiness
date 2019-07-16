const { parse } = require('url')
const { getFlights } = require('./crawler')

module.exports = async function (req, res) {
  try {
    // TODO: Add parameters for City, Dates
    // const { pathname = '/' } = parse(req.url)
    const flights = await getFlights()

    res.setHeader('Content-Type', 'application/json')
    res.status(200).send({ flights })
  } catch (err) {
    console.error(err.message)

    res.setHeader('Content-Type', 'text/html')
    res.sendStatus(500)
  }
}
