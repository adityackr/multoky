'use client';

import { AnimatePresence, motion } from 'framer-motion';
import RegisterForm from './_components/register-form';

const RegisterPage = () => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="register"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0, y: -40 }}
				className="w-full max-w-lg"
			>
				<RegisterForm />
			</motion.div>
		</AnimatePresence>
	);
};

export default RegisterPage;
