var art_tag = [];

var nIntervId_my = [];

var wubi86 = [],
    wubi861 = [],
    pinyin = [],
    dazi_pk = [];

var contentDivs = document.getElementById("content").getElementsByTagName("div"),
    
    pauseTime = 0,
    E = [],
    fa = [],
    O = [],
    v = 0,
    r = 0,
    ha = 0,
    // S = "",
    // L = "",
    // K = "",
    // C = "",
    // J = "",
    // B = "",
    I = 0,
    ea = 0,
    Z = 0,
    ca = 0,
    w = [[], [], []],
    aa = 0;

var starRow = 0;    // 开始打字时,输入框的序号 输入框行数
var timeOfStartTyping = 0;
var timeOfStartPausing = 0;
var theNumberOfTypedLetters = [];
var speed = 0;
var accuracy = 0;
var typingTime = 0;
var theNumberOfBS = 0;
var theNumberOfLetters = 0;
var theNumberOfWrongLetters = 0;
var timer = null; // 定时器
var totalTime = document.getElementById("time"); 



function typing(startRow, stop) {
    var isStop = stop ? stop : 0;
    
    //  输入框能否输入  输入框样式  获得焦点时光标位置
    for (var i = 0; i < contentDivs.length; i += 2) {
        // contentDivTyping  <input autocomplete="off" type="text" class="typing" value="">
        var inputElement = contentDivs.item(i).getElementsByTagName("input").item(1);

        if (startRow == i && "stop" != isStop) {
            inputElement.readOnly = !1;  // 输入框可输入
            inputElement.onfocus = "";    // 取消焦点事件
            da(inputElement);            // 输入框获得焦点后,光标移动到文字末尾
            
            inputElement.onkeydown = function (a) {
                V(this, a, 1);
            };

            inputElement.onkeyup = function (a) {
                V(this, a, 2);
            };
            inputElement.onclick = "";
            inputElement.parentNode.className = "typing typing_on";  // 修改class <div id="i_0" class="typing">
        } else if("stop" != isStop) {
            // 注册焦点事件：获得焦点时把焦点给当前输入框，所以焦点总在当前输入框上，其他输入框无法获取焦点
            inputElement.onfocus = function () {
                var currentInputElement = contentDivs.item(startRow).getElementsByTagName("input").item(1);
                da(currentInputElement); 
            };
            inputElement.parentNode.className = "typing";
        } else {
            // 点击暂停按钮，进入此处
            inputElement.readOnly = !0;  // 输入框不可输入
            inputElement.parentNode.className = "typing";  // 间接修改样式
            if (startRow == i) {
                inputElement.onclick = function () {
                    confirm(
                        // 正处于暂停状态，恢复打字？
                        "\u6b63\u5904\u4e8e\u6682\u505c\u72b6\u6001\uff0c\u6062\u590d\u6253\u5b57\uff1f"
                    ) && dazi_pause(document.getElementById("pause_a"));
                };
            }
        }
    }
    r = 0;
}

function da(inputElement) {
    var i=inputElement.value.length;
    if ("undefined" != typeof inputElement.createTextRange) {
        var b = inputElement.createTextRange();
        b.moveStart("character", i);
        b.collapse(!0);
        b.select();
    } else { 
        inputElement.setSelectionRange(i, i);
        inputElement.focus();
    }
}


