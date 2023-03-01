<template>
    <div class="main">
        <div class="table_head">
            <div class="title">
                <p>Vault Actvities</p>
                <span>{{ sortActivities(offer.transfers).length }}</span>
            </div>
            <div class="sort_by">
                <IconSort />
                <P>Sort By</P>
            </div>
        </div>
        <table class="request_table">
            <thead>
                <tr>
                    <td>User</td>
                    <td>Action</td>
                    <td>Type</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td></td>
                </tr>
            </thead>
            <div class="tbody">
                <tbody v-for="transfer, index in sortActivities(offer.transfers)" :key="transfer._id">
                    <tr>
                        <td>
                            <div>
                                <div :id="`img_vault${index}`" class="img"></div>

                                <p v-if="transfer.from == userAddress">You</p>
                                <p v-else>{{ $shortName(transfer.from, 6) }}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <IconAddCircle v-if="transfer.type == 0" />
                                <IconCoin v-if="transfer.type == 1" />
                                <IconLock v-if="transfer.type == 2" />
                                <IconMinusCircle v-if="transfer.type == 3" />

                                <p v-if="transfer.type == 0">Adds</p>
                                <p v-if="transfer.type == 1">Claims</p>
                                <p v-if="transfer.type == 2">Locks</p>
                                <p v-if="transfer.type == 3">Removes</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p v-if="transfer.token == offer.principalToken">Principal</p>
                                <p v-else>Collateral</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{{ $toDate(transfer.timestamp).month + ' ' + $toDate(transfer.timestamp).date }}, <span>
                                        {{ $toDate(transfer.timestamp).hour + ':' + $toDate(transfer.timestamp).min }}
                                    </span></p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img :src="`/images/${$findAsset(transfer.token).image}.png`" alt="">
                                <p>
                                    {{ $toMoney($fromWei(transfer.amount)) }}
                                    {{ $findAsset(transfer.token).symbol }}
                                </p>
                            </div>
                        </td>
                        <td>
                            <a target="_blank" :href="`https://testnet.ftmscan.com/tx/${transfer.hash}`">
                                <div class="link">
                                    <p>View Txn</p>
                                    <IconOut />
                                </div>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </div>
            <div class="t_empty" v-if="offer.transfers.length == 0">
                <img src="../../../../../assets/images/receipt-text.png" alt="">
                <p>No activity.</p>
            </div>
        </table>
    </div>
</template>

<script setup>
import IconOut from '../../../../icons/IconOut.vue';
import IconSort from '../../../../icons/IconSort.vue';
import IconAddCircle from '../../../../icons/IconAddCircle.vue'
import IconMinusCircle from '../../../../icons/IconMinusCircle.vue'
import IconCoin from '../../../../icons/IconCoin.vue';
import IconLock from '../../../../icons/IconLock.vue';
import Profile from '../../../../../scripts/Profile';
</script >

<script>
export default {
    props: ["offer", "userAddress"],
    methods: {
        sortActivities: function (activities) {
            if (this.offer.creator == this.userAddress.toLowerCase()) {
                return activities
            } else {
                return activities.filter(activity => activity.from == this.userAddress.toLowerCase())
            }
        },
        generateImages: function () {
            let transfers = this.sortActivities(this.offer.transfers)

            for (let index = 0; index < transfers.length; index++) {
                let el = Profile.generate(20, transfers[index].from)
                let dom = document.getElementById(`img_vault${index}`)
                if (dom && dom.childNodes.length == 0) {
                    dom.appendChild(el)
                }
            }
        }
    },
    mounted() {
        this.generateImages()
    },
    updated() {
        this.generateImages()
    }
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
    width: calc(100% / 6);
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
    display: flex;
    flex-direction: column-reverse;
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

.request_table tbody td div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.request_table tbody td span {
    color: var(--textdimmed);
}

.request_table tbody p {
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
    margin-top: 2px;
}

.request_table tbody td .img {
    width: 20px;
    height: 20px;
}

.request_table tbody td img {
    width: 20px;
    height: 20px;
}

.request_table tbody .photo {
    width: 24px;
    height: 24px;
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

.link {
    justify-content: center !important;
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