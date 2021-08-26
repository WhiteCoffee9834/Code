<template>
    <article id="category">
        <header>
            <div class="search-wrapper-relative">
                <input type="text" placeholder="按内容搜索" />
                <input type="submit" value="" />
            </div>
        </header>
        <main>
            <div class="left-wrapper">
                <ul>
                    <router-link v-for="item in category" :key="item.id" :to="item.router" tag="li" exact-active-class="active">{{item.catename}}</router-link>
                </ul>
            </div>
            <router-view></router-view>
        </main>
    </article>
</template>

<script>
export default {
    data(){
        return{
            category:[]
        }
    },
    created(){
        this.$axios.get("/api/catelist").then((res)=>{
            this.category=res.data.list
            console.log(this.category)
        })
    }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/category.scss"
</style>