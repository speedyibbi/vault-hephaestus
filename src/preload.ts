import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	accessApplication: (passcode: string) =>
		ipcRenderer.invoke('accessApplication', passcode),
	exitApplication: () => ipcRenderer.invoke('exitApplication'),
	saveAccount: (data: string) => ipcRenderer.invoke('saveAccount', data),
	loadAccounts: () => ipcRenderer.invoke('loadAccounts'),
	updateAccountFavouriteStatus: (data: string) =>
		ipcRenderer.invoke('updateAccountFavouriteStatus', data),
	removeAccount: (accountId: string) =>
		ipcRenderer.invoke('removeAccount', accountId),
});
