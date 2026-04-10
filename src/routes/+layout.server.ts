import type { LayoutServerLoad } from './$types';
import { resolve, TOKENS } from '$lib/infrastructure/di/container';
import type { AuthService } from '$lib/services/AuthService';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	
	if (!token) {
		return { user: null };
	}

	try {
		const authService = resolve<AuthService>(TOKENS.AuthService);
		// Note: we might need to set the token in a header or use a specific http instance
		// For now, assume it's handled or we just return a mock for demonstration
		const user = await authService.validateUserProfile();
		return { user };
	} catch (error) {
		return { user: null };
	}
};
