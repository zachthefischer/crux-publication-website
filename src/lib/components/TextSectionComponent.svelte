<script>
    export let title = '';
    export let description = '';
</script>

<a href="/about">
<div class="w-full h-full rounded-lg transition duration-200 ease-in hover:shadow-md hover:bg-white/85 group border border-zinc-400 hover:border-zinc-300 text-zinc-700 shadow p-4">
    <div class="text-xl font-bold font-mono group-hover:brightness-75">
        {title}
    </div>

    <div class="text-zinc-500 italic overflow-hidden md:line-clamp-4 group-hover:brightness-75">
        {description}
    </div>
</div>
</a>