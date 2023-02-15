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
            address: '0xAfC025C55C2BCB2BFD6Cd071203b281D788DFBcD'
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Ethereum',
            image: 'eth',
            type: 'variable',
            address: '0x59c5067A5B389589B2ecFa687bD18B45a5bAED2B'
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x31cfb373E59d543d442b11e7112A192c7Bec6d7f'
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x48D55a6D64084b52Bd257b932A6d5F78F139705E'
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0x47114aC0c40b0FE9B549fC96F7BAd5b68ba0e7C9'
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