<template>
    <main>
        <table class="assets">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Ticker</td>
                    <td>Actions</td>
                    <td></td>
                </tr>
            </thead>
            <div class="tbody">
                <tbody v-for="asset in assets.slice(1, 6)" :key="asset">
                    <tr>
                        <td>
                            <p>{{ asset.name }}</p>
                        </td>
                        <td>
                            <p>{{ asset.symbol }}</p>
                        </td>
                        <td>
                            <PrimaryButton :state="mintingFor != null ? 'disable' : ''"
                                :progress="mintingFor == asset.address" v-on:click="mintingFor == null ? mint(asset) : null"
                                :width="'fit-content'" :text="'Mint'" />
                        </td>
                        <td>
                            <PrimaryButton :state="addingFor != null ? 'disable' : ''"
                                :progress="addingFor == asset.address" v-on:click="addingFor == null ? add(asset) : null"
                                :width="'fit-content'" :text="'Add to Metamask'" />
                        </td>
                    </tr>
                </tbody>
            </div>
        </table>
    </main>
</template>

<script setup>
import PrimaryButton from '../PrimaryButton.vue';
</script >

<script>
import AssetLibrary from '../../utils/AssetLibrary';
import Approval from '../../scripts/Approval';
import Authentication from '../../scripts/Authentication';
import { messages } from '../../reactives/messages';
export default {
    data() {
        return {
            assets: AssetLibrary.assets,
            mintingFor: null,
            addingFor: null
        };
    },
    methods: {
        mint: async function (asset) {
            this.mintingFor = asset.address

            const trx = await Approval.faucetMint(
                asset,
                await Authentication.userAddress()
            )

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Token minted',
                    description: 'Faucet token was successfully minted.',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet.ftmscan.com/tx/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Mint failed',
                    description: 'Faucet token failed to mint.',
                    type: 'failed'
                })
            }

            this.mintingFor = null
        },
        add: async function (asset) {
            this.addingFor = asset.address

            const added = await Approval.addToMetamask(asset)
            if (added) {
                messages.insertMessage({
                    title: 'Token added',
                    description: 'Token has been successfully added to metamask.',
                    type: 'success'
                })
            } else {
                messages.insertMessage({
                    title: 'Adding failed',
                    description: 'Token failed to add to metamask.',
                    type: 'failed'
                })
            }

            this.addingFor = null
        }
    }
}
</script>

<style scoped> main {
     margin-top: 60px;
     padding: 0 60px;
 }

 td {
     width: calc(100% / 4);
 }

 .assets {
     width: 100%;
     table-layout: fixed;
 }

 thead {
     height: 54px;
     width: 100%;
     display: table;
     padding: 0 30px;
 }

 thead td {
     color: var(--textlight);
     font-weight: 500;
     font-size: 14px;
 }

 .tbody {
     border-radius: 6px;
     overflow: hidden;
 }

 tbody {
     background: var(--bglight);
     width: 100%;
     display: table;
     padding: 0 30px;
 }

 tbody:nth-child(even) {
     background: var(--bglighter);
 }

 tbody td {
     height: 90px;
 }

 tbody p {
     font-weight: 400;
     font-size: 14px;
     color: var(--textnormal);
     margin-top: 2px;
 }
</style>