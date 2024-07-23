interface Props {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	icon?: ({ className }: { className: string }) => JSX.Element;
	iconPosition?: 'left' | 'right';
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties;
	hover?: boolean;
	textColor?: string;
	hoverTextColor?: string;
	hoverBgColor?: string;
}

export default function Button({
	text,
	type = 'button',
	icon,
	iconPosition = 'right',
	onClick = () => {},
	disabled = false,
	style = {},
	hover = false,
	textColor = 'currentColor',
	hoverTextColor = 'currentColor',
	hoverBgColor = 'currentColor',
}: Props) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`px-5 py-2 flex place-content-start place-items-center gap-3 font-medium text-base leading-none tracking-tighter border-2 border-current rounded-md ${
				hover
					? `text-${textColor} hover:text-${hoverTextColor} hover:bg-${hoverBgColor} hover:border-${hoverBgColor} transition-colors duration-150`
					: ''
			}`}
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
