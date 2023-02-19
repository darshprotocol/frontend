<template>
    <table class="request_table">
        <thead>
            <tr>
                <td>Principal</td>
                <td>Duration</td>
                <td>Payback</td>
                <td>Interest</td>
                <td>Collateral %</td>
                <td>Expires in</td>
                <td>
                    <div class="menu"></div>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="requests in requests" :key="requests._id">
                <td>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <p>60,000</p>
                    </div>
                </td>
                <td>
                    <div>
                        <IconClock />
                        <p>30 days</p>
                    </div>
                </td>
                <td>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <p>60,000</p>
                    </div>
                </td>
                <td>
                    <div>
                        <IconInterest />
                        <p>8.50 %</p>
                    </div>
                </td>
                <td>
                    <div>
                        <p><span>110%</span> in</p>
                        <img src="/images/usdc.png" alt="">
                    </div>
                </td>
                <td>
                    <p>2 days</p>
                </td>
                <td>
                    <div class="menu">
                        <IconMenu />
                    </div>
                </td>
            </tr>
        </tbody>
</table>
</template>

<script setup>
import IconMenu from '../../../icons/IconMenu.vue'
</script>

<script>
export default {
    props: ['requests']
}
</script>

<style scoped>
.request_table {
    width: 100%;
    table-layout: fixed;
}

.request_table td {
    width: calc(100% / 6);
}

.request_table thead {
    height: 54px;
    width: 600px;
    display: table;
    padding: 0 20px;
}

.request_table thead td {
    color: var(--textlight);
    font-weight: 500;
    font-size: 12px;
}

.request_table thead .menu {
    visibility: hidden;
}

.request_table tbody {
    background: var(--bglight);
    width: 600px;
    display: table;
    padding: 0 20px;
    border-radius: 6px;
}

.request_table tbody td {
    height: 62px;
}

.request_table tbody td div {
    display: flex;
    align-items: center;
    gap: 4px;
}

.request_table tbody p {
    font-weight: 400;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 2px;
}

.request_table .menu {
    width: 36px;
    height: 28px;
    background: rgba(105, 54, 245, 0.1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
}

.request_table .menu:hover {
    transform: translateY(-2px);
}
</style>