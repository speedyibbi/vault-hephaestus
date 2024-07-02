interface Props {
	id?: string;
	name?: string;
	placeholderText?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
	id,
	name,
	placeholderText,
	onChange,
}: Props) {
	return (
		<div className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'>
			<input
				id={id}
				name={name}
				type='text'
				onChange={onChange}
				placeholder={placeholderText}
				className='flex-grow font-medium text-xl text-foreground leading-none tracking-tighter bg-transparent focus:outline-none'
			/>
		</div>
	);
}
