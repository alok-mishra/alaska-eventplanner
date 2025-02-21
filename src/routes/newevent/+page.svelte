<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import Toast from '$lib/components/Toast.svelte';

    let { data }: { data: PageData } = $props();
    let submitting = $state(false);
    let showToast = $state(false);

    $effect(() => {
        if (data.event) {
            isEditing = true;
        }
    });

    let isEditing = $state(false);

    // current datetime for local timezone
    const now = new Date().toLocaleString('sv').replace(' ', 'T').slice(0, 16);
</script>

{#if showToast}
    <Toast message={isEditing ? 'Event updated successfully!' : 'Event created successfully!'} />
{/if}

<div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="flex justify-between items-center mb-8 bg-base-200 px-8 py-4 rounded-lg">
        <h1 class="text-3xl font-bold">{isEditing ? 'Edit Event' : 'Create New Event'}</h1>
    </div>

    <form
        method="POST"
        action="?/{isEditing ? 'update' : 'create'}"
        class="card bg-base-300 shadow-xl p-6"
        use:enhance={() => {
            submitting = true;
            return async ({ result }) => {
                submitting = false;
                if (result.type === 'success') {
                    showToast = true;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await goto(isEditing ? `/${result.data?.id}` : '/');
                }
            };
        }}
    >
        {#if isEditing}
            <input type="hidden" name="eventId" value={data.event?.id}>
        {/if}

        <div class="form-control w-full">
            <label for="title" class="label">
                <span class="label-text">Title</span>
            </label>
            <input
                type="text"
                id="title"
                name="title"
                required
                class="input input-bordered w-full"
                placeholder="Event title"
                value={data.event?.title ?? ''}
            >
        </div>

        <div class="form-control w-full mt-4">
            <label for="description" class="label">
                <span class="label-text">Description</span>
            </label>
            <textarea
                id="description"
                name="description"
                rows="4"
                class="textarea textarea-bordered"
                placeholder="Event description"
            >{data.event?.description ?? ''}</textarea>
        </div>

        <div class="form-control w-full mt-4">
            <label for="date" class="label">
                <span class="label-text">Date and Time</span>
            </label>
            <input
                type="datetime-local"
                id="date"
                name="date"
                required
                class="input input-bordered w-full"
                value={data.event?.date ?? ''}
                min={now}
            >
        </div>

        <div class="mt-6 flex items-center gap-4">
            <button
                type="submit"
                class="btn btn-primary"
                disabled={submitting}
            >
                {#if submitting}
                    <span class="loading loading-spinner"></span>
                    {isEditing ? 'Saving...' : 'Creating...'}
                {:else}
                    {isEditing ? 'Save Changes' : 'Create Event'}
                {/if}
            </button>

            <a href={isEditing ? `/${data.event?.id}` : '/'} class="btn btn-ghost">Cancel</a>
        </div>
    </form>
</div>
