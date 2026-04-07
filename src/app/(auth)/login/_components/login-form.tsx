'use client';

import { Button, MotionButton } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Please enter your password'),
});

type LoginSchema = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<LoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginSchema) => {
		setLoading(true);
		try {
			await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});
			toast.success('Login successful');
			setLoading(false);
			router.push('/');
		} catch (error) {
			console.log(error);
			toast.error('Invalid email or password');
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-blue-200 text-center">
					Welcome Back to <span className="text-blue-400">Multoky</span>
				</CardTitle>
				<CardDescription className="text-center">
					Enter your details to login to your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gap-4">
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input
										{...field}
										id="email"
										type="email"
										aria-invalid={fieldState.invalid}
										placeholder="Enter your email"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<div>
										<Input
											{...field}
											type={showPassword ? 'text' : 'password'}
											id="password"
											aria-invalid={fieldState.invalid}
											placeholder="Enter your password"
											autoComplete="off"
											className="relative"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-12  text-muted-foreground hover:text-foreground dark:hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <EyeOff /> : <Eye />}
										</Button>
									</div>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className="flex flex-col gap-2">
				<Field orientation="horizontal">
					<MotionButton
						type="submit"
						form="register-form"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="w-full"
						disabled={loading}
					>
						{loading ? <Spinner /> : 'Login'}
					</MotionButton>
				</Field>

				<div className="flex gap-2 w-full items-center">
					<Separator className="flex-1" />
					<p className="text-muted-foreground">Or</p>
					<Separator className="flex-1" />
				</div>

				<MotionButton
					variant="outline"
					type="button"
					className="w-full"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					disabled={loading}
					onClick={() => signIn('google', { callbackUrl: '/' })}
				>
					<FcGoogle className="mr-2" /> Login with Google
				</MotionButton>
			</CardFooter>
			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{' '}
				<Link
					href="/register"
					className="font-medium text-blue-400 hover:underline"
				>
					Register
				</Link>
			</p>
		</Card>
	);
};
