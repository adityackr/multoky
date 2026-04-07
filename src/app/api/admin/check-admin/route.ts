import connectDB from '@/lib/connectDB';
import User from '@/model/user.model';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		await connectDB();

		const admin = await User.findOne({ role: 'admin' });

		return NextResponse.json({
			exists: !!admin,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: `Something went wrong ${error}`,
			},
			{ status: 500 },
		);
	}
};
