<template>
    <main>
        <div class="box">
            <img src="/images/linear_gradient_background.png" alt="">
            <div class="box_item">
                <div class="icon">
                    <div>
                        <div>
                            <IconWallet />
                        </div>
                    </div>
                </div>
                <div class="text">
                    <h3>Wallet not Connected</h3>
                    <p>Connect a wallet to view this page.</p>
                </div>
                <div class="action">
                    <PrimaryButton v-on:click="authenticate()" :text="'Connect Wallet'" :width="'440px'" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { messages } from '../reactives/messages';
import Authentication from '../scripts/Authentication';
import IconWallet from './icons/IconWallet.vue';
import PrimaryButton from './PrimaryButton.vue';
</script>

<script>
export default {
    methods: {
        authenticate: async function () {
            const userAddress = await Authentication.userAddress(true);
            if (!userAddress) {
                messages.insertMessage({
                    title: 'Failed to connect wallet',
                    description: 'Please check your network, refresh or try again.',
                    type: 'failed'
                })
            } else {
                this.$router.go();
            }
        }
    }
}
</script>

<style scoped>
main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -60px;
}

.box {
    width: 800px;
    max-width: 100%;
    position: relative;
}

img {
    width: 100%;
}

.box_item {
    position: absolute;
    top: 340px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon {
    width: 100px;
    height: 100px;
    background: rgba(105, 54, 245, 0.05);
    border-radius: 8px;
    padding: 10px;
}

.icon>div {
    width: 80px;
    height: 80px;
    background: rgba(105, 54, 245, 0.2);
    border-radius: 8px;
    padding: 10px;
}

.icon>div>div {
    width: 60px;
    height: 60px;
    background: var(--primary);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text {
    text-align: center;
}

.text h3 {
    margin-top: 60px;
    font-size: 25px;
    color: var(--textnormal);
}

.text p {
    margin-top: 20px;
    font-size: 14px;
    color: var(--textdimmed);
}

.action {
    margin-top: 60px;
}
</style>