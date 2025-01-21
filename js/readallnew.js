var videoIndex = 0; // 当前页数索引
var videosPerPage = 5; // 每页显示的视频数量
var urlnumList = []; // 存放从urlnumfile.txt读取的urlnum数组
var token = ""; // 存放从nowtoken.txt读取的token值
var infoList = []; // 存放从info.txt读取的info数组
var playerInstances = [];
var evenInstances = [];

// 通过fetch函数异步读取urlnumfile.txt和nowtoken.txt的内容
Promise.all([
    fetch('urlnumfile.txt').then(response => response.text()),
    fetch('nowtoken.txt').then(response => response.text()),
    fetch('info.txt').then(response => response.text()),
]).then(data => {
    urlnumList = data[0].trim().split('\n');
    token = data[1].trim();
    infoList = data[2].trim().split('\n');
    updateVideoPlayersAndTitles();
});

// 显示当前页的视频
function showVideos() {
    var start = videoIndex * videosPerPage;
    var end = start + videosPerPage;
    for (var i = start; i < end && i < urlnumList.length; i++) {
        var playerContainerId = "mui-player" + (i - start + 1);
        var videoSrc = generateVideoSource(urlnumList[i], token);
        setupPlayer(playerContainerId, videoSrc);
    }
}

// 生成视频的完整链接
function generateVideoSource(urlnum, token) {
    // 判断urlnum的大小
    if (urlnum > 1688187760) {
        // 如果urlnum大于X，则将字符串中的asmr换成asmr2
        return 'https://jd.gjele.cn:4433/73sm/asmr2/' + urlnum + '/hls.m3u8?token=' + token;
    } else {
        // 如果urlnum小于等于X，则保持原样
        return 'https://cdn9527.55661.cn:4433/73sm/asmr/' + urlnum + '/hls.m3u8?token=' + token;
    }
}


// 设置播放器配置
function setupPlayer(containerId, videoSrc) {
    const HlsPlayer = window.HlsPlayer;
    const config = {
          "id": containerId,
          "url": videoSrc,
          "playsinline": false,
          "poster": " ",
          "plugins": [],
          "autoplay": false,
          "fluid": true,
          "closeVideoTouch": true,
          "pip": true,
          "volume": 1,
          "rotate": {
              "clockwise": true,
              "innerRotate": true
        }};
        config.plugins.push(HlsPlayer);
        let player = new Player(config);
        playerInstances.push(player); // 将播放器实例添加到数组中
        console.log('setup');
        let EVENTS = window.Player.Events;
        evenInstances.push(EVENTS);
        player.on(EVENTS.LOADED_DATA, () => {
            player.seek(1); //跳转
            //player.play();
            console.log('seek');
            player.pause();
            //替换播放链接
            //player.switchURL('替换的url');
            }
        );
};

// 生成视频标题
function generateVideoTitle(urlnum) {
    var timestamp = parseInt(urlnum);
    var cleanedString = timestamp.toString()
    var reltimestamp = timestamp + 3600 * 8;
    var date = new Date(reltimestamp * 1000); // 转换为毫秒级时间戳
    var formattedDate = date.toISOString().substring(0, 19).replace("T", " "); // 将ISO日期格式转换为指定格式
    return cleanedString + " # " + formattedDate;
}

// 显示当前页信息
function updateCurrentPageInfo() {
    var currentPage = videoIndex + 1;
    var totalPages = Math.ceil(urlnumList.length / videosPerPage);
    document.getElementById("currentPageInfo").innerText = "当前为第" + currentPage + "页，共" + totalPages + "页";
}

// 显示info.txt内容
function showInfo() {
    var leftTopElement = document.querySelector(".left-top");
    var leftBottomElement = document.querySelector(".left-bottom");
    var rightTopElement = document.querySelector(".right-top");
    var rightBottomElement = document.querySelector(".right-bottom");

    leftTopElement.textContent = infoList[0];
    leftBottomElement.textContent = infoList[1];
    rightTopElement.textContent = infoList[2];
    rightBottomElement.textContent = infoList[3];
}

// 更新视频播放器和标题
function updateVideoPlayersAndTitles() {
    showVideos();
    updateCurrentPageInfo();

    // 更新视频标题和标签区域
    var start = videoIndex * videosPerPage;
    var end = start + videosPerPage;
    for (var i = start; i < end && i < urlnumList.length; i++) {
        var videoTitleText = generateVideoTitle(urlnumList[i]);
        var unitTitleElement = document.getElementById("unit-title-" + (i - start + 1));
        if (unitTitleElement) {
            unitTitleElement.innerText = videoTitleText;
        }
    }
    // 显示info.txt内容
    showInfo();
}

// 上一页按钮点击事件
document.getElementById("prevButton").onclick = function () {
    if (videoIndex > 0) {
        videoIndex--;
        updateVideoPlayersAndTitles();
    }
};

// 下一页按钮点击事件
document.getElementById("nextButton").onclick = function () {
    if (videoIndex < Math.ceil(urlnumList.length / videosPerPage) - 1) {
        // 销毁所有播放器
        for (var i = 0; i < playerInstances.length; i++) {
            playerInstances[i].stop();
            playerInstances[i] = null;
            console.log('destroy');
        }
        playerInstances = []; // 清空数组
        evenInstances = [];
        videoIndex++;
        updateVideoPlayersAndTitles();
    }
};

// 跳转按钮点击事件
document.getElementById("jumpButton").onclick = function () {
    var pageNumberInput = document.getElementById("pageNumberInput").value;
    var parsedPageNumber = parseInt(pageNumberInput);
    if (!isNaN(parsedPageNumber) && parsedPageNumber >= 1 && parsedPageNumber <= Math.ceil(urlnumList.length / videosPerPage)) {
        videoIndex = parsedPageNumber - 1;
        updateVideoPlayersAndTitles();
    } else {
        alert("请输入有效的页码！");
    }
};
