import logo from '../assets/images/logo.png';

interface Props {
	className?: string;
}

export default function Logo({ className }: Props = {}) {
	return <img src={logo} alt='logo' className={className} />;
}
