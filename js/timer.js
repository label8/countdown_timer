// グローバル変数
var signalTimerId;
var finishTimerId;
var signalTime;
var finishTime;
var startDate;
var stopDate;

// 定数値(秒)
var SIGNAL_CNT = 4;

var HOUR  = 0;
var MIN   = 0;
var SEC   = 15;
var MILLI = 1000; // ミリ秒 (1000ミリ秒 = 1秒)

var isNext = 0;

// 設定時間をミリ秒に変換
function setup(){
    signalTime = SIGNAL_CNT * MILLI;

    var h = HOUR * 60 * 60 * MILLI;
    var m = MIN * 60 * MILLI;
    var s = SEC * MILLI;
    finishTime = h + m + s;
}

// タイマーの開始
function start(){
    startDate = new Date();
    signalTimerId = setInterval("countDownSignal()", 1);
    finishTimerId = setInterval(function(){
        if (isNext){
            countDownFinish();
        }
    }, 1);
}

// タイマーの停止
function stop(timerId, flg=0){
    clearInterval(timerId);
    isNext = flg;
}

// 開始合図のカウントダウン
function countDownSignal(){
    var remTime = calcRemTime(signalTime);
    if (remTime <= 0){
        remTime = 0;
        stop(signalTimerId, 1);
        startDate = new Date();
        //finishTimerId = setInterval("countDownFinish()", 1);
    }
    displaySignalTimer(remTime);
}

// 終了までのカウントダウン
function countDownFinish(){
    var remTime = calcRemTime(finishTime);
    if (remTime <= 0){
        remTime = 0;
        stop(finishTimerId);
    }
    displayFinishTimer(remTime);
}

// 残り時間の計算
function calcRemTime(time){
    stopDate = new Date();
    // スタートからどのくらい経過しているか
    var runTime = stopDate.getTime() - startDate.getTime();
    // 設定時刻から経過時間を差し引く(残りの時間取得 remaining time)
    return time - runTime;
}

// ゼロパディング
function zeroPadding(num, len){
    var numLen = String(num).length;
    if (numLen > 1) return num;
    return ("00" + num).slice(-len);
}

// 開始合図のタイマーを表示
function displaySignalTimer(time){
    var sec = Math.floor(time / MILLI);
    if (sec <= 0){
        var str = "Go!"
        $("#start_timer").text(str);
    } else {
        $("#start_timer").text(sec);
    }
}

// 終了タイマーを表示
function displayFinishTimer(time){
    // タイムスタンプを時分秒に切り出す
    var hour  = Math.floor(time / (60 * 60 * MILLI));
    var min   = Math.floor(time / (60 * MILLI));
    var sec   = Math.floor(time / MILLI);
    // ミリ秒を取得
    var milli = time % MILLI;
    var milli = String(milli).substr(0, 2);

    // 1桁なら頭にゼロを付ける
    hour  = zeroPadding(hour, 2);
    min   = zeroPadding(min, 2);
    sec   = zeroPadding(sec, 2);
    milli = zeroPadding(milli, 2);

    $("#show_timer").text(hour + ":" + min + ":" + sec + ":" + milli);
}

$(function(){
    setup();
    start();
});
