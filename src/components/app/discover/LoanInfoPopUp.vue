<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Loan Info</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div>
                <div>
                    <p>Amount Borrowed</p>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <h3>20,000 USDC</h3>
                    </div>
                </div>
                <div>
                    <p>My Collateral</p>
                    <div>
                        <h3>0.72 BTC</h3>
                        <img src="/images/btc.png" alt="">
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p>Interest</p>
                    <div>
                        <IconInterest class="icon" />
                        <p>9.00 %</p>
                    </div>
                </div>
                <div>
                    <p>Due in</p>
                    <div>
                        <IconClock class="icon" />
                        <p>19 days</p>
                    </div>
                </div>
            </div>
            <div>
                <p>Total Interest Accrued</p>
                <div>
                    <p>14.259333</p>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <p>USDC</p>
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton :text="'Payback'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import IconClock from '../../icons/IconClock.vue';
import IconClose from '../../icons/IconClose.vue';
import IconInterest from '../../icons/IconInterest.vue';
import PrimaryButton from '../../PrimaryButton.vue';
</script>

<script>
export default {
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
}

.box {
    width: 500px;
    background-image: url('../../../assets/images/loan_gradient.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--bglight);
    border-radius: 6px;
    overflow: hidden;
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
    font-family: 'Axiforma';
    font-style: normal;
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

.box>div:nth-child(2),
.box>div:nth-child(3) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(2) p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(2)>div>div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
}

.box>div:nth-child(2)>div img {
    height: 28px;
    width: 28px;
}

.box>div:nth-child(2)>div h3 {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    margin-top: 4px;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(2)>div,
.box>div:nth-child(3)>div {
    padding: 30px;
}


.box>div:nth-child(3)>div {
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

.box>div:nth-child(2)>div:first-child,
.box>div:nth-child(3)>div:first-child {
    border-right: 1px solid var(--background);
    padding: 30px;
}

.box>div:nth-child(3)>div p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}


.box>div:nth-child(3)>div>div p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}


.box>div:nth-child(3)>div div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.box>div:nth-child(3)>div .icon {
    width: 28px;
    height: 28px;
}

.box>div:nth-child(4) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(4)>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(4)>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.box>div:nth-child(4)>div>div {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.box>div:nth-child(4)>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.box>div:nth-child(4)>div p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(4)>div>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.box>div:nth-child(5) {
    width: 100%;
    padding: 30px;
    background-image: url('../../../assets/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>