<script>
	import ArticleCardComponent         from "$lib/components/ArticleCardComponent.svelte";
	import FeaturedArticleComponent     from "$lib/components/FeaturedArticleComponent.svelte";
    import FeaturedSubarticleComponent  from "$lib/components/FeaturedSubarticleComponent.svelte";
	import FeaturedListComponent        from "$lib/components/FeaturedListComponent.svelte";
	import TextSectionComponent        from "$lib/components/TextSectionComponent.svelte";

    import ArticlePreviewComponent      from "$lib/components/ArticlePreviewComponent.svelte";
	import BackgroundComponent          from "$lib/components/BackgroundComponent.svelte";
    export let data;

    // Calculate a random article if data is available
    let featuredArticle = data.articles[Math.floor(Math.random() * data.articles.length)];
    let featuredSubarticle1 = data.articles[Math.floor(Math.random() * data.articles.length)];
    let featuredSubarticle2 = data.articles[Math.floor(Math.random() * data.articles.length)];

    let listArticle1 = data.articles[Math.floor(Math.random() * data.articles.length)];
    let listArticle2 = data.articles[Math.floor(Math.random() * data.articles.length)];
    let listArticle3 = data.articles[Math.floor(Math.random() * data.articles.length)];
</script>

<!-- HOME PAGE -->
<BackgroundComponent/>

<!-- Featured Section -->
<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 mt-5 z-10 mb-2">
    <!-- Mobile view -->
    <div class="block md:hidden col">
        <FeaturedArticleComponent article={featuredArticle}></FeaturedArticleComponent>
        <div class="pt-3"></div>
        <FeaturedListComponent  article1={listArticle1} article2={listArticle2} article3={listArticle3}></FeaturedListComponent>  
        <!-- <div class="pt-3"></div> -->
        <!-- <FeaturedSubarticleComponent article={featuredSubarticle1}></FeaturedSubarticleComponent> -->
        <!-- <div class="pt-3"></div> -->
        <!-- <FeaturedSubarticleComponent article={featuredSubarticle2}></FeaturedSubarticleComponent> -->
    </div>

    <!-- Medium+ Screens -->
    <div class="hidden md:grid grid-cols-11 grid-rows-7 gap-6">
        <div class="col-span-8 row-span-4">                         <FeaturedArticleComponent article={featuredArticle}/>             </div>
        <div class="col-span-3 row-span-5 col-start-9">             <FeaturedListComponent  article1={listArticle1} article2={listArticle2} article3={listArticle3}/>                  </div>        
        <div class="col-span-3 row-span-2 col-start-9 row-start-6"> <TextSectionComponent title="About" description="At CruX Publication, we aim to drive progress in neuroscience and technology by delivering cutting-edge news and"/></div>
        <div class="col-span-4 row-span-3 col-start-5 row-start-5"> <FeaturedSubarticleComponent article={featuredSubarticle1}/>  </div>
        <div class="col-span-4 row-span-3 col-start-1 row-start-5"> <FeaturedSubarticleComponent article={featuredSubarticle2}/>   </div>
    </div>
</div>


<!-- Latest Section -->
<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 mt-3 z-10 mb-2">
    <div class="flex flex-col h-full">
    
        <!-- "The Latest in Neurotech" -->
        <div class="flex-none w-full bg-gradient-to-r from-[#315AB0] to-[#07d1f9c1]  p-3 rounded-t-lg">
            <div class="flex-none text-3xl font-bold text-zinc-100">The Latest in Neurotech</div>
        </div>

        <!-- Article List -->
        <div class="grow w-full duration-200 ease-in bg-white md:bg-white/75 rounded-b-lg shadow hover:shadow-lg overflow-hidden">
            {#each data.articles.slice(0, 5) as article, index}
                <ArticlePreviewComponent article={article}></ArticlePreviewComponent>
                {#if index < 4}
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