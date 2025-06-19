<script lang="ts">
	// import type { Article } from '$lib/article.types';
	import type { ArticlePreview } from '$lib/article.types';
	import LoadingGif from '$lib/static/Loading.gif';
	import { dummyArticle, dummyPreview } from '$lib/dummy';

	export let preview: ArticlePreview = dummyPreview;
</script>

<a href="/article/{preview.slug}">
	<div
		class="group flex flex-col sm:flex-row mt-4 rounded-xl bg-white/75 transition duration-200 ease-in hover:shadow hover:brightness-95 border"
	>
		<div class="flex sm:flex-none w-auto sm:w-2/5 justify-center text-zinc-900">
			<img
				class="object-cover h-48 w-96 rounded-xl sm:rounded-r-none"
				src={preview.image.src}
				alt="Album"
			/>
		</div>
		<div class="p-4 flex flex-col justify-between">
			<div>
				<h1 class="text-2xl text-primary font-bold">{preview.title}</h1>
				<h2 class="text pt-1 pb-2 text-zinc-500 md:line-clamp-3">{preview.description}</h2>
			</div>
			<div class="flex flex-row justify-between text-zinc-500">
				<div><b>{preview.author}</b> {preview.date}</div>
				<div>
					<a
						href="/archive/{preview.categories[0]}"
						class="hover:text-success text-accent font-bold font-mono">{preview.categories[0]}</a
					>
				</div>
			</div>
		</div>
	</div>
</a>
