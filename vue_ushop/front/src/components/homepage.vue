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
                </div>
            </nav>
            <div class="nav-more">
                <i class="iconfont icon-gengduo"></i>
                <a href="#">分类</a>
            </div>
        </header>
        <div class="big-wrapper">
            <main>
                <!-- 轮播图区域 -->
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="item in bannerList"
                            :key="item.id"
                        >
                            <img :src="item.img" alt="" />
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
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
import "swiper/css/swiper.css";
import Swiper from "swiper";
export default {
    methods: {
        // 跳转到商品列表页方法
        toItemList() {
            this.$router.push("/itemList");
        },
    },
    data() {
        return {
            bannerList: [],
        };
    },
    created() {
        this.$axios({
            method: "get",
            url: "/api/bannerlist",
        }).then((res) => {
            if (res.data.code == 200) {
                this.bannerList = res.data.list;
                // NOTE this.$nextTick将回调延迟到下次DOM更新循环之后执行.再修改数据后立即使用它,然后等待DOM更新.它跟全局方法Vue.nextTick一样,不同的是回调的this自动绑定到调用它的实例上
                // NOTE 在created钩子函数执行的时候,DOM其实并未进行任何渲染,而此时进行DOM操作并无作用,而在created里使用this.$nextTick可以等待DOM生成以后再来获取DOM对象
                this.$nextTick(() => {
                    new Swiper(".swiper-container", {
                        direction: "horizontal", // 垂直切换选项
                        loop: true, // 循环模式选项
                        autoplay: {
                            delay: 1000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false, // 是否禁用交互
                        },

                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                        },
                    });
                });
            }
        });
    },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/homepage.scss";
</style>