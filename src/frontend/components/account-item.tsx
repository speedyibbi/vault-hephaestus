import { Star } from './icons';

interface Props {
	account: IAccount;
}

export default function AccountItem({ account }: Props) {
	console.log(account);
	return (
		<div className='w-128 relative text-foreground group'>
			<button
				onClick={() => {}}
				className='w-full h-24 px-6 flex place-content-start place-items-center gap-6 border-2 border-transparent rounded-2xl group-hover:border-accent transition-colors duration-150'
			>
				<img
					src={account.image}
					alt={`${account.title}-image-small`}
					className='w-16 h-16 rounded-full'
				/>
				<span className='flex flex-col gap-2'>
					<p className='font-medium text-base text-left leading-none tracking-tighter'>
						{account.title}
					</p>
					<p className='font-light text-muted text-base text-left leading-none tracking-tighter'>
						{Object.values(account.details)[0].value}
					</p>
				</span>
			</button>
			<button
				onClick={() => {}}
				className='mr-6 ml-aut absolute top-1/2 right-0 transform -translate-y-1/2'
			>
				{account.favourite ? (
					<Star className='w-5 fill-current' />
				) : (
					<Star className='w-5 stroke-current' />
				)}
			</button>
		</div>
	);
}
