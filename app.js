// --------------------------------------------------------
// Seting
// --------------------------------------------------------
var app = require('app'); // アプリケーションをコントロールするモジュール
var BrowserWindow = require('browser-window'); // ウィンドウを作成するモジュール
var Tray = require('tray');
var Menu = require('menu');
var appIcon = null;

var win = null; // メインウィンドウはGCされないようにグローバル宣言
require('crash-reporter').start(); // クラッシュレポート



// --------------------------------------------------------
// Icon
// --------------------------------------------------------
function icon(){
    var Menu = require("menu");
    var Tray = require("tray");
    var appIcon = new Tray(__dirname + '/img/icon.png');

    var contextMenu = Menu.buildFromTemplate([
            { label: "Front display", click: function () { win.focus(); } },
            { label: "Quit", click: function () { win.close();app.quit(); } }
        ]);
    appIcon.setContextMenu(contextMenu);

     // タスクトレイのツールチップをアプリ名に
    appIcon.setToolTip(app.getName());

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    appIcon.on("clicked", function () {
        win.focus();
    });
}



// --------------------------------------------------------
// Toolbar Menu
// --------------------------------------------------------
var template = [{
    label: 'ReadUs',
    submenu: [{
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function(){
            app.quit();
        }
    }]
}];

var menu = Menu.buildFromTemplate(template);



// --------------------------------------------------------
// Start
// --------------------------------------------------------
app.on('ready', function() {
    win = new BrowserWindow({
        width: 904,
        height: 636,
        center: true,
        transparent: false,
        frame: false,
        show: false,
        resizable: false
    });

    win.loadUrl('file://' + __dirname + '/index.html');
    win.show(); //チラつき問題のため、非表示してから表示

    // Menu.setApplicationMenu(menu);

    icon(); // ツールバーアイコン設定

    // ウィンドウが閉じられたらアプリも終了
    win.on('closed', function() {
        win = null;
    });
});



// --------------------------------------------------------
// Close
// --------------------------------------------------------
// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

