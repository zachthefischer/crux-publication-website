<script lang="ts">
	import type { ArticlePreview } from '$lib/services/article.types';
	const LoadingGif = '/Loading.gif';
	import { dummyArticle, dummyPreview } from '$lib/services/dummy';
	import UserCard from './UserCard.svelte';

	export let previews: ArticlePreview[] = [dummyPreview, dummyPreview, dummyPreview];
</script>

<div class="flex flex-col h-full">
	<!-- "Featured" -->
	<div class="flex-none text-3xl font-bold text-zinc-800 pb-3">Featured</div>

	<!-- Article List -->
	<div class="grow w-full duration-200 ease-in bg-white/85 rounded-lg shadow hover:shadow-lg">
		{#each previews as preview, index}
			<a href="/article/{preview.slug}">
				<div class="px-4 py-2">
					<!-- Category -->
					<div class="text-accent font-bold">{preview?.categories[0]}</div>
					<!-- Title -->
					<p class="text-lg font-bold md:line-clamp-3 leading-6 text-zinc-700 hover:text-accent">
						{preview.title}
					</p>
					<!-- Author/date -->
					{#if preview.authors && preview.authors.length > 0}
						<div class="flex items-center gap-2">
							{#each preview.authors as authorId}
								<UserCard {authorId} />
							{/each}
						</div>
					{:else}
						<p class="text-zinc-500">{preview.author}</p>
					{/if}
				</div>
			</a>

			{#if index < previews.length - 1}
				<div class="divider divider-zinc-300 my-0 px-3 py-0"></div>
			{/if}
		{/each}
	</div>
</div>
