<script lang="ts">
	import type { ArticlePreview, Category } from '$lib/article.types';
	import { searchArticles } from '$lib/firebase.services';
	import ArticlePreviewCard from './ArticlePreviewCard.svelte';

	export let articles: ArticlePreview[];
	export let header = '';
	export let category = 'All' as Category;
	export let includeSearch = true;

	let searchQuery = '';
	let selectedSort = 'none';
	let debounceTimeout: ReturnType<typeof setTimeout>;

	async function runSearch(query: string) {
		console.log('Searching for:', query);
		articles = await searchArticles(query, category);
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;

		// Clear the previous timeout
		clearTimeout(debounceTimeout);

		// Set a new timeout (e.g., 300ms delay)
		debounceTimeout = setTimeout(() => {
			runSearch(searchQuery);
		}, 300);
	}
</script>

<!-- Search Section -->
{#if includeSearch}
	<div class="mx-auto w-3/5 md:w-1/2 lg:w-2/5 my-0 pb-0 md:py-3 md:my-3 z-10">
		<div class="flex flex-row justify-center">
			<label class="input input-bordered flex items-center gap-2 w-80 md:w-96 ms-2">
				<input type="text" class="grow" placeholder="Search All Articles" on:input={handleInput} />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-70"
				>
					<path
						fill-rule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clip-rule="evenodd"
					/>
				</svg>
			</label>

			<select
				bind:value={selectedSort}
				class="select select-bordered flex-wrap mx-3 w-auto bg-white border"
			>
				<option disabled value="none">Sort</option>
				<option value="date">Date</option>
				<option value="author">Author</option>
				<option value="a-z">A-Z</option>
			</select>
		</div>
	</div>
{/if}

<div class="mx-auto px-3 w-full md:w-3/4 lg:w-3/5 md:mt-3 z-10 mb-2">
	<div class="flex flex-col h-full">
		<!-- If header exists, rounded just on bottom, otherwise rounded everywhere- -->
		{#if articles.length === 0}
			<div class="mt-10 text-center mb-20">No articles matched your query.</div>
		{:else}
			<!-- List Header if it exists -->
			{#if header !== ''}
				<div
					class="flex-none w-full bg-gradient-to-r from-[#315AB0] to-[#07d1f9c1] p-3 rounded-t-lg"
				>
					<div class="flex-none text-3xl font-bold text-zinc-100">The Latest in Neurotech</div>
				</div>
			{/if}

			<div
				class="grow w-full duration-200 ease-in bg-white md:bg-white/75 rounded-b-lg shadow hover:shadow-lg overflow-hidden"
				class:rounded-t-lg={header === ''}
			>
				{#each articles.slice(0, 20) as article, index}
					<ArticlePreviewCard preview={article}></ArticlePreviewCard>
					{#if index < 19}
						<div class="mx-6 border-zinc-300 border-[0.5px]"></div>
					{/if}
				{/each}
			</div>

			<!-- Switch pages -->
			<div class="flex-none join my-3 mb-5 text-zinc-700 mx-auto shadow ease-in duration-200">
				<button class="join-item btn bg-white/75 hover:bg-zinc-200/75"
					><i class="fas fa-chevron-left"></i></button
				>
				<button class="join-item btn bg-white/75 hover:bg-zinc-200/75">Page 1 of 1</button>
				<button class="join-item btn bg-white/75 hover:bg-zinc-200/75"
					><i class="fas fa-chevron-right"></i></button
				>
			</div>
		{/if}
	</div>
</div>
