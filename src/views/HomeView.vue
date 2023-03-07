<script setup>
import HomeHeader from '../components/home/HomeHeader.vue';
import HeroSection from '../components/home/HeroSection.vue';
import HomeDisplay from '../components/home/HomeDisplay.vue';
import FeaturesSection from '../components/home/FeaturesSection.vue';
import HomeFooter from '../components/home/HomeFooter.vue';
import HomeShowcase from '../components/home/HomeShowcase.vue';
</script>

<template>
    <main>
        <HomeHeader />
        <HeroSection />
        <HomeDisplay />
        <div class="linesbg">
            <FeaturesSection />
            <HomeShowcase />
            <HomeFooter />
        </div>
        <div class="ma"></div>
    </main>
</template>


<style scoped>
.linesbg {
    background-image: url('/images/white-lines.png');
    background-size: 900px 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #F5F7F9;
}

.ma {
    background: #F5F7F9;
    height: 80px;
}
</style>