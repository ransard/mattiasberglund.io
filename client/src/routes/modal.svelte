<script>
	import { createEventDispatcher } from 'svelte';
	export let showImage = null;
	const dispatch = createEventDispatcher();

	const cancelModal = () => {
		dispatch('cancelModal');
	};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
{#if showImage}
	<div
		class="p-2 fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center bg-black bg-opacity-75"
		on:click={cancelModal}
	>
		<img class="max-h-full" src="/images/gallery/{showImage}" />
	</div>
{/if}
