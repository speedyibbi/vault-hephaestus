import { motion } from 'framer-motion';

import TextInput from '../components/text-input';
import Button from '../components/button';
import { ArrowToDrive, FloppyDisk } from '../components/icons';

export default function Settings() {
	return (
		<motion.section
			key='settings'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full'
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				className='w-128 h-full flex flex-col place-content-start place-items-start gap-10'
			>
				<TextInput id='passcode' name='passcode' placeholderText='Passcode' />
				<TextInput
					id='passcode-confirmation'
					name='passcode-confirmation'
					placeholderText='Confirm Passcode'
				/>
				<span className='flex gap-6'>
					<Button
						text='Save Passcode'
						icon={FloppyDisk}
						iconPosition='left'
						onClick={() => {}}
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
					<Button
						text='Export Data'
						icon={ArrowToDrive}
						iconPosition='left'
						onClick={() => {}}
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
				</span>
				<div className='mt-auto font-black text-lg leading-normal tracking-tighter'>
					<span className='flex gap-2'>
						<span className='text-danger'>*</span>
						<p className='whitespace-normal break-words'>
							Be extremely careful when setting a passcode. Forgetting your
							security passcode will lock you out of the application, and
							therefore you will not be able to access any saved credentials.
						</p>
					</span>
					<span className='mt-3 flex gap-2'>
						<span className='text-danger'>*</span>
						<p className='whitespace-normal break-words'>
							The security passcode is included in the exported data.
						</p>
					</span>
				</div>
			</form>
		</motion.section>
	);
}