function V(inputElementOjb, event, c) {
    event = event || window.event;
    // console.log((event || window.event));
    
    event = event.which ? event.which : event.keyCode;
    // if (0 < timeOfStartPausing) return !1;

    var spanElement = inputElementOjb.parentNode.getElementsByTagName("div").item(0).getElementsByTagName("span").item(0),
        firstInputElement = inputElementOjb.parentNode.getElementsByTagName("input").item(0),
        f = inputElementOjb.value.length,    // 输入框内文字长度
        g = firstInputElement.value.length,  
        l = O[starRow],    // 数组
        
        m = qa(firstInputElement.value, inputElementOjb.value);
        
    spanElement.innerHTML = m;
    65 <= event && 90 >= event && 0 == typingTime && refresh();
    if (0 == ea)
        8 == event &&
            2 <= starRow &&
            1 != r &&
            0 == f &&
            1 == c &&
            ((r = 1), (starRow -= 2), typing(starRow), (inputElementOjb.onkeydown = ""), (inputElementOjb.onkeyup = ""), (inputElementOjb.oninput = "")),
            
            P(event, c);
    else {
        0 < f && 0 == typingTime && refresh();
        if (1 != r && starRow < contentDivs.length) {
            1 == E[starRow] - f && 0 == O[starRow] && 0 == l && theNumberOfBS++;
            if (f < g || " " != firstInputElement.value.substring(g - 1, g)) E[starRow] = 0 < f ? (f > g ? g : f) : 0;
            let spanElement = Y(E) - Y(O);
            console.log(spanElement);
            
            // spanElement - theNumberOfLetters > Z && (Z = spanElement - theNumberOfLetters);

            if (spanElement - theNumberOfLetters > Z) {
                Z = spanElement - theNumberOfLetters;
            }
            theNumberOfLetters = spanElement;
            theNumberOfWrongLetters = Y(fa);
            P(event, c);
        }
        g == f && firstInputElement.value.substring(g - 1, g) == inputElementOjb.value.substring(f - 1, f) && E.length != starRow / 2 && 1 != r
            ? ((r = 1),
              (starRow += 2),
              setTimeout(function () {
                  starRow < contentDivs.length && (contentDivs.item(starRow).getElementsByTagName("input").item(1).value = "");
                  typing(starRow);
              }, 10),
              (inputElementOjb.onkeydown = ""),
              (inputElementOjb.onkeyup = ""),
              (inputElementOjb.oninput = ""),
              
              P(event, c))
            : g < f && firstInputElement.value.substring(g - 1, g) == inputElementOjb.value.substring(g - 1, g) && E.length != starRow / 2 && 1 != r
            ? ((r = 1),
              (firstInputElement = inputElementOjb.value),
              (contentDivs.item(starRow).getElementsByTagName("input").item(1).value = firstInputElement.substr(0, g)),
              (starRow += 2),
              starRow >= contentDivs.length
                  ? U(2)
                  : ((contentDivs.item(starRow).getElementsByTagName("input").item(1).value = firstInputElement.substr(g, f - g)),
                    typing(starRow),
                    (inputElementOjb.onkeydown = ""),
                    (inputElementOjb.onkeyup = ""),
                    (inputElementOjb.oninput = ""),
                    
                    P(event, c)))
            : g <= f &&
              13 == event &&
              1 != r &&
              1 == c &&
              ((r = 1), (starRow += 2), typing(starRow), (inputElementOjb.onkeydown = ""), (inputElementOjb.onkeyup = ""), (inputElementOjb.oninput = ""));
              
    }
    ea = f;
}




//  firstInputElement.value, inputElementOjb.value


function qa(a, b) {
    var strArr1 = stringToArr(a);
    var strArr2 = stringToArr(b);
    var theNumberOfTimesOfWrongTyping = 0; //  输入错误的次数
    var c = "",
        
        e = null,
        f = 0,
        language = document.getElementById("type").value,
        arr1Length = strArr1.length,
        arr2Length = strArr2.length;
        
        // 处理字符串
    for (i = 0; i < (arr1Length > arr2Length ? arr1Length : arr2Length); i++) {
        if (i < arr1Length) {
                if (strArr1[i] == strArr2[i]) {
                    c += '\x3cspan class\x3d"green"\x3e' + strArr1[i] + "\x3c/span\x3e";
                } else if(null == strArr2[i]) {
                    (c += strArr1[i]), 0 == f && 0 < arr2Length && (f = i);
                } else {
                    theNumberOfTimesOfWrongTyping++;
                    c += '\x3cspan class\x3d"red"\x3e' + strArr1[i] + "\x3c/span\x3e";
                }
        }
    }

    // if (0 == m || 0 != f) {
    //     language = contentDivs.item(starRow).id;
    //     language = language.substr(2);
    //     if ("array" == typeof wubi86[language] || "object" == typeof wubi86[language]) {
    //         if (((m = wubi86[language]), "array" == typeof m[f] || "object" == typeof m[f])) {
    //             p = "";
    //             for (q = f; q < f + m[f][0] && q < k; q++) p += strArr1[q];
    //             L = p;
    //             S = m[f][1];
    //         }
    //     } else (L = ""), (S = "-");
    //     "array" == typeof wubi861[language] || "object" == typeof wubi861[language]
    //         ? ((m = wubi861[language]), "undefined" != typeof m[f] ? ((C = strArr1[f]), (K = m[f])) : ((C = ""), (K = "-")))
    //         : ((C = ""), (K = "-"));
    //     "array" == typeof pinyin[language] || "object" == typeof pinyin[language]
    //         ? ((m = pinyin[language]), "undefined" != typeof m[f] ? ((B = strArr1[f]), (J = m[f])) : ((B = ""), (J = "-")))
    //         : ((B = ""), (J = "-"));
    // } else (L = ""), (S = "-"), (B = ""), (J = "-"), (C = ""), (K = "-");


    fa[starRow] = theNumberOfTimesOfWrongTyping;
    O[starRow] = null == e ? 0 : e;
    return c;
}

