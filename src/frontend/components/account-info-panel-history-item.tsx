import { Fragment, useState } from 'react';

import { Eye, EyeSlash } from './icons';

interface Props {
	date: string;
	details: {
		[key: string]: {
			value: string;
			sensitive: string;
		};
	};
}

export default function AccountInfoPanelHistoryItem({ date, details }: Props) {
	const [valueHidden, setValueHidden] = useState(true);

	return (
		<div className='font-medium text-xl text-muted leading-none tracking-tighter'>
			<span className='mb-3 flex place-content-between place-items-center'>
				<p>{date}</p>
				{Object.values(details).some((value) => value.sensitive) ? (
					<button
						onClick={() => setValueHidden((prevState) => !prevState)}
						className='p-4 hover:bg-muted-background rounded-2xl transition-colors duration-150'
					>
						{valueHidden ? (
							<Eye className='w-4 stroke-current' />
						) : (
							<EyeSlash className='w-4 stroke-current' />
						)}
					</button>
				) : (
					<></>
				)}
			</span>
			<div className='grid grid-cols-custom-01 place-content-start place-items-start gap-x-12 gap-y-0 text-base'>
				{Object.entries(details).map(([key, value], idx) => (
					<Fragment key={idx}>
						<p className='w-40 whitespace-normal break-all'>{key}</p>
						<p className='w-40 text-foreground whitespace-normal break-all'>
							{value.sensitive && valueHidden
								? Array(value.value.length).fill('•').join('')
								: value.value}
						</p>
					</Fragment>
				))}
			</div>
		</div>
	);
}
