import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import TextInput from '../components/text-input';
import Button from '../components/button';
import { ArrowToDrive, FloppyDisk } from '../components/icons';

import {
	generateAccountsCSV,
	loadAccounts,
	updatePasscode,
} from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

export default function Settings() {
	const setFlash = useFlashStore((state) => state.setFlash);

	const formRef = useRef<HTMLFormElement>(null);
	const csvAnchorRef = useRef<HTMLAnchorElement>(null);
	const [csvAvailable, setCsvAvailable] = useState(false);

	const generateCSV = useCallback(async () => {
		try {
			const accounts: IAccount[] = await loadAccounts();

			if (accounts.length === 0) {
				return;
			}

			generateAccountsCSV(accounts)
				.then((csvString) => {
					const csv = new Blob([csvString], { type: 'text/csv' });
					const csvUrl = URL.createObjectURL(csv);

					if (csvAnchorRef.current) {
						csvAnchorRef.current.href = csvUrl;
						setCsvAvailable(true);
					}
				})
				.catch((_error) => {
					setFlash({
						error: true,
						text: 'Could not generate CSV',
					});
				});
		} catch (_error) {
			setFlash({
				error: true,
				text: 'Something went wrong',
			});
		}
	}, []);

	useEffect(() => {
		generateCSV();
	}, []);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			const passcode = data.passcode as string;
			const passcodeConfirmation = data['passcode-confirmation'] as string;

			if (passcode.length === 0) {
				setFlash({ error: true, text: 'Passcode cannot be empty' });
				return;
			}

			if (passcode !== passcodeConfirmation) {
				setFlash({ error: true, text: 'Passcodes do not match' });
				return;
			}

			updatePasscode(passcode)
				.then(({ updated }) => {
					if (updated) {
						setFlash({ error: false, text: 'Passcode updated successfully' });
					} else {
						setFlash({ error: true, text: 'Passcode could not be updated' });
					}

					if (formRef.current) formRef.current.reset();
				})
				.catch(() => {
					setFlash({ error: true, text: 'Trouble updating passcode' });
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	return (
		<motion.section
			key='settings'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='min-w-80 max-w-lg w-full h-full'
		>
			<form
				ref={formRef}
				onSubmit={formSubmissionHandler}
				className='w-full h-full flex flex-col place-content-start place-items-start gap-10'
			>
				<TextInput
					id='passcode'
					name='passcode'
					placeholderText='Passcode'
					type='password'
				/>
				<TextInput
					id='passcode-confirmation'
					name='passcode-confirmation'
					placeholderText='Confirm Passcode'
					type='password'
				/>
				<span className='flex gap-6'>
					<Button
						type='submit'
						text='Save Passcode'
						icon={FloppyDisk}
						iconPosition='left'
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
					<Button
						text='Export Data'
						icon={ArrowToDrive}
						iconPosition='left'
						onClick={() => csvAnchorRef.current?.click()}
						disabled={!csvAvailable}
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
					<a
						ref={csvAnchorRef}
						href=''
						className='hidden'
						download={'credentials.csv'}
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
				</div>
			</form>
		</motion.section>
	);
}
