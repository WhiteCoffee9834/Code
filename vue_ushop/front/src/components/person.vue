<template>
    <article id="person">
        <header>
            <h2>我的</h2>
        </header>
        <section class="topSection">
            <div class="userInfoBox">
                <!-- 头像区 -->
                <div class="avatar">
                    <img src="../image/img1.png" alt="" />
                </div>
                <!-- 信息区 -->
                <div class="info">
                    <p>{{username}}</p>
                    <button>完善资料让小U更懂你</button>
                </div>
                <!-- 登录框,登录后不可见 -->
                <div v-if="vis" class="loginButton">
                    <button @click="$router.push('/login?path=person')">登录</button>
                    <button @click="$router.push('/reg')">注册</button>
                </div>
            </div>
            <!-- 按钮区 -->
            <div class="overview">
                <div>
                    <p>12</p>
                    <p>我的收藏</p>
                </div>
                <div>
                    <p>12</p>
                    <p>浏览记录</p>
                </div>
                <div>
                    <p>&yen;0</p>
                    <p>我的红包</p>
                </div>
                <div>
                    <p>12</p>
                    <p>优惠券</p>
                </div>
            </div>
            <!-- 订单区 -->
            <div class="order">
                <p class="order_head">
                    <span>我的订单</span>
                    <span>全部订单</span>
                </p>
                <div>
                    <button>
                        <img src="../image/img2.png" alt="">
                        <p>待付款</p>
                    </button>
                    <button>
                        <img src="../image/img3.png" alt="">
                        <p>待收货</p>
                    </button>
                    <button>
                        <img src="../image/img4.png" alt="">
                        <p>评价</p>
                    </button>
                    <button>
                        <img src="../image/img5.png" alt="">
                        <p>售后/退款</p>
                    </button>
                </div>
            </div>
        </section>
        <section class="midSection">
            <ul>
                <li>地址管理</li>
                <li>我的钱包</li>
                <li>我的二维码</li>
                <li>我的小伙伴</li>
                <li>0元试用</li>
            </ul>
        </section>
    </article>
</template>

<script>
export default {
    data() {
        return {
            username:"",
            vis:true
        }
    },
    created(){
        if(sessionStorage.getItem("user")){
            this.username = sessionStorage.getItem("user")
            this.vis = false
        }
    }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/person.scss";
</style>