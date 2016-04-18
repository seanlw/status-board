'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function(){
	if (process.playform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function(){
	mainWindow = new BrowserWindow({
    width: 768, 
    height: 1028, 
    resizable: false, 
    icon: 'lib/img/app-icon.png',
    title: 'Status Board'
  });

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function(){
		mainWindow = null;
	});
});