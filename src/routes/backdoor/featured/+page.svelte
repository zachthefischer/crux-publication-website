<script lang="ts">
	import { session } from '$lib/services/session';
	import { goto } from '$app/navigation';
	import FeaturedDropdownComponent from '$lib/components/FeaturedDropdownComponent.svelte';

	// DATA MANAGEMENT
	export let data;

	// FEATURED ARTICLES
	// Home Page
	let featuredMainArticle = '';
	let featuredSubarticle1 = '';
	let featuredSubarticle2 = '';
	let listArticle1 = '';
	let listArticle2 = '';
	let listArticle3 = '';
	// Business Page
	let businessMainArticle = '';
	let businessSubArticle = '';
	// Tech Page
	let techMainArticle = '';
	let techSubArticle = '';
	// Science Page
	let scienceMainArticle = '';
	let scienceSubArticle = '';

	// Navigation
	function goBack() {
		goto('/backdoor');
	}
</script>

<div class="min-h-screen bg-gray-100 p-8">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Featured Articles Management</h1>
				<p class="text-gray-600 mt-2">Manage which articles appear on each page</p>
			</div>
			<button on:click={goBack} class="btn btn-secondary"> ← Back to Dashboard </button>
		</div>

		<!-- Featured Articles Form -->
		<div class="bg-white rounded-lg shadow-md p-6">
			<!-- Front page featured articles -->
			<div class="mb-8">
				<div class="flex flex-row justify-between mb-4">
					<div class="text-2xl font-semibold">Home Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>

				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium mb-2">Main featured article</div>
						<select
							bind:value={featuredMainArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">Sub-Article 1</div>
						<select
							bind:value={featuredSubarticle1}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">Sub-Article 2</div>
						<select
							bind:value={featuredSubarticle2}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">List Article 1</div>
						<select bind:value={listArticle1} class="select select-bordered w-full bg-white border">
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">List Article 2</div>
						<select bind:value={listArticle2} class="select select-bordered w-full bg-white border">
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">List Article 3</div>
						<select bind:value={listArticle3} class="select select-bordered w-full bg-white border">
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Business Page -->
			<div class="mb-8">
				<div class="flex flex-row justify-between mb-4">
					<div class="text-2xl font-semibold">Business Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>

				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium mb-2">Main Article</div>
						<select
							bind:value={businessMainArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">Sub-Article</div>
						<select
							bind:value={businessSubArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Tech Page -->
			<div class="mb-8">
				<div class="flex flex-row justify-between mb-4">
					<div class="text-2xl font-semibold">Tech Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>

				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium mb-2">Main Article</div>
						<select
							bind:value={techMainArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">Sub-Article</div>
						<select
							bind:value={techSubArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Science Page -->
			<div class="mb-8">
				<div class="flex flex-row justify-between mb-4">
					<div class="text-2xl font-semibold">Science Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>

				<div class="space-y-4">
					<div>
						<div class="text-sm font-medium mb-2">Main Article</div>
						<select
							bind:value={scienceMainArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<div class="text-sm font-medium mb-2">Sub-Article</div>
						<select
							bind:value={scienceSubArticle}
							class="select select-bordered w-full bg-white border"
						>
							<option value="">Select an article</option>
							{#each data.articles as article}
								<option value={article.title}>{article.title}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.btn {
		color: white;
	}
	.select {
		height: 40px !important;
		min-height: 10px !important;
	}
</style>
