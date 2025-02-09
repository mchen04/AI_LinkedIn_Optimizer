import dotenv from 'dotenv';
import { cleanEnv, str, port, num } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 3000 }),
  MONGODB_URI: str(),
  JWT_SECRET: str(),
  JWT_EXPIRE: str({ default: '7d' }),
  GEMINI_API_KEY: str(),
  DEEPSEEK_API_KEY: str(),
  MAX_FILE_SIZE: num({ default: 5 * 1024 * 1024 }), // 5MB default
  UPLOAD_PATH: str({ default: 'uploads/' })
});

export default env;
