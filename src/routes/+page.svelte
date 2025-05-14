<script lang="ts">
	import ArticleCardComponent from '$lib/components/ArticleCardComponent.svelte';
	import FeaturedArticleComponent from '$lib/components/FeaturedArticleComponent.svelte';
	import FeaturedSubarticleComponent from '$lib/components/FeaturedSubarticleComponent.svelte';
	import FeaturedListComponent from '$lib/components/FeaturedListComponent.svelte';
	import TextSectionComponent from '$lib/components/TextSectionComponent.svelte';

	import BackgroundComponent from '$lib/components/BackgroundComponent.svelte';
	import ArticleList from '$lib/components/ArticleList.svelte';
	import type { Article, ArticlePreview } from '$lib/article.types';

	export let data: { featuredArticles: ArticlePreview[] } | undefined;
	let loading = true;

	$: if (data) {
		loading = false;
	}
</script>

<!-- HOME PAGE -->
<BackgroundComponent />

{#if data}
	<!-- Featured Section -->
	<div class="mx-auto p-3 w-full md:w-3/4 lg:w-3/5 mt-1 md:mt-5 z-10 mb-2">
		<!-- Mobile view -->
		<div class="block md:hidden col">
			<FeaturedArticleComponent preview={data.featuredArticles[0]}></FeaturedArticleComponent>
			<div class="pt-3"></div>
			<FeaturedListComponent previews={data.featuredArticles.slice(3, 6)}></FeaturedListComponent>
		</div>

		<!-- Medium+ Screens -->
		<div class="hidden md:grid grid-cols-11 grid-rows-7 gap-6">
			<div class="col-span-8 row-span-4">
				<FeaturedArticleComponent preview={data.featuredArticles[0]} />
			</div>
			<div class="col-span-3 row-span-5 col-start-9">
				<FeaturedListComponent previews={data.featuredArticles.slice(3, 6)} />
			</div>
			<div class="col-span-3 row-span-2 col-start-9 row-start-6">
				<TextSectionComponent
					title="About"
					description="At CruX Publication, we aim to drive progress in neuroscience and technology by delivering cutting-edge news and"
				/>
			</div>
			<div class="col-span-4 row-span-3 col-start-5 row-start-5">
				<FeaturedSubarticleComponent preview={data.featuredArticles[2]} />
			</div>
			<div class="col-span-4 row-span-3 col-start-1 row-start-5">
				<FeaturedSubarticleComponent preview={data.featuredArticles[1]} />
			</div>
		</div>
	</div>

	<ArticleList
		articles={data.featuredArticles}
		header="The Latest in Neurotech"
		includeSearch={true}
	/>
{/if}
