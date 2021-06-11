/* 获取随机数 */

/* 
    @parmas min {Number} 最小值
    @parmas max {Number} 最大值
*/
function getRan(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/* 补零函数 */
/* 
    @params num{Number}  要补零的数值
*/

function addZero(num){
    if(num < 10){
        return "0"+num;
    }else{
        return num;
    }
}