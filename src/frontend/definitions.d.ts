declare module '*.png' {
	const value: string;
	export default value;
}

interface NavigationTab {
	name: string;
	icon: ({ className }: Props) => JSX.Element;
	page: () => JSX.Element;
}
