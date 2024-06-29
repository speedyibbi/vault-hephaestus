declare global {
	interface Window {
		electron: {
			exitApplication: () => void;
		};
	}
}

export {};
