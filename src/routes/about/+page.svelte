<script>
	import BackgroundComponent from "$lib/components/BackgroundComponent.svelte";

    const team = [
        {
            name: "Ben Falkenberg",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Co-President",
        },
        {
            name: "Mark Lee",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Co-President",
        },
        {
            name: "Zach Fischer",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Webmaster",
        },
        {
            name: "Abby",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author",
        },
        {
            name: "Aadi",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author",
        },
        {
            name: "Jonny",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author",
        }
    ]
</script>

<!-- ABOUT PAGE -->

<BackgroundComponent/>

<div class="flex flex-col mx-auto p-3 w-5/6 sm:w-3/4 md:w-3/5 lg:w-1/2 mt-5 text-center text-primary z-10"> 
    <!-- Our mission -->
    <div class="p-5 rounded-xl bg-white/85 border mb-8">
        <p class="text-4xl font-bold mb-4">Our Mission</p>

        <p>
            At CruX Publication, we aim to drive progress in neuroscience and technology by delivering cutting-edge news and analysis. Our mission is to inform and connect the neurotech community, highlight groundbreaking research and innovations, and inspire advancements that enhance mental health and cognitive function. Through expert insights and comprehensive coverage, we strive to be the go-to source for the latest in neurotechnology.
        </p>
        <br>
        <p>CruX UCLA Organization: <a class="underline" href="https://www.cruxucla.com/">cruxucla.com</a></p>
        <p>Our parent organization <a class="underline" href="https://neurotechx.com/">neurotechx</a></p>
    </div>

    <!-- Meet the Team -->
    <div class="p-5 rounded-xl bg-white/85 border mb-8">
        <p class="text-4xl font-bold mb-4">Meet the Team</p>

        <div class="flex flex-wrap justify-center gap-4">
            {#each team as member}
            <div class="flex flex-col justify-center w-36 transition duration-200 ease-in hover:bg-zinc-200 hover:shadow p-2 rounded-lg">
                <div class="mx-auto avatar">
                    <div class="w-24 rounded-full">
                        <img src="{member.profilePic}" alt="{member.name} profile pic" />
                    </div>                
                </div>

                <div>
                    <p class="text-sm font-bold">{member.name}</p>
                    <p class="text-sm">{member.title}</p>
                </div>
            </div>
            {/each}
        </div>
    </div>

    <!-- Our mission -->
    <div class="p-5 rounded-xl bg-white/85 border mb-8">
        <p class="text-4xl font-bold mb-4">Contact us yo</p>
        <p>Email us: <a class="font-bold" href="https://www.cruxucla.com/">write2crux@gmail.com</a></p>
        <p>Call us? <a class="font-bold" href="https://neurotechx.com/">408-201-2443</a></p>
        <p>Join the newsletter! <a class="font-bold" href="https://www.cruxucla.com/">(it's down there)</a></p>
    </div>

</div>
  