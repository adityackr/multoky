import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Multoky',
	description: 'Multi-vendor e-commerce platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn('font-sans dark', geist.variable)}>
			<body suppressHydrationWarning>
				<SessionProvider>
					<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white p-6 dark">
						{children}
						<Toaster />
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
