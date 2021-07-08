(function ($) {
    $.extend({
        "startTrim": function (str) {
            return str.replace(/^\s+/, "");
        },
        "endTrim": function (str) {
            return str.replace(/\s+$/, "")
        },
        "noRepeat": function (str) {
            var newStr = ""
            for (var i = 0; i < str.length; i++) {
                if (newStr.indexOf(str[i]) == -1) {
                    newStr += str[i]
                }
            }
            return newStr
        }
    })
})(jQuery)