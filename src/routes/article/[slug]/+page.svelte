<script lang="ts">
	import type { Article } from '$lib/article.types';

	export let data: { article: Article } | undefined;
	let loading = true;

	$: if (data) {
		loading = false;
	}
</script>

{#if data}
	<div class="flex flex-col mx-auto p-3 w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-2/5 mt-5 z-0">
		<!-- Title -->
		<h1
			class=" mb-1 font-extrabold font-mono text-primary leading-10
                text-4xl lg:text-4xl xl:text-5xl"
		>
			{data.article.title}
		</h1>

		<!-- Author/Date -->
		<div class="flex flex-row justify-between text-zinc-500 mb-1 text-lg">
			<p class="font-semibold">{data.article.author}</p>
			<p>{data.article.date}</p>
		</div>

		<!-- TITLE IMAGE -->
		<!-- Image src has been processed during fetch -->
		<img
			class="rounded-2xl w-max-full aspect-[5/3] object-contain"
			src={data.article.image.src}
			alt={data.article.description}
		/>

		<!-- IMAGE CREDITS -->
		<!-- <p class="text-zinc-500 mt-1 font-light">Photo Credits: Tobias B. Determined</p> -->

		<br />

		<!-- ARTICLE CONTENT -->
		<div
			class={`font-serif ${data.article.content[0]?.type === 'paragraph' ? 'first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start' : ''}`}
		>
			{#each data.article.content as content, index}
				{#if content.type === 'image'}
					<img class="w-1/2 object-cover mx-auto mb-4" src={content?.src} alt={'Image'} />
				{:else if content.type === 'header'}
					<p class="mb-4 text-xl md:text-2xl 2xl:leading-7 font-bold">{content.text}</p>
				{:else if content.type === 'paragraph'}
					<div class="mb-4 text-lg md:text-xl 2xl:leading-7">{@html content.text}</div>
				{:else if content.type === 'video'}
					<div class="rounded-2xl w-3/4 mx-auto aspect-[5/3] overflow-hidden">
						<iframe
							class="w-full h-full"
							src={content?.src}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						>
						</iframe>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div>LOADING</div>
{/if}

<style>
</style>
