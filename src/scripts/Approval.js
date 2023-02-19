/* eslint-disable no-undef */
import Web3 from "web3"
import ERC20 from '../contracts/ERC20.json'

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const Approval = {
    approve: async function(userAddress, amount, tokenAddress, spender) {
        const web3 = new Web3('https://fantom-testnet.public.blastapi.io');
        const contract = new web3.eth.Contract(ERC20.abi, tokenAddress)

        if (tokenAddress == nativeAddress) return

        try {
            await  contract.methods.approve(spender, amount).send({ from: userAddress })
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    },
    getAllocationOf: async function(userAddress, tokenAddress, spender) {
        const web3 = new Web3('https://fantom-testnet.public.blastapi.io');
        const contract = new web3.eth.Contract(ERC20.abi, tokenAddress)

        if (tokenAddress == nativeAddress) return '10000000000000000000000000000000000000000000000000000000'

        try {
            return await contract.methods.allowance(userAddress, spender).call();
        } catch (error) {
            return '0'
        }
    }
}

export default Approval