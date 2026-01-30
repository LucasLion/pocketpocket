<script setup lang="ts">

const emit = defineEmits<{
	(e: 'navigate', page: string): void
}>()

</script>

<template>
	<div class="header">
		<a href="#" @click.prevent="emit('navigate', 'accueil')">Accueil</a>
		<a href="#" @click.prevent="emit('navigate', 'pokedex')">Pokedex</a>
		<a href="#" @click.prevent="emit('navigate', 'booster')">Open booster</a>
	</div>
</template>

<style scoped>
.header {
	background: linear-gradient(0deg, #000000 80%, #ffffffff );
	display: flex;
	justify-content: space-around;	
	padding-top: 1.5rem;
	padding-bottom: 2.5rem;
}

a {
	color: white;
	text-decoration: none;
	font-weight: bold;
}

a:hover {
	text-decoration: underline;
}
</style>
