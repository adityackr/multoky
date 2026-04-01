import connectDB from '@/lib/connectDB';
import User from '@/model/user.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
	try {
		await connectDB();

		const { name, email, password } = await req.json();

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 400 },
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ message: 'Password must be at least 6 characters long' },
				{ status: 400 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ name, email, password: hashedPassword });

		return NextResponse.json({ user }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: `Registration Error: ${error}` },
			{ status: 500 },
		);
	}
};
