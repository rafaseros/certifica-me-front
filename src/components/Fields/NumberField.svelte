<script>
	export let id;
	export let name;
	export let label;
	export let required = false;
	export let value = 0;

	function handleChange(event) {
		const newValue = event.target.value;

		value = newValue;
	}
</script>

<div>
	<label for={name} class="text-gray-700 dark:text-gray-200">{label}</label>
	<input
		{id}
		{name}
		{required}
		{value}
		on:input={handleChange}
		type="number"
		class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
	/>
</div>
