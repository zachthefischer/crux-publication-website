<script lang="ts">
	import type { Article } from '$lib/article.types';

	export let data: { article: Article } | undefined;
	let loading = true;

	$: if (data) {
		loading = false;
	}
</script>

{#if data}
	<div class="flex flex-col mx-auto px-4 max-w-prose z-0">
		<!-- TITLE -->
		<div
			class="mb-2 font-serif text-primary text-center
                text-4xl md:text-4xl mt-8"
		>
			{data.article.title}
		</div>
		<!-- AUTHOR/DATE -->
		<div
			class="font-serif flex flex-row justify-center gap-2 text-zinc-500 mb-1 text-md md:text-md"
		>
			<p class="underline">{data.article.author}</p>
			<p>•</p>
			<p>{data.article.date}</p>
		</div>

		<!-- TITLE IMAGE -->
		<div class="mt-8 w-full">
			<img
				class="w-full object-contain"
				src={data.article.image.src}
				alt={data.article.description}
			/>
			<!-- IMAGE CREDITS -->
			<!-- <p class="text-zinc-500 mt-2 font-serif text-sm font-light text-center">
				Illustration by Abigail Lin
			</p> -->
		</div>

		<!-- DIVIDER -->
		<!-- <hr class="w-3/4 mx-auto border-zinc-400" /> -->

		<!-- ARTICLE CONTENT -->
		<div
			class={`font-serif mt-10 ${data.article.content[0]?.type === 'paragraph' ? 'first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start' : ''}`}
		>
			{#each data.article.content as content, index}
				{#if content.type === 'image'}
					<!-- IMAGE -->
					<img class="w-full object-cover mx-0 mb-7" src={content?.src} alt={'Image'} />
				{:else if content.type === 'header'}
					<!-- HEADER -->
					<p class="mb-4 text-xl leading-7 font-[550] md:text-2xl">
						{content.text}
					</p>
				{:else if content.type === 'paragraph'}
					<!-- PARAGRAPH -->
					<div class="mb-7 text-base leading-0 md:text-lg 2xl:leading-7">{@html content.text}</div>
				{:else if content.type === 'video'}
					<!-- VIDEO -->
					<div
						class="rounded-lg md:rounded-xl lg:rounded-2xl w-full mx-auto aspect-[16/9] overflow-hidden mb-6"
					>
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
				{:else if content.type === 'custom_html'}
					<!-- PARAGRAPH -->
					<div class="mb-4 text-base">{@html content.text}</div>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div>LOADING</div>
{/if}

<style>
</style>
