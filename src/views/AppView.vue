<script setup>
import AppHeader from '../components/app/AppHeader.vue';
import NotificationPopUp from '../components/NotificationPopUp.vue';
import SideBar from '../components/app/SideBar.vue';
import SnackBar from '../components/SnackBar.vue';
import WalletPopUp from '../components/WalletPopUp.vue';
</script>

<template>
    <div class="app-section">
        <div class="app-width">
            <AppHeader v-on:notification="notification = true" v-on:wallet="wallet = true" :userAddress="userAddress"
                v-on:connected="userAddress = $event" />
            <div class="app">
                <SideBar class="sidebar" />
                <div></div>
                <div class="sandbox">
                    <RouterView />
                </div>
            </div>
        </div>

        <SnackBar />
        <NotificationPopUp :userAddress="userAddress" v-on:close="notification = false" v-if="notification" />
        <WalletPopUp :userAddress="userAddress" v-on:close="wallet = false" v-if="wallet" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            userAddress: null,
            notification: false,
            wallet: false
        };
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.app {
    display: grid;
    width: 100%;
    grid-template-columns: 260px auto;
    height: 100vh;
}

.sandbox {
    border-right: 1px solid var(--bglightest);
    padding: 90px 0;
}
</style>
