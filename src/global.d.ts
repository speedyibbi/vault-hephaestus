declare global {
	declare module '*.png' {
		const value: string;
		export default value;
	}

	interface Window {
		electron: {
			exitApplication: () => void;
		};
	}

	interface INavigationTab {
		name: string;
		icon: ({ className }: Props) => JSX.Element;
		page: () => JSX.Element;
	}
}

export {};
