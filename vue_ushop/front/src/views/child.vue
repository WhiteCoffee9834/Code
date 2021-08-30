<template>
    <div id="right-wrapper">
        <div class="sell-box">
            <p>{{imgData[0].catename }}</p>
            <section v-for="(item, index) in imgData" :key="index">
                <img :src="item.img" alt="" />
                <p>{{ item.goodsid }}</p>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgData: [],
            vis: "",
        };
    },
    created() {},
    watch: {
        $route: {
            handler() {
                this.vis = this.$route.fullPath.slice(10);
                this.$axios({
                    method:"post",
                    url:"/api/cateImg",
                    data:{
                        params:this.vis
                    }
                }).then(res=>{
                    this.imgData = res.data.list
                })
            },
            immediate: true,
        },
    },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/category_right.scss";
</style>