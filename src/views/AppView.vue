<script setup>
import AppHeader from '../components/app/AppHeader.vue';
import NotificationPopUp from '../components/app/NotificationPopUp.vue';
import SideBar from '../components/app/SideBar.vue';
import SnackBar from '../components/SnackBar.vue';
</script>

<template>
    <div class="app-section">
        <div class="app-width">
            <AppHeader v-on:notification="notification = true" :userAddress="userAddress"
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
        <NotificationPopUp v-on:close="notification = false" v-if="notification" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            userAddress: null,
            notification: false
        };
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
