import dotenv from 'dotenv'

dotenv.config();

export const {APP_PORT ,DEBUG_MODE ,DB_URL, SECRETKEY, REFRESH_SECRETKEY} = process.env;