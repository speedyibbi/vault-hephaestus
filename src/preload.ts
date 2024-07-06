import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	exitApplication: () => ipcRenderer.invoke('exitApplication'),
	saveAccount: async (data: string) =>
		await ipcRenderer.invoke('saveAccount', data),
});
