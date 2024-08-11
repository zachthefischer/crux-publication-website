<script>
	export let article1 = {slug: "Example", title: "Title", category: "Business", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
	export let article2 = {slug: "Example", title: "Title", category: "Business", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
	export let article3 = {slug: "Example", title: "Title", category: "Business", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
</script>

<div class="flex flex-col h-full">
    <!-- "Featured" -->
    <div class="flex-none text-3xl font-bold text-zinc-800 pb-3">Featured</div>

    <!-- Article List -->
    <div class="grow w-full duration-200 ease-in bg-white/85 rounded-lg shadow hover:shadow-lg">

        <!-- Article 1 -->
        <!-- <div class="divider divider-zinc-300 my-1 mt-3 px-3 py-0">  <span class="text-accent font-bold">{article1.category}</span></div> -->
        <a href="/article/{article1.slug}">   
            <div class="px-4 py-2">
                <!-- Category -->
                <div class="text-accent font-bold">{article1.category}</div>
                <!-- Title -->
                <p class="text-lg font-bold font-mono md:line-clamp-3 leading-6 text-zinc-700 hover:text-accent">{article1.title}</p>
                <!-- Author/date -->
                <p class="text-zinc-500">{article1.author}</p>
            </div>
        </a>

        <!-- Article 2 -->
        <div class="divider divider-zinc-300 my-0 px-3 py-0 h-[2px]"> </div>

        <a href="/article/{article2.slug}">   
            <div class="px-4 py-2">
                <!-- Category -->
                <div class="text-accent font-bold">{article2.category}</div>
                <!-- Title -->
                <p class="text-lg font-bold font-mono md:line-clamp-3 leading-6 text-zinc-700 hover:text-accent">{article2.title}</p>
                <!-- Author/date -->
                <p class="text-zinc-500">{article2.author}</p>
            </div>
        </a>

        <!-- Article 3 -->
        <div class="divider divider-zinc-300 my-0 px-3 py-0"> </div>
        <!-- <div class="divider divider-zinc-300 my-1 px-3 py-0">  <span class="text-accent font-bold">{article3.category}</span></div> -->
        <a href="/article/{article3.slug}">   
            <div class="px-4 py-2">
                <!-- Category -->
                <div class="text-accent font-bold">{article2.category}</div>
                <!-- Title -->
                <p class="text-lg font-bold font-mono md:line-clamp-3 leading-6 text-zinc-700 hover:text-accent">{article3.title}</p>
                <!-- Author/date -->
                <p class="text-zinc-500">{article3.author}</p>
            </div>
        </a>

    </div>
</div>



