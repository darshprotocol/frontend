<template>
    <main>
        <table class="request_table">
            <thead>
                <tr>
                    <td>Principal</td>
                    <td>Duration</td>
                    <td>Payback</td>
                    <td>Interest</td>
                    <td>Expires in</td>
                    <td>
                        <div class="menu"></div>
                    </td>
                </tr>
            </thead>
            <div class="tbody">
                <tbody v-for="request in sortRequests(offer.requests)"
                    :class="(request.creator == userAddress.toLowerCase() ? 'owned ' + ('state' + request.state) : '')"
                    :key="request._id">
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
                            <p>{{ getExpire(request) }} days</p>
                        </td>
                        <td v-if="isCreator()">
                            <div class="menu" v-on:click="activeRequest = request._id">
                                <IconMenu :color="'var(--textnormal)'" />
                            </div>
                        </td>
                        <td v-else>
                            <div class="menu" v-if="isBorrower(request)" v-on:click="openMenu(request)">
                                <IconMenu :color="'var(--textnormal)'" />
                            </div>
                            <div class="menu" v-else>
                                <IconMenu :color="'var(--textdimmed)'" />
                            </div>
                        </td>
                        <div class="overlay" v-if="activeRequest == request._id && isBorrower(request)">
                            <div>
                                <div class="action" v-on:click="cancelRequest = request">Cancel</div>
                            </div>
                            <div>
                                <div class="action">Edit</div>
                            </div>
                            <IconClose class="close" v-on:click="activeRequest = ''" />
                        </div>
                        <div class="overlay overlay_1" v-if="activeRequest == request._id && isCreator()">
                            <div>
                                <div class="action" v-on:click="setRequestAction('accept', request)">Accept</div>
                            </div>
                            <div>
                                <div class="action" v-on:click="setRequestAction('reject', request)">Reject</div>
                            </div>
                            <div>
                                <RouterLink :to="`/profile/${offer.creator.toLowerCase()}`">
                                    <div class="link">
                                        <p>View Owner</p>
                                        <IconOut />
                                    </div>
                                </RouterLink>
                            </div>
                            <IconClose class="close" v-on:click="activeRequest = ''" />
                        </div>
                    </tr>
                </tbody>
            </div>
        </table>

        <div class="t_empty" v-if="sortRequests(offer.requests).length == 0">
            <img src="../../../../assets/images/receipt-text.png" alt="">
            <p>No Borrow Requests found.</p>
        </div>

        <RequestPopUpInfo :offer="offer" :requestAction="requestAction" v-if="requestAction"
            v-on:close="requestAction = null" v-on:done="$emit('done')" />

        <RequestPopUpInfoCancel :offer="offer" :request="cancelRequest" v-on:done="$emit('done')" v-if="cancelRequest"
            v-on:close="cancelRequest = null" />

        <RequestPopUpInfoClaim v-if="claimRequest" :offer="offer" :borrowerLoan="borrowerLoan" :request="claimRequest"
            v-on:close="claimRequest = null" v-on:done="$emit('done')" />
    </main>
</template>

<script setup>
import Authentication from '../../../../scripts/Authentication';
import IconClock from '../../../icons/IconClock.vue';
import IconClose from '../../../icons/IconClose.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import IconMenu from '../../../icons/IconMenu.vue'
import IconOut from '../../../icons/IconOut.vue';
import RequestPopUpInfo from './RequestPopUpInfo.vue';
import RequestPopUpInfoCancel from './RequestPopUpInfoCancel.vue';
import RequestPopUpInfoClaim from './RequestPopUpInfoClaim.vue'
</script>

