<script>
	import { onMount } from 'svelte';
	import { setupBackground } from '../background.js';

	onMount(() => {
		setupBackground('backgroundCanvas');
	});
</script>

<!-- Light gray gradient -->
<!-- bg-gradient-to-b from-white from-50% to-zinc-300 -->
<canvas
	id="backgroundCanvas"
	class="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-white from-75% to-zinc-200"
></canvas>

<style>
	canvas {
		display: block;
		pointer-events: none; /* Ensure the canvas doesn't block interactions with content */
	}
</style>
