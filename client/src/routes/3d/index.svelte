<script>
	import { onMount } from 'svelte';
	import { init } from './babylon';

	let el;

	onMount(() => {
		init(el);
	});
</script>

<html lang="en">
	<body>
		<canvas id="canvas" bind:this={el} />
	</body>
</html>

<style>
	html, body { width:100%; height:100%; } /* just to be sure these are full screen*/

	canvas { display:block; } /* To remove the scrollbars */
</style>