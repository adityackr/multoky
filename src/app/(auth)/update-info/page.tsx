'use client';

import { MotionButton } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const roleSchema = z.object({
	role: z.enum(['admin', 'user', 'vendor']),
	phone: z
		.string()
		.min(1, 'Phone number is required')
		.regex(/^\+\d{6,15}$/, 'Enter a valid phone number'),
});

type RoleValues = z.infer<typeof roleSchema>;

const UpdateInfoPage = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<RoleValues>({
		resolver: zodResolver(roleSchema),
		defaultValues: {
			role: 'user',
			phone: '',
		},
	});

	useEffect(() => {
		const checkAdmin = async () => {
			try {
				const res = await axios.get('/api/admin/check-admin');
				setIsAdmin(res.data.exists);
			} catch (error) {
				setIsAdmin(false);
				console.log(error);
			}
		};
		checkAdmin();
	}, []);

	const onSubmit = async (data: RoleValues) => {
		setLoading(true);
		try {
			await axios.post('/api/user/update-info', data);
			setLoading(false);
			toast.success('Info updated successfully');
			router.push('/');
		} catch (error) {
			console.log(error);
			setLoading(false);
			toast.error('Something went wrong');
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0, y: -40 }}
				className="w-full max-w-lg"
			>
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-semibold text-blue-200">
							Choose Your Role
						</CardTitle>
						<CardDescription>
							Choose your role and update your phone number to continue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form id="update-info-form" onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="phone"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="phone">Phone Number</FieldLabel>
											<Input
												{...field}
												id="phone"
												aria-invalid={fieldState.invalid}
												placeholder="Enter your phone number"
												autoComplete="off"
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

								<Controller
									name="role"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="role">Role</FieldLabel>
											<RadioGroup defaultValue="user">
												<Field orientation="horizontal" {...field}>
													<RadioGroupItem
														value="admin"
														id="admin"
														disabled={!isAdmin}
													/>
													<FieldLabel htmlFor="admin">Admin</FieldLabel>
												</Field>
												<Field orientation="horizontal" {...field}>
													<RadioGroupItem value="user" id="user" />
													<FieldLabel htmlFor="user">User</FieldLabel>
												</Field>
												<Field orientation="horizontal" {...field}>
													<RadioGroupItem value="vendor" id="vendor" />
													<FieldLabel htmlFor="vendor">Vendor</FieldLabel>
												</Field>
											</RadioGroup>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</FieldGroup>
						</form>
					</CardContent>

					<CardFooter>
						<Field orientation="horizontal">
							<MotionButton
								type="submit"
								form="update-info-form"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="w-full"
								disabled={loading}
							>
								{loading ? <Spinner /> : 'Update Info'}
							</MotionButton>
						</Field>
					</CardFooter>
				</Card>
			</motion.div>
		</AnimatePresence>
	);
};

export default UpdateInfoPage;
