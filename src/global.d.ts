declare global {
	interface Window {
		electron: {
			exitApplication: () => void;
			submitAccount: (data: string) => Promise<void>;
		};
	}
}

export {};
