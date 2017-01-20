var allimg = [
    "/build/assets/img/close.png",
    "/build/assets/img/logo.png",
    "/build/assets/img/audio-bg.png",
    "/build/assets/img/audio1.png",
    "/build/assets/img/audio2.png",
    "/build/assets/img/audio3.png",
    "/build/assets/img/bg.jpg",
    "/build/assets/img/failure.png",
    "/build/assets/img/inside-bg.jpg",
    "/build/assets/img/kv.jpg",
    "/build/assets/img/success.png",
    "/build/assets/img/t1.png",
    "/build/assets/img/newyear.mp3",
];


pfun.loadingFnDoing(allimg, function(){
    $(".loading").css({"visibility": "hidden"});
    _gewara.init();
})

function gewaraFun(){
    var self = this;

    /* 公共函数 即 默认执行 */
    self.init = function(){   // 初始化执行函数
        if(codeStatus > 0){
            self.sectionChange("result"); 
        }else{
            self.sectionChange("home"); 
        }
        // pfun.init();
        $("#dreambox").css({"visibility": "visible"});

        pfun.overscroll(document.querySelector("#home")); 
        pfun.overscroll(document.querySelector("#pop-rule"));  // 活动规则滚动条
    };

    self.isPhoneNum = function(v){
        //return /^0|^((\+?86 )|(\(\+86 \)))?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(v);
        return /^1([0-9]){10}$/.test(v);
    }

    // 页面切换
    self.sectionChange = function(n){        // section 页面切换

        if(n == "video"){
            self.videoFun();
        }

        $(".section").removeClass("show transition");
        $("#" + n).addClass('show transition');  
    }

    // 弹层
    self.gewaraPrompt = function(node, status){
        if(status){
            $(".popup").removeClass("hidden");
            $("#" + node).removeClass("hidden").addClass("ycenter transition");
        }else{
            $(".popup").addClass("hidden");
            $(".popup .con").addClass("hidden").removeClass("ycenter transition");
        }
    }




}

var _gewara = new gewaraFun();


// 活动规则点击事件
$(".rule").on('touchstart', function(e){
    // $("#rule-pop").removeClass("hidden").addClass("ycenter transition");
    _gewara.gewaraPrompt("rule-pop", 1);
    // _hmt.push(['_trackEvent', 'click', 'link', '活动规则']);
    e.preventDefault();
})

// 活动规则关闭事件
$(".close").on('click', function(e){
    _gewara.gewaraPrompt("", 0);
    // $("#rule-pop").addClass("hidden").removeClass("ycenter transition");
    e.preventDefault();
})




$(".submit").on("click", function(){
    var tel = $("input[type=tel]").val();
    if(!_gewara.isPhoneNum(tel)){
        pfun.formErrorTips("手机号码有误！");
    }else{
        $(".submit").addClass("disabled");
        pfun.ajaxFun("POST", "/api/check", {
            'mobile': tel
        }, "json", function(data){
            if(data.status == 1){
               location.href = "/"; 
            }else{
                pfun.formErrorTips(data.msg);
            }
            $(".submit").removeClass("disabled");
        });
    }

})


var x = document.getElementById("myAudio");
$(".audioPop").on("click", function(){
    x.play();
    $(this).addClass("audioAni");
})

pfun.eventTester(x, "ended", function(){
    $(".audioPop").removeClass("audioAni");
});



