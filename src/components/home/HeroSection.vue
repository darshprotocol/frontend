
<template>
    <main>
        <div class="text">
            <h3 class="btn-shine">Socializing DeFi on Fantom</h3>
            <p>Darsh offers a peer to peer way of doing DeFi.</p>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100%;
    background-image: url('../../assets/images/hero_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #151226;
    padding-top: 100px;
}

.text {
    width: 100%;
    height: 423px;
    background-image: url('../../assets/images/hero_gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.text h3 {
    font-size: 68px;
    font-weight: 700;
}

.text p {
    font-size: 22px;
    color: #9284BC;
    margin-top: 24px;
}

.btn-shine {
    background: linear-gradient(to right, var(--textnormal) 0, #b7aadd 10%, var(--textnormal) 20%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 5s infinite linear;
    animation-fill-mode: forwards;
    -webkit-text-size-adjust: none;
    text-decoration: none;
    white-space: nowrap;
}

@keyframes shine {
    0% {
        background-position: 0px;
    }

    100% {
        background-position: 940px;
    }
}
</style>