<template>
    <main v-if="!authenticating">
        <NoWallet v-if="!userAddress" />
        <div class="dashboard_item" v-else>
            <div class="header">
                <h3 class="title">My Darshboard</h3>
                <div class="total_loans">
                    <div class="total_loans_joined">
                        <p>Total Loans Joined</p>
                        <p>{{ user ? (user.borrowedTimes + user.lentTimes) : 0 }}</p>
                    </div>
                    <div class="total_loans_volume">
                        <p>Total Loans Volume</p>
                        <p>${{ user ? $nFormat(
                            Number($fromWei(user.borrowedVolume)) + Number($fromWei(user.lentVolume))
                        ) : 0 }}</p>
                    </div>
                </div>
            </div>

            <div class="dashboard">
                <div class="chart">
                    <div class="toolbar">
                        <div class="toolbar_label">
                            <p>Total Value Locked</p>
                            <p>${{ user ? $nFormat(
                                Number($fromWei(user.borrowedVolume)) + Number($fromWei(user.lentVolume))
                            ) : 0 }} <span>
                                    <IconArrowDown :color="'var(--accentgreen)'" /> +10%
                                </span></p>
                        </div>
                        <div class="dates">
                            <div>1D</div>
                            <div class="active">1W</div>
                            <div>1M</div>
                            <div>1Y</div>
                        </div>
                    </div>
                    <div class="chart_box">
                        <div class="chart_grid">
                            <div class="chart_box_row" v-for="index in 6" :key="index"></div>
                        </div>
                        <div class="chart_grid_2">
                            <div class="chart_box_column" v-for="index in 11" :key="index"></div>
                        </div>
                        <div id="chart"></div>
                    </div>
                </div>
                <div class="stats">
                    <div class="tabs">
                        <div :class="tabIndex == 0 ? 'tab active' : 'tab'" v-on:click="tabIndex = 0">Lends</div>
                        <div :class="tabIndex == 1 ? 'tab active' : 'tab'" v-on:click="tabIndex = 1">Borrows</div>
                    </div>
                    <div class="stat_detail">
                        <p v-if="tabIndex == 0" class="tag">Total Value Lent</p>
                        <p v-else class="tag">Total Value Borrowed</p>

                        <p class="amount" v-if="user">${{
                            tabIndex == 0 ? $toMoney($fromWei(user.lentVolume)) :
                            $toMoney($fromWei(user.borrowedVolume))
                        }}</p>
                        <p class="amount" v-else>$0</p>

                        <div class="natives">
                            <div class="tokens">
                                <div class="images">
                                    <img src="/images/ftm.png" alt="">
                                    <img src="/images/btc.png" alt="">
                                    <img src="/images/eth.png" alt="">
                                    <p>Natives</p>
                                </div>
                                <div class="percent">{{ getProgress('native') }}%</div>
                            </div>
                            <div class="progress_bar">
                                <div :style="`width: ${getProgress('native')}%`" class="progress"></div>
                                <div :style="`left: ${getProgress('native')}%`" class="dot"></div>
                            </div>
                        </div>

                        <div class="stables">
                            <div class="tokens">
                                <div class="images">
                                    <img src="/images/usdc.png" alt="">
                                    <img src="/images/usdt.png" alt="">
                                    <img src="/images/dai.png" alt="">
                                    <p>Stables</p>
                                </div>
                                <div class="percent">{{ getProgress('stable') }}%</div>
                            </div>
                            <div class="progress_bar">
                                <div :style="`width: ${getProgress('stable')}%`" class="progress"></div>
                                <div :style="`left: ${getProgress('stable')}%`" class="dot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ActivityTable :transfers="transfers" class="activity" />
        </div>
    </main>
</template>

<script setup>
import IconArrowDown from '../../icons/IconArrowDown.vue';
import ActivityTable from './ActivityTable.vue';
</script>

