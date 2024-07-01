interface Props {
	id?: string;
	name?: string;
	accept?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ id, name, accept, onChange }: Props) {
	return (
		<input
			id={id}
			name={name}
			type='file'
			accept={accept}
			onChange={onChange}
			className='w-full h-12 px-6 flex place-content-start place-items-center font-medium text-xl text-transparent leading-none tracking-tighter rounded-2xl bg-accent cursor-pointer'
		/>
	);
}
