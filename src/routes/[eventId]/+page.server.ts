import { fetchEventById, deleteEventById, updateEventById } from '$lib/server/remote-events';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	const event = await fetchEventById(eventId);
	return {
		event
	};
};

export const actions: Actions = {
	delete: async ({ params }) => {
		const eventId = parseInt(params.eventId);
		await deleteEventById(eventId);

		return {
			success: true,
			message: 'Event successfully deleted'
		};
	}
};
