import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { UserRole } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface UserToken {
  id: number;
  email: string;
  role: string;
}

export const verifyToken = (token: string): UserToken => {
  try {
    return verify(token, JWT_SECRET) as UserToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getTokenFromCookies = () => {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value;
};

export const getUserFromToken = (): UserToken | null => {
  const token = getTokenFromCookies();
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
};

export const isAuthorized = (allowedRoles: string[]): boolean => {
  const user = getUserFromToken();
  if (!user) return false;
  return allowedRoles.includes(user.role);
};

export const ROLES = {
  ADMIN: 'admin',
  SENIOR_MANAGER: 'senior-manager',
  FIELD_OFFICER: 'field-officer',
  ACCOUNTANT: 'accountant',
} as const;

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const generateToken = (payload: TokenPayload): string => {
  return sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const isAuthorizedUserRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
}; 