<script>
    import "../app.css";
    import BackgroundComponent from "$lib/components/BackgroundComponent.svelte";
    import FooterComponent from "$lib/components/FooterComponent.svelte";
	import Image from '$lib/components/Image.svelte'
</script>


<BackgroundComponent/>

<div class="relative flex flex-col h-screen justify-between">
    <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="navbar bg-primary w-full p-0 m-0">
                <div class="flex-none md:hidden">
                    <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block h-6 w-6 "
                        stroke="gray">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <!-- Small Title and Logo -->
                <div class="mx-2 px-2 md:hidden flex flex-row">
                    <a href="/"><img class="max-h-12" src="/src/lib/images/CruX Logo.png" alt="CruX Logo"></a>
                    <a href="/"><img class="max-h-12" src="/src/lib/images/CruX Title.png" alt="CruX Title"></a>
                </div>
                  


                <div class="navbar-start hidden md:block"></div>    
                <div class="navbar-center hidden flex-none md:block p-0">
                    <ul class="menu menu-horizontal ">
                        <!-- Navbar menu content here -->
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <a href="/"><img class="h-20 max-w-full" src="/src/lib/images/CruX Logo.png" alt="CruX Logo"></a>
                                <a href="/"><img class="h-20 max-w-full" src="/src/lib/images/CruX Title.png" alt="CruX Title"></a>
                            </div>
                            <div class="mx-auto">
                                <ul class="menu menu-horizontal p-0 pb-2 text-primary-content text-base">
                                    <li class="hover:text-white"><a href="/">Home</a></li>
                                    <li>
                                        <details>
                                            <summary class="hover:text-white">Publications</summary>
                                            <ul class="bg-primary rounded-t-none rounded-b-md z-50">
                                                <li class="hover:text-white"><a href="/archive/Business">Business</a></li>
                                                <li class="hover:text-white"><a href="/archive/Technology">Technology</a></li>
                                                <li class="hover:text-white"><a href="/archive/Science">Science</a></li>
                                                <li class="hover:text-white"><a href="/archive/All"><b>All</b></a></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li><a class="hover:text-white" href="/about"> About </a></li>
                                </ul>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="navbar-end hidden md:block"></div>
            </div>
    
            <!-- Page Content -->
                    <slot />
        </div>

        <!-- Sidebar Drawer -->
        <div class="drawer-side">
            <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-primary min-h-full w-80 p-4 text-primary-content">
                <!-- Sidebar content -->
                <li><a href="/">Home</a></li>
                <li>
                    <details>
                        <summary>Publications</summary>
                        <ul class="bg-primary rounded-t-none rounded-b-md z-50">
                            <li><a href="/archive/Business">Business</a></li>
                            <li><a href="/archive/Technology">Technology</a></li>
                            <li><a href="/archive/Science">Science</a></li>
                            <li><a href="/archive/All"><b>All</b></a></li>
                        </ul>
                    </details>
                </li>
                <li><a href="/about"> About </a></li>
            </ul>
        </div>
    </div>


    <FooterComponent></FooterComponent>
</div>