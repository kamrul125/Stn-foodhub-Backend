import dotenv from 'dotenv';
import path from 'path';

// .env ফাইলটি রুট ডিরেক্টরি থেকে লোড করার জন্য
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
  
  // আপনার .env ফাইলে JWT_SECRET আছে, তাই এখানে সেটিই ব্যবহার করা হয়েছে
  jwt_access_secret: process.env.JWT_SECRET as string, 
  
  // আপনার .env ফাইলে JWT_ACCESS_EXPIRES_IN আছে
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '7d',
};