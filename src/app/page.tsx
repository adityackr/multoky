import { auth } from '@/auth';
import connectDB from '@/lib/connectDB';
import User from '@/model/user.model';
import { redirect } from 'next/navigation';
import { UpdateInfo } from './_components/update-info';

const Home = async () => {
	await connectDB();
	const session = await auth();
	const user = await User.findById(session?.user?.id);

	if (!user) {
		redirect('/login');
	}

	const incomplete =
		!user.role || !user.phone || (!user.phone && user.role === 'user');

	if (incomplete) {
		return <UpdateInfo />;
	}

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
