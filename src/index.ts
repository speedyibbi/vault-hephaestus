import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import db from './db';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		height: 720,
		width: 1280,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			devTools: !app.isPackaged,
		},
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', () => {
	try {
		db.openConnection();

		ipcMain.handle('exitApplication', () => app.quit());
		ipcMain.handle('saveAccount', (_event, data: string) =>
			JSON.stringify(db.app.addAccount(JSON.parse(data)))
		);
		ipcMain.handle('loadAccounts', () =>
			JSON.stringify(db.app.fetchAccounts())
		);

		createWindow();
	} catch (error) {
		dialog.showErrorBox('Could not start application', error.message);
		app.exit();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('will-quit', () => {
	db.closeConnection();
});
