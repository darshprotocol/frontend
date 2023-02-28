import BigNumber from 'bignumber.js'

BigNumber.config({ DECIMAL_PLACES: 30 });

var Units = {}

var rawUnits = {
    "wei": "1",
    "kwei": "1000",
    "Kwei": "1000",
    "babbage": "1000",
    "femtoether": "1000",
    "mwei": "1000000",
    "Mwei": "1000000",
    "lovelace": "1000000",
    "picoether": "1000000",
    "gwei": "1000000000",
    "Gwei": "1000000000",
    "shannon": "1000000000",
    "nanoether": "1000000000",
    "nano": "1000000000",
    "szabo": "1000000000000",
    "microether": "1000000000000",
    "micro": "1000000000000",
    "finney": "1000000000000000",
    "milliether": "1000000000000000",
    "milli": "1000000000000000",
    "ether": "1000000000000000000",
    "eth": "1000000000000000000",
    "kether": "1000000000000000000000",
    "grand": "1000000000000000000000",
    "mether": "1000000000000000000000000",
    "gether": "1000000000000000000000000000",
    "tether": "1000000000000000000000000000000"
}

var units = {}

Object.keys(rawUnits).map(function (unit) {
    units[unit] = new BigNumber(rawUnits[unit], 10)
})

Units.units = rawUnits

var re = RegExp(/^[0-9]+\.?[0-9]*$/)

function convert(value, from, to) {
    if (!re.test(value)) {
        throw new Error('Unsupported value')
    }

    from = from.toLowerCase()
    if (!units[from]) {
        throw new Error('Unsupported input unit')
    }

    to = to.toLowerCase()
    if (!units[to]) {
        throw new Error('Unsupported output unit')
    }

    return new BigNumber(value, 10).multipliedBy(units[from]).div(units[to]).toString(10)
}

export default convert