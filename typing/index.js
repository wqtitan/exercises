art_tag = [];


var nIntervId_my = [];

var wubi86 = [],
    wubi861 = [],
    pinyin = [],
    dazi_pk = [];

(function () {

    var contentDivs = document.getElementById("content").getElementsByTagName("div"),
        h = 0,
        timeOfStartTyping = 0,
        varTimeNow = 0,
        ga = 0,
        E = [],
        fa = [],
        O = [],
        v = 0,
        r = 0,
        theNumberOfTypedLetters = [],
        ha = 0,
        S = "",
        L = "",
        K = "",
        C = "",
        J = "",
        B = "",
        I = 0,
        ea = 0,
        speed = 0,
        accuracy = 0,
        q = 0,
        X = 0,
        Z = 0,
        k = 0,
        F = 0,
        ca = 0,
        // ia = 0,
        w = [[], [], []],
        aa = 0;
    var timer = null;  // 定时器

    function typing(a, bStop) {
        var c = bStop ? bStop : 0;
        for (var i = 0; i < contentDivs.length; i += 2) {

            // contentDivTyping  <input autocomplete="off" type="text" class="typing" value="">
            var contentDivTyping = contentDivs.item(i).getElementsByTagName("input").item(1);
            // console.log(c);
            
            a == i && "stop" != c
                ? ((contentDivTyping.readOnly = !1),
                (contentDivTyping.onfocus = ""),
                da(contentDivTyping),
                (contentDivTyping.onkeydown = function (a) {
                    V(this, a, 1);
                }),
                (contentDivTyping.onkeyup = function (a) {
                    V(this, a, 2);
                }),
                (contentDivTyping.oninput = function (a) {
                    V(this, a, 3);
                }),
                (contentDivTyping.onclick = ""),
                (contentDivTyping.parentNode.className = "typing typing_on"))
                : "stop" != c
                ? ((contentDivTyping.onfocus = function () {
                    var b = contentDivs.item(a).getElementsByTagName("input").item(1);
                    da(b);
                }),
                    (contentDivTyping.parentNode.className = "typing"))
                : ((contentDivTyping.readOnly = !0),
                    (contentDivTyping.parentNode.className = "typing"),
                    a == i &&
                        (contentDivTyping.onclick = function () {
                            confirm(  // 正处于暂停状态，恢复打字？
                                "\u6b63\u5904\u4e8e\u6682\u505c\u72b6\u6001\uff0c\u6062\u590d\u6253\u5b57\uff1f"
                            ) && dazi_pause(document.getElementById("pause_a"));
                        }));
        }
        r = 0;
    }



  
    function V(a, b, c) {
        b = b || window.event;
        b = b.which ? b.which : b.keyCode;
        if (0 < varTimeNow) return !1;
        var d = a.parentNode.getElementsByTagName("div").item(0).getElementsByTagName("span").item(0),
            e = a.parentNode.getElementsByTagName("input").item(0),
            f = a.value.length,
            g = e.value.length,
            l = O[h],
            m = qa(e.value, a.value);
        d.innerHTML = m;
        65 <= b && 90 >= b && 0 == q && refresh();
        if (0 == ea)
            8 == b &&
                2 <= h &&
                1 != r &&
                0 == f &&
                1 == c &&
                ((r = 1),
                (h -= 2),
                typing(h),
                (a.onkeydown = ""),
                (a.onkeyup = ""),
                (a.oninput = "")
                // ,
                // 400 > u(a) - D() && ((v = u(a) - 400), (document.getElementById("content").scrollTop = v))
                ),
                P(b, c);
        else {
            0 < f && 0 == q && refresh();
            if (1 != r && h < contentDivs.length) {
                1 == E[h] - f && 0 == O[h] && 0 == l && X++;
                if (f < g || " " != e.value.substring(g - 1, g)) E[h] = 0 < f ? (f > g ? g : f) : 0;
                d = Y(E) - Y(O);
                d - k > Z && (Z = d - k);
                k = d;
                F = Y(fa);
                P(b, c);
            }
            g == f && e.value.substring(g - 1, g) == a.value.substring(f - 1, f) && E.length != h / 2 && 1 != r
                ? ((r = 1),
                  (h += 2),
                  setTimeout(function () {
                      h < contentDivs.length && (contentDivs.item(h).getElementsByTagName("input").item(1).value = "");
                      typing(h);
                  }, 10),
                  (a.onkeydown = ""),
                  (a.onkeyup = ""),
                  (a.oninput = ""),
                //   300 < u(a) - D() && ((v = u(a) - 300), (document.getElementById("content").scrollTop = v)
                //   ),
                  P(b, c))
                : g < f && e.value.substring(g - 1, g) == a.value.substring(g - 1, g) && E.length != h / 2 && 1 != r
                ? ((r = 1),
                  (e = a.value),
                  (contentDivs.item(h).getElementsByTagName("input").item(1).value = e.substr(0, g)),
                  (h += 2),
                  h >= contentDivs.length
                      ? U(2)
                      : ((contentDivs.item(h).getElementsByTagName("input").item(1).value = e.substr(g, f - g)),
                        typing(h),
                        (a.onkeydown = ""),
                        (a.onkeyup = ""),
                        (a.oninput = ""),
                        // 300 < u(a) - D() && ((v = u(a) - 300), (document.getElementById("content").scrollTop = v)),
                        P(b, c)))
                : g <= f &&
                  13 == b &&
                  1 != r &&
                  1 == c &&
                  ((r = 1),
                  (h += 2),
                  typing(h),
                  (a.onkeydown = ""),
                  (a.onkeyup = ""),
                  (a.oninput = "")
                //   ,
                //   300 < u(a) - D() && ((v = u(a) - 300), (document.getElementById("content").scrollTop = v))
                  );
        }
        ea = f;
    }

    //  速度
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
            if ((k < aa && 2 == c) || (k <= aa && 1 == c)) {
                var c = [],
                    d;
                for (d in w[b - 1]) d < k && (c[d] = w[b - 1][d]);
                w[b - 1] = c;
            }
            8 != a && ("undefined" != typeof w[b - 1][k] ? w[b - 1][k]++ : (w[b - 1][k] = 1), (aa = k));
            // document.getElementById(kn1).value = JSON.stringify(w[ra(w)]);
        }
    }

    //  倒计时
    function refresh() {
        // 0 == H && (H = timeNow());  
        if(0 == timeOfStartTyping) {
            timeOfStartTyping = timeNow();
        }
        clearTimeout(timer);   // 取消定时器
        timer = setTimeout(refresh, 100); // 添加异步任务

        var typingInfoLi = document.getElementById("typing_info_li");
        // document.getElementById("name");  
        var totalTime = document.getElementById("time"),  // 倒计时的时间 <input type="hidden" name="necd1c9194c45edc9" id="time" value="5" />
            c = 0 < varTimeNow ? timeNow() - varTimeNow : 0; 
        q = timeNow() - timeOfStartTyping - c - ga;
        // 速度
        speed = 0 < q ? Math.round(((k - F) / q) * 6e4 * Math.pow(10, 0)) / Math.pow(10, 0) : 0;
        // console.log("sudu"+speed);
        // 正确率
        accuracy = 0 < k ? Math.round(((k - F) / k) * 100 * Math.pow(10, 0)) / Math.pow(10, 0) : 0;

        6e4 * totalTime.value > q
            ? ((d = new Date(6e4 * totalTime.value - q)),
              (c = 10 > d.getMinutes() ? "0" + d.getMinutes() : d.getMinutes()),
              (d = 10 > d.getSeconds() ? "0" + d.getSeconds() : d.getSeconds()),
              (c = c + ":" + d))
            : (c = "00:00");
        // d = parseInt((k / ia) * 100);

        console.log(c);
        document.querySelector(".daojishi_time").innerHTML = c;
        document.querySelector(".sudu").innerHTML = speed;
        document.querySelector(".zhengquelv").innerHTML = accuracy;
        document.querySelector(".cuowu").innerHTML = F;
        document.querySelector(".zongzishu").innerHTML = k;
        document.querySelector(".tuige").innerHTML = X;

        q >= 6e4 * totalTime.value && (clearTimeout(timer), U(1));
    }

    function da(a) {
        if ("undefined" != typeof a.createTextRange) {
            var b = a.createTextRange();
            b.moveStart("character", a.value.length);
            b.collapse(!0);
            b.select();
        } else a.setSelectionRange(a.value.length, a.value.length), a.focus();
    }

    function qa(a, b) {
        str1 = la(a);
        str2 = la(b);
        var c = "",
            d = 0,
            e = null,
            f = 0,
            g = document.getElementById("type").value,
            k = str1.length,
            m = str2.length;
        for (l = 0; l < (k > m ? k : m); l++)
            if (l < k) {
                var p = l < m ? b.substr(l) : null,
                    q = /^[a-z\' ]{1,20}$/;
                str1[l] == str2[l]
                    ? (c += '\x3cspan class\x3d"green"\x3e' + str1[l] + "\x3c/span\x3e")
                    : null == str2[l]
                    ? ((c += str1[l]), 0 == f && 0 < m && (f = l))
                    : "cn" == g && q.test(p)
                    ? ((c += '\x3cspan class\x3d"yellow"\x3e' + str1[l] + "\x3c/span\x3e"),
                      0 == f && 0 < m && (f = l),
                      null == e && (e = m < k ? m - l : k - l))
                    : (d++, (c += '\x3cspan class\x3d"red"\x3e' + str1[l] + "\x3c/span\x3e"));
            }
        if (0 == m || 0 != f) {
            g = contentDivs.item(h).id;
            g = g.substr(2);
            if ("array" == typeof wubi86[g] || "object" == typeof wubi86[g]) {
                if (((m = wubi86[g]), "array" == typeof m[f] || "object" == typeof m[f])) {
                    p = "";
                    for (q = f; q < f + m[f][0] && q < k; q++) p += str1[q];
                    L = p;
                    S = m[f][1];
                }
            } else (L = ""), (S = "-");
            "array" == typeof wubi861[g] || "object" == typeof wubi861[g]
                ? ((m = wubi861[g]), "undefined" != typeof m[f] ? ((C = str1[f]), (K = m[f])) : ((C = ""), (K = "-")))
                : ((C = ""), (K = "-"));
            "array" == typeof pinyin[g] || "object" == typeof pinyin[g]
                ? ((m = pinyin[g]), "undefined" != typeof m[f] ? ((B = str1[f]), (J = m[f])) : ((B = ""), (J = "-")))
                : ((B = ""), (J = "-"));
        } else (L = ""), (S = "-"), (B = ""), (J = "-"), (C = ""), (K = "-");
        fa[h] = d;
        O[h] = null == e ? 0 : e;
        return c;
    }

    function Y(a) {
        for (var b = 0, c = 0; c < 2 * a.length && c <= h; c += 2) 0 < a[c] && (b += a[c]);
        return b;
    }

    function la(a) {
        for (var b = [], c = 0; c < a.length; c++)
            (b[c] = a.substr(c, 1)), "\x3c" == b[c] && (b[c] = "\x26lt;"), "\x3e" == b[c] && (b[c] = "\x26gt;");
        return b;
    }

    function timeNow() {
        // getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
        return new Date().getTime();;
    }


    document.body.onpaste = function () {
        return !1;
    };
    document.body.oncopy = function () {
        return !1;
    };
    document.body.oncut = function () {
        return !1;
    };



    // 暂停 继续
    dazi_pause = function (a) {
        // a  <a href="javascript:;" onclick="dazi_pause(this)" id="pause_a" class="pause">暂停</a>
        // \u7ee7\u7eed  继续
        // \u6682\u505c  暂停
        console.log("H"+timeOfStartTyping);
        
        "pause" == a.className    //a.className   取值是:"continue"或"pause"
            ? ((a.innerHTML = "\u7ee7\u7eed"), (a.className = "continue"), 0 < timeOfStartTyping && (varTimeNow = timeNow()), typing(h, "stop"))
            : ((a.innerHTML = "\u6682\u505c"), (a.className = "pause"), 0 < timeOfStartTyping && ((ga += timeNow() - varTimeNow), (varTimeNow = 0)), typing(h));
    };

    // 关灯 开灯
    close_light = function (a) {
        // \u5f00\u706f  关灯
        // \u5173\u706f  开灯
        "light" == a.className
            ? ((a.innerHTML = "\u5f00\u706f"), (a.className = "night"), (document.body.className = "dazi_style_black"))
            : ((a.innerHTML = "\u5173\u706f"), (a.className = "light"), (document.body.className = ""));
    };


    var bodyHeight = document.body.offsetHeight;
    // 0 < bodyHeight && (document.getElementById("content").style.height = bodyHeight - 180 + "px");
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

        for (var N = sa(), l = 1; 10 >= l; l++) {
            // console.log(N);
            
            var ta = contentDivs.item(N[0]).getElementsByTagName("span").item(0);
            N[1] = ta.offsetWidth;
            if (0 < contentWidth && 0 < N[1] && (N[1] > contentWidth - 60 || N[1] > bodyWidth - 240))
                document.getElementById("content").className = "typing_content font" + l;
            else break;
        }
    }

    function sa() {
        for (var a = 0, b = 0, theNumberOfLetters = 0, i = 1; i < contentDivs.length; i += 2) {
            var spanHC = contentDivs.item(i).getElementsByTagName("span");
            // console.log(spanHC);
            
            if (1 == spanHC.length) {
                
                console.log(spanHC);
                var spanoffsetWidth = spanHC.item(0).offsetWidth,
                    spanHC = spanHC.item(0).innerHTML.replace(/(\s{1})$/g, "");    //去掉末尾空格 \s 空格   {1}重复1次   $末尾  g修饰符表示全局匹配（global）

                    0 < spanHC.length && (theNumberOfLetters += spanHC.length);
                spanoffsetWidth > a && ((a = spanoffsetWidth), (b = i));
            }
        }
        // ia = theNumberOfLetters;
        return [b, a];
    }

    
    typing(h);
})();
