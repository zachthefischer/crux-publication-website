<script lang="ts">
	import type { Article, ArticleContent } from '$lib/article.types';
	import LoadingGif from '$lib/assets/Loading.gif';
	import { dummyArticle } from '$lib/dummy';

	export let article: Article = dummyArticle;
</script>

<a href="/article/{article.slug}">
	<div
		class="w-full h-full flex flex-col bg-white/80 rounded-lg shadow duration-200 ease-in hover:bg-zinc-200/90 hover:shadow-lg group"
	>
		<img
			class="flex-none object-cover w-full max-h-44 rounded-t-lg"
			src={article.image?.src}
			alt={article.description}
		/>

		<!-- Title -->
		<p
			class="flex-none text-lg md:text-2xl font-bold font-mono text-zinc-700 px-4 pt-5 group-hover:text-accent md:line-clamp-3 md:leading-5"
		>
			{article.title}
		</p>

		<div class="grow"></div>

		<!-- Author/date -->
		<div class="flex flex-row justify-between text-sm md:text- px-4 pb-2 text-zinc-500">
			<p class="text-accent font-bold">{article.categories[0]}</p>
			<p>{article.date}</p>
		</div>
	</div>
</a>
