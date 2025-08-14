<script lang="ts">
	// NOTE-- REMOVE THIS, only used for FileList error
	// @ts-nocheck
	import { articleData } from '../../data';
	import { session } from '$lib/session';
	import { addArticle } from '$lib/firebase.client';
	import { auth } from '$lib/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import type { Article } from '$lib/article.types';
	import FeaturedDropdownComponent from '$lib/components/FeaturedDropdownComponent.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import { Button, Modal } from 'flowbite-svelte';

	// DATA MANAGEMENT
	export let data;

	// AUTHENTICATION
	let email: string = '';
	let password: string = '';
	let loggedIn = false;

	// FEATURED ARTICLES
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

	// Load article
	let articleSelectModal = false;
	let selectedArticle = ''; // To store the selected article

	// NEW ARTICLE
	let articleStatus = 'Changes pending';
	let newSlug = '';
	let newTitle = 'This is a title';
	let newAuthor = 'John Author';
	let newDate = '05/19/2005';
	let newCategories = [];
	const categories = ['Business', 'Technology', 'Science'];
	let otherCategory = ''; // Store the value for "Other" input

	// NEW AUTHOR
	let newAuthorName = '';
	let newAuthorTitle = '';
	let newAuthorPFP = '';
	let newAuthorLinkedIn = '';

	let newDescription = 'This is a description';

	let newImage = { type: '', src: '' };
	let articleObject: Article;
	let errorMessages: string[] = [];

	let fields: ArticleContent[] = []; // Array to manage all fields

	// TinyMCE config with event handler (for text fields )
	let tinymceConfig = {
		menubar: true,
		height: 300,
		plugins: 'link code',
		setup(editor) {
			// Listen for keydown event to handle Tab key
			editor.on('keydown', function (e) {
				if (e.key === 'Tab') {
					e.preventDefault(); // Prevent default tab behavior
					editor.execCommand('mceInsertContent', false, '&emsp;&emsp;'); // Insert tab character
				}
			});
		}
	};

	// Log in function
	async function loginWithMail() {
		console.log('loginWithMail called');
		// await signInWithEmailAndPassword(auth, email, password)
		// 	.then((result) => {
		// 		const { user }: UserCredential = result;
		// 		session.set({
		// 			loggedIn: true,
		// 			user: {
		// 				displayName: user?.displayName,
		// 				email: user?.email,
		// 				photoURL: user?.photoURL,
		// 				uid: user?.uid
		// 			}
		// 		});
		// 		loggedIn = true;
		// 	})
		// 	.catch((error) => {
		// 		return error;
		// 	});
	}

	// Add anything
	function addContent(contentType: string) {
		fields = [...fields, { type: contentType }];
	}

	// Toggle categories
	function toggleCategory(category) {
		if (newCategories.includes(category)) {
			// Remove the category if already selected
			newCategories = newCategories.filter((c) => c !== category);
		} else {
			// Add the category if not already selected
			newCategories = [...newCategories, category];
		}
	}
	function handleOtherOptionChange(event) {
		otherCategory = event.target.value;
		if (!newCategories.includes('Other')) {
			newCategories = [...newCategories, 'Other'];
		}
	}

	// Data changes within a Paragraph box
	function handleParagraphChange(event: any, index: number) {
		console.log(event.target.value);
		fields[index] = { type: 'paragraph', text: event.target.value };
	}

	// Data changes within a Header box
	function handleHeaderChange(event: any, index: number) {
		fields[index] = { type: 'header', text: event.target.value };
	}

	// Data changes within a Header box
	function handleCustomHTMLChange(event: any, index: number) {
		fields[index] = { type: 'custom_html', text: event.target.value };
	}

	function handleVideoChange(event: any, index: number) {
		fields[index] = { type: 'video', src: event.target.value };
	}

	// Remove a field from the contenxt
	function handleRemoveField(index: number) {
		fields.splice(index, 1); // Remove the item at the specified index
		fields = [...fields]; // Force reactivity
		console.log(fields);
	}

	/**
	 * @param {string | number} index
	 */
	function handleImageUpload(event: any, index = -1) {
		const file = event.target.files[0];

		console.log(event.target.files);
		if (file) {
			if (index !== -1) {
				// Image upload to article
				fields[index] = {
					file: file,
					fileName: file.name,
					type: 'image',
					src: URL.createObjectURL(file)
				};
			} else {
				// Image upload to Main Photo
				newImage = {
					file: file,
					type: 'image',
					fileName: file.name,
					src: URL.createObjectURL(file)
				};
			}
		}
	}

	/**
	 * Function runs when "Publish Article" button is pressed
	 */
	async function handleSubmit() {
		articleStatus = 'Loading';

		// Validate all fields
		if (validateFields()) {
			articleStatus = 'Changes pending';
			return;
		}

		const articlePreview = {
			slug: newSlug,
			title: newTitle,
			author: newAuthor,
			date: newDate,
			categories: newCategories,
			description: newDescription,
			image: newImage
		};

		console.log('finished object:', articlePreview);
		try {
			await addArticle(articlePreview, fields); // Await the function
			console.log('Article added successfully!');
			articleStatus = 'Article added successfully!';
		} catch (error) {
			console.error('Error adding article:', error);
			articleStatus = 'Failed to add article';
		}
	}

	/**
	 * Function to validate each field
	 */
	function validateFields() {
		// No errors to begin
		errorMessages = [];

		if (!newTitle) {
			errorMessages.push('Title field is invalid');
		}
		if (!newAuthor) {
			errorMessages.push('Author field is invalid');
		}
		if (!newDate) {
			errorMessages.push('Date field is invalid');
		}
		if (!newCategories) {
			errorMessages.push('Category field is invalid');
		}
		if (!newDescription) {
			errorMessages.push('Description field is invalid');
		}
		if (!newImage.src) {
			errorMessages.push('Image field is invalid');
		}
		if (!fields) {
			errorMessages.push('Content fields are invalid');
		}

		for (let field of fields) {
			if (field.type === 'paragraph' && !field.text) {
				errorMessages.push('Article content paragraph invalid');
			} else if (field.type === 'image' && !field.src) {
				errorMessages.push('Article content image invalid');
			}
		}

		return errorMessages.length > 0;
	}
