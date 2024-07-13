import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	exitApplication: () => ipcRenderer.invoke('exitApplication'),
	saveAccount: (data: string) => ipcRenderer.invoke('saveAccount', data),
	loadAccounts: () => ipcRenderer.invoke('loadAccounts'),
	updateAccountFavouriteStatus: (data: string) =>
		ipcRenderer.invoke('updateAccountFavouriteStatus', data),
});
