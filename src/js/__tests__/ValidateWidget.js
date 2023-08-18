/**
 * @jest-environment jsdom
 */

import ValidateWidget from '../ValidateWidget'

document.body.innerHTML = `<div class="card-images">
<img src="https://www.validcreditcardnumber.com/static/img/card-amex.gif" class="card-image" id="americanExpress" alt="">
<img src="https://www.validcreditcardnumber.com/static/img/card-diners.gif" class="card-image" id="dinersClub" alt="">
<img src="https://www.validcreditcardnumber.com/static/img/card-discover.gif" class="card-image" id="discover" alt="">
<img src="https://www.validcreditcardnumber.com/static/img/card-jcb.gif" class="card-image" id="jcb" alt="">
<img src="https://www.validcreditcardnumber.com/static/img/card-mastercard.gif" class="card-image" id="masterCard" alt="">
<img src="https://www.validcreditcardnumber.com/static/img/card-visa.gif" class="card-image" id="visa" alt="">
</div>
<form action="" class="validate-form">
<input type="text" class="input">
<input type="submit" value="Click to Validate" class="btn">
<svg class="valid" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
<svg class="invalid" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
</form>`

const form = document.querySelector('.validate-form')
const validateWidget = new ValidateWidget(form)

test('reverseString function', () => {
    expect(validateWidget.reverseString('test')).toBe('tset')
})

test('isValid function true', () => {
    expect(validateWidget.isValid('4556737586899855')).toBe(true)
})

test('isValid function false', () => {
    expect(validateWidget.isValid('4556737586899856')).toBe(false)
})