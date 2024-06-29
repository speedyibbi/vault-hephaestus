import Credentials from '../pages/credentials';
import PasswordGenerator from '../pages/password-generator';
import Settings from '../pages/settings';
import { Shield, Key, Gear, ArrowOut } from '../components/icons';

export const navigationTabs: INavigationTab[] = [
	{
		name: 'Credentials',
		icon: Shield,
		page: Credentials,
	},
	{
		name: 'Password Generator',
		icon: Key,
		page: PasswordGenerator,
	},
	{
		name: 'Settings',
		icon: Gear,
		page: Settings,
	},
];

export const exitTab = {
	name: 'Exit',
	icon: ArrowOut,
};
