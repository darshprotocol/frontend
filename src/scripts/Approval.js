/* eslint-disable no-undef */
import Web3 from "web3"
import ERC20 from '../contracts/ERC20.json'

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const Approval = {
    approve: async function (userAddress, amount, tokenAddress, spender) {
        // const web3 = new Web3('https://fantom-testnet.public.blastapi.io');
        const web3 = new Web3(ethereum);
        const contract = new web3.eth.Contract(ERC20.abi, tokenAddress)

        if (tokenAddress == nativeAddress) return

        try {
            const trx = await contract.methods.approve(spender, amount).send({ from: userAddress })
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    },
    getAllocationOf: async function (userAddress, tokenAddress, spender) {
        const web3 = new Web3('https://fantom-testnet.public.blastapi.io');
        const contract = new web3.eth.Contract(ERC20.abi, tokenAddress)

        if (tokenAddress.toLowerCase() == nativeAddress.toLowerCase()) return '100000000000000000000000000000000000000000'

        try {
            return await contract.methods.allowance(userAddress, spender).call();
        } catch (error) {
            console.error(error);
            return '0'
        }
    },
    addToMetamask: async function (asset) {
        try {
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: asset.address,
                        symbol: asset.symbol,
                        decimals: '18',
                        image: 'https://darshprotocol.netlify.app/images/' + asset.image + '.png',
                    },
                },
            });
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    },
    faucetMint: async function (asset, userAddress) {
        try {
            const web3 = new Web3(ethereum)
            const contract = new web3.eth.Contract(ERC20.abi, asset.address)

            const trx = await contract.methods.faucetMint(asset.faucetAmount).send({ from: userAddress })
            return trx
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default Approval