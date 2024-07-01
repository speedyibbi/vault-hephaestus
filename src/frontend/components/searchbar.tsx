import TextInput from './text-input';
import { MagnifyingGlass } from './icons';

export default function Searchbar() {
	const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
			className='h-12 px-6 relative flex-grow flex place-content-start place-items-center gap-12 text-muted rounded-2xl bg-accent'
		>
			<MagnifyingGlass className='w-5 stroke-current' />
			<TextInput placeholderText='Search' onChange={searchHandler} />
		</form>
	);
}
