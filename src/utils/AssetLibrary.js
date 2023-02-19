const AssetLibrary = {
    assets: [
        {
            id: 0,
            symbol: 'FTM',
            name: 'Fantom',
            image: 'ftm',
            type: 'variable',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            maxDecimal: 6
        },
        {
            id: 1,
            symbol: 'WBTC',
            name: 'Bitcoin',
            image: 'btc',
            type: 'variable',
            address: '0xdC512b00b170FEC68f4826dEbaC04bA643972A1a',
            maxDecimal: 10
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Ethereum',
            image: 'eth',
            type: 'variable',
            address: '0x66250246902e541Fd9B16F7C47F1d4563Fa13073',
            maxDecimal: 5
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x48577d503A8357DCCD866a7Cb33529809aE89B28',
            maxDecimal: 2
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x148B2A8c93bc3e8e066B822f11e524Bfb861C686',
            maxDecimal: 2
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0x445A8A85664A048C2c36b8E50F0e71cEfeCD17A2',
            maxDecimal: 2
        },
    ],
    findAsset: function(address) {
        return this.assets.find(asset => asset.address.toLowerCase() == address.toLowerCase())
    },
    otherAssets: function(address) {
        return this.assets.filter(asset => asset.address.toLowerCase() != address.toLowerCase())
    },
    findConjugates: function(type, except = null) {
        return this.assets.filter(asset => asset.type != type && asset.address != except)
    }
}

export default AssetLibrary