'use strict';

// --------------------------------------------------------
// Seting
// --------------------------------------------------------
var app = require('app'); // アプリケーションをコントロールするモジュール
var BrowserWindow = require('browser-window'); // ウィンドウを作成するモジュール
var Tray = require('tray');
var Menu = require('menu');
var appIcon = null;

var mainWindow = null; // メインウィンドウはGCされないようにグローバル宣言
require('crash-reporter').start(); // クラッシュレポート



// --------------------------------------------------------
// Icon
// --------------------------------------------------------
function icon(){
    var contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio' },
        { label: 'Item4', type: 'radio' }
    ]);

    var appIcon = new Tray(__dirname + '/img/icon.png');

    appIcon.setToolTip('CREDO');
    appIcon.setContextMenu(contextMenu);
}



// --------------------------------------------------------
// Toolbar Menu
// --------------------------------------------------------
var template = [
  {
    label: 'ReadUs',
    submenu: [
      {label: 'Quit', accelerator: 'Command+Q', click: function () {app.quit();}}
    ]
  }
];

var menu = Menu.buildFromTemplate(template);



// --------------------------------------------------------
// Start
// --------------------------------------------------------
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 904,
        height: 636,
        transparent: false,
        frame: true
    });
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    Menu.setApplicationMenu(menu);

    icon(); // ツールバーアイコン設定

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
        mainWindow = null;
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

