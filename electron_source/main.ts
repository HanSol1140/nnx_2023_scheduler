// main.js
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const path = require('node:path');
import expressApp from "./server.js";

// express
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
            preload: path.join(__dirname, 'preload.js'),
        }

    });
    win.loadFile('./web/index.html');
}


console.log(app.getLoginItemSettings());
app.whenReady().then(() => {

    createWindow()
    

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});



// 종료 버튼
ipcMain.on('close-app', () => {
    app.quit();
});


// 알림
ipcMain.on('show-alert', (event, message) => {
    const loginSettings = JSON.stringify(app.getLoginItemSettings(), null, 2);
    dialog.showMessageBox({
        type: 'info',
        title: '경고',
        message: loginSettings
    });
});
