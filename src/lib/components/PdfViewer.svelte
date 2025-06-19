<script lang="ts">
	import { onMount } from 'svelte';
	import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

	export let url: string;
	export let page: number = 1;
	export let scale: number = 1.5;

	let canvasEl: HTMLCanvasElement;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		if (!url) {
			error = 'No URL provided';
			loading = false;
			return;
		}

		try {
			const pdfjsLib = await import('pdfjs-dist');
			const { GlobalWorkerOptions, getDocument } = pdfjsLib as typeof import('pdfjs-dist');
			const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url), {
				type: 'module'
			});
			GlobalWorkerOptions.workerPort = worker;

			// Load PDF and page
			const pdf: PDFDocumentProxy = await getDocument(url).promise;
			const pdfPage: PDFPageProxy = await pdf.getPage(page);

			// Size viewport
			const viewport = pdfPage.getViewport({ scale });
			// Ensure canvas is present
			canvasEl.width = viewport.width;
			canvasEl.height = viewport.height;
			canvasEl.style.width = viewport.width + 'px';
			canvasEl.style.height = viewport.height + 'px';

			// Render
			const ctx = canvasEl.getContext('2d')!;
			await pdfPage.render({ canvasContext: ctx, viewport }).promise;
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

<div class="pdf-container">
	<canvas bind:this={canvasEl} class="pdf-canvas" />

	{#if loading}
		<div class="overlay">Loading PDF…</div>
	{:else if error}
		<div class="overlay error">Error: {error}</div>
	{/if}
</div>

<style>
	.pdf-container {
		position: relative;
		display: inline-block;
	}
	.pdf-canvas {
		display: block;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.8);
		font-weight: bold;
	}
	.overlay.error {
		color: red;
	}
</style>
