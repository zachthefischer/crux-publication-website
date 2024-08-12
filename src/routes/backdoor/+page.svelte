<script>
// @ts-nocheck

	import { articleData } from "../../data";

    export let data;

    // Home Page
    let featuredMainArticle = '';
    let featuredSubarticle1 = '';
    let featuredSubarticle2 = '';
    let listArticle1 = '';
    let listArticle2 = '';
    let listArticle3 = '';

    // Business Page
    let businessMainArticle = '';
    let businessSubArticle = '';

    // Tech Page
    let techMainArticle = '';
    let techSubArticle = '';

    // Science Page
    let scienceMainArticle = '';
    let scienceSubArticle = '';


    // New Article
    let newTitle;
    let newAuthor      = '';
    let newDate        = '';
    let newCategory    = '';
    let newDescription = '';
    let newImage       = { type: 'image' };
    let errorMessages  = [];
    let articleObject  = {}

    /**
	 * @type {ConcatArray<{ type: string; }>}
	 */
    let fields = []; // Array to manage all fields

    function addParagraph() {
        fields = [{ type: 'paragraph' }].concat(fields);
    }

    function addImage() {
        fields = [{ type: 'image' }].concat(fields);
    }

    /**
	 * @param {{ target: { files: any[]; }; }} event
	 * @param {string | number} index
	 */
    function handleImageUpload(event, index = -1) {
        const file = event.target.files[0];

        console.log(event.target.files);
        if (file) {
            if (index !== -1) {
                // Image upload to article
                fields[index] = { type: 'image', src: URL.createObjectURL(file) };
            } else {
                // Image upload to Main Photo
                newImage = { type: 'image', src: URL.createObjectURL(file) };
            }  
        }
    }

    function handleParagraphChange(event, index) {
        console.log(event);
        fields[index] = { type: 'paragraph', text: event.target.value };
    }

    function handleRemoveField(index) {
        fields.splice(index, 1); // Remove the item at the specified index
        fields = [...fields]; // Force reactivity
        console.log(fields);
    }

    function handleSubmit() {
        // No errors to begin
        errorMessages = [];

        // Validate all fields
        if (!newTitle) { errorMessages.push("Title field is invalid")}
        if (!newAuthor) { errorMessages.push("Author field is invalid")}
        if (!newDate) { errorMessages.push("Date field is invalid")}
        if (!newCategory) { errorMessages.push("Category field is invalid")}
        if (!newDescription) { errorMessages.push("Description field is invalid")}
        if (!newImage.src) { errorMessages.push("Image field is invalid")}
        if (!fields) { errorMessages.push("Content fields are invalid")}


        for (let field of fields) {
            if (field.type === "paragraph" && !field.text) {
                errorMessages.push("Article content paragraph invalid");
            } else if (field.type === "image" && !field.src) {
                errorMessages.push("Article content image invalid");
            }
        }

        if (errorMessages.length > 0) { return; }

        articleObject = {
            title       : newTitle,
            author      : newAuthor,
            date        : newDate,
            category    : newCategory,
            description : newDescription,
            image       : newImage,
            content     : fields
        }

        console.log("finished object:", articleObject);
    }

</script>


