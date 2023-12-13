"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.js
const electron_1 = require("electron");
const path = require('node:path');
const server_js_1 = __importDefault(require("./server.js"));
// 서버 시작
const PORT = 8083;
server_js_1.default.listen(PORT, () => {
    console.log(`Server listening on HTTP port ${PORT}`);
});
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            // <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    // React 개발 서버 URL 로드
    win.loadFile('./web/index.html');
    // win.loadURL('http://localhost:3000'); // npm run dev로 리액트 개발환경에서 테스트가능
    // npm install --save-dev concurrently wait-on cross-env
    // "react-start": "react-scripts start",
    // "electron-start": "electron .",
    // "dev": "concurrently \"cross-env BROWSER=none npm run react-start\" \"wait-on http://localhost:3000 && npm run electron-start\"",
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// 종료 이벤트 리스너
electron_1.ipcMain.on('close-app', () => {
    electron_1.app.quit();
});
