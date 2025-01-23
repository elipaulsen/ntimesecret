<script lang="ts">
    import type { PageProps } from './$types';
    import { getSecret, type SecretDocument } from '$lib/firestore';
    import { onMount } from 'svelte';
	import { copy } from '$lib/utils'

    let { data }: PageProps = $props();
    let secret: SecretDocument | null = $state(null); // Initialize with null to handle loading state

    onMount(async () => {
        try {
            secret = await getSecret(data.uuid);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
</script>

<div class="container">
	<h1>ntimesecret</h1>
    {#if secret}
		<textarea
			id="secret-text"
			bind:value={secret.secret}
			rows="4"
			class="input-field"
			required
		></textarea>
		<p>created on {new Date(secret.createdAt).toDateString()}</p>
		<button type="button" class="copy-button mt-2" onclick={() => copy(secret.secret)}>
			<i class="fa fa-clipboard"></i>
			copy
		</button>
	{:else}
		<textarea
			value=""
			rows="4"
			class="input-field"
		></textarea>
    {/if}
</div>