//  
function P(a, b) {
    var c = "cn" == document.getElementById("type").value ? 2 : 1;
    if (
        32 == a ||
        (48 <= a && 57 >= a) ||
        (65 <= a && 90 >= a) ||
        (96 <= a && 111 >= a) ||
        (186 <= a && 221 >= a) ||
        8 == a
    ) {
        if ((theNumberOfLetters < aa && 2 == c) || (theNumberOfLetters <= aa && 1 == c)) {
            var c = [],
                d;
            for (d in w[b - 1]) d < theNumberOfLetters && (c[d] = w[b - 1][d]);
            w[b - 1] = c;
        }
        8 != a && ("undefined" != typeof w[b - 1][theNumberOfLetters] ? w[b - 1][theNumberOfLetters]++ : (w[b - 1][theNumberOfLetters] = 1), (aa = theNumberOfLetters));
        
    }
}

//  参数a  数组  
function Y(a) {   
    for (var b = 0, c = 0; c < 2 * a.length && c <= starRow; c += 2) {
        if (0 < a[c]) {
            b += a[c];
        }
    }
    return b;
}

// 将字符串转为数组  并将 <> 转码
function stringToArr(a) {
    for(var b = [], i = 0; i < a.length; i++) {
        b[i] = a.substring(i, i+1);
        if ("\x3c" == b[i]) {
            b[i] = "\x26lt;";
        }
        if ("\x3e" == b[i]) {
            b[i] = "\x26gt;";
        }
    }
    return b;
}


function sa() {
    for (var a = 0, b = 0, theNumberOfLetters = 0, i = 1; i < contentDivs.length; i += 2) {
        var spanHC = contentDivs.item(i).getElementsByTagName("span");
        // console.log(contentDivs);

        if (1 == spanHC.length) {
            // console.log(spanHC);
            var spanoffsetWidth = spanHC.item(0).offsetWidth,
                spanHC = spanHC.item(0).innerHTML.replace(/(\s{1})$/g, ""); //去掉末尾空格 \s 空格   {1}重复1次   $末尾  g修饰符表示全局匹配（global）

            0 < spanHC.length && (theNumberOfLetters += spanHC.length);
            spanoffsetWidth > a && ((a = spanoffsetWidth), (b = i));
        }
    }
    return [b, a];
}


