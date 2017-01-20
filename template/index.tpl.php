<!DOCTYPE HTML>
<html>
<head>
    <title>唐嫣喊你看新片</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="format-detection" content="telephone=no">
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="landscape">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="landscape">

    <!--禁用手机号码链接(for iPhone)-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0,minimal-ui" />
    <!--自适应设备宽度-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--控制全屏时顶部状态栏的外，默认白色-->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="Keywords" content="">
    <meta name="Description" content="...">
    <link rel="stylesheet" type="text/css" href="/build/assets/css/main.min.css">
    <script type="text/javascript" src="http://coach.samesamechina.com/api/v1/js/d78ccbab-16ad-4386-89a0-af37fe477c27/wechat"></script>
    <script>
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?56dcfdb0da628102c73164f2cfc18a17";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	</script>
</head>
<body>
<script type="text/javascript">
    var webData = {
        status: '<?php print $status;?>',
        code1: '<?php print $code1;?>',
        code2: '<?php print $code2;?>',
    }
</script>
<div class="loading">
    <div class="loading_con">
        <img src="/build/assets/img/logo.png" width="100%">

        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <p>目前涌入的小伙伴过多<br>页面正在跳转中，请耐心等待。</p>
    </div>
</div>

<!-- 横屏代码 -->
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content">
        <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
    </div>
</div>

<div id="dreambox">

<div class="section" id="home">
    <div class="kv">
        <div class="audioPop">
            <div class="audio1"></div>
            <div class="audio2"></div>
            <div class="audio3"></div>
            <img src="" sourcesrc="/build/assets/img/audio-bg.png" width="100%">
        </div>
        <img src="" sourcesrc="/build/assets/img/kv.jpg" width="100%">
    </div>

    <img src="" sourcesrc="/build/assets/img/t1.png" width="100%">
    <div class="formArea">
        <input type="tel" name="tel" maxlength="11" placeholder="手机 / MOBILE PHONE">
    </div>
    <div class="footer">
        <a href="javascript:;" class="btn submit">我要抽奖</a>
        <p><a href="javascript:;" class="rule">活动细则</a></p> 
    </div>

</div>
<div class="section" id="result">
    <img src="/build/assets/img/logo.png" width="100%" class="logo">

    <div class="result_con ycenter">
        <div class="rcontent" id="result_detail">
            <?php if($status == 1) {
            ?>
                <img src="/build/assets/img/success.png" width="100%">
                <div class="promoCode">
                    <p><?php print $code1;?></p>
                    <p><?php print $code2;?></p>
                </div>
                <div class="codeuse">
                    <span>票券使用</span>
                </div>  
            <?php
            } else {?>
                <img src="/build/assets/img/failure.png" width="100%" class="failure_text">
            <?php
            }?>
        </div>
    </div>

</div>

<img src="" sourcesrc="/build/assets/img/bg.jpg" width="100%">


</div>


