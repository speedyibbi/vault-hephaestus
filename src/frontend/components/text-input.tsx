interface Props {
	id?: string;
	name?: string;
	type?: string;
	placeholderText?: string;
	textAlign?: 'left' | 'center' | 'right';
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	defaultValue?: string;
	style?: React.CSSProperties;
}

export default function TextInput({
	id,
	name,
	type,
	placeholderText,
	textAlign = 'left',
	onChange,
	defaultValue,
	style,
}: Props) {
	return (
		<div
			className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'
			style={style}
		>
			<input
				id={id}
				name={name}
				type={type || 'text'}
				onChange={onChange}
				defaultValue={defaultValue}
				placeholder={placeholderText}
				className='flex-grow font-medium text-xl text-foreground leading-none tracking-tighter bg-transparent focus:outline-none'
				style={{ textAlign }}
			/>
		</div>
	);
}
