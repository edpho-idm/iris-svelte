import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { resolve, TOKENS } from '$lib/infrastructure/di/container';
import type { AuthService } from '$lib/services/AuthService';
import { LoginSchema } from '$lib/entities/auth';
import { AppError } from '$lib/infrastructure/errors/AppError';

export const load: PageServerLoad = async ({ locals }) => {
	// If already authenticated, redirect to dashboard (logic goes here later)
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		
		try {
			// 1. Validasi Schema
			const validatedData = LoginSchema.parse(formData);
			
			// 2. Call AuthService
			const authService = resolve<AuthService>(TOKENS.AuthService);
			const authResponse = await authService.login(validatedData);
			
			// 3. Simpan Cookie (HTTP Only)
			cookies.set('access_token', authResponse.access_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			});
			
			cookies.set('refresh_token', authResponse.refresh_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
			
			// 4. Validate profile to get role (optional check here or handle in dashboard load)
			// For this task, we assume we just need to redirect. 
			// User data will be fetched in the dashboard handle or load.
			
		} catch (error) {
			if (error instanceof AppError) {
				return fail(error.statusCode, {
					message: error.message,
					error: true
				});
			}
			
			// Zod errors or others
			return fail(400, {
				message: 'Invalid credentials or validation failed',
				error: true
			});
		}

		throw redirect(303, '/dashboard');
	}
};
