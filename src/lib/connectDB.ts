import { DATABASE_URL } from '@/config/env';
import mongoose from 'mongoose';

if (!DATABASE_URL) {
	throw new Error('Please provide DATABASE_URL in the environment variables');
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(DATABASE_URL)
			.then((mongoose) => mongoose.connection);
	}

	try {
		const conn = await cached.promise;
		return conn;
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
