<template>
    <main>
        <div class="box">
            <div class="title">
                <h3>Lender's Stats</h3>
                <div>
                    <div class="close" v-on:click="$emit('close')">
                        <IconClose />
                    </div>
                </div>
            </div>
            <div class="overflow">
                <div class="stats">
                    <div class="chart">
                        <div class="arc">
                            <div id="progress-container-border"></div>
                            <div id="progress-container"></div>
                            <p class="score">758</p>
                            <div class="arc_labels">
                                <p>300</p>
                                <p>Last updated: <span>Feb 20</span></p>
                                <p>1000</p>
                            </div>
                            <h3>On-Chain Credit Score <IconInfo /></h3>
                        </div>
                    </div>

                    <div class="labels">
                        <div class="label">
                            <p class="label_title">Active Loans</p>
                            <div class="label_options">
                                <p>6</p>
                                <IconInfo />
                            </div>
                        </div>
                        <div class="label">
                            <p class="label_title">Loans Defaulted</p>
                            <div class="label_options">
                                <p>6</p>
                                <IconInfo />
                            </div>
                        </div>
                        <div class="label">
                            <p class="label_title">Total Loans Joined</p>
                            <div class="label_options">
                                <p>6</p>
                                <IconInfo />
                            </div>
                        </div>
                        <div class="label">
                            <p class="label_title">Total Loans Volume</p>
                            <div class="label_options">
                                <p>6</p>
                                <IconInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action">
                <div class="profile">
                    <img src="/images/user1.png" alt="">
                    <div class="profile_names">
                        <p>Lender A</p>
                        <p>Lender</p>
                    </div>
                </div>
                <RouterLink to="">
                    <div class="link">
                        <p>View Profile</p>
                        <IconOut />
                    </div>
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconClose from '../../icons/IconClose.vue';
import IconInfo from '../../icons/IconInfo.vue';
import IconOut from '../../icons/IconOut.vue';
</script>

<script>
import ArcProgress from 'arc-progress';
export default {
    data() {
        return {

        }
    },
    mounted() {
        new ArcProgress({
            el: '#progress-container',
            progress: .5,
            speed: 5,
            size: 220,
            arcStart: 180,
            thickness: 12,
            fillThickness: 12,
            arcEnd: 360,
            fillColor: '#6936F5',
            emptyColor: '#141416',
            lineCap: 'square'
        });

        new ArcProgress({
            el: '#progress-container-border',
            progress: 1,
            animation: false,
            size: 208,
            thickness: 24,
            arcStart: 180,
            arcEnd: 360,
            fillColor: 'rgba(20, 20, 22, 0.4)',
            emptyColor: 'rgba(20, 20, 22, 0.4)',
            lineCap: 'square'
        });
        document.body.classList.add("modal");
    },
    unmounted() {
        document.body.classList.remove("modal");
    },
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
    height: 55vh;
}

.stats {
    background: var(--bglight);
}


.chart {
    height: 260px;
    padding: 40px;
}

.arc {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.arc_labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220px;
    margin-top: 124px;
}

.arc h3 {
    margin-top: 56px;
    font-size: 16px;
    color: var(--textnormal);
}

.arc h3 svg {
    width: 14px;
    height: 14px;
}

.arc .score {
    font-weight: 600;
    font-size: 25px;
    color: var(--textnormal);
    margin-top: 68px;
}

.arc_labels p:first-child, p:last-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.arc_labels p:nth-child(2) {
    font-size: 10px;
    color: var(--textdimmed);
}

.arc_labels p:nth-child(2) span {
    color: var(--textnormal);
}

.arc>div {
    position: absolute;
    top: 0;
}

.action {
    background: var(--bglighter);
    padding: 16px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.action .profile {
    display: flex;
    align-items: center;
    gap: 16px;
}

.profile img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.profile_names p:first-child {
    font-size: 12px;
    color: var(--textnormal);
    font-weight: 500;
}

.profile_names p:last-child {
    font-size: 12px;
    color: var(--textdimmed);
}

.action .link {
    display: flex;
    align-items: center;
    padding: 9px 16px;
    gap: 6px;
    height: 36px;
    background: rgba(108, 110, 115, 0.1);
    border-radius: 4px;
}

.link p {
    font-size: 14px;
    color: var(--textnormal);
}

.label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 60px;
    border-top: 1px solid var(--bglighter);
}

.label_title {
    font-size: 16px;
    color: var(--textdimmed);
}

.label_options {
    display: flex;
    align-items: center;
    gap: 6px;
}

.label_options p {
    font-size: 16px;
    color: var(--textnormal);
}

.label_options svg {
    margin-bottom: 4px;
}
</style>