"use strict";
// main.js
const { app, BrowserWindow } = require('electron');
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {}
    });
    // React 개발 서버 URL 로드
    win.loadURL('http://localhost:3000');
    // npm install --save-dev concurrently wait-on cross-env
    // "react-start": "react-scripts start",
    // "electron-start": "electron .",
    // "dev": "concurrently \"cross-env BROWSER=none npm run react-start\" \"wait-on http://localhost:3000 && npm run electron-start\"",
}
app.whenReady().then(createWindow);
