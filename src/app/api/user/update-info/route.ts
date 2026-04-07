import { auth } from '@/auth';
import connectDB from '@/lib/connectDB';
import User from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
	try {
		await connectDB();

		const { phone, role } = await req.json();
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const user = await User.findOneAndUpdate(
			{ email: session.user.email },
			{ phone, role },
			{ new: true },
		);

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: `Something went wrong ${error}` },
			{ status: 500 },
		);
	}
};
