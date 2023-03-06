<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>My Wallet</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div class="wallet">
                <IconMetamask class="wallet_icon" />
                <div class="wallet_address">
                    <p class="address">{{ $shortAddress(userAddress, 6) }}
                        <IconCopy />
                    </p>
                    <div class="chain">
                        <div>
                            <div></div>
                        </div>

                        <p>Fantom</p>
                    </div>
                </div>
                <div class="menu">
                    <IconMenu :color="'var(--textnormal)'" />
                </div>
            </div>
            <div class="scroll">
                <div class="assets">
                    <div class="asset" v-for="asset in $assets()" :key="asset.id">
                        <div class="detail">
                            <img :src="`/images/${asset.image}.png`" alt="">
                            <div class="detail_info">
                                <p>{{ asset.symbol }}</p>
                                <p>{{ asset.name }}</p>
                            </div>
                        </div>
                        <div class="balance">
                            <p>{{ findTokenBalance(asset.address) }}</p>
                            <p>~ $0.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mark_all" v-on:click="logOut()">
                <IconLogout />
                <p>Disconnect</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconClose from './icons/IconClose.vue';
import IconCopy from './icons/IconCopy.vue';
import IconMenu from './icons/IconMenu.vue';
import IconMetamask from './icons/IconMetamask.vue';
import IconLogout from './icons/IconLogout.vue';
</script>

<script>
import CovalentAPI from '../utils/CovalentAPI'
import Authentication from '../scripts/Authentication';
export default {
    props: ["userAddress"],
    data() {
        return {
            tokenBalances: []
        }
    },
    methods: {
        getTokenBalances: async function () {
            let response = await CovalentAPI.getTokenBalances(this.userAddress);
            if (!response)
                return;
            this.tokenBalances = response.data.items;
        },
        findTokenBalance: function (address) {
            if (this.tokenBalances.length == 0) return

            if (address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                address = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
            }

            let token = this.tokenBalances.find(token => token.contract_address.toLowerCase() == address.toLowerCase());

            if (!token)
                return "0.00";

            return this.$toMoney(this.$fromWei(token.balance));
        },
        logOut: function () {
            Authentication.logOut()
            this.$router.go()
        }
    },
    mounted() {
        this.getTokenBalances()
        document.body.classList.add('modal')
    },
    unmounted() {
        document.body.classList.remove('modal')
    }
}
</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    padding: 60px;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(20, 20, 22, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    animation: fade_in .2s ease-in-out;
}

.box {
    width: 400px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    animation: slide_in_left .2s ease-in-out;
}


.title {
    height: 90px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title h3 {
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.title div {
    width: 30px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wallet {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    align-items: flex-end;
    gap: 16px;
}

.wallet_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 8px;
    background: var(--bglightest);
}

.wallet_address {
    width: calc(100% - 122px);
}

.wallet_address .address {
    font-size: 14px;
    color: var(--textdimmed);
    display: flex;
    align-items: center;
    gap: 8px;
}

.wallet_address .address svg {
    cursor: pointer;
}

.wallet_address .chain {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.wallet_address .chain p {
    font-size: 12px;
    color: var(--textnormal);
}

.wallet_address .chain>div {
    background: #6936f542;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
}


.wallet_address .chain>div>div {
    background: var(--primary);
    width: 6px;
    height: 6px;
    border-radius: 3px;
}

.menu {
    width: 32px;
    height: 22px;
    background: var(--bglightest);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 4px;
}

.scroll {
    overflow-y: auto;
    height: calc(100% - 240px);
}

.asset {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid var(--bglightest);
    padding: 25px 30px;
}

.asset img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
}

.detail {
    display: flex;
    align-items: center;
    gap: 14px;
}

.detail_info p:first-child,
.balance p:first-child {
    font-size: 14px;
    font-weight: 500;
    color: var(--textnormal);
}

.detail_info p:last-child,
.balance p:last-child {
    margin-top: 4px;
    font-size: 12px;
    color: var(--textdimmed);
}

.balance {
    text-align: right;
}

.mark_all {
    height: 60px;
    background: var(--bglighter);
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.mark_all p {
    font-size: 14px;
    text-decoration: underline;
    margin-top: -4px;
    color: var(--textnormal);
}

.mark_all svg {
    margin-top: -4px;
}</style>