<script>
import ApexCharts from 'apexcharts'
import NoWallet from '../../NoWallet.vue';
import Authentication from '../../../scripts/Authentication';
export default {
    data() {
        return {
            userAddress: null,
            authenticating: true,
            user: null,
            chart: null,
            tabIndex: 0,
            loans: [],
            transfers: [],
            natives: { lent: 0, borrowed: 0 },
            stables: { lent: 0, borrowed: 0 }
        }
    },
    methods: {
        renderChart: function () {
            var options = {
                stroke: {
                    curve: "smooth",
                    width: 2,
                    colors: ["#6936F5"]
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                    padding: {
                        top: -28,
                        right: 0,
                        bottom: 0,
                        left: -9
                    }
                },
                chart: {
                    type: "area",
                    toolbar: { show: false },
                    height: 205,
                    width: "100%",
                    zoom: { enabled: false }
                },
                tooltip: {
                    x: { show: false },
                    marker: { show: false },
                    style: {
                        fontSize: "12px",
                        fontFamily: "Axiforma"
                    }
                },
                markers: {
                    strokeColors: "#6936F5",
                    colors: ["#EEF1F8"],
                    strokeWidth: 4,
                    radius: 2
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        type: "vertical",
                        gradientToColors: ["#6936F5", "#6936F5"],
                        inverseColors: true,
                        opacityFrom: 0.5,
                        opacityTo: 0.05
                    }
                },
                dataLabels: {
                    enabled: false
                },
                series: [{
                    name: "TVL",
                    data: [34, 35, 31, 38, 40, 35, 42, 38, 34, 38, 80],
                }],
                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    tooltip: {
                        style: {
                            fontSize: "12px",
                            fontFamily: "Axiforma"
                        }
                    }
                },
                yaxis: {
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                },
                legend: { show: false }
            };
            let dom = document.querySelector("#chart")
            if (dom && !this.chart) {
                this.chart = new ApexCharts(dom, options);
                this.chart.render();
            }
        },
        getLoans: function () {
            if (!this.userAddress) return
            this.axios.get(`https://darshprotocol.onrender.com/loans/vault?address=${this.userAddress.toLowerCase()}`).then(response => {
                this.loans = response.data;

                for (let index = 0; index < this.loans.length; index++) {
                    const loan = this.loans[index];
                    let principalType = this.$findAsset(loan.principalToken).type

                    
                    if (loan.lender == this.userAddress.toLowerCase()) {
                        if (principalType == 'native') {
                            this.natives.lent += 1
                        } else {
                            this.stables.lent += 1
                        }
                    }
                    else if (loan.borrower == this.userAddress.toLowerCase()) {
                        if (principalType == 'native') {
                            this.natives.borrowed += 1
                        } else {
                            this.stables.borrowed += 1
                        }
                    }
                }

            }).catch(error => {
                console.error(error);
            });
        },
        getProgress: function (type) {
            if (this.tabIndex == 0) {
                if (type == 'native') {
                    return ((this.natives.lent / (this.natives.lent + this.stables.lent)) * 100)
                }
                return ((this.stables.lent / (this.natives.lent + this.stables.lent)) * 100)
            }

            if (type == 'native') {
                return ((this.natives.borrowed / (this.natives.borrowed + this.stables.borrowed)) * 100)
            }
            return ((this.stables.borrowed / (this.natives.borrowed + this.stables.borrowed)) * 100)
        },
        getProfile: async function () {
            if (!this.userAddress) return
            this.axios.get(`https://darshprotocol.onrender.com/users/${this.userAddress.toLowerCase()}`).then(response => {
                this.user = response.data;
            }).catch(error => {
                console.error(error);
            });
        },
        getTransfers: function() {
            if (!this.userAddress) return
            this.axios.get(`https://darshprotocol.onrender.com/transfers?from=${this.userAddress.toLowerCase()}`).then(response => {
                this.transfers = response.data;
            }).catch(error => {
                console.error(error);
            });
        }
    },
    updated() {
        this.renderChart()
    },
    async created() {
        this.userAddress = await Authentication.userAddress()
        this.getProfile()
        this.getLoans()
        this.getTransfers()
        this.authenticating = false
    }
}
</script>

<style scoped>
.dashboard_item {
    padding: 0 60px;
    padding-top: 60px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .title {
    font-size: 30px;
    font-weight: 500;
    color: var(--textnormal);
}

.total_loans {
    display: flex;
    align-items: center;
}

.total_loans>div {
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-width: 0px 1px;
    border-style: solid;
    border-color: var(--bglightest);
    gap: 8px;
}

.total_loans p:first-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.total_loans p:last-child {
    font-size: 14px;
    color: var(--textnormal);
}

.dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 60px;
}

.chart {
    width: 679px;
    background: var(--bglight);
    border-radius: 6px;
    padding: 30px;
}

.chart .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chart .dates {
    display: flex;
    gap: 6px;
    align-items: center;
    border-bottom: 1px solid var(--bglightest);
}

.chart .dates div {
    width: 43px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 2px 2px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--textdimmed);
}

.chart .dates .active {
    background: var(--primary);
    color: var(--textnormal);
}

.chart .toolbar_label p:first-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.chart .toolbar_label p:last-child {
    margin-top: 16px;
    font-size: 20px;
    color: var(--textnormal);
}

.chart .toolbar_label svg {
    width: 16px;
    height: 16px;
    margin-bottom: -4px;
    transform: rotate(180deg);
}

.chart .toolbar_label p:last-child span {
    font-size: 12px;
    color: var(--accentgreen);
}

.chart_box {
    margin-top: 30px;
    position: relative;
    height: 190px;
}

.chart_grid {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
}

.chart_box_row {
    height: 1px;
    background: var(--bglightest);
}

.chart_grid_2 {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
}

.chart_box_column {
    width: 1px;
    background: var(--bglightest);
}

/*  */

.stats {
    width: 350px;
}

.tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    height: 60px;
    border-bottom: 2px solid var(--background);
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--textdimmed);
    cursor: pointer;
    user-select: none;
}

.tabs .active {
    border-radius: 6px 6px 0px 0px;
    background: var(--bglight);
    color: var(--textnormal);
}

.stat_detail {
    background: var(--bglight);
    border-radius: 0px 0px 6px 6px;
    padding: 30px;
}

.stat_detail .tag {
    font-size: 12px;
    color: var(--textdimmed);
}

.stat_detail .amount {
    font-size: 20px;
    color: var(--textnormal);
    margin-top: 18px;
    font-weight: 500;
}

.stat_detail .tokens {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 31px;
}

.stat_detail .images {
    display: flex;
    align-items: center;
}

.stat_detail .images img {
    width: 20px;
    height: 20px;
    margin-left: -4px;
}

.stat_detail .images img:first-child {
    margin: 0;
}

.stat_detail .images p {
    font-size: 12px;
    margin-left: 10px;
    color: var(--textnormal);
}

.stat_detail .percent {
    font-size: 12px;
    color: var(--primary);
}

.progress_bar {
    background: var(--background);
    height: 4px;
    border-radius: 5px;
    margin-top: 24px;
    position: relative;
}

.progress {
    position: absolute;
    height: 4px;
    border-radius: 5px;
    background: var(--primary);
}

.progress_bar .dot {
    position: absolute;
    border: 4px solid var(--primary);
    width: 14px;
    height: 14px;
    background: var(--textnormal);
    border-radius: 5px;
    transform: translate(-50%, -5px);
}

/*  */

.activity {
    margin-top: 60px;
}
</style>