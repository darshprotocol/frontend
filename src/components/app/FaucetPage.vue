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
                            <PrimaryButton v-on:click="mint(asset)" :width="'fit-content'" :text="'Mint'" />
                        </td>
                        <td>
                            <PrimaryButton v-on:click="add(asset)" :width="'fit-content'" :text="'Add to Metamask'" />
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
export default {
    data() {
        return {
            assets: AssetLibrary.assets
        };
    },
    methods: {
        mint: async function (asset) {
            await Approval.faucetMint(
                asset,
                await Authentication.userAddress()
            )
        },
        add: async function (asset) {
            await Approval.addToMetamask(asset)
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