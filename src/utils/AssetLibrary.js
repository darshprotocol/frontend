const AssetLibrary = {
    assets: [
        {
            id: 0,
            symbol: 'FTM',
            name: 'Fantom',
            image: 'ftm',
            type: 'native',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            maxDecimal: 6
        },
        {
            id: 1,
            symbol: 'WBTC',
            name: 'Bitcoin',
            image: 'btc',
            type: 'native',
            address: '0x493663b03Cf7C9A0758C91600e05849002c2c6ea',
            maxDecimal: 10
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Ethereum',
            image: 'eth',
            type: 'native',
            address: '0x4717a19FE301E93a34fa218A06353fb32B12844F',
            maxDecimal: 5
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x10772d4Fa03c2ee747c2fbBe7bD7B240799EbC62',
            maxDecimal: 2
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x7B53b438671c7f42F5a0C2F4F0cdD4ef37F6C28E',
            maxDecimal: 2
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0x47275Ef69Ef25Cb95474177e3b056B5Ca5019EFE',
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