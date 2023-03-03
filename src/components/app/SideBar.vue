<template>
    <main>
        <div class="logo">
            <RouterLink to="/discover">
                <img src="../../assets/images/logo.png" alt="">
            </RouterLink>
        </div>
        <div class="overflow">
            <div class="tab_items">
                <div class="tab_parent">
                    <RouterLink to="/discover">
                        <div class="title">
                            <IconDiscover :active="$route.name.startsWith('discover')" />
                            <h3>Discover</h3>
                            <div :class="$route.name.startsWith('discover') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                    <div class="tabs">
                        <RouterLink to="/discover">
                            <div :class="$route.name.startsWith('discover-lend') ? 'tab tab_active' : 'tab'">Lenders</div>
                        </RouterLink>
                        <RouterLink to="/discover/borrowers">
                            <div :class="$route.name.startsWith('discover-borrow') ? 'tab tab_active' : 'tab'">Borrowers
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div class="tab_parent">
                    <RouterLink to="/stake">
                        <div class="title">
                            <IconStake :active="$route.name.startsWith('stake')" />
                            <h3>Stake <span>Coming</span></h3>
                            <div :class="$route.name.startsWith('stake') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div class="tab_parent">
                    <RouterLink to="/portfolio">
                        <div class="title">
                            <IconBriefcase :active="$route.name.startsWith('portfolio')" />
                            <h3>Portfolio</h3>
                            <div :class="$route.name.startsWith('portfolio') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                    <div class="tabs">
                        <RouterLink to="/portfolio">
                            <div :class="$route.name.startsWith('portfolio-lend') ? 'tab tab_active' : 'tab'">My Lends</div>
                        </RouterLink>
                        <RouterLink to="/portfolio/borrows">
                            <div :class="$route.name.startsWith('portfolio-borrow') ? 'tab tab_active' : 'tab'">My Borrows
                            </div>
                        </RouterLink>
                        <RouterLink to="/portfolio/vaults">
                            <div :class="$route.name.startsWith('portfolio-vault') ? 'tab tab_active' : 'tab'">Vaults</div>
                        </RouterLink>
                    </div>
                </div>
                <div class="tab_parent">
                    <RouterLink to="/darshboard">
                        <div class="title">
                            <IconCategory :active="$route.name.startsWith('darshboard')" />
                            <h3>Darshboard</h3>
                            <div :class="$route.name.startsWith('darshboard') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="links">
            <a href="#">
                <div class="support">
                    <IconSupport />
                    <h3>Support</h3>
                </div>
            </a>
            <div class="socials">
                <a href="#">
                    <IconMedium class="social_icon" />
                </a>
                <a href="#">
                    <IconTwitter class="social_icon" />
                </a>
                <a href="#">
                    <IconDiscord class="social_icon" />
                </a>
                <a href="#">
                    <IconTelegram class="social_icon" />
                </a>
            </div>
        </div>
    </main>
</template>

<script setup>

import IconDiscover from '../icons/IconDiscover.vue';
import IconBriefcase from '../icons/IconBriefcase.vue';
import IconCategory from '../icons/IconCategory.vue';
import IconDiscord from '../icons/IconDiscord.vue';
import IconMedium from '../icons/IconMedium.vue';
import IconTelegram from '../icons/IconTelegram.vue';
import IconTwitter from '../icons/IconTwitter.vue';
import IconSupport from '../icons/IconSupport.vue';
import IconStake from '../icons/IconStake.vue';

</script>

<style scoped>
main {
    height: 100vh;
    top: 0;
    width: 260px;
    border-right: 1px solid var(--bglightest);
    border-left: 1px solid var(--bglightest);
    position: fixed;
    z-index: 20;
}

.logo {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.logo img {
    width: 109px;
    height: 30px;
}

.overflow {
    height: 70vh;
    overflow-y: auto;
}

.overflow:hover::-webkit-scrollbar {
    display: block;
}

.overflow::-webkit-scrollbar {
    display: none;
    width: 3px;
}

.tab_items {
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    gap: 36px;
    align-items: flex-end;
    padding-bottom: 10px;
}

.tab_parent {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.title {
    width: 220px;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30px;
    gap: 20px;
}

.title h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    color: #EEF1F8;
}

.title span {
    padding: 4px 8px;
    font-size: 10px;
    margin-left: 12px;
    color: var(--textdimmed);
    height: 20px;
    background: var(--primarydimmed);
    border-radius: 2px;
}

.indicator {
    position: absolute;
    width: 4px;
    height: 42px;
    right: 0;
    top: 4px;
    border-radius: 3px 0px 0px 3px;
    background: var(--bglightest);
}

.indicator_active {
    background: var(--primary);
}

.tabs {
    width: 180px;
    border-left: 2px var(--bglightest) solid;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tab {
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    color: var(--textdimmed);
}

.tab_active {
    color: var(--primary);
    background: var(--bglight);
}

.links {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px 40px;
    background: var(--background);
}

.support {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    text-decoration: none;
}

.support h3 {
    font-weight: 500;
    font-size: 16px;
    color: var(--textnormal);
}

.socials {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.social_icon {
    width: 26px;
    height: 26px;
}
</style>