import { createContainer } from '@evyweb/ioctopus';
import { HttpClient } from '../http/HttpClient';
import { AuthRepository } from '../../repositories/AuthRepository';
import { AuthService } from '../../services/AuthService';

// Define tokens as Symbols for uniqueness and type safety
export const TOKENS = {
	HttpClient: Symbol.for('HttpClient'),
	AuthRepository: Symbol.for('AuthRepository'),
	AuthService: Symbol.for('AuthService')
};

export const container = createContainer();

// Register base infrastructure
container.bind(TOKENS.HttpClient).toClass(HttpClient);

// Register Repositories
container.bind(TOKENS.AuthRepository).toClass(AuthRepository, [TOKENS.HttpClient]);

// Register Services
container.bind(TOKENS.AuthService).toClass(AuthService, [TOKENS.AuthRepository]);

/**
 * Helper to resolve dependencies with type safety
 */
export function resolve<T>(token: symbol | string): T {
	return container.get<T>(token);
}
