/* eslint-disable no-undef */
const Authentication = {
    userAddress: async function() {
        if (typeof ethereum === 'undefined') return null
        try {
            await ethereum.request({
                method: 'eth_requestAccounts'
            });
            await this.switchToFantomTestnet()
            const accounts = await ethereum.enable();
            return accounts[0]
        } catch (error) {
            console.error(error);
            return null
        }
    },

    switchToFantomTestnet: async function() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xfa2' }],
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xfa2',
                            chainName: 'Fantom Opera Testnet',
                            nativeCurrency: {
                                name: 'Fantom',
                                symbol: 'FTM',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://testnet.ftmscan.com'],
                            rpcUrls: ['https://fantom-testnet.public.blastapi.io'],
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    },
}

export default Authentication