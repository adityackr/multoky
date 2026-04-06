'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoginForm } from './_components/login-form';

const LoginPage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push('/');
		}
	}, [session, router]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0, y: -40 }}
				className="w-full max-w-lg"
			>
				<LoginForm />
			</motion.div>
		</AnimatePresence>
	);
};

export default LoginPage;
