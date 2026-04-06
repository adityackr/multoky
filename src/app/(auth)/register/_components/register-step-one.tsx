'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { registerAccountTypes } from '@/config/register.config';
import { motion } from 'framer-motion';
import { FaArrowCircleRight } from 'react-icons/fa';

const MotionButton = motion(Button);

interface RegisterStepOneProps {
	onNext: () => void;
}

const RegisterStepOne = ({ onNext }: RegisterStepOneProps) => {
	return (
		<Card className="text-center">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-blue-400 text-center">
					Welcome to Multoky
				</CardTitle>
				<CardDescription className="text-center">
					Register with one of the following account types:
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-3 gap-4 mb-6">
					{registerAccountTypes.map((accountType) => (
						<motion.div
							key={accountType.value}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className="p-4 bg-white/5 hover:bg-white/20 cursor-pointer rounded-xl border shadow-lg flex flex-col items-center transition"
						>
							<accountType.icon className="size-8 mb-2 text-blue-400" />
							<span className="text-sm font-semibold">{accountType.label}</span>
						</motion.div>
					))}
				</div>

				<MotionButton
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="w-full"
					onClick={onNext}
				>
					Next
					<FaArrowCircleRight />
				</MotionButton>
			</CardContent>
		</Card>
	);
};

export default RegisterStepOne;
