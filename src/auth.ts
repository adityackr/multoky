import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { env } from './config/env';
import connectDB from './lib/connectDB';
import User from './model/user.model';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				await connectDB();

				const email = credentials.email as string;
				const password = credentials.password as string;

				const user = await User.findOne({ email });

				if (!user) {
					throw new Error('User not found');
				}

				const isPasswordValid = await bcrypt.compare(password, user.password);

				if (!isPasswordValid) {
					throw new Error('Invalid password');
				}

				return {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
					role: user.role,
				};
			},
		}),
		Google({
			clientId: env.AUTH_GOOGLE_ID,
			clientSecret: env.AUTH_GOOGLE_SECRET,
		})
	],
	callbacks: {
		async signIn({user, account}) {
			if(account?.provider === 'google') {
				await connectDB();
				let dbUser = await User.findOne({ email: user.email });
				if(!dbUser) {
					dbUser = await User.create({
						email: user.email,
						name: user.name,
						image: user.image,
					});
				}
				user.id = dbUser._id.toString();
				user.role = dbUser.role;
			}
			return true;
		},

		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 * 1000,
	},
	secret: env.AUTH_SECRET,
});
