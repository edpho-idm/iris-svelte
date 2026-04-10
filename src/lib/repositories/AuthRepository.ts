import type { HttpClient, Fetcher } from '../infrastructure/http/HttpClient';
import type { AuthResponse, LoginPayload, UserProfile } from '../entities/auth';

export interface IAuthRepository {
	login(payload: LoginPayload): Promise<AuthResponse>;
	validateProfile(token: string, fetcher?: Fetcher): Promise<UserProfile>;
}

export class AuthRepository implements IAuthRepository {
	constructor(private http: HttpClient) {}

	async login(payload: LoginPayload): Promise<AuthResponse> {
		return await this.http.post<AuthResponse>('/login', payload);
	}

	async validateProfile(token: string, fetcher?: Fetcher): Promise<UserProfile> {
		return await this.http.get<UserProfile>('/validate', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}, fetcher);
	}
}