<script>
export default {
    props: ["offer", "borrowerLoan"],
    data() {
        return {
            activeRequest: "",
            userAddress: "",
            requestAction: null,
            cancelRequest: null,
            claimRequest: null
        };
    },
    methods: {
        sortRequests: function (requests) {
            if (this.userAddress == null || this.offer.creator == this.userAddress.toLowerCase()) {
                return requests.filter(request => request.state == 0);
            }
            else {
                const result = requests.filter(request => {
                    switch (request.state) {
                        case 1: return (this.borrowerLoan && this.borrowerLoan.unClaimedBorrowedPrincipal > 0);
                        case 3: return false
                        default: return true;
                    }
                })
                return result.sort((a, b) => (b.creator == this.userAddress.toLowerCase()) - (a.creator == this.userAddress.toLowerCase()));
            }
        },
        setRequestAction: function (action, request) {
            this.requestAction = {
                action: action,
                request: request
            };
        },
        openMenu: function (request) {
            if (request.state == 0) {
                this.activeRequest = request._id;
            }
            else if (request.state == 2) {
                this.cancelRequest = request;
            } else if (request.state == 1) {
                this.claimRequest = request
            }
        },
        isCreator: function () {
            return this.userAddress && this.offer.creator.toLowerCase() == this.userAddress.toLowerCase();
        },
        isBorrower: function (request) {
            return this.userAddress && request.creator.toLowerCase() == this.userAddress.toLowerCase();
        },
        getPrincipal: function (percentage) {
            let principal = this.offer.initialPrincipal * (percentage / 100);
            return principal.toString();
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(result.toString());
            return this.$toMoney(interest);
        },
        getAccrued: function (request) {
            let duration = request.daysToMaturity * 24 * 60 * 60;
            let interest = this.$fromWei(request.interest);
            let principalAmount = (this.getPrincipal(request.percentage));
            let accrued = (principalAmount * interest * duration) / 100;
            return accrued;
        },
        getExpire: function (request) {
            let expire = request.expiresAt;
            let now = Date.now() / 1000;
            let elasped = expire - now;
            if (elasped <= 0)
                return 0;
            return (elasped / 24 / 60 / 60).toFixed(0);
        },
        getPayback: function (request) {
            let accrued = this.$fromWei(this.getAccrued(request));
            let principal = this.$fromWei(this.getPrincipal(request.percentage));
            return Number(accrued) + Number(principal);
        },
    },
    async created() {
        this.userAddress = await Authentication.userAddress();
    },
    components: { IconClock, IconInterest }
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

.tbody {
    overflow: hidden;
    /* border-radius: 6px; */
}

.request_table tbody {
    background: var(--bglight);
    width: 600px;
    display: table;
    padding: 0 20px;
}

tbody:nth-child(even) {
    background: var(--bglighter);
}

.request_table tbody td img {
    width: 14px;
    height: 14px;
}

.request_table tbody td {
    height: 62px;
}

.request_table tbody td:last-child {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
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
    background: rgba(108, 110, 115, 0.1);
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

tbody tr {
    position: relative;
}

/* overlay */
tbody .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    display: grid;
    background: var(--bglight);
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

tbody:nth-child(even) .overlay {
    background: var(--bglighter);
}

.overlay .action {
    cursor: pointer;
    user-select: none;
}

.overlay_1 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}

.overlay>div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay>div:first-child {
    border-right: 1px solid var(--background);
}


.overlay_1>div:nth-child(2) {
    border-right: 1px solid var(--background);
}

.overlay_1 .link {
    gap: 8px;
}

.overlay>div div {
    height: 26px;
    border-radius: 4px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--textnormal);
}

.overlay>div:first-child .action {
    background: rgba(108, 110, 115, 0.1);
}

.overlay>div:nth-child(2) .action {
    background: rgba(105, 54, 245, 0.1);
}

.overlay_1>div:first-child .action {
    background: rgba(139, 187, 37, 0.08);
}

.overlay_1>div:nth-child(2) .action {
    background: rgba(233, 71, 3, 0.08);
}

.overlay_1 .link p {
    color: var(--textdimmed);
}

.overlay_1 .link svg {
    width: 14px;
    height: 14px;
}

.overlay .close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    background: var(--bglighter);
    border-radius: 2px;
    cursor: pointer;
}

.t_empty {
    width: 100%;
    height: 298px;
    background: var(--bglight);
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

/* state */
.owned .menu {
    background: var(--primary);
}

.state0 {
    background: #1C172C !important;
    border-bottom: 1px solid var(--primary);
}

.state0 .overlay {
    background: #1C172C;
}

.state1 {
    background: #202518 !important;
    border-bottom: 1px solid var(--accentgreen);
}

.state2 {
    background: #211715 !important;
    border-bottom: 1px solid var(--accentred);
}
</style>