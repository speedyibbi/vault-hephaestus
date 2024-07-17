import { useState } from 'react';

import { Copy, Eye, EyeSlash } from './icons';

import { useFlashStore } from '../utils/stores/flash-store';

interface Props {
	name: string;
	value: string;
	sensitive: boolean;
}

export default function AccountInfoPanelDataItem({
	name,
	value,
	sensitive,
}: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const [valueHidden, setValueHidden] = useState(sensitive);

	const copyHandler = () => {
		try {
			navigator.clipboard
				.writeText(value)
				.then(() => {
					setFlash({ error: false, text: `${name} copied` });
				})
				.catch(() => {
					setFlash({
						error: true,
						text: `Failed to copy ${name.toLocaleLowerCase()}`,
					});
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	return (
		<div className='flex place-content-between place-items-end'>
			<span>
				<p className='font-medium text-xl text-muted leading-none tracking-tighter'>
					{name}
				</p>
				<p className='mt-3 font-medium text-xl text-foreground leading-none tracking-tighter'>
					{valueHidden ? Array(value.length).fill('*').join('') : value}
				</p>
			</span>
			<span>
				{sensitive && (
					<button
						onClick={() => setValueHidden((prevState) => !prevState)}
						className='p-4 text-muted hover:bg-muted-background rounded-2xl transition-colors duration-150'
					>
						{valueHidden ? (
							<Eye className='w-5 stroke-current' />
						) : (
							<EyeSlash className='w-5 stroke-current' />
						)}
					</button>
				)}
				<button
					onClick={copyHandler}
					className='p-4 text-muted hover:bg-muted-background rounded-2xl transition-colors duration-150'
				>
					<Copy className='w-5 stroke-current' />
				</button>
			</span>
		</div>
	);
}
