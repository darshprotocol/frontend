<template>
    <main>
        <div class="logo"></div>
        <div class="header">
            <div class="pages">
                <RouterLink to="/">Home</RouterLink>
                <a href="https://darshprotocol.gitbook.io/product-docs" target="_blank">Docs</a>
                <a href="#">Governance</a>
                <RouterLink to="/faucet">Faucet</RouterLink>
            </div>
            <div class="actions">
                <div class="notifications icon_badge" v-on:click="$emit('notification')">
                    <IconNotification />
                    <div class="new_notification">
                        <IconInformation :color="'var(--primary)'" :stripe="'var(--textnormal)'"
                            v-if="unReadNotifications.length > 0" />
                    </div>
                </div>
                <div :class="userAddress ? 'connected connect_wallet' : 'connect_wallet'" v-on:click="authenticate(true)">
                    <IconMetamask v-if="userAddress" />
                    <IconWallet v-else />
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
import IconWallet from '../icons/IconWallet.vue';
import { messages } from '../../reactives/messages';
import IconInformation from '../icons/IconInformation.vue';
export default {
    props: ["userAddress"],
    data() {
        return {
            unReadNotifications: []
        }
    },
    watch: {
        $route: function() {
            this.checkNotification()
        }
    },
    methods: {
        authenticate: async function (request = false) {
            if (this.userAddress) {
                this.$emit("wallet");
                return;
            }
            const userAddress = await Authentication.userAddress(request, () => {
                this.$router.go()
            });
            if (request && !userAddress) {
                messages.insertMessage({
                    title: "Failed to connect wallet",
                    description: "Please check your network, refresh or try again.",
                    type: "failed"
                });
            }
            else if (userAddress && request) {
                this.$router.go();
            }
            this.checkNotification(userAddress);
            this.$emit("connected", userAddress);
        },
        checkNotification: function (userAddress) {
            if (!userAddress)
                return;
            this.axios.get(`https://darshprotocol.onrender.com/notifications?to=${userAddress.toLowerCase()}&readAt=0`).then(response => {
                this.unReadNotifications = response.data;
            }).catch(error => {
                console.error(error);
            });
        }
    },
    mounted() {
        this.authenticate();
    },
    components: { IconInformation }
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
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}

.connected {
    background: var(--bglight);
    border: 1px solid rgba(105, 54, 245, 0.4);
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
    position: relative;
}

.new_notification {
    position: absolute;
    left: 20px;
    bottom: 10px;
}
</style>