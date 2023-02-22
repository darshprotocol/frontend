const AssetLibrary = {
    assets: [
        {
            id: 0,
            symbol: 'FTM',
            name: 'Fantom',
            image: 'ftm',
            type: 'native',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            maxDecimal: 6,
            faucetAmount: '0'
        },
        {
            id: 1,
            symbol: 'WBTC',
            name: 'Bitcoin',
            image: 'btc',
            type: 'native',
            address: '0x12cEef63C446f0ed1C89558d2D391358dF4f7b4B',
            maxDecimal: 10,
            faucetAmount: '10000000000000000000'
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Ethereum',
            image: 'eth',
            type: 'native',
            address: '0x949b0DAefEBEBD82Da725c5237529CBc0f3a7A19',
            maxDecimal: 5,
            faucetAmount: '50000000000000000000'
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x642eaECe1868844aaa25fF1Faef7Fd7765a7c93f',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000'
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x2ee75386c3EC42F0eeb2663278afF929c90CD5C9',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000'
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0x1af942B51bED831d66C81b96d80F1B39E6c751f5',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000'
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