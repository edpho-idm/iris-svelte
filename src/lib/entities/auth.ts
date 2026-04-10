import { z } from 'zod';

export const LoginSchema = z.object({
	username: z.string().min(1, 'NIK wajib diisi'),
	password: z.string().min(1, 'Password wajib diisi')
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export interface AuthResponse {
	access_token: string;
	refresh_token: string;
}

export interface UserProfile {
	id: string;
	username: string;
	role: string;
	name: string;
}
