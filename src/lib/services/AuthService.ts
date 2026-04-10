import type { IAuthRepository } from '../repositories/AuthRepository';
import type { LoginPayload, AuthResponse, UserProfile } from '../entities/auth';
import { LoginSchema } from '../entities/auth';
import type { Fetcher } from '../infrastructure/http/HttpClient';

export class AuthService {
	constructor(private authRepo: IAuthRepository) {}

	async login(payload: LoginPayload): Promise<AuthResponse> {
		LoginSchema.parse(payload);
		return await this.authRepo.login(payload);
	}

	async validateUserProfile(token: string, fetcher?: Fetcher): Promise<UserProfile> {
		return await this.authRepo.validateProfile(token, fetcher);
	}
}
