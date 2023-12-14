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
}
electron_1.app.whenReady().then(() => {
    // 자동 실행
    const appFolder = path.dirname(process.execPath);
    const updateExe = path.resolve(appFolder, '..', 'Update.exe');
    const exeName = path.basename(process.execPath);
    electron_1.app.setLoginItemSettings({
        openAtLogin: true,
        path: updateExe,
        args: [
            '--processStart', `"${exeName}"`,
        ]
    });
    createWindow();
    console.log(electron_1.app.getLoginItemSettings());
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// 종료 이벤트
electron_1.ipcMain.on('close-app', () => {
    electron_1.app.quit();
});
// 알림 이벤트
electron_1.ipcMain.on('show-alert', (event, message) => {
    const loginSettings = JSON.stringify(electron_1.app.getLoginItemSettings(), null, 2);
    electron_1.dialog.showMessageBox({
        type: 'info',
        title: '경고',
        message: loginSettings
    });
});
