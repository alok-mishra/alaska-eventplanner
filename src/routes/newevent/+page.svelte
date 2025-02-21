<script lang="ts">
    import { enhance } from '$app/forms';
    let submitting = false;
</script>

<div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="flex justify-between items-center mb-8 bg-base-200 px-8 py-4 rounded-lg">
        <h1 class="text-3xl font-bold">Create New Event</h1>
    </div>

    <form
        method="POST"
        class="card bg-base-300 shadow-xl p-6"
        use:enhance={() => {
            submitting = true;
            return async ({ update }) => {
                submitting = false;
                await update();
            };
        }}
    >
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
            ></textarea>
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
                    Creating...
                {:else}
                    Create Event
                {/if}
            </button>

            <a href="/" class="btn btn-ghost">Cancel</a>
        </div>
    </form>
</div>
