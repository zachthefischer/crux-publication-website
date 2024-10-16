<script lang="ts">
	import type { Article, ArticleContent } from '$lib/article.types';
	import LoadingGif from '$lib/assets/Loading.gif';
	import { dummyArticle } from '$lib/dummy';

	export let articles: Article[] = [dummyArticle, dummyArticle, dummyArticle];
</script>

<div class="flex flex-col h-full">
	<!-- "Featured" -->
	<div class="flex-none text-3xl font-bold text-zinc-800 pb-3">Featured</div>

	<!-- Article List -->
	<div class="grow w-full duration-200 ease-in bg-white/85 rounded-lg shadow hover:shadow-lg">
		{#each articles as article, index}
			<a href="/article/{article.slug}">
				<div class="px-4 py-2">
					<!-- Category -->
					<div class="text-accent font-bold">{article.category}</div>
					<!-- Title -->
					<p
						class="text-lg font-bold font-mono md:line-clamp-3 leading-6 text-zinc-700 hover:text-accent"
					>
						{article.title}
					</p>
					<!-- Author/date -->
					<p class="text-zinc-500">{article.author}</p>
				</div>
			</a>

			{#if index < articles.length - 1}
				<div class="divider divider-zinc-300 my-0 px-3 py-0"></div>
			{/if}
		{/each}
	</div>
</div>
