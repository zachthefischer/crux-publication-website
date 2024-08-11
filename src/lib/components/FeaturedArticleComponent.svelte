<script>
	export let article = {slug: "Example", title: "Title", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
</script>


<a href="/article/{article.slug}">   
    <div class="w-full h-full flex flex-col bg-zinc-800 rounded-lg duration-200 ease-in shadow-md hover:bg-zinc-900 hover:shadow-lg">
        <!-- Image -->
        <img class="flex-none object-cover w-full h-full max-h-72 rounded-t-lg" src="{article.img}" alt="{article.description}" />
      
        <!-- Title -->
        <p class="flex-none text-2xl md:text-3xl font-bold md:line-clamp-3 font-mono text-zinc-50 px-4 pt-4">{article.title}</p>

        <div class="grow"></div>
        
        <!-- Author/date -->
        <div class="flex flex-row justify-between px-4 pb-3 text-sm md:text-md text-zinc-300">
            <p class="font-semibold">{article.author}</p>
            <p>{article.date}</p>
        </div>
    </div>      
</a>

<!-- border-solid border-[4px] border-primary -->
<!-- <p class="text-lg mb-2 overflow-hidden">{article.description}</p> -->
<!-- <h2 class="card-title italic text-accent">Featured Article:</h2> -->
