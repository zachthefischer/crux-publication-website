<script>
    import ArticleCardComponent from '$lib/components/ArticleCardComponent.svelte';
	import ArticlePreviewComponent from '$lib/components/ArticlePreviewComponent.svelte';
	import BackgroundComponent from '$lib/components/BackgroundComponent.svelte';
	import FeaturedArticleComponent from '$lib/components/FeaturedArticleComponent.svelte';
	import FeaturedSubarticleComponent from '$lib/components/FeaturedSubarticleComponent.svelte';
	import TextSectionComponent from '$lib/components/TextSectionComponent.svelte';
   
    // export let data./[slug]/$types.js = { articles: [], slug: 'all' }; // Example data
    let selectedCategory = "Technology";
    
    export let data;
    let featuredArticle = data.articles[Math.floor(Math.random() * data.articles.length)];
    let featuredSubarticle1 = data.articles[Math.floor(Math.random() * data.articles.length)];

    // Watch for changes to data.slug and update selectedCategory accordingly

    let selectedSort = "none";
</script>

<canvas id="backgroundCanvas" class="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-white from-50% to-zinc-300"></canvas>

<!-- Featured Section -->
<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 mt-2 md:mt-3 z-10 mb-2">

    <!-- "Technology Publications" Title with background hover -->
    <div class="flex flex-row w-full mb-5 md:mb-6">
        <div class="flex items-center relative bg-gradient-to-r from-[#315AB0] to-[#07d1f9c1] w-full h-full rounded-lg shadow-lg p-4">
            <div class="ps-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Technology Publications
            </div>    

            <div class="p-4 opacity-0 rounded-lg flex items-center hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-r from-[#20438c] to-[#3060c7a4] shadow-inner">
                <div class="ps-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Technology Publications
                </div>   
            </div>
        </div>
    </div>   

    <!-- Mobile view -->
    <div class="block md:hidden col">
        <FeaturedArticleComponent article={featuredArticle}></FeaturedArticleComponent>
        <div class="py-3"></div>
        <FeaturedSubarticleComponent article={featuredSubarticle1}/>
        <div class="py-3"></div>
        <TextSectionComponent title='' description="Covering the latest developments, trends, and innovations at the intersection of neuroscience and technology"/>

        <div class="py-1"></div>
        <!-- <div class="pt-3"></div> -->
        <!-- <FeaturedSubarticleComponent article={featuredSubarticle1}></FeaturedSubarticleComponent> -->
        <!-- <div class="pt-3"></div> -->
        <!-- <FeaturedSubarticleComponent article={featuredSubarticle2}></FeaturedSubarticleComponent> -->
    </div>


    <!-- Medium+ Screens -->
    <div class="hidden md:flex flex-col">
        <div class="flex flex-row w-full">
            <div class="flex flex-col w-2/3">
                <!-- Big Featured Article -->
                <div class="h-full"> <FeaturedArticleComponent article={featuredArticle}/> </div>
            </div>

            <div class="flex flex-col w-1/3 ms-5">
                <!-- Featured Subarticle -->
                <div class="mb-5"> <FeaturedSubarticleComponent article={featuredSubarticle1}/>   </div>

                <!-- About Technology -->
                <div class="h-full"> <TextSectionComponent title='' description="Covering the latest developments, trends, and innovations at the intersection of neuroscience and technology"/>   </div>
            </div>
        </div>
    </div>
</div>

<!-- Search/Sort Articles -->
<div class="mx-auto w-3/5 mg:w-1/2 lg:w-2/5 my-0 pb-0 md:py-3 md:my-3 z-10">
    <div class="flex flex-row justify-center">
        <label class="input input-bordered flex items-center gap-2 w-80 md:w-96 ms-2">
            <input type="text" class="grow" placeholder="Search Articles" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70"> <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /> </svg>
        </label>

        <select 
            bind:value={selectedSort} 
            class="select select-bordered flex-wrap mx-3 w-auto bg-white border">
            <option disabled value="none">Sort</option>
            <option value="date">Date</option>
            <option value="author">Author</option>
            <option value="a-z">A-Z</option>
        </select>
    </div>
</div>

<div class="mx-auto p-3 w-[90%] md:w-3/4 lg:w-3/5 md:mt-2 z-10 mb-2">
    <div class="flex flex-col h-full">

        <!-- Article List -->
        <div class="grow w-full duration-200 ease-in bg-white rounded-lg shadow hover:shadow-lg overflow-hidden border">
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