</script>

<div role="tablist" class="w-[90%] mx-auto my-10 tabs tabs-lifted max-w-screen-lg">
	<!-- Authenticate Section -->
	<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Login" checked={true} />

	<!-- Login Section -->
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{#if !loggedIn}
			<div class="login-form flex flex-col gap-2 w-1/2 mx-auto">
				<!-- Email input -->
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/>
					</svg>
					<input bind:value={email} type="text" class="grow" placeholder="Email" />
				</label>

				<!-- Password Input -->
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input bind:value={password} type="password" class="grow" placeholder="Password" />
				</label>

				<button on:click={loginWithMail} type="submit" class="flex grow btn btn-sm btn-accent"
					>Login</button
				>
			</div>
		{:else}
			<div class="w-full text-center flex justify-center">
				<div>Logged in</div>
			</div>
		{/if}
	</div>

	<!-- Featured Articles Section -->
	<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Featured" />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{#if loggedIn}
			<div class="flex flex-col w-3/4 mx-auto">
				<!-- Front page featured articles -->
				<!-- TODO: Make the select its own component? -->
				<div class="flex flex-row justify-between">
					<div class="text-2xl font-semibold">Home Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>
				<div class="mt-1">Main featured article</div>

				<FeaturedDropdownComponent></FeaturedDropdownComponent>
				<select
					bind:value={featuredMainArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">Sub-Article 1</div>
				<select
					bind:value={featuredSubarticle1}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">Sub-Article 2</div>
				<select
					bind:value={featuredSubarticle2}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">List Article 1</div>
				<select bind:value={listArticle1} class="select select-bordered flex-wrap bg-white border">
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">List Article 2</div>
				<select bind:value={listArticle2} class="select select-bordered flex-wrap bg-white border">
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">List Article 3</div>
				<select bind:value={listArticle3} class="select select-bordered flex-wrap bg-white border">
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>

				<!-- Business Page -->
				<div class="mt-8 flex flex-row justify-between">
					<div class="text-2xl font-semibold">Business Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>
				<div class="mt-1">Main Article</div>
				<select
					bind:value={businessMainArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">Sub-Article</div>
				<select
					bind:value={businessSubArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>

				<!-- Tech Page -->
				<div class="mt-8 flex flex-row justify-between">
					<div class="text-2xl font-semibold">Tech Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>
				<div class="mt-1">Main Article</div>
				<select
					bind:value={techMainArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">Sub-Article</div>
				<select
					bind:value={techSubArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>

				<!-- Science Page -->
				<div class="mt-8 flex flex-row justify-between">
					<div class="text-2xl font-semibold">Science Page</div>
					<button class="btn btn-sm btn-accent">Save</button>
				</div>
				<div class="mt-1">Main Article</div>
				<select
					bind:value={scienceMainArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
				<div class="mt-1">Sub-Article</div>
				<select
					bind:value={scienceSubArticle}
					class="select select-bordered flex-wrap bg-white border"
				>
					{#each data.articles as article}
						<option value={article.title}>{article.title}</option>
					{/each}
				</select>
			</div>
		{:else}
			<div class="w-full text-center flex justify-center">
				<div>Please log in first</div>
			</div>
		{/if}
	</div>

	<!-- New Article Page -->
	<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Edit" />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<!-- CHANGE BACK -->
		{#if !loggedIn}
			<div class="flex flex-col gap-2 px-5">
				<!-- Metadata -->
				<div class="flex flex-row justify-between">
					<div class="text-3xl font-bold">Metadata:</div>
					<!-- Modal toggle -->
					<Button class="bg-zinc-200 " on:click={() => (articleSelectModal = true)}
						><span class="text-zinc-700">Select Article</span></Button
					>
				</div>
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
					<input
						bind:value={newDescription}
						type="text"
						class="grow"
						placeholder="1-2 sentence description."
					/>
				</label>
				<div class="flex flex-col space-y-2 mt-2">
					{#each categories as category}
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								value={category}
								checked={newCategories.includes(category)}
								on:change={() => toggleCategory(category)}
								class="checkbox checkbox-bordered"
							/>
							<span>{category}</span>
						</label>
					{/each}

					<!-- Other option -->
					<label class="flex items-center space-x-2">
						<input
							type="checkbox"
							value="Other"
							checked={newCategories.includes('Other')}
							on:change={() => toggleCategory('Other')}
							class="checkbox checkbox-bordered"
						/>
						<span>Other</span>
					</label>

					{#if newCategories.includes('Other')}
						<input
							type="text"
							bind:value={otherCategory}
							placeholder="Please specify"
							class="input input-bordered w-full mt-2"
							on:input={handleOtherOptionChange}
						/>
					{/if}
				</div>

				<div>
					<label class="form-control w-full">
						<div class="label p-0 pb-1 mt-1">
							<span>Cover photo:</span>
						</div>
						<input
							type="file"
							class="file-input file-input-bordered file-input-accent w-full"
							on:change={(event) => handleImageUpload(event, -1)}
						/>
					</label>

					{#if newImage.src}
						<img
							src={newImage.src}
							alt="Title img"
							class="w-1/3 m-5 aspect-[4/3] object-cover rounded-lg"
						/>
					{/if}
				</div>

				<!-- Article Content -->
				<div class="text-3xl font-bold mt-5">Article:</div>
				<div class="flex flex-col p-5 bg-zinc-100 rounded-lg border border-separate">
					{#each fields as field, index}
						{#if field.type === 'paragraph'}
							<!-- Paragraph content -->
							<div class="flex flex-row w-full">
								<div class="mb-3 me-1 grow">
									<Editor
										licenseKey="nr5tfa2k70yvg1zbuzu2rvguuhr5d4paqwbg3xp966forabr"
										scriptSrc="tinymce/tinymce.min.js"
										bind:value={field.text}
										conf={tinymceConfig}
									/>
								</div>

								<button
									class="btn btn-sm bg-zinc-200 hover:bg-zinc-300 border-none font-mono flex items-center justify-center rounded-full h-8 w-8 p-0"
									on:click={() => handleRemoveField(index)}
								>
									<span class="text-zinc-500">x</span>
								</button>
							</div>
						{:else if field.type === 'header'}
							<!-- Header content -->
							<div class="flex flex-row w-full">
								<input
									class="mb-3 me-1 grow input input-bordered leading-5 font-bold"
									type="text"
									placeholder="Header"
									value={field.text ? field.text : ''}
									on:change={(event) => handleHeaderChange(event, index)}
								/>

								<button
									class="btn btn-sm bg-zinc-200 hover:bg-zinc-300 border-none font-mono flex items-center justify-center rounded-full h-8 w-8 p-0"
									on:click={() => handleRemoveField(index)}
								>
									<span class="text-zinc-500">x</span>
								</button>
							</div>
						{:else if field.type === 'image'}
							<!-- Image content -->
							<div class="mb-3">
								<div class="flex flex-row">
									<input
										type="file"
										accept="image/*"
										on:change={(event) => handleImageUpload(event, index)}
										FileList={field.src ? [{ name: field.src }] : []}
										class="file-input file-input-bordered file-input-accent w-full me-1"
									/>
									<button
										class="btn btn-sm bg-zinc-200 hover:bg-zinc-300 border-none font-mono flex items-center justify-center rounded-full h-8 w-8 p-0"
										on:click={() => handleRemoveField(index)}
									>
										<span class="text-zinc-500">x</span>
									</button>
								</div>

								{#if field.src}
									<img
										src={field.src}
										alt="Title img"
										class="w-1/3 m-5 aspect-[4/3] object-cover rounded-md"
									/>
								{/if}
							</div>
						{:else if field.type === 'video'}
							<!-- Video content -->
							<div class="flex flex-row w-full">
								<input
									class="grow mb-3 me-1 input input-bordered leading-5"
									type="text"
									placeholder="Video embed link"
									value={field.src ? field.src : ''}
									on:change={(event) => handleVideoChange(event, index)}
								/>

								<button
									class="btn btn-sm bg-zinc-200 hover:bg-zinc-300 border-none font-mono flex items-center justify-center rounded-full h-8 w-8 p-0"
									on:click={() => handleRemoveField(index)}
								>
									<span class="text-zinc-500">x</span>
								</button>
							</div>
						{:else if field.type === 'custom_html'}
							<!-- Video content -->
							<div class="flex flex-row w-full">
								<textarea
									class="mb-3 me-1 grow w-full h-48 p-4 bg-gray-800 text-white font-mono text-sm rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Custom HTML..."
									value={field.customHTML ? field.customHTML : ''}
									on:change={(event) => handleCustomHTMLChange(event, index)}
								></textarea>

								<button
									class="btn btn-sm bg-zinc-200 hover:bg-zinc-300 border-none font-mono flex items-center justify-center rounded-full h-8 w-8 p-0"
									on:click={() => handleRemoveField(index)}
								>
									<span class="text-zinc-500">x</span>
								</button>
							</div>
						{/if}
					{/each}

					<!-- Add Buttons -->
					<div class="flex flex-row my-1">
						<button class="btn btn-sm btn-primary mx-1" on:click={() => addContent('paragraph')}>
							+ Paragraph
						</button>
						<button class="btn btn-sm btn-primary mx-1" on:click={() => addContent('header')}>
							+ Header
						</button>
						<button class="btn btn-sm btn-accent mx-1" on:click={() => addContent('image')}>
							+ Image
						</button>
						<button class="btn btn-sm btn-video mx-1" on:click={() => addContent('video')}>
							+ Video
						</button>
						<button class="btn btn-sm btn-custom mx-1" on:click={() => addContent('custom_html')}>
							+ Custom HTML
						</button>
					</div>
				</div>

				<div class="mt-4 justify-items-center w-full flex flex-col">
					<button
						class="flex flex-row btn text-lg bg-green-600 hover:bg-green-700 w-100"
						on:click={handleSubmit}>Publish/Save Article</button
					>
					<div class="flex flex-row text-zinc-400 text-sm font-semibold mt-1">
						{articleStatus}
					</div>

					{#each errorMessages as message}
						<div class="flex flex-row text-red-400 text-sm">{message}</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="w-full text-center flex justify-center">
				<div>Please log in first</div>
			</div>
		{/if}
	</div>

	<!-- New Author Section -->
	<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="New Author" />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{#if loggedIn}
			<div class="flex flex-col w-3/4 mx-auto">
				<div class="flex flex-row justify-between">
					<div class="text-3xl font-bold">New Author:</div>
				</div>
				<label class="input input-bordered flex items-center gap-2">
					Full Name:
					<input bind:value={newTitle} type="text" class="grow" placeholder="Zach Fischer" />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					Author:
					<input bind:value={newAuthor} type="text" class="grow" placeholder="John Steinbeck" />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					Date:
					<input bind:value={newDate} type="text" class="grow" placeholder="April 14, 1939" />
				</label>
			</div>
		{:else}
			<div class="w-full text-center flex justify-center">
				<div>Please log in first</div>
			</div>
		{/if}
	</div>
</div>

{#if articleSelectModal}
	<div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
{/if}

<Modal
	class="shadow-lg z-5 "
	title="Select an Article:"
	bind:open={articleSelectModal}
	outsideclose
	autoclose
	bodyClass=""
	on:close={() => console.log('Selected Article:', selectedArticle)}
>
	<svelte:fragment slot="header">
		<div class="flex flex-row w-full justify-between">
			<p class="font-bold text-xl">Select Article:</p>
			<button
				class="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none"
				on:click={() => (articleSelectModal = false)}
			>
				Exit
			</button>
		</div>
	</svelte:fragment>

	<div class="flex flex-col mb-4">
		<button
			class="px-4 py-3 text-start {selectedArticle === '' ? 'bg-gray-600' : 'hover:bg-gray-700'}"
			on:click={() => {
				selectedArticle = '';
			}}
		>
			<i>New Article</i>
		</button>

		{#each data.articles as article}
			<button
				class="px-4 py-3 text-start {selectedArticle === article.title
					? 'bg-gray-600'
					: 'hover:bg-gray-700'}"
				on:click={() => {
					selectedArticle = article.title;
					newSlug = article.slug;
					newTitle = article.title;
					newAuthor = article.author;
					newDate = article.date;
					newCategories = article.categories;
					newDescription = article.description;
					newImage = article.image;
					fields = article.content;
					console.log(fields);
					console.log(article.content);
				}}
			>
				{article.title}
			</button>
		{/each}
	</div>
</Modal>

<style>
	.btn {
		color: white;
	}
	.input,
	.select,
	.file-input {
		height: 40px !important;
		min-height: 10px !important;
	}

	.btn-video {
		background-color: brown;
	}
	.btn-custom {
		background-color: green;
	}
</style>
