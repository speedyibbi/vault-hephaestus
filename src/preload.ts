import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	exitApplication: () => ipcRenderer.invoke('exitApplication'),
	submitAccount: async (data: string) =>
		await ipcRenderer.invoke('submitAccount', data),
});
