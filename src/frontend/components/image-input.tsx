import FileInput from './file-input';
import { ImagePlus } from './icons';

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
		<div className='w-full relative flex flex-col lg:flex-row place-content-between place-items-center gap-6 text-foreground'>
			<FileInput
				id={id}
				name={name}
				accept='image/*'
				onChange={onChange}
				style={{
					width: 0,
					height: 0,
					position: 'absolute',
					opacity: 0,
				}}
			/>
			<label
				htmlFor={id}
				className='min-w-36 w-36 h-36 mx-auto p-2 relative border-2 border-dashed border-current rounded-full overflow-hidden cursor-pointer group'
			>
				<img
					src={imagePreview}
					alt='image-preview'
					className='w-full h-full text-transparent rounded-full'
				/>
				<span
					className={`w-full h-full p-2 absolute inset-0 ${
						imagePreview.length > 0 ? 'opacity-0' : 'opacity-100'
					} group-hover:opacity-100 transition-opacity duration-150`}
				>
					<span className='w-full h-full block rounded-full bg-muted-background' />
					<ImagePlus className='w-6 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-current' />
				</span>
			</label>
			<p className='font-medium text-sm text-center leading-normal tracking-tighter whitespace-pre-wrap'>
				Allowed *.jpeg, *.jpg, *.png, *.gif, *.webp, *.svg
			</p>
		</div>
	);
}
