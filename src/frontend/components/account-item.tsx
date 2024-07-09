import { Star } from './icons';

interface Props {
	account: IAccount;
}

export default function AccountItem({ account }: Props) {
	return (
		<div className='w-128 relative text-foreground'>
			<button
				onClick={() => {}}
				className='w-full h-24 px-6 flex place-content-start place-items-center gap-6 border-2 border-transparent rounded-2xl hover:border-accent transition-colors duration-150'
			>
				<img
					src={account.image}
					alt={`${account.title}-image-small`}
					className='w-16 h-16'
				/>
				<span className='flex flex-col gap-2'>
					<p className='font-medium text-base text-left leading-none tracking-tighter'>
						{account.title}
					</p>
					<p className='font-light text-muted text-base text-left leading-none tracking-tighter'>
						{/* {account.value} */}
					</p>
				</span>
			</button>
			<button
				onClick={() => {}}
				className='mr-6 ml-aut absolute top-1/2 right-0 transform -translate-y-1/2'
			>
				<Star className='w-5 stroke-current' />
			</button>
		</div>
	);
}
