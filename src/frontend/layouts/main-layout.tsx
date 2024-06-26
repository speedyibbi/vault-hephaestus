import Sidebar from '../components/sidebar';

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<div className='w-full h-full p-12 flex'>
			<Sidebar />
			<main className='w-4/5 h-full px-12 py-6'>{children}</main>
		</div>
	);
}
