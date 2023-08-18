import puppeteer from 'puppeteer'

describe('Inn Form', () => {
    let browser
    let page

    beforeEach(async () => {
        browser = await puppeteer.launch({ headless: 'new' })

        page = await browser.newPage()
    })

    test('valid input', async () => {
        await page.goto('http://localhost:9000')
        const input = await page.$('.input')
        await input.type('4556737586899855')
        const button = await page.$('.btn')
        await button.click()
        const validImageDisplayStyle = await page.$eval('.valid', el => getComputedStyle(el).getPropertyValue('display'))
        expect(validImageDisplayStyle).toBe('block')
    })

    test('invalid input', async () => {
        await page.goto('http://localhost:9000')
        const input = await page.$('.input')
        await input.type('4556737586899856')
        const button = await page.$('.btn')
        await button.click()
        const validImageDisplayStyle = await page.$eval('.invalid', el => getComputedStyle(el).getPropertyValue('display'))
        expect(validImageDisplayStyle).toBe('block')
    })

    test.each([
        ['americanExpress', '34'],
        ['americanExpress', '37'],
        ['dinersClub', '30'],
        ['dinersClub', '36'],
        ['dinersClub', '38'],
        ['jcb', '31'],
        ['jcb', '35'],
        ['discover', '60'],
        ['visa', '4'],
        ['masterCard', '5']
    ])('Testing card image: %s', async (name, number) => {
        await page.goto('http://localhost:9000')
        const input = await page.$('.input')
        await input.type(number)
        const imageElTopValue = await page.$eval(`#${name}`, el => getComputedStyle(el).getPropertyValue('top'))
        expect(imageElTopValue).toBe('0px')
    })

    afterEach(async () => {
        await browser.close()
    })
})
