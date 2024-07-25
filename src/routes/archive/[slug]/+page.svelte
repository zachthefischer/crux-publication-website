<script>
    import ArticleCardComponent from '$lib/components/ArticleCardComponent.svelte';
   
    export let data = { articles: [], slug: 'all' }; // Example data
    let selectedCategory = data.slug;
    // Watch for changes to data.slug and update selectedCategory accordingly

    let selectedSort = "none";
</script>

<div class="mx-auto p-3 w-3/5 mg:w-1/2 lg:w-2/5 mb-5 mt-3">
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

        <select 
            bind:value={selectedCategory} 
            class="select select-bordered w-auto bg-gray-200 border-none">
            <option value="All">All Articles</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>    
        </select>
    </div>
</div>

<h1 class="text-center text-3xl text-accent font-mono font-semibold mb-1">{selectedCategory} Publications</h1>

<div class="mx-auto p-3 w-3/5 mg:w-1/2 lg:w-2/5 mb-5">
    {#each data.articles as article}
        {#if article.category === selectedCategory || selectedCategory === "All"}
            <ArticleCardComponent article={article}></ArticleCardComponent>
        {/if}
    {/each}
</div>
