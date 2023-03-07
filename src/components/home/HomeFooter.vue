<template>
    <main>
        <div class="home-width">
            <div class="footer">
                <div class="project">
                    <img src="/images/logo3.png" alt="">
                    <div class="socials">
                        <a href="#">
                            <div class="social_icon">
                                <IconHomeTelegram />
                            </div>
                        </a>
                        <a href="#">
                            <div class="social_icon">
                                <IconHomeMedium />
                            </div>
                        </a> <a href="#">
                            <div class="social_icon">
                                <IconHomeDiscord />
                            </div>
                        </a> <a href="#">
                            <div class="social_icon">
                                <IconHomeTwitter />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Products</h3>
                        <RouterLink to="/discover">
                            <p>Lend</p>
                        </RouterLink>
                        <RouterLink to="/discover/borrowers">
                            <p>Borrow</p>
                        </RouterLink>
                        <RouterLink to="/stake">
                            <p>Stake</p>
                        </RouterLink>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Site Map</h3>
                        <RouterLink to="/faucet">
                            <p>Faucet</p>
                        </RouterLink>
                        <a href="#">
                            <p>Blog</p>
                        </a>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Products</h3>
                        <a target="_blank" href="https://darshprotocol.gitbook.io/product-docs">
                            <p>Docs</p>
                        </a>
                        <a href="#">
                            <p>Litepaper</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconHomeTwitter from '../icons/IconHomeTwitter.vue';
import IconHomeTelegram from '../icons/IconHomeTelegram.vue';
import IconHomeMedium from '../icons/IconHomeMedium.vue';
import IconHomeDiscord from '../icons/IconHomeDiscord.vue';
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to top, #F5F7F9, transparent, transparent);
}

.home-width {
    width: 1000px;
}

.footer {
    display: flex;
    gap: 140px;
}

.project {
    width: 250px;
}

.project img {
    width: 123px;
}

.socials {
    margin-top: 50px;
    display: flex;
    gap: 10px;
}

.social_icon {
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #F1F1F1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page h3 {
    font-weight: 600;
    font-size: 16px;
    color: #39375C;
    margin-bottom: 24px;
}

.page p {
    font-size: 16px;
    font-weight: 500;
    color: #39375C;
    padding: 10px 0;
}
</style>