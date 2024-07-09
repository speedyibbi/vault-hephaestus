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

interface IAccount {
	[key: string]: string;
}

interface IDialog extends HTMLDialogElement {
	show(): void;
	showModal(): void;
	close(): void;
}
