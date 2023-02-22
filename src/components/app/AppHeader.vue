<template>
    <main>
        <div class="logo"></div>
        <div class="header">
            <div class="pages">
                <RouterLink to="/">Home</RouterLink>
                <a href="https://darshprotocol.gitbook.io/product-docs" target="_blank">Docs</a>
                <a href="">Governance</a>
                <RouterLink to="/faucet">Faucet</RouterLink>
            </div>
            <div class="actions">
                <div class="notifications icon_badge">
                    <IconNotification />
                    <div class="new_notification"></div>
                </div>
                <div class="connect_wallet" v-on:click="authenticate">
                    <IconMetamask />
                    <p v-if="userAddress">{{ userAddress.substring(0, 5) }}•••{{
                        userAddress.substring(userAddress.length - 5,
                            userAddress.length)
                    }}</p>
                    <p v-else>Connect Wallet</p>
                </div>
                <div class="settings icon_badge">
                    <IconSettings />
                </div>
            </div>
        </div>
</main>
</template>

<script setup>
import IconNotification from '../icons/IconNotification.vue';
import IconMetamask from '../icons/IconMetamask.vue';
import IconSettings from '../icons/IconSettings.vue';
</script>

<script>
import Authentication from '../../scripts/Authentication'
export default {
    props: ['userAddress'],
    methods: {
        authenticate: async function (request = false) {
            const userAddress = await Authentication.userAddress(request)
            if (request) this.$router.go()
            this.$emit('connected', userAddress)
        }
    },
    mounted() {
        this.authenticate()
    }
}
</script>

<style scoped>
main {
    top: 0;
    width: 1440px;
    max-width: 100%;
    height: 90px;
    position: fixed;
    border-bottom: 1px solid var(--bglightest);
    display: grid;
    padding-left: 50px;
    padding-right: 60px;
    grid-template-columns: 260px auto;
    z-index: 10;
    background: var(--background);
    border-right: 1px solid var(--bglightest);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pages {
    display: flex;
    gap: 50px;
}

.pages a {
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
    text-decoration: none;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.connect_wallet {
    height: 40px;
    padding: 0 20px;
    background: var(--bglight);
    border: 1px solid rgba(105, 54, 245, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}

.connect_wallet:hover,
.icon_badge:hover {
    transform: translateY(-2px);
}

.connect_wallet p {


    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}

.icon_badge {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background: var(--bglight);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}
</style>