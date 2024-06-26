import Sidebar from '../components/sidebar';

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<div className='w-full h-full p-12 flex'>
			<Sidebar />
			<main className='h-full px-12 py-6 flex-grow'>{children}</main>
		</div>
	);
}
