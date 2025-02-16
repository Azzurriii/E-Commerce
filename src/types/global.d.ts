import { apiKeyDetailsType } from '@utils/apiKeyUtils';

export {};

declare global {
	interface Error {
		status?: number;
	}
}
