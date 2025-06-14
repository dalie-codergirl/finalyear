export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
export const DB_NAME = process.env.DB_NAME || 'sprodeta';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const CORS_ORIGINS = process.env.CORS_ORIGINS || '*';
export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS || true;
export const CORS_METHODS = process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE';
export const CORS_ALLOWED_HEADERS = process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization';



