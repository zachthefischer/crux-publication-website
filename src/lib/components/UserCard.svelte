<script lang="ts">
	import { onMount } from 'svelte';
	import { db, storage } from '$lib/services/firebase.client';
	import { doc, getDoc } from 'firebase/firestore';
	import { ref, getDownloadURL } from 'firebase/storage';

	export let authorId: string;

	let authorName = '';
	let authorPfp = '';
	let loading = true;

	onMount(async () => {
		try {
			// Get author data from Firestore
			const authorRef = doc(db, 'authors', authorId);
			const authorSnap = await getDoc(authorRef);

			if (authorSnap.exists()) {
				const authorData = authorSnap.data();
				authorName = authorData.name || '';

				// Convert Firebase Storage path to download URL
				if (authorData.pfp) {
					try {
						const imageRef = ref(storage, authorData.pfp);
						authorPfp = await getDownloadURL(imageRef);
					} catch (error) {
						console.error('Error getting author image URL:', error);
					}
				}
			}
		} catch (error) {
			console.error('Error loading author:', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-0.5">
	<span class="text-xs font-medium text-gray-700">{authorName}</span>
	{#if authorPfp}
		<img src={authorPfp} alt="{authorName} profile" class="w-5 h-5 rounded-full object-cover" />
	{:else}
		<div class="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
			<span class="text-xs text-gray-600 font-bold">{authorName.charAt(0)}</span>
		</div>
	{/if}
</div>
