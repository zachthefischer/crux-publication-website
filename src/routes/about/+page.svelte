<script>
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
            name: "Bill Gates",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Co-Co-President",
        }, 
        {
            name: "Zach Fischer",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Webslinger",
        },
        {
            name: "Abigal",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author, Leader",
        },
        {
            name: "Ron",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author, Leader",
        },
        {
            name: "Dwayneth",
            profilePic: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            title: "Author, Leader",
        }
    ]




</script>


<div class="flex flex-col mx-auto p-3 w-5/6 sm:w-3/4 md:w-3/5 lg:w-1/2 mt-5 text-center text-primary"> 
    <!-- Our mission -->
    <div class="p-5 rounded-xl bg-zinc-100/50 mb-8">
        <p class="text-4xl font-bold mb-4">Our Mission</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur </p>
        <br>
        <p>CruX UCLA Organization: <a class="underline" href="https://www.cruxucla.com/">cruxucla.com</a></p>
        <p>Our parent organization <a class="underline" href="https://neurotechx.com/">neurotechx</a></p>
    </div>

    <!-- Meet the Team -->
    <div class="p-5 rounded-xl bg-zinc-100/50 mb-8">
        <p class="text-4xl font-bold mb-4">Meet the Team</p>

        <div class="flex flex-wrap justify-center gap-4">
            {#each team as member}
            <div class="flex flex-col justify-center w-36 hover:bg-zinc-200  p-2 rounded-lg">
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
    <div class="p-5 rounded-xl bg-zinc-100/50 mb-8">
        <p class="text-4xl font-bold mb-4">Contact us yo</p>
        <p>Email us: <a class="font-bold" href="https://www.cruxucla.com/">write2crux@gmail.com</a></p>
        <p>Call us? <a class="font-bold" href="https://neurotechx.com/">408-201-2443</a></p>
        <p>Join the newsletter! <a class="font-bold" href="https://www.cruxucla.com/">(it's down there)</a></p>
    </div>

</div>
  