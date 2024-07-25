<script>
	export let data;
</script>

<div class="flex flex-col mx-auto p-3 w-5/6 sm:w-3/4 md:w-1/2 lg:w-2/5 mt-5 z-0"> 

    <h1 class="text-5xl mb-1 font-extrabold text-primary">{data.article.title}</h1>
    
    <div class="flex flex-row justify-between text-zinc-500 mb-1 ">
        <p class="font-semibold">{data.article.author}</p>
        <p>{data.article.date}</p>
    </div>

    <img class="rounded-2xl w-max-full aspect-[4/3] object-cover" src="{data.article.img}" alt="{data.article.description}">

    <p class="text-zinc-500 mt-1 font-light ">Photo Credits: Tobias B. Determined</p>

    <!-- <p class="font-serif mb-3 text-lg md:text-xl">{data.article.description}</p> -->

    <div class="divider-primary w-4/5 mx-auto"></div>

    <br>

    <div class="font-serif">
        <p class="text-justify mb-3 first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start">{data.article.content}</p>
        <p class="text-justify mb-3">{data.article.content}</p>
        <p class="text-justify mb-3">{data.article.content}</p>
        <!-- Maybe make each paragraph/image an item in an array? -->
    </div>


</div>
