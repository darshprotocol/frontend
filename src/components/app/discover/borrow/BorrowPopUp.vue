<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Borrow</h3>
                <div class="close" v-on:click="$emit('close')">
                    <IconClose />
                </div>
            </div>
            <div>
                <p>Borrow Amount</p>
                <div>
                    <p>40,000</p>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <p>USDC</p>
                    </div>
                </div>
            </div>
            <div class="slider">
                <Slider v-model="percentage" :step="25" :format="{ suffix: '%' }" />
            </div>
            <div>
                <p>Collateral Amount</p>
                <div>
                    <p>40,000</p>
                    <div>
                        <img src="/images/usdc.png" alt="">
                        <p>USDC</p>
                        <IconArrowDown />
                    </div>
                </div>
                <div>
                    <input type="checkbox" name="" id="">
                    <p>Read and Agreed to our <a href="" target="_blank">Terms & Policy?</a></p>
                </div>
            </div>
            <div>
                <PrimaryButton :text="'Borrow'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import Slider from '@vueform/slider'
import IconClose from '../../../icons/IconClose.vue';
import PrimaryButton from '../../../PrimaryButton.vue';
</script>

<script>
export default {
    data() {
        return {
            percentage: 25
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

<style src="@vueform/slider/themes/default.css">

</style>
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

.box>div:nth-child(2) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(2)>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(2)>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.box>div:nth-child(2)>div>div {
    height: 50px;
    padding: 0 20px;
    background: var(--bglighter);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.box>div:nth-child(2)>div:nth-child(2) img {
    width: 24px;
    height: 24px;
}

.box>div:nth-child(2)>div p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(2)>div>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.slider {
    padding: 30px;
    padding-top: 40px;
}

.box>div:nth-child(4) {
    margin: 0 30px;
    padding-top: 30px;
    margin-bottom: 20px;
}

.box>div:nth-child(4)>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}

.box>div:nth-child(4)>div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom: 1px solid var(--background);
}

.box>div:nth-child(4)>div:nth-child(2)>div {
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

.box>div:nth-child(4)>div:nth-child(2) p:first-child {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: var(--textnormal);
}

.box>div:nth-child(4)>div:nth-child(2)>div>p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: var(--textnormal);
}

.box>div:nth-child(4)>div:nth-child(3) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
}

.box>div:nth-child(4)>div:nth-child(3) p {
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--textdimmed);
}


.box>div:nth-child(4)>div:nth-child(3) a {
    color: var(--primary);
    border-bottom: 1px var(--primary) solid;
}

.box>div:nth-child(5) {
    width: 100%;
    padding: 30px;
    background-image: url('../../../assets/images/subtle_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>