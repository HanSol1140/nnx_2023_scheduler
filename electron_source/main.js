"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.js
const electron_1 = require("electron");
const path = require('node:path');
const server_js_1 = __importDefault(require("./server.js"));
// express
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
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    win.loadFile('./web/index.html');
}
console.log(electron_1.app.getLoginItemSettings());
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// 종료 버튼
electron_1.ipcMain.on('close-app', () => {
    electron_1.app.quit();
});
// 알림
electron_1.ipcMain.on('show-alert', (event, message) => {
    const loginSettings = JSON.stringify(electron_1.app.getLoginItemSettings(), null, 2);
    electron_1.dialog.showMessageBox({
        type: 'info',
        title: '경고',
        message: loginSettings
    });
});
