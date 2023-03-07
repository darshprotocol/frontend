<template>
    <main>
        <div class="home-width">
            <div class="showcases">
                <div class="showcase">
                    <div class="image">
                        <img src="/images/portfolio.png" alt="">
                    </div>
                    <h3>Overview all <br> actions in a glance.</h3>
                    <p>Manage and view all your actions and all assets you own in a glance, using the Darshboard.</p>
                </div>
                <div class="showcase">
                    <div class="image">
                        <img src="/images/credbar.png" alt="">
                    </div>
                    <h3>Your own rules, <br> on assets you own.</h3>
                    <p>Choose who to lend or borrow from based on their social stats or on-chain credibility.</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: 960px;
    display: flex;
    justify-content: center;
}

.showcases {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 60px;
}

.showcase {
    width: 495px;
    background: #FFFFFF;
    padding: 50px;
    max-width: 100%;
    text-align: center;
}


.image img {
    height: 300px;
    width: 395px;
    object-fit: cover;
}

.showcase h3 {
    margin-top: 70px;
    color: #39375C;
    font-weight: 600;
    font-size: 30px;
}

.showcase p {
    font-size: 14px;
    color: #ABADAE;
    margin-top: 16px;
}
</style>