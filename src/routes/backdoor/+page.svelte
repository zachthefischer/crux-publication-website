<script lang="ts">
	import { session } from '$lib/services/session';
	import { auth } from '$lib/services/firebase.client';
	import {
		signInWithEmailAndPassword,
		signOut,
		onAuthStateChanged,
		type UserCredential
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// AUTHENTICATION
	let email: string = '';
	let password: string = '';

	// Reactive login state from session store
	$: loggedIn = $session?.loggedIn || false;

	// Navigation functions
	function goToFeatured() {
		goto('/backdoor/featured');
	}

	function goToArticles() {
		goto('/backdoor/articles');
	}

	function goToAuthors() {
		goto('/backdoor/authors');
	}

	function goHome() {
		goto('/');
	}

	// Check authentication state on mount
	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				session.set({
					loggedIn: true,
					user: {
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						uid: user.uid
					}
				});
			} else {
				session.set({
					loggedIn: false,
					user: null
				});
			}
		});

		return unsubscribe;
	});

	// Log in function
	async function loginWithMail() {
		console.log('loginWithMail called');
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			const { user }: UserCredential = result;
			session.set({
				loggedIn: true,
				user: {
					displayName: user?.displayName,
					email: user?.email,
					photoURL: user?.photoURL,
					uid: user?.uid
				}
			});
		} catch (error) {
			console.error('Login error:', error);
		}
	}

	// Log out function
	async function logout() {
		try {
			await signOut(auth);
			session.set({
				loggedIn: false,
				user: null
			});
		} catch (error) {
			console.error('Logout error:', error);
		}
	}
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
	<div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
		{#if !loggedIn}
			<!-- Login Form -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900">Backdoor Access</h1>
				<p class="text-gray-600 mt-2">Please log in to continue</p>
			</div>

			<div class="space-y-4">
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

				<button on:click={loginWithMail} type="submit" class="btn btn-primary w-full">Login</button>

				<div class="pt-4 border-t">
					<button on:click={goHome} class="btn btn-accent w-full">Go to Home Page</button>
				</div>
			</div>
		{:else}
			<!-- Navigation Menu -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900">Backdoor Dashboard</h1>
				<p class="text-gray-600 mt-2">Welcome! Choose a section to manage</p>
			</div>

			<div class="space-y-4">
				<button on:click={goToFeatured} class="btn btn-primary w-full font-normal">
					Featured Articles
				</button>

				<button on:click={goToArticles} class="btn btn-primary w-full font-normal">
					Article Editor
				</button>

				<button on:click={goToAuthors} class="btn btn-primary w-full font-normal">
					Author Management
				</button>

				<div class="pt-4 border-t">
					<button on:click={logout} class="btn btn-secondary w-full mb-2">
						<span class="text-gray-900 font-normal">Logout</span>
					</button>
					<button on:click={goHome} class="btn btn-accent w-full">Go to Home Page </button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.btn {
		color: white;
	}
</style>
