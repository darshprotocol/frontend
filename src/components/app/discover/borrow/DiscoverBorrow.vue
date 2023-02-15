<template>
    <main>
        <div class="progress_box" v-if="fetching">
            <ProgressBox />
        </div>

        <div class="borrows" v-else>
            <RouterLink v-for="offer in offers" :to="`/discover/borrow/${offer._id}`" :key="offer.offerId">
                <div class="borrow">
                    <div class="asset">
                        <div class="label">
                            <p>Principal</p>
                            <p>Collaterals</p>
                        </div>
                        <div class="tokens">
                            <div>
                                <img :src="`/images/${findAsset(offer.principalToken).image}.png`" alt="">
                                <p>{{ toMoney(fromWei(offer.currentPrincipal)) }} {{
                                    findAsset(offer.principalToken).symbol
                                }}</p>
                            </div>
                            <div>
                                <img v-for="asset in offer.collateralTokens"
                                    :src="`/images/${findAsset(asset).image}.png`" :key="asset.id" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="info">
                        <div class="duration">
                            <p>Duration</p>
                            <div>
                                <IconClock />
                                <p>{{ offer.daysToMaturity }} Days</p>
                            </div>
                        </div>
                        <div class="interest">
                            <p>Interest</p>
                            <div>
                                <IconInterest />
                                <p>{{ getInterest(offer.interest, offer.daysToMaturity) }} %</p>
                            </div>
                        </div>
                    </div>
                    <div class="expire" v-if="index % 2 == 0">
                        <p>Offer expires in</p>
                        <p>{{ countdown(offer.expiresAt) }}</p>
                    </div>
                    <div class="progress" v-else>
                        <div class="users" v-if="offer.currentPrincipal == offer.initialPrincipal">
                            <div class="img" v-for="index in 4" :key="index"></div>
                            <div class="extra_user">0</div>
                        </div>
                        <div class="users" v-else>
                            <img src="/images/user1.png" alt="">
                            <img src="/images/user2.png" alt="">
                            <img src="/images/user3.png" alt="">
                            <div class="extra_user">3</div>
                        </div>
                        <div class="needed">
                            <div class="label">
                                <p>{{ toMoney(fromWei(offer.currentPrincipal)) }} <span>/ {{
                                toMoney(fromWei(offer.initialPrincipal)) }} {{
        findAsset(offer.principalToken).symbol
    }}</span></p>
                                <IconInfo />
                            </div>
                            <div class="bar">
                                <div class="percentage" :style="`width: ${progress(offer)}%`"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </main>
</template>


<script setup>
import IconClock from '../../../icons/IconClock.vue';
import IconInfo from '../../../icons/IconInfo.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import ProgressBox from '../../../ProgressBox.vue'
</script >

<script>
import { fromWei } from 'web3-utils';
import Converter from '../../../../utils/Converter'
import AssetLibrary from '../../../../utils/AssetLibrary'
import Countdown from '../../../../utils/Countdown'
export default {
    data() {
        return {
            offers: [],
            fetching: true
        }
    },
    created() {
        this.fetchLendingOffers()
    },
    methods: {
        findAsset: function (address) {
            return AssetLibrary.findAsset(address)
        },
        progress: function (offer) {
            return (offer.currentPrincipal / offer.initialPrincipal) * 100
        },
        toMoney: function (value, mF = 2) {
            return Converter.toMoney(value, mF)
        },
        countdown: function (to) {
            let from = Math.floor(Date.now() / 1000)
            Countdown.start(from, to, function (text) {
                console.log(text);
            })
        },
        getInterest: function (rate, daysToMaturity) {
            let result = rate * daysToMaturity * 24 * 60 * 60
            let interest = fromWei(result.toString())
            return Converter.toMoney(interest)
        },
        fetchLendingOffers: function () {
            this.fetching = true
            this.axios.get('https://darshprotocol.onrender.com/offers?offerType=0').then(response => {
                this.offers = response.data
                this.fetching = false
            }).catch(error => {
                console.error(error);
                this.fetching = false
            })
        }
    }
}
</script>

<style scoped>
.progress_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
}

.borrows {
    display: flex;
    flex-wrap: wrap;
    padding: 40px 60px;
    gap: 30px;
    justify-content: space-between;
}

.borrow {
    width: 333px;
    background: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    transition: .2s;
    /* border: 2px transparent solid; */
}

.borrow:hover {
    transform: translateY(-2px);
    /* border: 2px var(--bglighter) solid; */
}

.asset {
    padding: 20px;
    border-bottom: 1px solid var(--background);
}

.asset>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.asset>.label>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.asset>.label {
    margin-bottom: 16px;
}

.asset .tokens>div {
    display: flex;
    align-items: center;
    gap: 12px;
}

.asset .tokens>div p {
    font-family: 'Axiforma SemiBold';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.asset .tokens>div:first-child img {
    width: 24px;
}

.asset .tokens>div:nth-child(2) img {
    width: 18px;
    margin-left: -18px;
}

.asset .tokens>div:nth-child(2) img:first-child {
    margin-left: 0;
}

.asset .tokens>div:nth-child(2) {
    width: 58px;
    height: 30px;
    background: var(--bglighter);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.info .duration {
    border-right: 1px solid var(--background);
}

.info>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.info>div>div {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}

.info>div {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info>div>div p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textnormal);
}

.expire,
.progress {
    height: 72px;
    background: var(--bglighter);
    padding: 0 20px;
    display: flex;
    align-items: center;
}

.progress {
    justify-content: space-between;
}

.users {
    display: flex;
    align-items: center;
}

.users img,
.users .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: -16px;
    background: var(--bglight);
}

.users img:first-child,
.users .img:first-child {
    margin: 0;
}

.extra_user {
    width: 40px;
    height: 32px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
    margin-left: -16px;
}

.needed>div {
    display: flex;
    align-items: center;
    gap: 6px;
}

.needed>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
}

.needed>div>p span {
    color: var(--textdimmed);
}

.bar {
    width: 120px;
    height: 6px;
    border-radius: 6px;
    background: var(--background);
    margin-top: 12px;
}

.percentage {
    width: 40%;
    height: 100%;
    background: var(--primary);
    border-radius: 6px;
}

.expire {
    text-align: center;
    flex-direction: column;
    justify-content: center;
}

.expire p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textdimmed);
}

.expire p:nth-child(2) {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: var(--textnormal);
    margin-top: 6px;
}
</style>