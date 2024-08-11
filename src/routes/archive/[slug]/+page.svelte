<script>
    import ArticleCardComponent from '$lib/components/ArticleCardComponent.svelte';
	import ArticlePreviewComponent from '$lib/components/ArticlePreviewComponent.svelte';
	import BackgroundComponent from '$lib/components/BackgroundComponent.svelte';
   
    export let data = { articles: [], slug: 'all' }; // Example data
    let selectedCategory = data.slug;
    // Watch for changes to data.slug and update selectedCategory accordingly

    let selectedSort = "none";
</script>

<BackgroundComponent/>

<div class="mx-auto p-3 w-3/5 mg:w-1/2 lg:w-2/5 mb-5 mt-3 z-10">
    <div class="flex flex-row justify-center">
        <input class="input input-bordered w-80" placeholder="Search" />

        <select 
            bind:value={selectedSort} 
            class="select select-bordered flex-wrap mx-3 w-auto bg-gray-200 border-none">
            <option disabled value="none">Sort</option>
            <option value="date">Date</option>
            <option value="author">Author</option>
            <option value="a-z">A-Z</option>
        </select>
    </div>
</div>

<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 mt-3 z-10 mb-2">
    <div class="flex flex-col h-full">

        <!-- Article List -->
        <div class="grow w-full duration-200 ease-in bg-white md:bg-white/85 rounded-lg shadow hover:shadow-lg overflow-hidden">
            {#each data.articles as article, index}
                {#if article.category === selectedCategory || selectedCategory === "All"}
                    <ArticlePreviewComponent article={article}></ArticlePreviewComponent>
                    <div class="mx-6 border-zinc-300 border-[0.5px]"></div>
                {/if}
            {/each}
        </div>

        <div class="flex-none join my-3 mb-5 text-zinc-700 mx-auto shadow hover:shadow-lg ease-in duration-200">
            <button class="join-item btn bg-white/75 hover:bg-zinc-200/75"><i class="fas fa-chevron-left"></i></button>
            <button class="join-item btn bg-white/75 hover:bg-zinc-200/75">Page 1 of 4</button>
            <button class="join-item btn bg-white/75 hover:bg-zinc-200/75"><i class="fas fa-chevron-right"></i></button>
        </div>          
    </div>
</div>
