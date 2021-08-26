<template>
    <article id="homepage">
        <header>
            <div class="header-top">
                <i class="iconfont icon-dingwei"></i>
                <img src="../image/logo.png" alt="" />
                <div class="search-wrapper-relative">
                    <input type="text" placeholder="按内容搜索" />
                    <input type="submit" value="" />
                </div>
                <i class="iconfont icon-shangcheng"></i>
            </div>
            <nav class="header-nav-relative">
                <div class="slider">
                    <a href="#">推荐</a>
                    <a href="#">女装</a>
                    <a href="#">鞋包</a>
                    <a href="#">居家</a>
                    <a href="#">母婴</a>
                    <a href="#">美妆</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                </div>
            </nav>
            <div class="nav-more">
                <i class="iconfont icon-gengduo"></i>
                <a href="#">分类</a>
            </div>
        </header>
        <div class="big-wrapper">
            <main>
                <div class="main-scroll-img">
                    <div class="imgzhanwei1"></div>
                    <div class="imgzhanwei2"></div>
                    <div class="imgzhanwei3"></div>
                    <div class="imgzhanwei4"></div>
                    <div class="imgzhanwei5"></div>
                    <div class="imgzhanwei6"></div>
                </div>
                <div class="pointer">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <nav class="main-nav">
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
                    </section>
                    <!-- TAG 跳转到商品列表页 -->
                    <section @click="toItemList">
                        <img src="../image/img5.png" alt="" />
                        <p>畅销商品</p>
                    </section>
                    <section>
                        <img src="../image/img3.png" alt="" />
                        <p>品质大牌</p>
                    </section>
                    <section>
                        <img src="../image/img6.png" alt="" />
                        <p>小U自营</p>
                    </section>
                    <section>
                        <img src="../image/img4.png" alt="" />
                        <p>积分商城</p>
                    </section>
                </nav>
            </main>
            <section class="foot">
                <div class="section-top">
                    <div class="section-top-1">
                        <p>
                            <span> 限时秒杀 </span>
                            <span class="fr"> 查看更多 > </span>
                        </p>
                        <p>每天0点场，好货秒不停</p>
                        <p class="time">
                            <span>05</span>:<span>20</span>:<span>48</span>
                        </p>
                    </div>
                    <div class="section-top-2">
                        <p>品牌上新</p>
                        <p>9点整，抢大牌</p>
                        <p>疯抢红包 ></p>
                    </div>
                    <div class="section-top-3">
                        <p>日用好物</p>
                        <p>愿君多采集</p>
                        <p>塞满奖券 ></p>
                    </div>
                </div>
                <div class="section-bottom">
                    <p>
                        <span>双11尖货预购</span>
                        <span>畅购全球</span>
                    </p>
                    <section>
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                        <img src="../image/img1.png" alt="" />
                    </section>
                </div>
            </section>
        </div>
    </article>
</template>

<script>
export default {
    methods:{
        // 跳转到商品列表页方法
        toItemList(){
            this.$router.push("/itemList")
        }
    }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/homepage.scss";
</style>