'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import RegisterForm from './_components/register-form';
import RegisterStepOne from './_components/register-step-one';

const RegisterPage = () => {
	const [step, setStep] = useState<1 | 2>(1);

	return (
		<AnimatePresence mode="wait">
			{step === 1 && (
				<motion.div
					key="step-1"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0, y: -40 }}
					className="w-full max-w-lg"
				>
					<RegisterStepOne onNext={() => setStep(2)} />
				</motion.div>
			)}
			{/* For step 2 UI */}
			{step === 2 && (
				<motion.div
					key="step-2"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0, y: -40 }}
					className="w-full max-w-lg"
				>
					<RegisterForm />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default RegisterPage;
