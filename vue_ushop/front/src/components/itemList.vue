<template>
    <article id="itemList">
        <header>
            <div class="search-wrapper-relative">
                <input type="text" placeholder="按内容搜索" />
                <input type="submit" value="" />
            </div>
            <nav class="header-nav-relative">
                <div class="slider">
                    <a href="#" class="highlight">综合推荐</a>
                    <a href="#">销量</a>
                    <a href="#">价格</a>
                    <a href="#">好评度</a>
                    <a href="#">店铺</a>
                </div>
            </nav>
            <div class="nav-more">
                <i class="iconfont icon-gengduo"></i>
                <a href="#">筛选</a>``
            </div>
        </header>
        <main>
            <div class="box">
                <div class="border-left-right">
                    <div class="banner border-top-bottom">
                        筛选11.11促销商品
                    </div>
                </div>
            </div>
            <section>
                <div
                    v-for="(item, index) in goodsList"
                    :key="index"
                    class="item"
                >
                    <!-- 点击后可以跳转到详情页 -->
                    <img :src="item.img" alt="" @click="info(item.id)" />
                    <div class="description">
                        <p>{{ item.firstcatename }}</p>
                        <p>{{ item.goodsname }}</p>
                        <p>
                            <span>&yen;{{ item.price }}</span>
                            <b>&yen;1099</b>
                            <b>999人已付款</b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
            </section>
        </main>
    </article>
</template>

<script>
import axios from "axios";
export default {
    async created() {
        let list = await axios.get("/api/goodslist");
        if (list.data.code == 200) {
            this.goodsList = list.data.list;
            console.log(this.goodsList);
        }
    },
    data() {
        return {
            goodsList: [],
        };
    },
    methods: {
        info(id) {
            this.$router.push("/detail/" + id);
        },
    },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/itemList.scss";
</style>"