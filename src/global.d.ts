declare global {
	interface Window {
		electron: {
			accessApplication: (passcode: string) => Promise<string>;
			exitApplication: () => void;
			saveAccount: (data: string) => Promise<string>;
			loadAccounts: () => Promise<string>;
			updateAccountFavouriteStatus: (data: string) => Promise<string>;
			removeAccount: (accountId: string) => Promise<string>;
			updatePasscode: (passcode: string) => Promise<string>;
		};
	}
}

export {};
