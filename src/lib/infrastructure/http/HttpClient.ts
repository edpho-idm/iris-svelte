import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { ErrorMapper } from '../errors/ErrorMapper';

export type Fetcher = typeof fetch;

export class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string = PUBLIC_API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Main request method with optional custom fetcher (for SvelteKit SSR safety)
	 */
	async request<T>(
		path: string, 
		options: RequestInit = {}, 
		customFetch?: Fetcher
	): Promise<T> {
		const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
		const fetcher = customFetch || fetch;

		try {
			const response = await fetcher(url, {
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

			if (response.status === 204) {
				return {} as T;
			}

			return await response.json();
		} catch (error) {
			throw ErrorMapper.map(error);
		}
	}

	get<T>(path: string, options: RequestInit = {}, fetcher?: Fetcher): Promise<T> {
		return this.request<T>(path, { ...options, method: 'GET' }, fetcher);
	}

	post<T>(path: string, body?: any, options: RequestInit = {}, fetcher?: Fetcher): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined
		}, fetcher);
	}

	put<T>(path: string, body?: any, options: RequestInit = {}, fetcher?: Fetcher): Promise<T> {
		return this.request<T>(path, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined
		}, fetcher);
	}

	delete<T>(path: string, options: RequestInit = {}, fetcher?: Fetcher): Promise<T> {
		return this.request<T>(path, { ...options, method: 'DELETE' }, fetcher);
	}
}
