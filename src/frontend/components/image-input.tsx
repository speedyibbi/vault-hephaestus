import FileInput from './file-input';

import { Camera } from './icons';

interface Props {
	id?: string;
	name?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	imagePreview?: string;
}

export default function ImageInput({
	id,
	name,
	onChange = () => {},
	imagePreview,
}: Props) {
	return (
		<div className='w-full flex place-content-between place-items-center gap-6 text-foreground'>
			<FileInput
				id={id}
				name={name}
				accept='image/*'
				onChange={onChange}
				style={{ display: 'none' }}
			/>
			<label
				htmlFor={id}
				className='min-w-36 w-36 h-36 mx-auto p-2 relative border-2 border-dashed border-current rounded-full cursor-pointer'
			>
				<img
					src={imagePreview}
					alt='image-preview'
					className='w-full h-full text-transparent rounded-full'
				/>
				<Camera className='w-6 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-current' />
			</label>
			<p className='font-medium text-sm text-center leading-normal tracking-tighter whitespace-pre-wrap'>
				Allowed *.jpeg, *.jpg, *.png, *.gif, *.webp, *.svg
			</p>
		</div>
	);
}
