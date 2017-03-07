// グローバル変数
var signalTimerId;
var finishTimerId;
var signalTime;
var finishTime;
var startDate;
var stopDate;

// 定数値(秒)
var SIGNAL_CNT = 4; // 開始のカウント(秒)(指定秒 + 1を指定)

var HOUR = 1;    // タイマー時
var MIN  = 4;    // タイマー分
var SEC  = 60;   // タイマー秒
var MSEC = 1000; // ミリ秒 (1000ミリ秒 = 1秒)
var WARN = 5;    // 残り時間が少ない警告(秒)

var isNext = 0;

function validTimer(){
    if (HOUR > 60 || HOUR < 0){
        alert("HOURの設定範囲が間違っています");
        return false;
    }
    if (MIN > 60 || MIN < 0){
        alert("MINの設定範囲が間違っています");
        return false;
    }
    if (SEC > 60 || SEC < 0){
        alert("SECの設定範囲が間違っています");
        return false;
    }

    return true;
}

// 設定時間をミリ秒に変換
function setup(){
    signalTime = SIGNAL_CNT * MSEC;

    var h = HOUR * 60 * 60 * MSEC;
    var m = MIN * 60 * MSEC;
    var s = SEC * MSEC;
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
    var sec = Math.floor(time / MSEC);

    var timerStr = "";
    if (sec <= 0){
        timerStr = "Go!"
    } else {
        timerStr = String(sec);
    }

    $("#start_timer").text(timerStr);
}

// 終了タイマーを表示
function displayFinishTimer(time){
    // タイムスタンプを時分秒に切り出す
    var hour  = Math.floor(time / (60 * 60 * MSEC));
    var hTime = time % (60 * 60 * MSEC);

    var min   = Math.floor(hTime / (60 * MSEC));
    var mTime = time % (60 * MSEC);

    var sec  = Math.floor(mTime / MSEC);

    var msec = time % MSEC;
    var sumTime = hour + min + sec + msec;

    var timerStr = "";
    if (sumTime <= 0){
        timerStr = "Time out..."
    } else {
        // ミリ秒を切り詰め
        msec = String(msec).substr(0, 2);
        // 1桁なら頭にゼロを付ける
        h  = zeroPadding(hour, 2);
        m  = zeroPadding(min, 2);
        s  = zeroPadding(sec, 2);
        ms = zeroPadding(msec, 2);
        timerStr = h + ":" + m + ":" + s + ":" + ms;
    }

    $("#show_timer").text(timerStr);
}

$(function(){
    var res = validTimer();
    if (!res) return false;
    setup();
    start();
});
