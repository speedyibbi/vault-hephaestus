interface Props {
	text: string;
	icon?: ({ className }: { className: string }) => JSX.Element;
	iconPosition?: 'left' | 'right';
	onClick?: () => void;
	style?: React.CSSProperties;
}

export default function Button({
	text,
	icon,
	iconPosition = 'right',
	onClick = () => {},
	style = {},
}: Props) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='px-5 py-2 flex place-content-start place-items-center gap-3 font-medium text-base leading-none tracking-tighter border-2 border-current rounded-md'
			style={style}
		>
			{text}
			{icon &&
				icon({
					className: `w-5 stroke-current ${
						iconPosition === 'right' ? 'order-last' : 'order-first'
					}`,
				})}
		</button>
	);
}
