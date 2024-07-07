declare module '*.png' {
	const value: string;
	export default value;
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

interface Account {
	[key: string]: string;
}
