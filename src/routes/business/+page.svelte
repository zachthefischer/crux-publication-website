<script lang="ts">
	import type { Article, ArticlePreview } from '$lib/article.types';
	import ArticleList from '$lib/components/ArticleList.svelte';
	import FeaturedArticleComponent from '$lib/components/FeaturedArticleComponent.svelte';
	import FeaturedSubarticleComponent from '$lib/components/FeaturedSubarticleComponent.svelte';
	import TextSectionComponent from '$lib/components/TextSectionComponent.svelte';
	import { dummyArticle, dummyPreview } from '$lib/dummy';

	export let data:
		| {
				articles: ArticlePreview[];
				featuredArticle: ArticlePreview;
				featuredSubarticle: ArticlePreview;
		  }
		| undefined;
	let loading = true;

	$: if (data) {
		loading = false;
	}
</script>

<canvas
	id="backgroundCanvas"
	class="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-white from-50% to-zinc-300"
></canvas>

<!-- Featured Section -->
<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 mt-2 md:mt-3 z-10 mb-2">
	<!-- "Business Publications" Title with background hover -->
	<div class="flex flex-row w-full mb-5 md:mb-6">
		<div
			class="flex items-center relative bg-gradient-to-r from-[#315AB0] to-[#07d1f9c1] w-full h-full rounded-lg shadow-lg p-4"
		>
			<div class="ps-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
				Business Publications
			</div>

			<div
				class="p-4 opacity-0 rounded-lg flex items-center hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-r from-[#20438c] to-[#3060c7a4] shadow-inner"
			>
				<div class="ps-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
					Business Publications
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile view -->
	<div class="block md:hidden col">
		<FeaturedArticleComponent preview={data ? data.featuredArticle : dummyPreview}
		></FeaturedArticleComponent>
		<div class="py-3"></div>
		<FeaturedSubarticleComponent preview={data ? data.featuredSubarticle : dummyPreview} />
		<div class="py-3"></div>
		<TextSectionComponent
			title=""
			description="Covering the latest developments, trends, and innovations at the intersection of neuroscience and technology"
		/>
		<div class="py-1"></div>
	</div>

	<!-- Medium+ Screens -->
	<div class="hidden md:flex flex-col">
		<div class="flex flex-row w-full">
			<div class="flex flex-col w-1/3 me-5">
				<!-- Featured Subarticle -->
				<div class="mb-5">
					<FeaturedSubarticleComponent preview={data ? data.featuredSubarticle : dummyPreview} />
				</div>

				<!-- About Business -->
				<div class="h-full">
					<TextSectionComponent
						title=""
						description="Covering the latest developments, trends, and innovations at the intersection of neuroscience and technology"
					/>
				</div>
			</div>

			<div class="flex flex-col w-2/3">
				<!-- Big Featured Article -->
				<div class="h-full">
					<FeaturedArticleComponent preview={data ? data.featuredArticle : dummyPreview} />
				</div>
			</div>
		</div>
	</div>
</div>

{#if data}
	<ArticleList articles={data.articles} includeSearch={true} category={'Business'} />
{/if}
