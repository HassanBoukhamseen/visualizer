const { app, BrowserWindow } = require('electron');
let window;

function openWindow() {
    window = new BrowserWindow({
        width: 'all',
        height: 'all',
        webPreferences: {
            nodeIntegration: true
        }
        
    });
    window.webContents.openDevTools();
    window.loadFile('./Home.html');
    window.on('closed', ()=> {
        window = null;
    });
}
app.whenReady().then(openWindow);
app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') {app.quit();}
});
app.on('activate', ()=> {
    if (window === null) {openWindow();}
});