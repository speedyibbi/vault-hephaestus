declare global {
	interface Window {
		electron: {
			exitApplication: () => void;
			saveAccount: (data: string) => Promise<string>;
		};
	}
}

export {};
