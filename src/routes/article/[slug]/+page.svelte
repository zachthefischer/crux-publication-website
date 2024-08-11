<script>
	export let data;
</script>

<div class="flex flex-col mx-auto p-3 w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-2/5 mt-5 z-0"> 

    <!-- Title -->
    <h1 class=" mb-1 font-extrabold font-mono text-primary leading-10
                text-4xl lg:text-4xl xl:text-5xl ">{data.article.title}</h1>
    
    <!-- Author/Date -->
    <div class="flex flex-row justify-between text-zinc-500 mb-1 text-lg ">
        <p class="font-semibold">{data.article.author}</p>
        <p>{data.article.date}</p>
    </div>

    <!-- Image -->
    <img class="rounded-2xl w-max-full aspect-[4/3] object-cover" src="{data.article.img}" alt="{data.article.description}">
    <p class="text-zinc-500 mt-1 font-light ">Photo Credits: Tobias B. Determined</p>

    <br>

    <div class="font-serif first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start">
        {#each Array(4) as _, index}
        <p class="mb-4 text-lg md:text-xl 2xl:text-xl 2xl:leading-7">{data.article.content}</p>
        {/each}
    </div>


</div>
