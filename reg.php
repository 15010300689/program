<?php
session_start();
if($_POST){
	//echo '<pre>';print_r($_POST);print_r($_SESSION);
	if($_POST['mobile']!=$_SESSION['mobile'] or $_POST['mobile_code']!=$_SESSION['mobile_code'] or empty($_POST['mobile']) or empty($_POST['mobile_code'])){
		exit('�ֻ���֤���������');
	}else{
		$_SESSION['mobile'] = '';
		$_SESSION['mobile_code'] = '';
		exit('ע��ɹ���');
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
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<!-- ���Ϊ�豸��ȣ���ʼ���ű���Ϊһ���û���С������ű���Ϊһ���������û��ֻ����� -->
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<!-- ��ֹiOS�豸��������Ϊ�������ӡ������Զ����ͣ������ͼ��ת -->
<meta name="format-detection" content="telephone=no,email=no,adress=no">
<!-- ǿ��ȫ����ʾ -->
<meta name="full-screen" content="yes">
<!-- ������webapp��֧�� -->
<meta name="apple-mobile-web-app-capable" content="yes">
<!-- webappӦ����״̬��(ƽģ������)����ɫ��Ĭ��ֵΪdefault(��ɫ���ɫ��͸��) -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<!-- ��ֹ������ӻ����з���ҳ������ -->
<meta http-epuiv="Pragma" content="no-cache">
<title>ע��ҳ</title>
</head>
<script type="text/javascript" src="jquery.js"></script>
<script language="javascript">
	function get_mobile_code(){
        $.post('sms.php', {mobile:jQuery.trim($('#mobile').val()),send_code:<?php echo $_SESSION['send_code'];?>}, function(msg) {
            alert(jQuery.trim(unescape(msg)));
			if(msg=='�ύ�ɹ�'){
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
					sSecond = iMinute + "��" + iSecond + "��";
				}else{
					sSecond = iSecond + "��";
				}
			}
			sTime=sSecond;
			if(iTime==0){
				clearTimeout(Account);
				sTime='��ȡ�ֻ���֤��';
				iTime = 59;
				document.getElementById('zphone').disabled = false;
			}else{
				Account = setTimeout("RemainTime()",1000);
				iTime=iTime-1;
			}
		}else{
			sTime='û�е���ʱ';
		}
		document.getElementById('zphone').value = sTime;
	}
</script>
<body>
<form action="reg.php" method="post" name="formUser">
	<table width="100%"  border="0" align="left" cellpadding="5" cellspacing="3">
		<tr>
			<td align="right">�ֻ�<td>
		<input id="mobile" name="mobile" type="text" size="25" class="inputBg" /><span style="color:#FF0000"> *</span>
        <input id="zphone" type="button" value=" ��ȡ�ֻ���֤�� " onClick="get_mobile_code();"></td>
        </tr>
		<tr>
			<td align="right">��֤��</td>
			<td><input type="text" size="8" name="mobile_code" class="inputBg" /></td>
		</tr>
		<tr>
			<td align="right"></td>
			<td><input type="submit" value=" ע�� " class="button"></td>
		</tr>
	</table>
</form>
</body>
</html>