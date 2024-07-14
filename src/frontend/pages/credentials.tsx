import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Searchbar from '../components/searchbar';
import AccountForm from '../components/account-form';
import AccountItemList from '../components/account-item-list';
import { PlusCross } from '../components/icons';

import { loadAccounts } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

export default function Credentials() {
	const setFlash = useFlashStore((state) => state.setFlash);

	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [searchedAccounts, setSearchedAccounts] = useState<IAccount[]>([]);
	const [showForm, setShowForm] = useState(false);

	const getAccounts = async () => {
		return loadAccounts()
			.then((res) => {
				setAccounts(res);
				setSearchedAccounts(res);
			})
			.catch((_error) => {
				setFlash({
					error: true,
					text: 'Failed to load accounts',
				});
			});
	};

	const onAccountSaved = () => {
		getAccounts()
			.then(() => {
				setShowForm(false);
			})
			.catch((_error) => {
				setFlash({
					error: true,
					text: 'Something went wrong',
				});
			});
	};

	useEffect(() => {
		getAccounts();
	}, []);

	return (
		<motion.section
			key='credentials'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='h-full relative flex flex-col place-content-start place-items-start gap-24'
		>
			<span className='w-full flex place-content-between place-items-center gap-12'>
				<Searchbar
					searchArray={accounts}
					onSearch={(array: IAccount[]) => {
						setSearchedAccounts(array);
					}}
				/>
				<button
					onClick={() => {
						setShowForm((formState) => !formState);
					}}
					className='p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
				>
					<motion.span
						initial={{ rotateZ: '0deg' }}
						animate={{ rotateZ: showForm ? '45deg' : '0deg' }}
						exit={{ rotateZ: '0deg' }}
						className='block'
					>
						<PlusCross className='w-5 stroke-current' />
					</motion.span>
				</button>
			</span>
			<AnimatePresence mode='wait'>
				{showForm ? (
					<AccountForm onAccountSaved={onAccountSaved} />
				) : searchedAccounts.length > 0 ? (
					<AccountItemList
						key={JSON.stringify(searchedAccounts)}
						accounts={searchedAccounts}
					/>
				) : (
					<motion.span
						key='no-items'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className='w-full h-full flex place-content-center place-items-center font-medium text-xl leading-none tracking-tighter'
					>
						No items
					</motion.span>
				)}
			</AnimatePresence>
		</motion.section>
	);
}
