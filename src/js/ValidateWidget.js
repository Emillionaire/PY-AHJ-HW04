export default class ValidateWidget {
    #cardsList = {
        americanExpress: ['34', '37'],
        dinersClub: ['30', '36', '38'],
        jcb: ['31', '35'],
        discover: ['60'],
        visa: ['4'],
        masterCard: ['5']
    }

    constructor (validateForm) {
        this.validateForm = validateForm
        this.input = this.validateForm.querySelector('.input')
        this.allCards = document.querySelectorAll('.card-image')
    }

    init () {
        this.validateForm.addEventListener('submit', this.onBtnClick.bind(this))
        this.input.addEventListener('input', this.onInput.bind(this))
    }

    onBtnClick (e) {
        e.preventDefault()
        const validIcon = this.validateForm.querySelector('.valid')
        const invalidIcon = this.validateForm.querySelector('.invalid')

        if (this.isValid(this.input.value.trim())) {
            validIcon.style.display = 'block'
            invalidIcon.style.display = 'none'
        } else {
            invalidIcon.style.display = 'block'
            validIcon.style.display = 'none'
        }
    }

    onInput (e) {
        const cardType = this.cardType(this.input.value.trim())
        const cardEl = document.getElementById(cardType)
        for (const cardImage of this.allCards) {
            if (cardImage === cardEl) {
                cardImage.style.top = '0'
            } else {
                cardImage.style.top = '-25px'
            }
        }
    }

    reverseString (str) {
        const splitString = str.split('')
        const reverseArray = splitString.reverse()
        const joinArray = reverseArray.join('')
        return joinArray
    }

    isValid (cardNumber) {
        const length = cardNumber.length
        const cardNumberPart = cardNumber.substr(0, length - 1)
        const checkNumber = Number(cardNumber[length - 1])
        const reversedCardNumberPart = this.reverseString(cardNumberPart)

        let sum = 0
        for (let i = 0; i < reversedCardNumberPart.length; i++) {
            if (i % 2 !== 0) {
                sum += Number(reversedCardNumberPart[i])
            } else if (Number(reversedCardNumberPart[i]) > 4) {
                sum += 2 * Number(reversedCardNumberPart[i]) - 9
            } else {
                sum += 2 * Number(reversedCardNumberPart[i])
            }
        }
        const checkDigit = 10 - (sum % 10)
        return checkDigit === checkNumber
    }

    cardType (cardNumber) {
        for (const cardType in this.#cardsList) {
            for (const number of this.#cardsList[cardType]) {
                if (cardNumber.startsWith(number)) {
                    return cardType
                }
            }
        }
    }
}
