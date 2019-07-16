const { parse } = require('url')

module.exports = async function (req, res) {
  try {
    const { pathname = '/' } = parse(req.url)

    res.setHeader('Content-Type', 'application/json')
    res.status(200).send({
      pathname
    })
  } catch (e) {
    console.error(e.message)

    res.setHeader('Content-Type', 'text/html')
    res.status(500).send('<h1>Unexpected Error</h1><p>Sorry, there was a problem</p>')
  }
}
