import requests
import re


url1 = 'https://www.6789sm.com/e/DownSys/play/?classid=41&id=3849'
# Cookie需要每次手动登录获取
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
    'Cookie': 'ab.storage.deviceId.c7739970-c490-4772-aa67-2b5c1403137e=%7B%22g%22%3A%22b6ae7189-0a5c-1dfc-3865-2b092811fa34%22%2C%22c%22%3A1676024897184%2C%22l%22%3A1676024897184%7D; xtzhzmlusername=akarui; xtzhzmluserid=118139; xtzhzmlgroupid=1; xtzhzmlrnd=imDnBrOR9DZIk6PQmvOp; xtzhzmlauth=62a89447445850a66fa2757905a7f96f; xtzhzlastsearchtime=1689419136; Hm_lvt_fe5bfeaadd7f1da1fac24568d088a7ac=1689411382,1689418419,1689489981; Hm_lpvt_fe5bfeaadd7f1da1fac24568d088a7ac=1689494587; xtzhzcheckplkey=1689501876%2C62873a8187b157905dff13826e6f6d06%2CEmpireCMS',
}
response1 = requests.get(url=url1, headers=headers).text

vidurl = re.findall('        url: \'(.*?)\',', response1)
url = str(vidurl[0])
token = url.split("?token=")[1]
#print(token)