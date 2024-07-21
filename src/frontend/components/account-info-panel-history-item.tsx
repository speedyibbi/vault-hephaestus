interface Props {
	date: string;
	details: {
		[key: string]: {
			value: string;
			sensitive: string;
		};
	};
}

export default function AccountInfoPanelHistoryItem({ date, details }: Props) {
	return <div>{date}</div>;
}
