import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	// Proteksi rute: jika user tidak terautentikasi, lempar ke halaman login
	if (!user) {
		throw redirect(302, '/login');
	}

	return {
		user
	};
};
