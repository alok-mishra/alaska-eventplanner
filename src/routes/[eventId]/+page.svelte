<script lang="ts">
	import type { PageData } from "./$types";
	import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    import Toast from '$lib/components/Toast.svelte';

    let {data}: {data: PageData} = $props();
    let showToast = $state(false);
</script>

{#if showToast}
    <Toast message="Event successfully deleted!" />
{/if}

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8 bg-base-200 px-8 py-4 rounded-lg">
        <h1 class="text-3xl font-bold">Event Details</h1>
    </div>

    {#if data.event}
        <div class="card bg-base-300 shadow-xl max-w-2xl mx-auto">
            <div class="card-body">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="card-title text-2xl mb-2">{data.event.title}</h2>
                        <div class="flex items-center gap-2 text-sm text-base-content/60 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                            {new Date(data.event.date).toLocaleString()}
                        </div>
                    </div>
                    <div class="badge badge-primary">ID: {data.event.id}</div>
                </div>

                <div class="prose max-w-none">
                    <p>{data.event.description || 'No description provided.'}</p>
                </div>

                <div class="card-actions justify-end mt-6 pt-4 border-t border-base-300">
                    <form
                        action="?/delete"
                        method="POST"
                        class="inline"
                        use:enhance={() => {
                            return async ({ result }) => {
                                if (result.type === 'success') {
                                    showToast = true;
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                    await goto('/');
                                }
                            };
                        }}
                    >
                        <a href="/" class="btn btn-ghost">
                            Back to Events
                        </a>
                        <button type="submit" class="btn btn-error">
                            Delete Event
                        </button>
                    </form>
                    <a href="/newevent?edit={data.event.id}" class="btn btn-primary">Edit Event</a>
                </div>
            </div>
        </div>
    {:else}
        <div class="alert alert-error max-w-2xl mx-auto text-white flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
             <div class="flex flex-1 justify-between items-center">
                <h2>Event not found</h2>
                <div><a href="/" class="btn btn-neutral">Back to Events</a></div>
            </div>
        </div>
    {/if}
</div>
