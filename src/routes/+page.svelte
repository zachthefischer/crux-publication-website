<script>
	import ArticleCardComponent from "$lib/components/ArticleCardComponent.svelte";
	import FeaturedCardComponent from "$lib/components/FeaturedCardComponent.svelte";
    export let data;
</script>

<div class="mx-auto p-3 w-3/4 lg:w-3/5 mt-5 z-0 mb-2">
    <FeaturedCardComponent article={data.articles[Math.floor(Math.random() * 5)]}></FeaturedCardComponent>
</div>

<div class="mx-auto p-3 w-3/4 sm:w-3/5 mg:w-1/2 lg:w-2/5 mb-5">
    <h1 class="text-center text-3xl text-accent mb-4 font-mono font-semibold">The Latest in Neurotech</h1>

    {#each data.articles as article}
    <ArticleCardComponent article={article}></ArticleCardComponent>
    {/each}
</div>