<!--  活动细则 -->
<div class="popup transition hidden" id="rule-pop">
  <div class="p-model">
    <h4>活动细则 <i class="close"><img src="" sourcesrc="/build/assets/img/close.png" width="100%"></i></h4>
    <div class="p-model-con" id="pop-rule">
        <strong>本次活动最终解释权归蔻驰贸易（上海）有限公司所有。</strong><br>
        <ol type="1">
            <li>参与资格: 任何中国公民均有资格参与蔻驰微信“2017'酉'鸿运！”活动（以下简称本活动）。本次活动将严格遵守中华人民共和国的相关法律及法规。参与本活动表示你同意无条件完全遵守本活动细则以及活动主办方的相关决定。</li>
            <li>活动主办方: 蔻驰贸易（上海）有限公司 南京西路1717号会德丰广场20楼，200042.</li>
            <li>活动时间: 本活动日期由北京时间1月18日，活动主办方的电脑时间为本次活动的官方时间标准。</li>
            <li> 怎样参与本次活动:<br>
            在活动期间，所有添加蔻驰官方微信账号的用户，根据账号内指引在规定时间内完成任务，并关注Coach蔻驰官方微信，即有资格领取卡券。活动主办方有义务在活动期间保证活动功能可被正常使用。</li>
            <li>
            获奖者的认证：所有的活动参与者都必须满足活动细则中的所有条款。获取奖品的先决条件是必须完成所有相关的任务。主办方不会接受截图或者其他的证据来验证获奖资格。在活动期间，如果在系统出现问题时产生的结果是不会被视作有效的。活动主办方在法律允许范围内负责制定、解释、修改并及时公布本次活动的规则，并最终确定获奖者。
            </li>
            <li>奖品：由蔻驰提供的红包一份（数量有限，送完为止）。</li>
            <li>
            活动信息公告：在符合法律相关规定的情况下，获奖者必须同意活动主办方在媒体上披露获奖者的姓名，微信头像与信息，语音，意见，身份信息和居住城市，主办方并不需要为此再支付额外费用或另行通知。活动主办方有权依据相关法律法规或业务需要，中止或取消此次活动或者修改活动方案，经相关途径公告后生效。</li>
            <li>一般性条款：如果发现欺诈，或者技术事故，或者由超出活动主办方能力控制的影响活动公正性的情况发生，活动主办方保留单方面取消或者变更本活动的相关权利。如果发生类似情况，活动主办方保留随机发送奖品給予事故发生前活动参赛者的权利。活动主办方同时保留在参赛者违反公平性原则或者利用不当行为获利的情况下单方面取消参赛者资格的权利。活动主办方保留采取法律手段追诉对于蓄意破坏和攻击活动网站的人的权利并可能要求相关赔偿。</li>
            <li>
            豁免条款: 参与本次活动的参赛者不得采用任何直接或者间接的方式沟通或者伤害任何蔻驰贸易（上海）有限公司及其合作伙伴及和本次活动有关的任何相关公司的雇员。
            </li> 
            <li>
            相关责任: 活动主办方不对以下情况负责：<br>
                <ol type="1">
                     <li>由媒体提供的关于本次活动的任何不准确或者不精确的信息</li>
                     <li>任何形式的技术故障，包括软硬件的损坏或者网络问题</li>
                     <li>对于本次活动的人为的恶意破坏</li>
                     <li>技术或人为的监管问题</li>
                     <li>因为参加本次活动直接或间接而产生的人身伤害。</li>
                     <li>如果因为技术或者收到恶意攻击等原因导致实际获奖者总人数超过事先公布的人数，活动主办方保留从中按照事先公布的获奖总数从中随机抽取的权利。</li>
                     <li>由于技术问题包括但不仅限于微信软件系统问题而产生的现金红包无法使用的问题。</li>
                     <li>用户对于该金额的支配和使用而产生的相关问题。</li>
                </ol>
            </li>
        </ol>
        <br>

    </div>
  </div>
</div>

<!--  票券使用 -->
<div class="popup transition hidden" id="codeuse">
  <div class="p-model">
    <h4>票券使用 <i class="close"><img src="" sourcesrc="/build/assets/img/close.png" width="100%"></i></h4>
    <div class="p-model-con" id="pop-codeuse">
        <h3>票券使用1：如何绑定格瓦拉电影票券</h3>
        <p>电影票券绑定是将您获得的电影票券和您的格瓦拉账户进行绑定，绑定后请记住支付密码，在使用时需输入</p>
        <center>【绑定流程】</center>
        <div class="textStyle">
        <p><em>【Step1】</em><span>注册并登录格瓦拉生活网</span></p>
        <p><em>【Step2】</em><span>点击首页右下方的“我的账户”</span></p>
        <p><em>【Step3】</em><span>进入我的钱包，选择我的票券</span></p>
        <p><em>【Step4】</em><span>输入电影票券密码（由12位数字和字母
                          组成），并点“绑定”，页面提示 绑定成
                          功信息</span></p>
        <p><em>【Step5】</em><span>进入选择影院、影片、场次、选择座位
                          确认订单、支付页面中选择“可用优惠”、
                          选择“票券”、点击“使用”，完成支付</span></p>
        </div>

        <h3>票券使用2：如何直接使用格瓦拉电影票券</h3>
        <center>【直接使用流程】</center>
        <div class="textStyle">
            <p><em>【Step1】</em><span>注册并登录格瓦拉生活网</span></p>
            <p><em>【Step2】</em><span>进入选择影院、影片、场次、选择座位</span></p>
            <p><em>【Step3】</em><span>确认订单、支付页面中选“可用优惠”点击
                              “票券”输入电子兑换密码点击“使用”完成                     
                              支付</span></p>
            <p><em>【Step4】</em><span>凭取票短信至影院自助取票机取票</span></p>
        </div>
        <center>【使用期限】</center>
        <p>【使用期限】自影片上映起25天内有效，不可延期，  
每个用户限用4张。</p>
        <br>

    </div>
  </div>
</div>


<audio src="/build/assets/img/newyear.mp3" id="myAudio" preload="auto"></audio>
<script type="text/javascript" src="/build/assets/js/main.min.js"></script>



</body>
</html>