<template>
    <article id="itemList">
        <header>
            <div class="search-wrapper-relative">
                <input type="text" placeholder="按内容搜索" v-model="search" @keydown.enter="sousuo"/>
                <input type="submit" value="" />
            </div>
            <nav class="header-nav-relative">
                <div class="slider">
                    <a href="javascript:;" class="highlight">综合推荐</a>
                    <a href="javascript:;">销量</a>
                    <a href="javascript:;" @click="sortByPrice">价格</a>
                    <a href="javascript:;">好评度</a>
                    <a href="javascript:;">店铺</a>
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
            this.allList = list.data.list
            this.goodsList = list.data.list;
        }
    },
    data() {
        return {
            goodsList: [],
            search:"",
            allList:[],
            ss:[],
            sort:true
        };
    },
    methods: {
        info(id) {
            this.$router.push("/detail/" + id);
        },
        sousuo(){
            this.goodsList.filter(item=>{
                if(item.goodsname.includes(this.search)){
                    if(!this.ss.includes(item)){
                        this.ss.push(item)
                    }
                }
            })
            this.goodsList = this.ss
            if(this.search == ""){
                this.goodsList = this.allList
            }
        },
        sortByPrice(){
            if(this.sort){
                this.goodsList.sort((a,b)=>{
                    return a.price - b.price
                })
            }else{
                this.goodsList.sort((a,b)=>{
                    return b.price - a.price
                })
            }
            this.sort = !this.sort
        }
    },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/itemList.scss";
</style>"