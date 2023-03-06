<script setup>
import IconArrowRight2 from '../icons/IconArrowRight2.vue';
</script>

<template>
    <main>
        <div class="home-width">
            <img class="bgimg" src="/images/home-bg.png" alt="">
            <div class="text">
                <div class="container">
                    <div class="title">
                        <div>
                            <h3>Socializing DeFi on</h3>
                        </div>
                        <div class="word can">
                            <span>
                                <h3>F</h3>
                            </span>
                            <span>
                                <h3>a</h3>
                            </span>
                            <span>
                                <h3>n</h3>
                            </span>
                            <span>
                                <h3>t</h3>
                            </span>
                            <span>
                                <h3>o</h3>
                            </span>
                            <span>
                                <h3>m</h3>
                            </span>
                            <span>
                                <h3>.</h3>
                            </span>
                        </div>
                        <div class="word will">
                            <span>
                                <h3>F</h3>
                            </span>
                            <span>
                                <h3>a</h3>
                            </span>
                            <span>
                                <h3>n</h3>
                            </span>
                            <span>
                                <h3>t</h3>
                            </span>
                            <span>
                                <h3>o</h3>
                            </span>
                            <span>
                                <h3>m</h3>
                            </span>
                            <span>
                                <h3>.</h3>
                            </span>
                        </div>
                        <div class="word thrive">
                            <span>
                                <h3>F</h3>
                            </span>
                            <span>
                                <h3>a</h3>
                            </span>
                            <span>
                                <h3>n</h3>
                            </span>
                            <span>
                                <h3>t</h3>
                            </span>
                            <span>
                                <h3>o</h3>
                            </span>
                            <span>
                                <h3>m</h3>
                            </span>
                            <span>
                                <h3>.</h3>
                            </span>
                        </div>
                    </div>
                </div>
                <p class="desc">Darsh offers a peer to peer way of lending and borrowing. </p>
                <div class="tabs">
                    <RouterLink to="/discover">
                        <div class="tab">
                            <p>Lend</p>
                            <IconArrowRight2 />
                        </div>
                    </RouterLink>
                    <RouterLink to="/discover/borrowers">
                        <div class="tab">
                            <p>Borrow</p>
                            <IconArrowRight2 />
                        </div>
                    </RouterLink>
                    <RouterLink to="/stake">
                        <div class="tab">
                            <p>Stake</p>
                            <IconArrowRight2 />
                        </div>
                    </RouterLink>
                </div>
                <div class="cta">
                    <RouterLink to="/discover">
                        <div class="button">
                            Launch App
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    background: #151226;
}

.home-width {
    width: 100%;
    max-width: 1920px;
    position: relative;
}

.text {
    position: absolute;
    top: 210px;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.desc {
    font-size: 22px;
    color: #9284BC;
    margin-top: 30px;
}

.bgimg {
    width: 100%;
    height: 960px;
    object-fit: cover;
}


.tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0px 16px;
    width: 640px;
    height: 75px;
    padding: 10px;
    background: rgba(21, 18, 38, 0.01);
    backdrop-filter: blur(6px);
    margin-top: 80px;
    border-radius: 4px;
    border: 1px solid #332e4554;
}

.tabs .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 6px;
}

.tabs a:nth-child(2) .tab {
    border-right: 2px solid #332e459d;
    border-left: 2px solid #332e459d;
}

.tab p {
    font-size: 18px;
    color: var(--textnormal);
}

.cta {
    margin-top: 66px;
}
.cta .button {
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: var(--primary);
    border: 1px solid #343143;
    border-radius: 4px;
    font-size: 16px;
    color: var(--textnormal);
}



















@keyframes can {
    0% {
        transform: translateY(0);
    }

    26.6666666667% {
        transform: translateY(0);
        opacity: 1;
    }

    33.3333333333% {
        transform: translateY(-100%);
        opacity: 0;
    }

    33.3343333333% {
        transform: translateY(100%);
        opacity: 0;
    }

    33.3363333333% {
        transform: translateY(100%);
        opacity: 1;
    }

    93.3333333333% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes will {
    0% {
        transform: translateY(0);
    }

    26.6666666667% {
        transform: translateY(0);
    }

    33.3333333333% {
        transform: translateY(-100%);
    }

    60% {
        transform: translateY(-100%);
        opacity: 1;
    }

    66.6666666667% {
        transform: translateY(-200%);
        opacity: 0;
    }

    66.6676666667% {
        transform: translateY(0);
    }

    66.6696666667% {
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes thrive {
    0% {
        transform: translateY(-300%);
    }

    0.0001% {
        transform: translateY(0);
    }

    26.6666666667% {
        transform: translateY(0);
    }

    33.3333333333% {
        transform: translateY(-100%);
    }

    60% {
        transform: translateY(-100%);
    }

    66.6666666667% {
        transform: translateY(-200%);
    }

    93.3333333333% {
        transform: translateY(-200%);
        opacity: 1;
    }

    100% {
        transform: translateY(-300%);
        opacity: 0;
    }
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.word {
    display: flex;
    grid-column: 2;
    grid-row: auto;
}


.word span {
    display: inline-block;
}

.can span:nth-child(1) {
    animation: can 6s ease-in-out both 0.05s infinite;
}

.will span:nth-child(1) {
    animation: will 6s ease-in-out both 0.05s infinite;
}

.thrive span:nth-child(1) {
    animation: thrive 6s ease-in-out both 0.05s infinite;
}

.can span:nth-child(2) {
    animation: can 6s ease-in-out both 0.1s infinite;
}

.will span:nth-child(2) {
    animation: will 6s ease-in-out both 0.1s infinite;
}

.thrive span:nth-child(2) {
    animation: thrive 6s ease-in-out both 0.1s infinite;
}

.can span:nth-child(3) {
    animation: can 6s ease-in-out both 0.15s infinite;
}

.will span:nth-child(3) {
    animation: will 6s ease-in-out both 0.15s infinite;
}

.thrive span:nth-child(3) {
    animation: thrive 6s ease-in-out both 0.15s infinite;
}

.can span:nth-child(4) {
    animation: can 6s ease-in-out both 0.2s infinite;
}

.will span:nth-child(4) {
    animation: will 6s ease-in-out both 0.2s infinite;
}

.thrive span:nth-child(4) {
    animation: thrive 6s ease-in-out both 0.2s infinite;
}

.can span:nth-child(5) {
    animation: can 6s ease-in-out both 0.25s infinite;
}

.will span:nth-child(5) {
    animation: will 6s ease-in-out both 0.25s infinite;
}

.thrive span:nth-child(5) {
    animation: thrive 6s ease-in-out both 0.25s infinite;
}

.can span:nth-child(6) {
    animation: can 6s ease-in-out both 0.3s infinite;
}

.will span:nth-child(6) {
    animation: will 6s ease-in-out both 0.3s infinite;
}

.thrive span:nth-child(6) {
    animation: thrive 6s ease-in-out both 0.3s infinite;
}

.can span:nth-child(7) {
    animation: can 6s ease-in-out both 0.3s infinite;
}

.will span:nth-child(7) {
    animation: will 6s ease-in-out both 0.3s infinite;
}

.thrive span:nth-child(7) {
    animation: thrive 6s ease-in-out both 0.3s infinite;
}

.title {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: auto;
    column-gap: 18px;
    overflow: hidden;
    max-height: 90px;
    color: var(--textnormal);
}

.title h3 {
    font-family: 'Axiforma Bold';
    font-weight: 700;
    font-size: 68px;
}
</style>