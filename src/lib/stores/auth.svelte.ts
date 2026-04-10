export class AuthStore {
	#role = $state<string | null>(null);
	#username = $state<string | null>(null);

	get role() {
		return this.#role;
	}

	get username() {
		return this.#username;
	}

	setUser(username: string, role: string) {
		this.#username = username;
		this.#role = role;
	}

	clear() {
		this.#username = null;
		this.#role = null;
	}
}

export const authStore = new AuthStore();
