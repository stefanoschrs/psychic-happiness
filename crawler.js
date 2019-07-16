const puppeteer = require('puppeteer-core')
const chrome = require('chrome-aws-lambda')

const nowRegion = process.env.NOW_REGION

async function getFlights() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: nowRegion
      ? await chrome.executablePath
      : (process.env.CHROME_BIN || null),
    args: nowRegion
      ? chrome.args
      : ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
  })

  const page = await browser.newPage()

  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url, { waitUntil: 'networkidle2' })

  const flights = await page.evaluate(() => {
    return [].map
      .call(document.querySelectorAll('ol > li'), (el) => ({
        location: el.querySelector('.flt-subhead1').innerText,
        dates: el.querySelector('[class*="__dates"] [class*="__short"]').innerText,
        price: el.querySelector('[class*="__price-row"] [class*="__price"]').innerText
      }))
      .sort((a, b) => +a.price.substr(1) - +b.price.substr(1))
  })

  await browser.close()

  return flights
}

module.exports = { getFlights }
