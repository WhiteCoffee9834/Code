<template>
    <article id="shopCart">
        <div class="viewWrapper">
            <section v-for="(item, index) in shops" :key="index">
                <div class="selectBox">
                    <input type="checkbox" v-model="item.itemSelectBox" />
                </div>
                <img v-bind:src="item.img" alt="" />
                <div class="itemInfo">
                    <p class="name">{{ item.name }}</p>
                    <div class="countBox">
                        <span class="price">&yen;{{ item.price }}</span>
                        <div class="numberBox">
                            <button v-on:click="decrease(index)">-</button>
                            <span class="itemCount">{{ item.num }}</span>
                            <button v-on:click="increase(index)">+</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer>
            <div class="allSelectBox">
                <input type="checkbox" v-model="allSelectBox" />
            </div>
            <p class="allSelectDecoration">全选</p>
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
    </article>
</template>

<script>
export default {
    data() {
        return {
            shops: [
                {
                    id: 1,
                    name: "SK2",
                    price: 1590,
                    num: 1,
                    img: "http://img13.360buyimg.com/n7/jfs/t1/179804/21/2812/138861/60954151E09f754c1/9706cf7d3f82ce19.jpg",
                },
                {
                    id: 2,
                    name: "watch",
                    price: 1799.9,
                    num: 1,
                    img: "http://img13.360buyimg.com/n7/jfs/t1/195549/7/1383/147340/609247adE3a47f0f5/bf2a9f6dbd18a0d5.jpg",
                },
                {
                    id: 3,
                    name: "前男友面膜",
                    price: 1059.99,
                    num: 1,
                    img: "http://img14.360buyimg.com/n7/jfs/t1/181060/34/2821/163555/60954cddE1af45f9c/8f7e11f4fc884da8.jpg",
                },
                {
                    id: 4,
                    name: "iPad",
                    price: 5799,
                    num: 1,
                    img: "http://img11.360buyimg.com/n7/jfs/t1/161452/24/15900/88869/6063ddfeE258a392b/008f0f5fdb2c4a42.jpg",
                },
                {
                    id: 5,
                    name: "iPad",
                    price: 5799,
                    num: 1,
                    img: "http://img11.360buyimg.com/n7/jfs/t1/161452/24/15900/88869/6063ddfeE258a392b/008f0f5fdb2c4a42.jpg",
                },
                {
                    id: 6,
                    name: "iPad",
                    price: 5799,
                    num: 1,
                    img: "http://img11.360buyimg.com/n7/jfs/t1/161452/24/15900/88869/6063ddfeE258a392b/008f0f5fdb2c4a42.jpg",
                },
                {
                    id: 7,
                    name: "iPad",
                    price: 5799,
                    num: 1,
                    img: "http://img11.360buyimg.com/n7/jfs/t1/161452/24/15900/88869/6063ddfeE258a392b/008f0f5fdb2c4a42.jpg",
                },
            ],
        };
    },
    computed: {
        // 全选框的全选功能以及判断该全选框能否被选中
        allSelectBox: {
            // 按下全选框,更改下面的物品的选中情况.如果effect为true则全部能够选中,如果effect为false则全部不选中
            set(effect) {
                this.shops.forEach((item) => {
                    item.itemSelectBox = effect;
                });
            },
            // 如果下方的所有物品均被选中,则全选框应该处于被选中状态
            get() {
                return this.shops.every((item) => {
                    return item.itemSelectBox;
                });
            },
        },
        // 全部物品计数
        allCount() {
            return this.shops
                .filter((item) => {
                    return item.itemSelectBox == true;
                })
                .reduce((a, b) => {
                    return a + b.num;
                }, 0);
        },
        // 全部计价
        allPriceCount() {
            return this.shops
                .filter((item) => item.itemSelectBox == true)
                .reduce((a, b) => {
                    return a + b.price * b.num;
                }, 0);
        },
    },
    // 生命周期创建后,给所有商品都添加一个键值对.通过这个来判断该物品是否被选中.该选项默认为未选中
    created() {
        this.shops.forEach((item) => {
            this.$set(item, "itemSelectBox", false);
        });
    },
    methods: {
        // 减少
        decrease(index) {
            if (this.shops[index].num > 0) {
                this.shops[index].num--;
            }
        },
        // 增加
        increase(index) {
            this.shops[index].num++;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/shopCart.scss";
</style>