<?php
session_start();
if($_POST){
	//echo '<pre>';print_r($_POST);print_r($_SESSION);
	if($_POST['mobile']!=$_SESSION['mobile'] or $_POST['mobile_code']!=$_SESSION['mobile_code'] or empty($_POST['mobile']) or empty($_POST['mobile_code'])){
		exit('手机验证码输入错误。');
	}else{
		$_SESSION['mobile'] = '';
		$_SESSION['mobile_code'] = '';
		exit('注册成功。');
	}
}
function random($length = 6 , $numeric = 0) {
	PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
	if($numeric) {
		$hash = sprintf('%0'.$length.'d', mt_rand(0, pow(10, $length) - 1));
	} else {
		$hash = '';
		$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghjkmnpqrstuvwxyz';
		$max = strlen($chars) - 1;
		for($i = 0; $i < $length; $i++) {
			$hash .= $chars[mt_rand(0, $max)];
		}
	}
	return $hash;
}
$_SESSION['send_code'] = random(6,1);
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- 宽度为设备宽度，初始缩放比例为一，用户最小最大缩放比例为一，不允许用户手机缩放 -->
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
	<!-- 禁止iOS设备将数字作为拨号连接、邮箱自动发送，点击地图跳转 -->
	<meta name="format-detection" content="telephone=no,email=no,adress=no">
	<!-- 强制全屏显示 -->
	<meta name="full-screen" content="yes">
	<!-- 开启对webapp的支持 -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<!-- webapp应用下状态条(平模顶部条)的颜色，默认值为default(白色或黑色半透明) -->
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<!-- 禁止浏览器从缓存中访问页面内容 -->
	<meta http-epuiv="Pragma" content="no-cache">
	<title>注册页</title>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/font-awesome.css">
	<link rel="stylesheet" href="css/register.css">
</head>
<body>
	<div class="container">
		<header class="header">
			<h1>会员快速注册</h1>
			<a href="index.html"class="close">×</a>
		</header>
		<main class="main">
			<!-- <ul class="info">
				<li class="check">
					<p><label for="">手机号</label><input type="text" placeholder="请输入手机号" id="userName"></p>
					<a href="javascript:void(0);" class="get">获取验证码</a>
				</li>
				<li class="pic">
					<p><label for="">密码</label><input type="text" placeholder="请输入密码"></p>
					<a href="javascript:void(0);" class="eyes"></a>
				</li>
				<li>
					<label for="">验证码</label><input type="text" placeholder="请输入手机验证码">
				</li>
			</ul>
			<div class="register">注册</div> -->


			<form action="reg.php" method="post" name="formUser">
				<ul class="info">
					<li class="check">
						<p><label for="">手机号</label><input type="text" id="mobile" name="mobile" placeholder="请输入手机号" id="userName" size="25" class="inputBg"></p>
						<input id="zphone" type="button" value=" 获取手机验证码 " class="get" onClick="get_mobile_code();">
						<!-- <a href="javascript:void(0);" class="get">获取验证码</a> -->
					</li>
					<li class="pwd">
						<p><label for="">密码</label><input type="text" placeholder="请输入密码"></p>
						<a href="javascript:void(0);" class="eyes"><i class="fa fa-eye"></i></a>
					</li>
					<li class="checked">
						<label for="">验证码</label><input type="text" placeholder="请输入手机验证码" size="8" name="mobile_code" class="inputBg" >
					</li>
					<li class="ok"><input type="submit" value=" 注册 " class="button"></td></li>
				</ul>
			</form>
		</main>
	</div>
	<script src="js/jquery1.7.js"></script>
	<script src="js/setfontsize.js"></script>
	<script src="js/zepto.min.js"></script>
	<script>
			function get_mobile_code(){
		        $.post('sms.php', {mobile:jQuery.trim($('#mobile').val()),send_code:<?php echo $_SESSION['send_code'];?>}, function(msg) {
		            alert(jQuery.trim(unescape(msg)));
					if(msg=='提交成功'){
						RemainTime();
					}
		        });
			};
			var iTime = 59;
			var Account;
			function RemainTime(){
				document.getElementById('zphone').disabled = true;
				var iSecond,sSecond="",sTime="";
				if (iTime >= 0){
					iSecond = parseInt(iTime%60);
					iMinute = parseInt(iTime/60)
					if (iSecond >= 0){
						if(iMinute>0){
							sSecond = iMinute + "分" + iSecond + "秒";
						}else{
							sSecond = iSecond + "秒";
						}
					}
					sTime=sSecond;
					if(iTime==0){
						clearTimeout(Account);
						sTime='获取手机验证码';
						iTime = 59;
						document.getElementById('zphone').disabled = false;
					}else{
						Account = setTimeout("RemainTime()",1000);
						iTime=iTime-1;
					}
				}else{
					sTime='没有倒计时';
				}
				document.getElementById('zphone').value = sTime;
			}
	</script>
</body>
</html>