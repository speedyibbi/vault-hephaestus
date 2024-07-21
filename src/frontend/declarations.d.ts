declare module '*.png' {
	const value: string;
	export default value;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.jpeg' {
	const value: string;
	export default value;
}

declare module '*.gif' {
	const value: string;
	export default value;
}

declare module '*.webp' {
	const content: any;
	export default content;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

interface INavigationTab {
	name: string;
	icon: ({ className }: Props) => JSX.Element;
	page: () => JSX.Element;
}
interface IFlash {
	error: boolean;
	text: string;
}

interface IAccountData {
	[key: string]: string;
}

interface IAccount {
	account_id: string;
	title: string;
	image: string;
	favourite: string;
	updated_at: string;
	created_at: string;
	details: {
		[key: string]: {
			value: string;
			sensitive: string;
		};
	};
	history: {
		[key: string]: {
			[key: string]: {
				value: string;
				sensitive: string;
			};
		};
	};
}

interface IDialog extends HTMLDialogElement {
	show(): void;
	showModal(): void;
	close(): void;
}
