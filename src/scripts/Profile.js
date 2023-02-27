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
        // if (address.toLowerCase() == "0x36c8f83F1dcC316d591d5c15935951D240752558".toLowerCase()) {
        //     return 'Ibro.ftm'
        // }
        let name = address.replace(/[^a-zA-Z]/gm,"")
        return '0x' + name.substring(1, pad)  + '.ftm'
    },
}

export default Profile