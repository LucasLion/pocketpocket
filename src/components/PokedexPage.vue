<script setup>

import { ref, inject } from "vue";

const player = inject("player");

console.log(player.cardsPossessed.value);

function isCardInCollection(cardNumber) {
	return player.cardsPossessed.value.includes(cardNumber);
}
</script>


<template>
	<ul class="card-grid">
		<li v-for="n in 286" :key="n">
			<div class="card-slot">
				<img v-if="isCardInCollection(n)" :src="`/jpg/A1-${String(n).padStart(3, '0')}.jpg`" />
			</div>
		</li>
	</ul>
</template>

<style scoped>
.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 10px;
	list-style: none;
	padding: 10px;
}

.card-slot {
	border-radius: 6px;
	width: 100%;
	aspect-ratio: 185 / 258;
	background-color: #333;

}

.card-grid img {
	width: 100%;
	height: auto;
	display: block;
}
</style>
