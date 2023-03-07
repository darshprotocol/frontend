<template>
    <main>
        <div class="home-width">
            <div class="features">
                <div class="feature">
                    <div class="box">
                        <div class="text">
                            <h3>Control earnings on supplied asset.</h3>
                            <p>As a lender, Create lend offer and control earnings to be earned on supplied assets by
                                setting loan terms.</p>
                            <RouterLink to="/discover">
                                <div class="action">Start Lending</div>
                            </RouterLink>
                        </div>
                        <div class="image">
                            <img src="/images/lending.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="feature">
                    <div class="box">
                        <div class="image">
                            <img src="/images/borrowing.png" alt="">
                        </div>
                        <div class="text">
                            <h3>Access Fixed-Term Loans on-chain.</h3>
                            <p>Borrow loans with predictable terms, to be paid back anytime within the loan duration
                                assigned.</p>
                            <RouterLink to="/discover/borrowers">
                                <div class="action">Start Borrowing</div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="feature">
                    <div class="box">
                        <div class="text">
                            <h3>Earn emissions on supplied assets.</h3>
                            <p>Idle assets Supplied on Darsh, earns yield from trusted third party liquidity protocol, while being matched to a borrower.</p>
                            <a target="_blank" href="https://darshprotocol.gitbook.io/product-docs/product-guide/lending">
                                <div class="action">Learn More</div>
                            </a>
                        </div>
                        <div class="image">
                            <img src="/images/emission.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
}

.features {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.feature {
    min-height: 960px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.feature .box {
    width: 1050px;
    display: flex;
    flex-wrap: wrap;
    background: #FFFFFF;
}

.box .text,
.box .image {
    width: 50%;
    height: 455px;
}

.text {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    text-align: center;
}

.feature:nth-child(odd) .text {
    border-right: 1px solid #F1F1F1;
}

.feature:nth-child(even) .text {
    border-left: 1px solid #F1F1F1;
}

.text h3 {
    font-family: 'Axiforma Bold';
    font-weight: 600;
    font-size: 38px;
    color: #39375C;
}

.text p {
    font-weight: 500;
    font-size: 16px;
    color: #ABADAE;
    margin-top: 20px;
    margin-bottom: 50px;
}

.text .action {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    border: 1px solid rgba(105, 54, 245, 0.4);
    border-radius: 4px;
    font-size: 16px;
    color: var(--primary);
}

.image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image img {
    width: 385px;
}
</style>