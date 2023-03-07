import jazzicon from 'jazzicon'

const Profile = {
    generate: function (diameter = 100, address) {
        let seed = address.split(/ /)[0].replace(/[^\d]/g, '')
        return jazzicon(diameter, seed)
    },
    shortAddress: function (address, pad, gap = '...') {
        return address.substring(0, pad) + gap +
            address.substring(address.length - pad,
                address.length)
    },
    shortName: function (address, pad) {
        if (address.toLowerCase() == "0x1a4d347fbdf09e2019b9a75d23d4be4ce74421ec".toLowerCase()) {
            return 'Alice.ftm'
        }
        if (address.toLowerCase() == "0x25213fcda4eb079927cac2bcd5c513068b94babd".toLowerCase()) {
            return 'Bob.ftm'
        }
        let name = address.replace(/[^a-zA-Z]/gm,"")
        return '0x' + name.substring(1, pad)  + '.ftm'
    },
}

export default Profile