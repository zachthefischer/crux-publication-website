<script lang="ts">
	import type { Article, ArticlePreview } from '$lib/article.types';
	import LoadingGif from '/Loading.gif';
	import { dummyArticle, dummyPreview } from '$lib/dummy';
	import { FormatDateTime } from '$lib/helpers';

	export let preview: ArticlePreview = dummyPreview;
</script>

<a href="/article/{preview.slug}">
	<div
		class="w-full h-full flex flex-col bg-zinc-800 rounded-lg duration-200 ease-in shadow-md hover:bg-zinc-900 hover:shadow-lg"
	>
		<!-- Image -->
		<img
			class="flex-none object-cover w-full h-full max-h-72 rounded-t-lg"
			src={preview.image?.src}
			alt={preview.description}
		/>

		<!-- Title -->
		<p class="flex-none text-2xl md:text-3xl font-semibold md:line-clamp-3 text-zinc-50 px-4 pt-2">
			{preview.title}
		</p>

		<div class="grow"></div>

		<!-- Author/date -->
		<div class="flex flex-row justify-between px-4 pb-3 text-sm md:text-md text-zinc-300">
			<p class="font-semibold">{preview.author}</p>
			<p>{FormatDateTime(preview.date)}</p>
		</div>
	</div>
</a>

<!-- border-solid border-[4px] border-primary -->
<!-- <p class="text-lg mb-2 overflow-hidden">{article.description}</p> -->
<!-- <h2 class="card-title italic text-accent">Featured Article:</h2> -->
