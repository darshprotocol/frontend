const AssetLibrary = {
    assets: [
        {
            id: 0,
            symbol: 'FTM',
            name: 'Fantom',
            image: 'ftm',
            type: 'variable',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        },
        {
            id: 1,
            symbol: 'WBTC',
            name: 'Bitcoin',
            image: 'btc',
            type: 'variable',
            address: '0xb513Df504aa2bC176373556dC7A5Dc77106A12E5'
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Ethereum',
            image: 'eth',
            type: 'variable',
            address: '0xD2c6C76c88Fc9509877bC8a85D92807caC296A81'
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x7dFA705e4045bDF13B613e8F50B059DFA58E494B'
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x8b6bf1d64A918c919174d03920dd0f4bfaA77390'
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0xF29AC70f09366d9ACA216775713E8b858164276A'
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