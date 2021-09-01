<template>
    <article id="shopCart">
        <div v-if="noData">
            <div class="viewWrapper">
                <section v-for="(item, index) in numberId" :key="index">
                    <div class="selectBox">
                        <label>
                            <input
                                type="checkbox"
                                :checked="item.flag"
                                @change="changeFlag(item.first_cateid)"
                            />
                        </label>
                    </div>
                    <img v-bind:src="item.img" alt="" />
                    <div class="itemInfo">
                        <p class="name">{{ item.goodsname }}</p>
                        <div class="countBox">
                            <span class="price">&yen;{{ item.price }}</span>
                            <div class="numberBox">
                                <button
                                    v-on:click="
                                        changeCount({
                                            first_cateid: item.first_cateid,
                                            type: 'dec',
                                        })
                                    "
                                >
                                    -
                                </button>
                                <span class="itemCount">{{ item.num }}</span>
                                <button
                                    v-on:click="
                                        changeCount({
                                            first_cateid: item.first_cateid,
                                            type: 'inc',
                                        })
                                    "
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer>
                <div class="allSelectBox">
                    <input type="checkbox" v-model="allSelectBox" id="all"/>
                </div>
                <label for="all">
                    <p class="allSelectDecoration">全选</p>
                </label>
                <p class="priceCountBox">
                    <span>数量总和:{{ allCount }}</span>
                    <span
                        >价格总和:<b class="price"
                            >&yen;{{ allPriceCount.toFixed(2) }}</b
                        ></span
                    >
                </p>
                <button>结算</button>
            </footer>
        </div>
        <div v-else class="noData">
            <h2>您的购物车为空,快去购买吧</h2>
        </div>
    </article>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            noData:false
        }
    },
    computed: {
        // 获取vuex中的购物车数据
        ...mapState({ numberId: "shopCart" }),
        // 全选框状态
        allSelectBox: {
            set(effect) {
                this.changeAll(effect);
            },
            get() {
                return this.numberId.every((item) => item.flag);
            },
        },
        // 获取总价格,总数量
        ...mapGetters(["allCount", "allPriceCount"]),
    },
    created() {
        if (this.numberId.length == 0) {
            this.noData = false
        }else{
            this.noData = true
        }
    },
    methods: {
        /**
         * changeCount 改变数量
         * changeFlag 改变选中状态
         * changeAll 全选框状态
         */
        ...mapMutations(["changeCount", "changeFlag", "changeAll"]),
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/shopCart.scss";
</style>