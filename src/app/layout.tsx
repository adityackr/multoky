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
			<body
				suppressHydrationWarning
				className="min-h-full flex flex-col bg-background"
			>
				<SessionProvider>
					{children}
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
}
