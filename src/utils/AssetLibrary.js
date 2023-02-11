const AssetLibrary = {
    assets: [
        {
            id: 0,
            name: 'FTM',
            image: 'ftm',
            type: 'variable'
        },
        {
            id: 1,
            name: 'WBTC',
            image: 'btc',
            type: 'variable'
        }, {
            id: 2,
            name: 'WETH',
            image: 'eth',
            type: 'variable'
        }, {
            id: 3,
            name: 'USDT',
            image: 'usdt',
            type: 'stable'
        }, {
            id: 4,
            name: 'USDC',
            image: 'usdc',
            type: 'stable'
        }, {
            id: 5,
            name: 'DAI',
            image: 'dai',
            type: 'stable'
        },
    ],
    findAsset: function(id) {
        return this.assets.find(asset => asset.id == id)
    },
    findConjugates: function(type) {
        return this.assets.filter(asset => asset.type != type)
    }
}

export default AssetLibrary