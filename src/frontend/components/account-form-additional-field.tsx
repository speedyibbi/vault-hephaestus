import TextInput from './text-input';
import CheckboxInput from './checkbox-input';
import { PlusCross } from './icons';

interface Props {
	id?: string;
	name?: string;
	defaultChecked?: boolean;
	onCross?: () => void;
}

export default function AccountFormAdditionalField({
	id,
	name,
	defaultChecked,
	onCross,
}: Props) {
	return (
		<div className='w-full flex flex-col place-content-start place-items-start gap-3'>
			<TextInput
				id={`${id}-name`}
				name={`${name}-name`}
				placeholderText='Name'
			/>
			<TextInput
				id={`${id}-value`}
				name={`${name}-value`}
				placeholderText='Value'
			/>
			<span className='w-full px-4 flex place-content-start place-items-center gap-3'>
				<CheckboxInput
					id={`${id}-sensitive`}
					name={`${name}-sensitive`}
					defaultChecked={defaultChecked}
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
		</div>
	);
}
