import { useState } from 'react';

import { Tick } from './icons';

export default function CheckboxInput() {
	const [checked, setChecked] = useState(false);

	return (
		<label className='relative text-white leading-none cursor-pointer'>
			<input
				id='field-1-sensitive'
				name='field-1-sensitive'
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
