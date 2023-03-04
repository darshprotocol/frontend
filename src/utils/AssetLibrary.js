const AssetLibrary = {
    assets: [
        {
            id: 0,
            symbol: 'FTM',
            name: 'Fantom',
            shortName: 'Fantom',
            image: 'ftm',
            type: 'native',
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            maxDecimal: 6,
            faucetAmount: '0',
            minLendOffer: 160,
            maxLendOffer: 32000,
            minBorrowOffer: 160,
            maxBorrowOffer: 16000
        },
        {
            id: 1,
            symbol: 'WBTC',
            name: 'Wrapped Bitcoin',
            shortName: 'Bitcoin',
            image: 'btc',
            type: 'native',
            address: '0xBcEdBF29D6dff33fCf5CA6c1816CcA886fd6F5C4',
            maxDecimal: 10,
            faucetAmount: '10000000000000000000',
            minLendOffer: 0.008,
            maxLendOffer: 0.6,
            minBorrowOffer: 0.008,
            maxBorrowOffer: 0.3
        }, {
            id: 2,
            symbol: 'WETH',
            name: 'Wrapped Ethereum',
            shortName: 'Ethereum',
            image: 'eth',
            type: 'native',
            address: '0x2b42D1149f3427044acd6B310F6721c5d87c652e',
            maxDecimal: 5,
            faucetAmount: '50000000000000000000',
            minLendOffer: 0.08,
            maxLendOffer: 10,
            minBorrowOffer: 0.08,
            maxBorrowOffer: 5
        }, {
            id: 3,
            symbol: 'USDT',
            name: 'USDT',
            shortName: 'USDT',
            image: 'usdt',
            type: 'stable',
            address: '0x114Eb0218066A32d072bDe9F1C396D0F0C5F5180',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000',
            minLendOffer: 80,
            maxLendOffer: 20000,
            minBorrowOffer: 80,
            maxBorrowOffer: 10000
        }, {
            id: 4,
            symbol: 'USDC',
            name: 'USDC',
            shortName: 'USDC',
            image: 'usdc',
            type: 'stable',
            address: '0x81733e12b6C9c5F4Dd6459F3766dFDB2DC1f89f8',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000',
            minLendOffer: 80,
            maxLendOffer: 20000,
            minBorrowOffer: 80,
            maxBorrowOffer: 10000
        }, {
            id: 5,
            symbol: 'DAI',
            name: 'DAI',
            shortName: 'DAI',
            image: 'dai',
            type: 'stable',
            address: '0xBE6FdBafBD486733601cA35300Cc1dbb763d6edB',
            maxDecimal: 2,
            faucetAmount: '40000000000000000000000',
            minLendOffer: 80,
            maxLendOffer: 20000,
            minBorrowOffer: 80,
            maxBorrowOffer: 10000
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