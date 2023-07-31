<?php
// 允许所有域进行跨域请求，或者根据需要设置允许的域名
header("Access-Control-Allow-Origin: *");

// 允许的HTTP方法，根据你的API需求设置
header("Access-Control-Allow-Methods: GET, OPTIONS");

// 允许的自定义头部字段，根据你的API需求设置
header("Access-Control-Allow-Headers: Content-Type");

// 如果是预检请求，直接返回
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

function get_token() {
    $url1 = 'https://www.6789sm.com/e/DownSys/play/?classid=41&id=3849';
    // Cookie需要每次手动登录获取
    $headers = array(
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
        'Cookie: ab.storage.deviceId.c7739970-c490-4772-aa67-2b5c1403137e=%7B%22g%22%3A%22b6ae7189-0a5c-1dfc-3865-2b092811fa34%22%2C%22c%22%3A1676024897184%2C%22l%22%3A1676024897184%7D; xtzhzmlusername=akarui; xtzhzmluserid=118139; xtzhzmlgroupid=1; xtzhzmlrnd=imDnBrOR9DZIk6PQmvOp; xtzhzmlauth=62a89447445850a66fa2757905a7f96f; xtzhzlastsearchtime=1689419136; Hm_lvt_fe5bfeaadd7f1da1fac24568d088a7ac=1689411382,1689418419,1689489981; Hm_lpvt_fe5bfeaadd7f1da1fac24568d088a7ac=1689494587; xtzhzcheckplkey=1689501876%2C62873a8187b157905dff13826e6f6d06%2CEmpireCMS'
    );

    // Perform the GET request
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response1 = curl_exec($ch);
    curl_close($ch);

    // Extract token from the response
    preg_match('/url:\s+\'(.*?)\',/', $response1, $matches);
    $url = $matches[1];
    $token = explode("?token=", $url)[1];

    return $token;
}

// 调用函数获取token
$token = get_token();

// 返回JSON格式的响应
$response = array('token' => $token);
header('Content-Type: application/json');
echo json_encode($response);
?>
