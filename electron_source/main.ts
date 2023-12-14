// main.js
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const path = require('node:path');
import expressApp from "./server.js";



// 서버 시작
const PORT = 8083;
expressApp.listen(PORT, () => {
    console.log(`Server listening on HTTP port ${PORT}`);
});

function createWindow() {
    const win = new BrowserWindow({
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
    // win.loadFile('./web/index.html');
    win.loadURL('http://localhost:3000'); // npm run dev로 리액트 개발환경에서 테스트가능
    // npm install --save-dev concurrently wait-on cross-env
    // "react-start": "react-scripts start",
    // "electron-start": "electron .",
    // "dev": "concurrently \"cross-env BROWSER=none npm run react-start\" \"wait-on http://localhost:3000 && npm run electron-start\"",
}



app.whenReady().then(() => {
    const appFolder = path.dirname(process.execPath)
    const updateExe = path.resolve(appFolder, '..', 'Update.exe')
    const exeName = path.basename(process.execPath)
    app.setLoginItemSettings({
        openAtLogin: true,
        path: updateExe,
        args: [
            '--processStart', `"${exeName}"`,
        ]
    })


    createWindow()
    console.log(app.getLoginItemSettings());

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});



// 종료 이벤트 리스너
ipcMain.on('close-app', () => {
    app.quit();
});


// 알림 이벤트 리스너
ipcMain.on('show-alert', (event, message) => {
    const loginSettings = JSON.stringify(app.getLoginItemSettings(), null, 2);
    dialog.showMessageBox({
        type: 'info',
        title: '경고',
        message: loginSettings
    });
});

