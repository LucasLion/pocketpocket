<script setup lang="ts">

import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import PokedexPage from "./components/PokedexPage.vue"
import BoosterPage from "./components/BoosterPage.vue"
import SettingsPage from "./components/SettingsPage.vue"
import Player from "./models/Player.ts"

const currentPage = ref('booster');

const player = new Player();

provide("player", player);

function onNavigate(page: string) {
	currentPage.value = page;
}

</script>

<template>
	<main>
		<PokedexPage v-if="currentPage === 'pokedex'" />
		<BoosterPage v-else-if="currentPage === 'booster'" />
		<SettingsPage v-else-if="currentPage === 'settings'" />
	</main>
	<Header class="header" @navigate="onNavigate"/>

</template>

<style>
.header {
	position: fixed;
	bottom: 0;
	width: 100%;
}

main {
	padding-bottom: 4rem;
}
</style>
