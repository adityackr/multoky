import { LucideIcon, Store, User, UserLock } from 'lucide-react';

type RegisterAccountType = {
	label: string;
	icon: LucideIcon;
	value: 'user' | 'vendor' | 'admin';
};

export const registerAccountTypes: RegisterAccountType[] = [
	{
		label: 'User',
		icon: User,
		value: 'user',
	},
	{
		label: 'Vendor',
		icon: Store,
		value: 'vendor',
	},
	{
		label: 'Admin',
		icon: UserLock,
		value: 'admin',
	},
];
