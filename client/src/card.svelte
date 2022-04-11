<script>
	export let href = '';
</script>

<div class="bg-white/50 text-black h-24 flex items-center justify-center outline outline-1">
	<a class="text-center font-mono" {href}><slot /></a>
</div>
