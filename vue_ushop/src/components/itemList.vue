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
                <a href="#">筛选</a>
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
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
                        </p>
                        <p>11.11限时299元起</p>
                        <p>999条评论 99.9%好评</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../image/section4.png" alt="" />
                    <div class="description">
                        <p>溪牧原山茶花洁面泡沫 氨基酸123123123123</p>
                        <p>敏感肌可用，控油祛痘、男女可用12312312312</p>
                        <p>
                            <span> &yen;999 </span>
                            <b> &yen;1099 </b>
                            <b> 999人已付款 </b>
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
export default {};
</script>

<style scoped>
header {
    position: relative;
    width: 100%;
    max-width: 768px;
    height: 0.8rem;
    background-image: linear-gradient(#ff6040, #ff8a80);
}
header .search-wrapper-relative {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 100%;
    height: 0.52rem;
}
header .search-wrapper-relative input[type="submit"] {
    position: absolute;
    top: 0.18rem;
    left: 0.12rem;
    background-image: url(../image/search.png);
    width: 0.18rem;
    height: 0.18rem;
    background-size: cover;
    border: 0;
}
header .search-wrapper-relative input[type="text"] {
    outline: none;
    border: 0;
    width: 3.55rem;
    height: 0.32rem;
    padding: 0;
    padding-left: 0.34rem;
    box-sizing: border-box;
    border-radius: 4px;

    font-size: 14px;
}
header .search-wrapper-relative input[type="text"]::placeholder {
    font-size: 14px;
}
header .header-nav-relative {
    position: relative;
    width: 100%;
    height: 0.32rem;

    font-size: 14px;
    overflow-x: auto;
    overflow-y: hidden;
}
header .header-nav-relative .slider {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    white-space: nowrap;
}
header .header-nav-relative a {
    font-size: 14px;
    color: #fff;
    padding: 0 0.05rem;
}
header .header-nav-relative .highlight {
    font-size: 16px;
}
header .nav-more {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 5;
    height: 0.32rem;
    line-height: 0.32rem;
    background-image: linear-gradient(#ff7a68, #ff8a80);

    color: #fff;
    font-size: 14px;
}
header .nav-more a {
    color: #fff;
}

main {
    overflow-y: auto;
    overflow-x: hidden;
}
main .box {
    position: relative;
    margin: 0.1rem auto;
    width: 3.56rem;
    height: 0.32rem;
}
main .banner {
    background-color: #fff4f2;
    text-align: center;
    line-height: 0.32rem;

    font-size: 16px;
    color: #ff6040;
}
.border-left-right::before {
    position: absolute;
    left: 0;
    top: 0;

    content: "";
    width: 1px;
    height: 32px;
    background-color: #ff6040;
    transform: scaleX(0.5);
}
.border-left-right::after {
    position: absolute;
    right: 0;
    top: 0;

    content: "";
    width: 1px;
    height: 32px;
    background-color: #ff6040;
    transform: scaleX(0.5);
}
.border-top-bottom::before {
    position: absolute;
    left: 0;
    top: 0;

    content: "";
    width: 3.55rem;
    height: 1px;
    background-color: #ff6040;
    transform: scaleY(0.5);
}
.border-top-bottom::after {
    position: absolute;
    bottom: 0;
    left: 0;

    content: "";
    width: 3.55rem;
    height: 1px;
    background-color: #ff6040;
    transform: scaleY(0.5);
}

main section {
    width: 3.56rem;
    display: flex;
    flex-direction: column;
    margin: 20px auto;
}
main section .item {
    display: flex;
    width: 3.56rem;
    height: 1.1rem;
    margin-bottom: 0.2rem;
}
main section .item .description {
    width: calc(3.56rem - 108px);
    margin-left: 15px;
}
main section .item p:nth-of-type(1) {
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
main section .item p:nth-of-type(2) {
    font-size: 14px;
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
main section .item p:nth-of-type(3) span:first-child {
    font-size: 20px;
    color: #ff6040;
}
main section .item p:nth-of-type(3) b:nth-of-type(1) {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}
main section .item p:nth-of-type(3) b:nth-of-type(2) {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
}
main section .item p:nth-of-type(4) {
    width: 1.1rem;
    height: 0.16rem;
    background-color: #ff8066;
    font-size: 12px;
    color: #fff;
    text-align: center;
}
main section .item p:nth-of-type(5) {
    color: #999;
    font-size: 12px;
    margin-top: 0.06rem;
}
</style>