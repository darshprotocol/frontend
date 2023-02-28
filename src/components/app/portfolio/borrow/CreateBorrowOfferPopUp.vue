

<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Create Offer</h3>
                <div>
                    <div class="close" v-on:click="$emit('close')">
                        <IconClose />
                    </div>
                </div>
            </div>
            <div class="overflow">
                <div class="offer">
                    <div class="box_grid">
                        <div>
                            <div class="label">Principal needed</div>
                            <div class="box_grid_item">
                                <img :src="`/images/${$findAsset(principalToken).image}.png`" />
                                <p>{{ $toMoney(principal) }}</p>
                            </div>
                        </div>
                        <div>
                            <div class="label">Collateral required</div>
                            <div class="box_grid_item">
                                <div class="images">
                                    <img :src="`/images/${$findAsset(collateralToken).image}.png`"  />
                                </div>
                                <p>{{ $toMoney($fromWei(collateral)) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box_grid">
                        <div>
                            <div class="label">Interest</div>
                            <div class="box_grid_item">
                                <IconInterest />
                                <p>{{ interest }} %
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="label">Duration</div>
                            <div class="box_grid_item">
                                <IconClock />
                                <p>{{ daysToMaturity }} Days</p>
                            </div>
                        </div>
                    </div>
                    <div class="expires_on">
                        <p class="label">Expires on</p>
                        <div class="expires_on_item">
                            <IconCalendar />
                            <p> {{ getExpireDate() }}</p>
                        </div>
                    </div>
                    <!-- <div class="fee">
                        <div class="fee_note">
                            <IconInformation :color="'var(--primary)'" />
                            <p><span>Note :</span> A Platform fee of 5% will be deducted from Interests
                                paid by Borrowers</p>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="action">
                <PrimaryButton v-on:click="createOffer()" :text="'Confirm'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import Countdown from '../../../../utils/Countdown';
import IconCalendar from '../../../icons/IconCalendar.vue';
import IconClock from '../../../icons/IconClock.vue';
import IconClose from '../../../icons/IconClose.vue';
import IconInterest from '../../../icons/IconInterest.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
</script>

<script>
export default {
    props: ['interest', 'collateral', 'principal', 'principalToken', 'collateralToken', 'daysToMaturity', 'hoursToExpire'],
    methods: {
        createOffer: function () {
            this.$emit('close')
            this.$emit('create')
        },
        getExpireDate: function() {
            let expire = (Date.now() / 1000) + (this.hoursToExpire * 60 * 60)
            let date =  Countdown.toDate(expire)
            return `${date.month} ${date.date}, ${date.hour}:${date.min}`
        }
    },
    mounted() {
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
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    background: rgba(20, 20, 22, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade_in .2s ease-in-out;
}

.box {
    width: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
    animation: slide_in_up .2s ease-in-out;
}

.title {
    height: 70px;
    width: 100%;
    background: #141416;
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
    display: flex;
    align-items: center;
    gap: 20px;
}

.title .close {
    width: 30px;
    height: 30px;
    background: var(--bglighter);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}


.overflow {
    overflow-y: auto;
    max-height: 60vh;
}

.offer {
    background-image: url('/images/request_gradient.png');
    background-repeat: no-repeat;
    background-size: cover;
}


.box_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.box_grid>div {
    padding: 30px;
}

.box_grid img {
    width: 28px;
    height: 28px;
}

.box_grid>div:first-child {
    border-right: 1px solid var(--background);
}

.box_grid .box_grid_item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}


.box_grid:nth-child(1)>div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.box_grid .images {
    display: flex;
    align-items: center;
}

.box_grid .images img {
    margin-left: -8px;
}

.box_grid .images img:first-child {
    margin: 0;
}

.box_grid:nth-child(2)>div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box_grid svg {
    width: 24px;
    height: 24px;
}

.box_grid .box_grid_item p {
    font-size: 20px;
    color: var(--textnormal);
}

.label {
    font-size: 14px;
    color: var(--textdimmed);
}

.expires_on {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
}

.expires_on_item {
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 12px;
}

.expires_on_item svg {
    width: 28px;
    height: 28px;
}

.expires_on_item p {
    font-size: 20px;
    color: var(--textnormal);
}

.action {
    padding: 30px;
    background-image: url('/images/subtle_gradient.png');
    background-color: var(--bglighter);
}
</style>