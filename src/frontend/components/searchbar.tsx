import { MagnifyingGlass } from './icons';

interface Props {
	searchArray: IAccount[];
	onSearch: (array: IAccount[]) => void;
}

export default function Searchbar({ searchArray, onSearch }: Props) {
	const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > 0) {
			onSearch(
				searchArray.filter((item) =>
					item.title.toLowerCase().includes(event.target.value.toLowerCase())
				)
			);
		} else {
			return onSearch(searchArray);
		}
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
			className='h-12 px-6 relative flex-grow flex place-content-start place-items-center gap-12 text-muted rounded-2xl bg-accent'
		>
			<MagnifyingGlass className='w-5 stroke-current' />
			<input
				id='searchbar'
				name='searchbar'
				type='text'
				onChange={searchHandler}
				placeholder='Search'
				className='flex-grow font-medium text-xl text-foreground leading-none tracking-tighter bg-transparent focus:outline-none'
			/>
		</form>
	);
}
