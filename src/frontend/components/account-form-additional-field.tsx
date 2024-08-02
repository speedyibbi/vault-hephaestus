import { motion } from 'framer-motion';

import TextInput from './text-input';
import CheckboxInput from './checkbox-input';
import { PlusCross } from './icons';
import { useState } from 'react';

interface Props {
	id?: string;
	name?: string;
	defaultName?: string;
	defaultValue?: string;
	defaultChecked?: boolean;
	onCross?: () => void;
}

export default function AccountFormAdditionalField({
	id,
	name,
	defaultName,
	defaultValue,
	defaultChecked,
	onCross,
}: Props) {
	const [sensitive, setSensitive] = useState(defaultChecked ?? false);

	const handleCheckboxChange = (checkboxChecked: boolean) => {
		setSensitive(checkboxChecked);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			layout
			className='w-full flex flex-col place-content-start place-items-start gap-3'
		>
			<TextInput
				id={`${id}-name`}
				name={`${name}-name`}
				placeholderText='Name'
				defaultValue={defaultName}
			/>
			<TextInput
				id={`${id}-value`}
				name={`${name}-value`}
				type={sensitive ? 'password' : 'text'}
				placeholderText='Value'
				defaultValue={defaultValue}
			/>
			<span className='w-full px-4 flex place-content-start place-items-center gap-3'>
				<CheckboxInput
					id={`${id}-sensitive`}
					name={`${name}-sensitive`}
					defaultChecked={defaultChecked}
					onChange={handleCheckboxChange}
				/>
				<p className='font-medium text-xl leading-none tracking-tighter'>
					Sensitive
				</p>
				<button
					type='button'
					onClick={onCross}
					className='ml-auto p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
				>
					<PlusCross className='w-5 stroke-current transform rotate-45' />
				</button>
			</span>
		</motion.div>
	);
}
