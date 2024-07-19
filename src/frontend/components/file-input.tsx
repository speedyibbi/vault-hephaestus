import { useRef } from 'react';

interface Props {
	id?: string;
	name?: string;
	accept?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	style?: React.CSSProperties;
}

export default function FileInput({
	id,
	name,
	accept,
	onChange = () => {},
	style = {},
}: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event);
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<input
			ref={fileInputRef}
			id={id}
			name={name}
			type='file'
			accept={accept}
			onChange={handleChange}
			className='w-full h-12 px-6 flex place-content-start place-items-center font-medium text-xl text-transparent leading-none tracking-tighter rounded-2xl bg-accent cursor-pointer'
			style={style}
		/>
	);
}
