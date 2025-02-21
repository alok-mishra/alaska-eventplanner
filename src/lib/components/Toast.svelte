<script lang="ts">
    export let message: string;
    export let type: 'success' | 'error' = 'success';

    let toast: HTMLDivElement;

    export function show() {
        document.body.appendChild(toast);
        return new Promise<void>(resolve => {
            setTimeout(() => {
                toast.remove();
                resolve();
            }, 1000);
        });
    }
</script>

<div bind:this={toast} class="toast toast-end">
    <div class="alert alert-{type}">
        <span>{message}</span>
    </div>
</div>