//  倒计时
function refresh() {
    // 0 == H && (H = timeNow());
    // 记录开始打字时的时间
    if (0 == timeOfStartTyping) {
        timeOfStartTyping = timeNow();
    }

    clearTimeout(timer); // 取消定时器
    timer = setTimeout(refresh, 100); // 添加异步任务  相当于每0.1秒刷新一次

  
    var daojishiTime = 0 < timeOfStartPausing ? timeNow() - timeOfStartPausing : 0;

    // typingTime  打字过程中消耗的时间
    typingTime = timeNow() - timeOfStartTyping - daojishiTime - pauseTime;
    // 速度
    speed = 0 < typingTime ? Math.round(((theNumberOfLetters - theNumberOfWrongLetters) / typingTime) * 6e4 * Math.pow(10, 0)) / Math.pow(10, 0) : 0;
    // 正确率
    accuracy = 0 < theNumberOfLetters ? Math.round(((theNumberOfLetters - theNumberOfWrongLetters) / theNumberOfLetters) * 100 * Math.pow(10, 0)) / Math.pow(10, 0) : 0;


    6e4 * totalTime.value > typingTime
        ? ((d = new Date(6e4 * totalTime.value - typingTime)),
          (daojishiTime = 10 > d.getMinutes() 
          ? "0" + d.getMinutes() 
          : d.getMinutes()),
          (d = 10 > d.getSeconds() 
          ? "0" + d.getSeconds() 
          : d.getSeconds()),
          (daojishiTime = daojishiTime + ":" + d))
    : (daojishiTime = "00:00");

    if (6e4 * totalTime.value > typingTime) {

        // 剩余时间
        leftTime = new Date(6e4 * totalTime.value - typingTime);
        
        // 小于10的分钟数字前加"0"
        if (10 > leftTime.getMinutes()) {
            daojishiTime = "0" + leftTime.getMinutes();
        } else {
            daojishiTime = leftTime.getMinutes();
        }
        // 小于10的秒钟数字前加"0"
        if (10 > leftTime.getSeconds()) {
            leftTime = "0" + leftTime.getSeconds();
        } else {
            leftTime = leftTime.getSeconds();        
        }
        daojishiTime = daojishiTime + ":" + leftTime;
    } else {
        daojishiTime = "00:00";
    }
    document.querySelector(".daojishi_time").innerHTML = daojishiTime;
    document.querySelector(".sudu").innerHTML = speed;
    document.querySelector(".zhengquelv").innerHTML = accuracy;
    document.querySelector(".cuowu").innerHTML = theNumberOfWrongLetters;
    document.querySelector(".zongzishu").innerHTML = theNumberOfLetters;
    document.querySelector(".tuige").innerHTML = theNumberOfBS;

    typingTime >= 6e4 * totalTime.value && clearTimeout(timer);
}






// 暂停 继续
dazi_pause = function (pauseObj) {
    if ("pause" == pauseObj.className) {
        pauseObj.innerHTML = "\u7ee7\u7eed";  // \u7ee7\u7eed  继续
        pauseObj.className = "continue";
        if (0 < timeOfStartTyping) {
            timeOfStartPausing = timeNow();
        }
        typing(starRow, "stop");
    } else {
        pauseObj.innerHTML = "\u6682\u505c";  // \u6682\u505c  暂停
        pauseObj.className = "pause";
        if (0 < timeOfStartTyping) {
            pauseTime += timeNow() - timeOfStartPausing;
            timeOfStartPausing = 0;
        }
        typing(starRow);
    }
};

// 关灯 开灯
close_light = function (a) {
        if ("light" == a.className) {
            a.innerHTML = "\u5f00\u706f";  // \u5f00\u706f  关灯
            a.className = "night";
            document.body.className = "dazi_style_black";
        } else {
            a.innerHTML = "\u5173\u706f";  // \u5173\u706f  开灯
            a.className = "light";
            document.body.className = "";
        }
};

document.querySelector("#pause_a").addEventListener('click', function () {
    dazi_pause(this);
}, false); 
document.querySelector("#light_a").addEventListener('click', function  () {
    close_light(this);
}, false);





// 禁用粘贴 复制 剪切   !1 === false
document.body.onpaste = function () {
    return !1;
};
document.body.oncopy = function () {
    return !1;
};
document.body.oncut = function () {
    return !1;
};


// 设置 宽和高
var bodyHeight = document.body.offsetHeight;

if (0 < bodyHeight) {
    document.getElementById("content").style.height = bodyHeight - 180 + "px";
}

var bodyWidth = document.body.offsetWidth;
var contentWidth = document.getElementById("content").offsetWidth;
if (1 < contentDivs.length) {
    // bodyWidth > contentWidth && (bodyWidth -= (bodyWidth - contentWidth) / 2);
    // if (bodyWidth > contentWidth) {
    //     bodyWidth -= (bodyWidth - contentWidth) / 2;
    //     console.log(bodyWidth);
    // }

    for (var N = sa(), i = 1; 10 >= i; i++) {
        var ta = contentDivs.item(N[0]).getElementsByTagName("span").item(0);
        N[1] = ta.offsetWidth;
        if (0 < contentWidth && 0 < N[1] && (N[1] > contentWidth - 60 || N[1] > bodyWidth - 240))
            document.getElementById("content").className = "typing_content font" + i;
        else break;
    }
}

function timeNow() {
    // getTime()：返回实例距离1970年1月1日00:00:00的毫秒数。
    return new Date().getTime();
}

// 设定时间
document.querySelector(".sheding").innerHTML = totalTime.value;

// 开始打字
typing(starRow);
