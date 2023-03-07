<template>
    <main>
        <div class="home-width">
            <div class="container">
                <div class="display">
                    <div class="low_stack"></div>
                    <img src="/images/display_image.png" alt="" class="high_stack">
                    <img src="/images/display_image_1.png" alt="" data-speed="-1" class="layer high_stack1">
                    <img src="/images/display_image_2.png" alt="" data-speed="1.4" class="layer high_stack2">
                </div>
            </div>

            <div class="built">
                <p>Built Using</p>
                <div class="images">
                    <img src="/images/chainlink.png" alt="">
                    <img src="/images/covalent.png" alt="">
                    <img src="/images/fantom.png" alt="">
                    <img src="/images/cred.png" alt="">
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    mounted() {
        const layers = document.querySelectorAll('.layer')
        window.addEventListener('mousemove', function (e) {
            if (window.innerWidth > 1100) {
                layers.forEach(layer => {
                    const speed = layer.getAttribute('data-speed')
                    const x = (window.innerWidth - e.pageX * speed) / 150
                    const y = (window.innerHeight - e.pageY * speed) / 150
                    layer.style.transform = `translateX(${x}px) translateY(${y}px)`
                })
            }
        });
    }
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
}

.container {
    position: relative;
    min-height: 800px;
}

.display {
    top: -200px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 1160px;
    user-select: none;
    max-width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.low_stack {
    width: 1100px;
    height: 100px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 226.5%);
}

.high_stack {
    width: 1160px;
    animation: highstack 1.5s ease-in-out both 1;
    background-color: #fff;
}

.high_stack1,
.high_stack2 {
    position: absolute;
    bottom: -30px;
}

.high_stack1 {
    left: -40px;
}

.high_stack2 {
    right: -40px;
}

.built {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 90px;
}

.built p {
    color: #ABADAE;
    text-align: center;
    font-size: 16px;
}

.built .images {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40px;
    width: 911px;
    max-width: 100%;
    gap: 20px;
    height: 40px;
}

.built img {
    height: 40px;
    mix-blend-mode: luminosity;
}

@keyframes highstack {
    0% {
        margin-top: 0;
    }

    100% {
        margin-top: -80px;
    }
}
</style>