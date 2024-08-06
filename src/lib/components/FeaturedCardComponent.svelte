<script>
	export let article = {slug: "Example", title: "Title", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
</script>


<a href="/article/{article.slug}">
    <div class="flex flex-col sm:flex-row bg-zinc-100/50 hover:brightness-95 rounded-xl mt-4 md:max-h-80 border duration-200 ease-in hover:shadow">
        <div class="flex sm:flex-none w-full max-h-64 md:h-auto sm:w-2/5 justify-center text-zinc-900">
            <img class="object-cover w-full h-auto rounded-xl sm:rounded-tr-none"
            src="{article.img}"
            alt="{article.description}" />     
        </div>

        <div class="p-5 flex flex-col justify-between text-primary">
                <h2 class="card-title italic text-accent">Featured Article:</h2>
                <h2 class="text-4xl font-bold">{article.title}</h2>
                <p class="text-lg mb-2 overflow-hidden">{article.description}</p>
    
                <div class="flex flex-row justify-between">
                    <p>{article.author}</p>
                    <p class="align-right">{article.date}</p>
                </div>    

         </div>
    </div>
</a>

<!-- border-solid border-[4px] border-primary -->