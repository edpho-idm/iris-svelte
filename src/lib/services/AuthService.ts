import type { IAuthRepository } from '../repositories/AuthRepository';
import type { LoginPayload, AuthResponse, UserProfile } from '../entities/auth';
import { LoginSchema } from '../entities/auth';

export class AuthService {
	constructor(private authRepo: IAuthRepository) {}

	async login(payload: LoginPayload): Promise<AuthResponse> {
		// Validasi schema sebelum dikirim ke repo
		LoginSchema.parse(payload);
		return await this.authRepo.login(payload);
	}

	async validateUserProfile(): Promise<UserProfile> {
		return await this.authRepo.validateProfile();
	}
}
