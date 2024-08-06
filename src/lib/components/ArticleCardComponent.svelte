<script>
	export let article = {slug: "Example", title: "Title", category: "Business", description: "Somebody decides to break into the whitehouse ... ", img:"sauce.jpg", author: "Jane", date: "Jan 1, 2022"};
</script>

<a href="/article/{article.slug}">
<div class="group flex flex-col sm:flex-row mt-4 rounded-xl bg-white/75 transition duration-200 ease-in hover:shadow hover:brightness-95 border">
    
    <div class="flex sm:flex-none w-auto sm:w-2/5 justify-center text-zinc-900">
        <img class="object-cover h-48 w-96 rounded-xl sm:rounded-r-none"
        src="{article.img}"
        alt="Album" />     
    </div>
    <div class="p-4 flex flex-col justify-between">
        <div>
            <h1 class="text-2xl text-primary font-bold">{article.title}</h1>
            <h2 class="text pt-1 pb-2 text-zinc-500 line-clamp-3">{article.description}</h2>
        </div>
        <div class="flex flex-row justify-between text-zinc-500">
            <div><b>{article.author}</b> {article.date}</div>
            <div><a href="/archive/{article.category}" class="hover:text-success text-accent font-bold font-mono">{article.category}</a></div>
        </div>
    </div>
</div>
</a>