// インターバルID
var timerId;

// 定数値
var HOUR  = 0;
var MIN   = 0;
var SEC   = 15;
var MILLI = 1000; // ミリ秒 (1000ミリ秒 = 1秒)

// 設定時間をミリ秒に変換
function setup(){
    var h = HOUR * 60 * 60 * MILLI;
    var m = MIN * 60 * MILLI;
    var s = SEC * MILLI;
    defaultTimer = h + m + s;
}

// タイマーのセット
function start(){
    startDate = new Date();
    mainTimerId = setInterval("countDown()", 1);
}

// タイマーの停止
function stop(timerId){
    clearInterval(timerId);
}

// カウントダウン開始
function countDown(){
    stopDate = new Date();
    // スタートからどのくらい経過しているか
    goingTime = stopDate.getTime() - startDate.getTime();
    // 設定時刻から経過時間を差し引く(残りの時間取得 remaining time)
    var remTime = defaultTimer - goingTime;
    // 残り時間が0以下ならタイマーを停止
    if (remTime <= 0){
        remTime = 0;
        stop(mainTimerId);
    }
    // タイムスタンプを時分秒に切り出す
    var hour  = Math.floor(remTime / (60 * 60 * MILLI));
    var min   = Math.floor(remTime / (60 * MILLI));
    var sec   = Math.floor(remTime / MILLI);
    // ミリ秒を取得
    var milli = remTime % MILLI;
    var milli = String(milli).substr(0, 2);

    $("#show_timer").text(hour + ":" + min + ":" + sec + ":" + milli);
}

$(function(){
    setup();
    start();
});
