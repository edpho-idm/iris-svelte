import type { LayoutServerLoad } from './$types';
import { resolve, TOKENS } from '$lib/infrastructure/di/container';
import type { AuthService } from '$lib/services/AuthService';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	
	if (!token) {
		return { user: null };
	}

	try {
		const authService = resolve<AuthService>(TOKENS.AuthService);
		// Pass fetch dari event untuk keamanan SSR dan token untuk auth
		const user = await authService.validateUserProfile(token, fetch);
		return { user };
	} catch (error) {
		// Jika token tidak valid atau API error, anggap user null
		return { user: null };
	}
};
