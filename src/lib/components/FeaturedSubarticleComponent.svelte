<script>
	export let article = {slug: "Example", title: "Title", category: "Business", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
</script>


<a href="/article/{article.slug}">   
    <div class="w-full h-full flex flex-col bg-white/80 rounded-lg shadow duration-200 ease-in hover:bg-zinc-200/90 hover:shadow-lg group">
        
        <img class="flex-none object-cover w-full max-h-44 rounded-t-lg" src="{article.img}" alt="{article.description}" />     

        <!-- Title -->
        <p class="flex-none text-lg md:*:text-xl font-bold font-mono text-zinc-700 px-4 pt-2 group-hover:text-accent md:line-clamp-3 md:leading-5">{article.title}</p>

        <div class="grow"></div>
        
        <!-- Author/date -->
        <div class="flex flex-row justify-between 3 text-sm md:text-md px-4 pb-2 text-zinc-500">
            <p class="text-accent font-bold">{article.category}</p>
            <p>{article.date}</p>
        </div>
    </div>
</a>