<div role="tablist" class="w-1/2 mx-auto my-10 tabs tabs-lifted">
    
    
    <!-- Authenticate Section -->
    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Authenticate" checked={true} />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div class="flex flex-col gap-2 w-1/2 mx-auto">
            <label class="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70"> <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /> <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /> </svg>
                <input type="text" class="grow" placeholder="Email" />
            </label>
            
            <label class="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                <input type="text" class="grow" placeholder="Username" />
            </label>
            
            <label class="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70"> <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /> </svg>
                <input type="password" class="grow" placeholder="Password" value="" />
            </label>    
            
            <button class="btn btn-sm btn-accent" >Submit</button>
        </div>
    </div>


    <!-- Featured Articles Section -->
    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Featured" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div class="flex flex-col w-3/4 mx-auto">

            <!-- Front page featured articles -->
                         <!-- TODO: Make the select its own component? -->
            <div class="flex flex-row justify-between">
                <div class="text-2xl font-semibold">Home Page</div>
                <button class="btn btn-sm btn-accent" >Save</button>
            </div>
            <div class="mt-1">Main featured article</div>
            <select 
                bind:value={featuredMainArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">Sub-Article 1</div>
            <select 
                bind:value={featuredSubarticle1} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">Sub-Article 2</div>
            <select 
                bind:value={featuredSubarticle2} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">List Article 1</div>
            <select 
                bind:value={listArticle1} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">List Article 2</div>
            <select 
                bind:value={listArticle2} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">List Article 3</div>
            <select 
                bind:value={listArticle3} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>


            <!-- Business Page -->
            <div class="mt-8 flex flex-row justify-between">
                <div class="text-2xl font-semibold">Business Page</div>
                <button class="btn btn-sm btn-accent" >Save</button>
            </div>
            <div class="mt-1">Main Article</div>
            <select 
                bind:value={businessMainArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">Sub-Article</div>
            <select 
                bind:value={businessSubArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>

            
            <!-- Tech Page -->
            <div class="mt-8 flex flex-row justify-between">
                <div class="text-2xl font-semibold">Tech Page</div>
                <button class="btn btn-sm btn-accent" >Save</button>
            </div>
            <div class="mt-1">Main Article</div>
            <select 
                bind:value={techMainArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">Sub-Article</div>
            <select 
                bind:value={techSubArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>

            <!-- Science Page -->
            <div class="mt-8 flex flex-row justify-between">
                <div class="text-2xl font-semibold">Science Page</div>
                <button class="btn btn-sm btn-accent" >Save</button>
            </div>
            <div class="mt-1">Main Article</div>
            <select 
                bind:value={scienceMainArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
            <div class="mt-1">Sub-Article</div>
            <select 
                bind:value={scienceSubArticle} 
                class="select select-bordered flex-wrap bg-white border">
                {#each data.articles as article}
                    <option value={article.title}>{article.title}</option>
                {/each}
            </select>
        </div>
    </div>
  
    
    <!-- New Article Page -->
    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Create" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div class="flex flex-col gap-2 px-5">

            <!-- Basic Info -->
            <div class="text-2xl font-semibold">Basic Info:</div>
            <label class="input input-bordered flex items-center gap-2">
                Title:
                <input bind:value={newTitle} type="text" class="grow" placeholder="Grapes of Wrath" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                Author:
                <input bind:value={newAuthor} type="text" class="grow" placeholder="John Steinbeck" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                Date:
                <input bind:value={newDate} type="text" class="grow" placeholder="April 14, 1939" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                Description:
                <input bind:value={newDescription} type="text" class="grow" placeholder="1-2 sentence description." />
            </label>
            <select 
                bind:value={newCategory} 
                class="select select-bordered flex-wrap bg-white border text-md py-1 px-4 rounded-lg">
                <option value="" disabled selected hidden>Category</option>
                <option value="Business"  >Business</option>
                <option value="Technology">Technology</option>
                <option value="Science"   >Science</option>
            </select>
            <div> 
                <label class="form-control w-full">
                    <div class="label p-0 ps-3 pb-1 -mt-1"><span class="label-text">Cover photo:</span></div>
                    <input type="file" class="file-input file-input-bordered file-input-accent w-full" 
                    on:change={event => handleImageUpload(event, -1)} />
                </label>

                {#if newImage.src}
                    <img src={newImage.src} alt="Title img" class="w-1/3 m-5 aspect-[4/3] object-cover rounded-lg" />
                {/if}
            </div>

            <!-- Article Content -->
            <div class="text-2xl font-semibold mt-5">Article:</div>
            <div class="flex flex-col-reverse p-5 bg-zinc-100 rounded-lg border border-separate">
                <div class="flex flex-row my-1">
                    <button 
                        class="btn btn-sm btn-primary me-2" 
                        on:click={addParagraph}>
                        + Paragraph
                    </button>
                    <button 
                        class="btn btn-sm btn-accent" 
                        on:click={addImage}>
                        + Image
                    </button>
                </div>
    
                {#each fields as field, index}
                    {#if field.type === 'paragraph'}
                        <div class="flex flex-row w-full">
                            <textarea 
                                class="grow mb-3 me-1 textarea textarea-bordered leading-5" 
                                placeholder="Paragraph"
                                value={(field.text) ? field.text : ''}
                                on:change={event => handleParagraphChange(event, index)}/>
                            <button 
                                class="btn btn-sm bg-zinc-200 hover:bg-zinc-300"
                                on:click={() => handleRemoveField(index)}>
                                <span class="text-zinc-600">x</span>
                            </button>
                        </div>
                    {/if}

                    {#if field.type === 'image'}
                        <div class="mb-3">
                            <div class="flex flex-row">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    on:change={event => handleImageUpload(event, index)}
                                    FileList={(field.src) ? [{name: field.src}] : []}
                                    class="file-input file-input-bordered file-input-accent w-full me-1"/>
                                <button 
                                    class="btn btn-sm bg-zinc-200 hover:bg-zinc-300"
                                    on:click={() => handleRemoveField(index)}>
                                    <span class="text-zinc-600">x</span>
                                </button>
                            </div>

                            {#if field.src}
                                <img src={field.src} alt="Title img" class="w-1/3 m-5 aspect-[4/3] object-cover rounded-md" />
                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>

            <div class="mt-5 justify-items-center">
                {#each errorMessages as message}
                    <div class="text-red-400 text-sm mb-1">{message}</div>
                {/each}
                <button class="btn text-lg bg-green-600 hover:bg-green-700 w-full" on:click={handleSubmit}>Publish Article</button>
            </div>
    </div>
    </div>
</div>


<style>
    .btn {
        color: white;
    }

    .input, .select, .file-input {
        height: 40px !important;
        min-height: 10px !important;
    }
</style>