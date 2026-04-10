import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { ErrorMapper } from '../errors/ErrorMapper';

export class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string = PUBLIC_API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	async request<T>(path: string, options: RequestInit = {}): Promise<T> {
		const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;

		try {
			const response = await fetch(url, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options.headers
				}
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const message = errorData.message || response.statusText;
				throw ErrorMapper.mapFromStatus(response.status, message);
			}

			// Handle 204 No Content
			if (response.status === 204) {
				return {} as T;
			}

			return await response.json();
		} catch (error) {
			throw ErrorMapper.map(error);
		}
	}

	get<T>(path: string, options: RequestInit = {}): Promise<T> {
		return this.request<T>(path, { ...options, method: 'GET' });
	}

	post<T>(path: string, body?: any, options: RequestInit = {}): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined
		});
	}

	put<T>(path: string, body?: any, options: RequestInit = {}): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined
		});
	}

	delete<T>(path: string, options: RequestInit = {}): Promise<T> {
		return this.request<T>(path, { ...options, method: 'DELETE' });
	}
}
