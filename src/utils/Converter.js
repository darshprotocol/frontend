import Web3 from "web3";

const Converter = {
    fromWei: function(value) {
        try {
            const web3 = new Web3()
            return web3.utils.fromWei(value, 'ether')
        } catch (error) {
            return null
        }
    },
    toWei: function(value) {
        try {
            const web3 = new Web3()
            return web3.utils.toWei(value, 'ether')
        } catch (error) {
            return null
        }
    },
    toMoney: function(amount, mF = 2) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: mF,
            //maximumFractionDigits: 0,
        });
        return formatter.format(amount).replace('$', '')
    }
}

export default Converter