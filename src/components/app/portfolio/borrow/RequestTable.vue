<template>
    <main>
        <div class="table_head">
            <div class="title">
                <p>Lend Requests</p>
                <span>{{ sortRequests(offer.requests).length }}</span>
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
                    <td>Collateral</td>
                    <td>Expires in</td>
                    <td>Actions</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <div class="tbody">
                <tbody v-for="request in sortRequests(offer.requests)" :key="request._id">
                    <tr>
                        <td>
                            <div>
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(getPrincipal(request.percentage))) }}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <IconClock />
                                <p>{{ request.daysToMaturity }} days</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img :src="`/images/${$findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ $toMoney(getPayback(request)) }}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <IconInterest />
                                <p>{{ getInterest(request.interest, request.daysToMaturity) }} %</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img :src="`/images/${$findAsset(offer.collateralToken).image}.png`" alt="">
                                <p>{{ $toMoney($fromWei(getCollateral(request.percentage))) }}</p>
                            </div>
                        </td>
                        <td>
                            <p>{{ getExpire(request) }} hours</p>
                        </td>
                        <td>
                            <div v-on:click="setRequestAction('accept', request)" class="action accept">
                                Accept</div>
                        </td>
                        <td>
                            <div v-on:click="setRequestAction('reject', request)" class="action reject">Reject</div>
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
            <div class="t_empty" v-if="sortRequests(offer.requests).length == 0">
                <img src="../../../../assets/images/receipt-text.png" alt="">
                <p>No Borrow Requests found.</p>
            </div>
        </table>

        <RequestPopUpInfo :offer="offer" :requestAction="requestAction" v-if="requestAction"
            v-on:close="requestAction = null" v-on:done="$emit('done')" />
    </main>
</template>
<script setup>
import IconOut from '../../../icons/IconOut.vue';
import IconSort from '../../../icons/IconSort.vue';
</script >

<script>
import Authentication from '../../../../scripts/Authentication';
import RequestPopUpInfo from '../../discover/borrowers/RequestPopUpInfo.vue';
import IconClock from '../../../icons/IconClock.vue';
import IconInterest from '../../../icons/IconInterest.vue';
export default {
    props: ["offer"],
    data() {
        return {
            activeRequest: "",
            userAddress: "",
            requestAction: null,
            accepting: -1
        };
    },
    methods: {
        sortRequests: function (requests) {
            return requests.filter(request => request.state == 0);
        },
        setRequestAction: function (action, request) {
            this.requestAction = {
                action: action,
                request: request
            };
        },
        getPrincipal: function (percentage) {
            let principal = this.offer.initialPrincipal * (percentage / 100);
            return principal.toString();
        },
        getCollateral: function (percentage) {
            let collateral = this.offer.initialCollateral * (percentage / 100);
            return collateral.toString();
        },
        getPayback: function (request) {
            let accrued = this.$fromWei(this.getAccrued(request));
            let principal = this.$fromWei(this.getPrincipal(request.percentage));
            return Number(accrued) + Number(principal);
        },
        getAccrued: function (request) {
            let duration = request.daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(request.interest);
            let principalAmount = (this.getPrincipal(request.percentage));
            let accrued = (principalAmount * interest * duration) / 100;
            return accrued;
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        getExpire: function (request) {
            let expire = request.expiresAt;
            let now = Date.now() / 1000;
            let elasped = expire - now;
            if (elasped <= 0)
                return 0;
            return (elasped / 60 / 60).toFixed(0);
        },
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
    },
    components: { IconClock, IconInterest }
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
    padding: 0 30px;
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
    padding: 0 30px;
}

.request_table tbody:nth-child(even) {
    background: var(--bglighter);
}

.request_table tbody td {
    height: 90px;
}

td img {
    width: 20px;
    height: 20px;
}

.request_table tbody td div {
    display: flex;
    align-items: center;
    gap: 8px;
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