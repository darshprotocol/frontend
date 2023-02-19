<template>
    <div class="main">
        <div class="table_head">
            <div class="title">
                <p>Vault Actvities</p>
                <span>0</span>
                <!-- <span>{{ offer.requests.length }}</span> -->
            </div>
            <div class="sort_by">
                <IconSort />
                <P>Sort By</P>
            </div>
        </div>
        <table class="request_table">
            <thead>
                <tr>
                    <td>Principal</td>
                    <td>Duration</td>
                    <td>Payback</td>
                    <td>Interest</td>
                    <td>Collateral %</td>
                    <td>Expires in</td>
                    <td>Actions</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <div class="tbody">
                <tbody v-for="index in 5" :key="index">
                    <tr>
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
                            <div class="action accept">Accept</div>
                        </td>
                        <td>
                            <div class="action reject">Reject</div>
                        </td>
                        <td>
                            <RouterLink :to="''">
                                <div class="link">
                                    <p>Owner</p>
                                    <IconOut />
                                </div>
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </div>
            <!-- <div class="t_empty" v-if="offer.requests.length == 0">
                <img src="../../../assets/images/receipt-text.png" alt="">
                <p>No Borrow Requests found.</p>
            </div> -->
        </table>
    </div>
</template>

<script setup>
import IconOut from '../../icons/IconOut.vue';
import IconSort from '../../icons/IconSort.vue';
</script >

<script>
export default {
    props: ["offer"]
}
</script>

<style scoped>
.table_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid var(--bglightest);
}


.table_head .title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.table_head .title p {
    font-size: 16px;
    color: var(--textnormal);
}

.sort_by {
    height: 40px;
    background: var(--bglight);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
}

.sort_by p {
    font-size: 14px;
    color: var(--textnormal);
}

.table_head .title span {
    padding: 3px 8px;
    background: var(--bglighter);
    border-radius: 2px;
    font-size: 12px;
    color: var(--textnormal);
}

.request_table {
    width: 100%;
    table-layout: fixed;
}

.request_table td {
    width: calc(100% / 9);
}

.request_table thead {
    height: 54px;
    width: 100%;
    display: table;
    padding: 0 20px;
}

.request_table thead td {
    color: var(--textlight);
    font-weight: 500;
    font-size: 14px;
}

.tbody {
    border-radius: 6px;
    overflow: hidden;
}

.request_table tbody {
    background: var(--bglight);
    width: 100%;
    display: table;
    padding: 0 20px;
}

.request_table tbody:nth-child(even) {
    background: var(--bglighter);
}

.request_table tbody td {
    height: 90px;
}

.request_table tbody td div {
    display: flex;
    align-items: center;
    gap: 4px;
}

.request_table tbody p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
    margin-top: 2px;
}

.request_table .action {
    height: 26px;
    border-radius: 4px;
    padding: 0 12px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--textnormal);
    cursor: pointer;
    user-select: none;
}

.accept {
    background: rgba(139, 187, 37, 0.08);
}

.reject {
    background: rgba(233, 71, 3, 0.08);
}

.overlay_1 .link {
    display: flex;
    align-items: center;
    gap: 8px;
}

.link p {
    color: var(--textdimmed) !important;
}

.link svg {
    width: 14px;
    height: 14px;
}

.t_empty {
    width: 100%;
    height: 298px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
}

.t_empty p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textdimmed);
}
</style>