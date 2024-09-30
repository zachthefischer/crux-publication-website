<script>
	// import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';
	// import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	let menuOpen = false;
	let inputValue = '';
	$: console.log(inputValue);

	const menuItems = [
		'About',
		'Base',
		'Blog',
		'Contact',
		'Custom',
		'Support',
		'Tools',
		'Boats',
		'Cars',
		'Bikes',
		'Sheds',
		'Billygoats',
		'Zebras',
		'Tennis Shoes',
		'New Zealand'
	];
	/**
	 * @type {string | any[]}
	 */
	let filteredItems = [];

	const handleInput = () => {
		return (filteredItems = menuItems.filter((item) =>
			item.toLowerCase().match(inputValue.toLowerCase())
		));
	};
</script>

<section class="dropdown">
	<button
		on:click={() => (menuOpen = !menuOpen)}
		class="button rounded-md px-3 py-1 select-bordered flex flex-wrap w-full align-items-center justify-between bg-white border mb-3"
	>
		<span>{!menuOpen ? 'Show Menu' : 'Close Menu'} </span>
		<span class="mr-1 text-sm">
			{#if menuOpen}
				<!-- <FontAwesomeIcon icon={faCaretUp} /> -->
			{:else}
				<!-- <FontAwesomeIcon icon={faCaretDown} /> -->
			{/if}
		</span>
	</button>

	<div id="myDropdown" class:show={menuOpen} class="dropdown-content">
		<input
			type="text"
			placeholder="Search..."
			autocomplete="off"
			id="searchInput"
			bind:value={inputValue}
			on:input={handleInput}
		/>
		<!-- <span id="search-icon"> <FontAwesomeIcon icon={faSearch} class="text-sm" /> </span> -->
		<!-- MENU -->
		{#if filteredItems.length > 0}
			{#each filteredItems as item}
				<a href="#{item.toLowerCase()}">{item}</a>
			{/each}
		{:else}
			{#each menuItems as item}
				<a href="#{item.toLowerCase()}">{item}</a>
			{/each}
		{/if}
	</div>
</section>

<style>
	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f6f6f6;
		min-width: 230px;
		border: 1px solid #ddd;
		z-index: 1;
	}

	/* Show the dropdown menu */
	.show {
		display: block;
	}

	/* The search field */
	#searchInput {
		box-sizing: border-box;
		font-size: 1.2rem;
		padding: 14px 20px 12px 30px;
		border-bottom: 1px solid #ddd;
	}

	#search-icon {
		position: absolute;
		left: 10px;
		top: 10px;
		font-size: 1.2rem;
	}
	a {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}

	a:hover {
		background-color: #ddd;
	}
</style>
