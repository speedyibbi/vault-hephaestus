import { useState } from 'react';

import { Tick } from './icons';

interface Props {
	id?: string;
	name?: string;
	defaultChecked?: boolean;
}

export default function CheckboxInput({ id, name, defaultChecked }: Props) {
	const [checked, setChecked] = useState(defaultChecked ?? false);

	return (
		<label className='relative text-white leading-none cursor-pointer'>
			<input
				id={id}
				name={name}
				type='checkbox'
				checked={checked}
				onChange={() => {
					setChecked((prevState) => !prevState);
				}}
				className='w-6 h-6 relative border-2 border-white rounded-md bg-transparent appearance-none'
			/>
			<span
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none'
				style={{ opacity: checked ? 100 : 0 }}
			>
				<Tick className='w-4 stroke-current' />
			</span>
		</label>
	);
}
