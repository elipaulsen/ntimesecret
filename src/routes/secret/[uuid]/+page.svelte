<script lang="ts">
	import type { PageProps } from './$types';
	import { getSecret, type SecretDocument } from '$lib/firestore';
    import { onMount } from 'svelte';

	let { data }: PageProps = $props();
	let secret: SecretDocument | null = $state(null); // Initialize with null to handle loading state

	onMount(async () => {
		try {
			secret = await getSecret(data.uuid); // Await the promise
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<div class="container">
	<h3>SECRET {data.uuid}:</h3>
	<div class="input-group flex items-center">
		<input
			type="text"
			id="secret"
			value={secret?.secret}
			readonly
			class="input-field"
		/>
	</div>
</div>