import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		events: fetchAllEvents() // sveltekit 5 automatically handles streaming responses, by returning a promise and not awaiting it
	};
};
