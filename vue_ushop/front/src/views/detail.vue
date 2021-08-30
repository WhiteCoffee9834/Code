<template>
    <article id="detail">
        <header>
            <div class="title">
                <!-- 返回按钮,使用go方法能够返回历史的上一条记录 -->
                <button @click="$router.go(-1)">&lt;</button>
                <h2>{{ obj.goodsname }}</h2>
            </div>
            <nav>
                <button>商品</button>
                <button>评价</button>
                <button>详情</button>
                <button>推荐</button>
            </nav>
        </header>
        <main>
            <img :src="obj.img" alt="" />
            <div class="infoBox">
                <p class="price">
                    <span class="nowPrice">&yen;{{ obj.price }}</span>
                    <span class="oldPrice">&yen;9999</span>
                </p>
                <p class="name">{{ obj.goodsname }}</p>
                <p class="description">
                    这里是描述占位 这里是描述占位 这里是描述占位
                </p>
            </div>
            <footer>
                <div class="operate1">
                    <div>客服</div>
                    <div>店铺</div>
                    <div>购物车</div>
                </div>
                <div class="operate2">
                    <div class="addCart" @click="add(obj)">加入购物车</div>
                    <div class="buyNow">立即购买</div>
                </div>
            </footer>
        </main>
    </article>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex"
export default {
    created() {
        // 发送axios请求,获取商品的详细信息
        axios.get("/api/goodsinfo?id=" + this.$route.params.id).then((res) => {
            this.obj = res.data.list;
        });
    },
    data() {
        return {
            obj: {},
        };
    },
    methods:{
        // ...mapMutations(["addCart"])
        // 使用对象形式,对象的键名就是上面的方法名,键值为vuex中的mutation中的方法名.当vuex中方法与调用时的方法名字两者的名字不一致时可以采用这种方式
        ...mapMutations({add:"addCart"}) // mapMutations会自动携带方法里的参数,不需要再写
    }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/detail.scss";
</style>