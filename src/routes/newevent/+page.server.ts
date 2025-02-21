import { createEvent, fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const editId = url.searchParams.get('edit');
	if (editId) {
		const event = await fetchEventById(parseInt(editId));
		return { event };
	}
	return { event: null };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();
		if (!title || !date) {
			error(400, 'Title and Date are required');
		}
		const newEvent = await createEvent({ title, description, date });
		return {
			success: true,
			message: 'Event created successfully',
			id: newEvent.id
		};
	},
	update: async ({ request }) => {
		const formdata = await request.formData();
		const eventId = parseInt(formdata.get('eventId')?.toString() || '');
		const updates = {
			title: formdata.get('title')?.toString(),
			description: formdata.get('description')?.toString(),
			date: formdata.get('date')?.toString()
		};
		if (!updates.title || !updates.date) {
			error(400, 'Title and Date are required');
		}
		await updateEventById(eventId, updates);
		return {
			success: true,
			message: 'Event updated successfully',
			id: eventId
		};
	}
};
