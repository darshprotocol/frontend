<template>
  <div class="app_section">
    <main id="main_header">
      <div class="header">
        <div class="logo">
          <img src="../../assets/images/logo2.png" alt="">
          <img src="/images/logo4.png" alt="">
        </div>
        <div class="pages">
          <a href="#">About</a>
          <a href="https://darshprotocol.gitbook.io/product-docs" target="_blank">Docs</a>
          <a href="#">Governance</a>
          <a href="#">Litepaper </a>
        </div>
        <div class="actions">
          <RouterLink to="/discover">
            <div class="connect_wallet">
              <p>Launch App</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>

<script>
export default {
  mounted() {
    this.determineGlass()
    const _this = this
    window.addEventListener('scroll', function () {
      _this.determineGlass()
    })
  },
  methods: {
    determineGlass() {
      const header = document.getElementById('main_header')
      header.classList.toggle('glass', window.scrollY > 700)
    }
  }
}
</script>

<style scoped>
main {
  top: 0;
  width: 100%;
  height: 90px;
  position: fixed;
  display: flex;
  justify-content: center;
  border-image-source: linear-gradient(to left, transparent, #28233A, transparent);
  z-index: 10;
  background: rgba(20, 17, 37, 0.02);
  backdrop-filter: blur(8.5px);
  transition: .2s;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-bottom: 1px solid;
  border-image-slice: 1;
}

.glass {
  background: #FFFFFF !important;
  border-image-source: linear-gradient(to left, transparent, #CCCAD3, transparent);
}

.header {
  width: 1180px;
  max-width: 90%;
  display: grid;
  grid-template-columns: 200px auto 200px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 124px;
  height: 30px;
}

.logo img:last-child {
  display: none;
}

.glass .logo img:last-child {
  display: block;
}

.glass .logo img:first-child {
  display: none;
}

.pages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.pages a {
  font-weight: 500;
  font-size: 16px;
  color: #989898;
  text-decoration: none;
}

.glass .pages a {
  color: #39375C;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.connect_wallet {
  height: 50px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.connect_wallet:hover,
.icon_badge:hover {
  transform: translateY(-2px);
}

.connect_wallet p {
  font-weight: 500;
  font-size: 16px;
  color: var(--textnormal);
}


.glass .connect_wallet {
  border: 1px solid #F1F1F1;
}


.glass .connect_wallet p {
  color: #39375C;
}


.icon_badge {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: var(--bglight);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: .2s;
}
</style>