<script lang="ts">
	import type { Article, ArticleContent } from '$lib/article.types';
	import LoadingGif from '$lib/assets/Loading.gif';
	import { dummyArticle } from '$lib/dummy';

	export let article: Article = dummyArticle;
</script>

<a href={article.slug ? `/article/${article.slug}` : undefined}>
	<div class="p-6 ease-in duration-200 hover:bg-zinc-200/75 text-zinc-500 group">
		<div class="flex flex-col md:hidden">
			<img
				class="w-max-full aspect-[2/1] object-cover rounded-lg"
				src={article.image.src}
				alt={article.description}
			/>

			<!-- Category -->
			<p class="flex-none text-md text-accent font-bold mt-1">{article.category}</p>
			<!-- Title -->
			<p
				class="flex-none text-xl font-bold font-mono text-zinc-700 group-hover:text-accent ease-in duration-200"
			>
				{article.title}
			</p>
			<!-- Description -->
			<p class="flex-none text-md group-hover:text-zinc-700 ease-in duration-200">
				{article.description}
			</p>

			<!-- Author/date -->
			<div class="flex flex-row text-zinc-700 group-hover:text-zinc-800 ease-in duration-200">
				<p class="font-bold pe-5">{article.author}</p>
				<p>{article.date}</p>
			</div>
		</div>

		<div class="hidden md:flex flex-row justify-between">
			<div class="flex flex-col me-5">
				<!-- Category -->
				<p class="flex-none text-lg text-accent font-bold">{article.category}</p>

				<!-- Title -->
				<p
					class="flex-none text-2xl font-bold font-mono text-zinc-700 group-hover:text-accent ease-in duration-200"
				>
					{article.title}
				</p>

				<!-- Description -->
				<p class="flex-none text-lg group-hover:text-zinc-700 ease-in duration-200">
					{article.description}
				</p>

				<div class="grow"></div>

				<!-- Author/date -->
				<div class="flex flex-row text-zinc-700 group-hover:text-zinc-800 ease-in duration-200">
					<p class="font-bold pe-5">{article.author}</p>
					<p>{article.date}</p>
				</div>
			</div>

			<div class="flex-none w-1/3">
				<!-- Image -->
				<img
					class="w-max-full aspect-[4/3] object-cover rounded-lg"
					src={article.image.src}
					alt={article.description}
				/>
			</div>
		</div>
	</div>
</a>
