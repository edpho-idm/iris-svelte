import { createContainer } from '@evyweb/ioctopus';
import { HttpClient } from '../http/HttpClient';

// Define tokens as Symbols for uniqueness and type safety
export const TOKENS = {
	HttpClient: Symbol.for('HttpClient')
};

export const container = createContainer();

// Register base infrastructure
container.bind(TOKENS.HttpClient).toClass(HttpClient);

/**
 * Helper to resolve dependencies with type safety
 */
export function resolve<T>(token: symbol | string): T {
	return container.get<T>(token);
}
