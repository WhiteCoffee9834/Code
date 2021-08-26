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
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
                    <a href="#">母婴</a>
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
                <div class="main-scroll-img">
                    <div class="imgzhanwei1"></div>
                    <div class="imgzhanwei2"></div>
                    <div class="imgzhanwei3"></div>
                    <div class="imgzhanwei4"></div>
                    <div class="imgzhanwei5"></div>
                    <div class="imgzhanwei6"></div>
                </div>
                <div class="pointer">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <nav class="main-nav">
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
                    </section>
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
                    </section>
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
                    </section>
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
                    </section>
                    <section>
                        <img src="../image/img2.png" alt="" />
                        <p>限时秒杀</p>
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
export default {};
</script>

<style scoped>
body {
    background-color: #f2f2f2;
}
/* 头部样式开始 */
header {
    position: relative;
    width: 100%;
    max-width: 768px;
    height: 0.8rem;
    background-image: linear-gradient(#ff6040, #ff8a80);
}
header .header-top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.48rem;
}
header .header-top i {
    font-size: 0.2rem;
    color: #fff;
}
header .header-top img {
    width: 0.91rem;
}
header .search-wrapper-relative {
    display: flex;
    position: relative;
    width: 1.7rem;
    height: 0.32rem;
}
header .search-wrapper-relative input[type="submit"] {
    position: absolute;
    top: 0.06rem;
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
    width: 1.7rem;
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
    font-size: 16px;
    color: #fff;
    padding: 0 0.05rem;
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
    font-size: 16px;
}
header .nav-more a {
    color: #fff;
}
/* 头部样式结束 */
/* 主体+下部分的大盒子样式 */
.big-wrapper {
    height: calc(100vh - 0.83rem - 0.8rem);
    overflow-y: auto;
    overflow-x: hidden;
}
/* 主体样式开始 */
main {
    position: relative;
    width: 100%;
    max-width: 768px;
    height: 3rem;
    overflow: hidden;
    background-color: #fff;
}
main .main-scroll-img {
    position: relative;
    display: flex;
    width: 21rem;
    transform: translateX(-3.3rem);
}
main .imgzhanwei1 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: tomato;
    margin: 0.12rem 0.05rem;
}
main .imgzhanwei2 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: yellowgreen;
    margin: 0.12rem 0.05rem;
}
main .imgzhanwei3 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: darkcyan;
    margin: 0.12rem 0.05rem;
}
main .imgzhanwei4 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: pink;
    margin: 0.12rem 0.05rem;
}
main .imgzhanwei5 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: dimgray;
    margin: 0.12rem 0.05rem;
}
main .imgzhanwei6 {
    width: 3.35rem;
    height: 1.95rem;
    background-color: #bfa;
    margin: 0.12rem 0.05rem;
}
main .pointer {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 1.4rem;
    height: 0.1rem;
    transform: translateY(0.4rem);
    z-index: 10;
}
main .pointer i {
    display: inline-block;
    width: 0.1rem;
    height: 0.1rem;
    background-color: #fff;
    border-radius: 50%;
    margin-left: 0.1rem;
}
main .main-nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
main .main-nav section {
    width: 0.48rem;
    height: 0.48rem;
    font-size: 12px;
    text-align: center;
    margin-top: 0.15rem;
}
main .main-nav section p {
    margin-top: 0.1rem;
}
/* 主体样式结束 */
/* 下部分样式开始 */
.foot .section-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    height: 1.75rem;
}
/* 第一张图内部文字样式开始 */
.foot .section-top-1 {
    background-image: url(../image/section1.png);
    background-size: cover;
    width: 1.75rem;
    height: 1.75rem;
}
.foot .section-top-1 p {
    margin: 10px;
}
.foot .section-top-1 p:first-child span:first-child {
    font-size: 16px;
    color: #85a642;
}
.foot .section-top-1 p:first-child span:last-child {
    font-size: 16px;
    transform: scale(0.625);
    color: #333;
}
.foot .section-top-1 p:nth-child(2) {
    color: #b1cc7a;
    font-size: 12px;
}
.foot .section-top-1 .time {
    color: #85a642;
    font-size: 14px;
}
.foot .section-top-1 .time span {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background-image: linear-gradient(#85a642, #b1cc7a);
    color: #fff;
    text-align: center;
}
/* 第一张图内部文字样式结束 */
/* 第二张图内部文字样式开始 */
.foot .section-top-2 {
    background-image: url(../image/section2.png);
    background-size: cover;
    width: 1.75rem;
    height: 0.85rem;
}
.foot .section-top-2 p {
    margin-top: 10px;
    margin-left: 10px;
}
.foot .section-top-2 p:first-child {
    font-size: 16px;
    color: #ff6040;
}
.foot .section-top-2 p:nth-child(2) {
    color: #ff9580;
    font-size: 12px;
}
.foot .section-top-2 p:nth-child(3) {
    width: 0.6rem;
    height: 0.2rem;
    background-image: linear-gradient(#ff6040, #ff9f80);
    border-radius: 2px 12px 12px 2px;
    margin-top: 0.04rem;
    color: #fff;
    font-size: 12px;
}
/* 第二张图内部文字样式结束 */
/* 第三张图内部文字样式开始 */
.foot .section-top-3 {
    position: absolute;
    bottom: 0;
    right: 0.08rem;
    background-image: url(../image/section3.png);
    background-size: cover;
    width: 1.75rem;
    height: 0.85rem;
}
.foot .section-top-3 p {
    margin-top: 6px;
    margin-left: 10px;
}
.foot .section-top-3 p:first-child {
    font-size: 16px;
    color: #af40ff;
}
.foot .section-top-3 p:nth-child(2) {
    color: #ca80ff;
    font-size: 12px;
}
.foot .section-top-3 p:nth-child(3) {
    width: 0.6rem;
    height: 0.2rem;
    background-image: linear-gradient(#af40ff, #f58cff);
    border-radius: 2px 12px 12px 2px;
    margin-top: 0.04rem;
    color: #fff;
    font-size: 12px;
}
/* 第三张图内部文字样式结束 */
.foot .section-bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 3.55rem;
    height: 1.55rem;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
}
.foot .section-bottom p {
    flex: 1;
    display: flex;
}
.foot .section-bottom p span:first-child {
    display: inline-block;
    flex: 1;
    height: 0.3rem;
    font-size: 16px;
    color: #ff6040;
    text-align: center;
}
.foot .section-bottom p span:last-child {
    display: inline-block;
    flex: 1;
    height: 0.3rem;
    font-size: 14px;
    color: #999;
    text-align: center;
}
.foot .section-bottom section {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: space-around;
    justify-content: flex-start;
}
.foot .section-bottom img {
    margin-left: 0.05rem;
    margin-top: 0.16rem;
    width: 0.8rem;
    height: 0.8rem;
}
/* 下部分样式结束 */
</style>