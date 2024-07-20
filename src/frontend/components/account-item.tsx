import { useRef } from 'react';
import { useAnimate } from 'framer-motion';

import { Image, Star } from './icons';

import { updateAccountFavouriteStatus } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

interface Props {
	account: IAccount;
	active?: boolean;
	onClick?: (element: HTMLElement) => void;
}

export default function AccountItem({
	account,
	active,
	onClick = () => {},
}: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const itemRef = useRef<HTMLLIElement>(null);
	const [scope, animate] = useAnimate();

	const animateStar = async (toggleFill: boolean) => {
		await animate(
			scope.current,
			{ scale: 1.7, fill: toggleFill ? 'transparent' : 'currentColor' },
			{ duration: 0.15, ease: 'easeOut' }
		);
		await animate(
			scope.current,
			{ scale: 0.9, fill: toggleFill ? 'currentColor' : 'transparent' },
			{ duration: 0.15, ease: 'easeOut' }
		);
		await animate(
			scope.current,
			{ scale: 1 },
			{ duration: 0.15, ease: 'easeOut' }
		);
	};

	const toggleFavourite = () => {
		const favourite = account.favourite.toString() === '0' ? '1' : '0';

		updateAccountFavouriteStatus({
			favourite,
			account_id: account.account_id,
		})
			.then(({ updated }) => {
				if (updated) {
					account.favourite = favourite;
					animateStar(favourite === '1');
					setFlash({ error: false, text: 'Account updated' });
				} else {
					setFlash({ error: true, text: 'Could not update account' });
				}
			})
			.catch(() => {
				setFlash({ error: true, text: 'Could not update account' });
			});
	};

	return (
		<li
			ref={itemRef}
			className='min-w-80 flex-grow relative text-foreground group'
		>
			<button
				onClick={() => onClick(itemRef.current || undefined)}
				className='w-full h-24 px-6 flex place-content-start place-items-center gap-6 border-2 border-transparent rounded-2xl group-hover:border-accent transition-colors duration-150'
				style={{
					backgroundColor:
						active !== undefined && active ? 'var(--accent)' : 'transparent',
				}}
			>
				{account.image.length > 0 ? (
					<img
						src={account.image}
						alt={`${account.title}-image-small`}
						className='w-16 h-16 rounded-full'
					/>
				) : (
					<span className='w-16 h-16 relative text-black bg-white rounded-full'>
						<Image className='w-8 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-current' />
					</span>
				)}
				<span className='flex flex-col gap-2'>
					<p className='w-60 font-medium text-base text-left leading-none tracking-tighter overflow-ellipsis overflow-hidden'>
						{account.title}
					</p>
					<p className='w-60 font-light text-muted text-base text-left leading-none tracking-tighter overflow-ellipsis overflow-hidden'>
						{Object.values(account.details)[0].value}
					</p>
				</span>
			</button>
			<button
				onClick={toggleFavourite}
				className='mr-6 absolute top-1/2 right-0 transform -translate-y-1/2'
			>
				<div
					ref={scope}
					className='fill-transparent'
					style={{
						fill:
							account.favourite.toString() === '1'
								? 'currentColor'
								: 'transparent',
					}}
				>
					<Star className='w-5 fill-inherit stroke-current' />
				</div>
			</button>
		</li>
	);
}
