<script setup>

import { ref, inject } from "vue";
import Card from "./Card.vue";
import cardsData from "@/data/cards.json";

const booster = ref([]);
let holdInterval = null;

const player = inject("player");

function startHold() {
	openBooster();
	holdInterval = setInterval(openBooster, 150);
}

function stopHold() {
	if (holdInterval) {
		clearInterval(holdInterval);
		holdInterval = null;
	}
}

// Sélectionner une carte aléatoire d'une rareté donnée
function getRandomCardOfRarity(rarity) {
	const cards = cardsData.cardsByRarity[rarity];
	return cards[Math.floor(Math.random() * cards.length)];
}

// Déterminer la rareté selon les probabilités d'un slot
function rollRarity(slot) {
	const rates = cardsData.slotRates[slot];
	const roll = Math.random();
	let cumulative = 0;

	for (const [rarity, rate] of Object.entries(rates)) {
		cumulative += rate;
		if (roll < cumulative) return rarity;
	}
	return 'Uncommon';
}

function openBooster() {
	booster.value = [];

	// Slots 1-3: Common
	for (let i = 0; i < 3; i++) {
		const cardNum = getRandomCardOfRarity('Common');
		booster.value.push({ path: cardNumberToPath(cardNum), rarity: 'Common', number: cardNum });
		player.addCardToCollection(cardNum);
	}

	// Slot 4: au moins Uncommon
	const rarity4 = rollRarity('4');
	const card4 = getRandomCardOfRarity(rarity4);
	booster.value.push({ path: cardNumberToPath(card4), rarity: rarity4, number: card4 });
	player.addCardToCollection(card4);

	// Slot 5: au moins Uncommon (meilleures chances)
	const rarity5 = rollRarity('5');
	const card5 = getRandomCardOfRarity(rarity5);
	booster.value.push({ path: cardNumberToPath(card5), rarity: rarity5, number: card5 });
	player.addCardToCollection(card5);

	console.log('Booster:', booster.value.map(c => `#${c.number} (${c.rarity})`).join(', '));
}

function cardNumberToPath(cardNumber) {
	return `/jpg/A1-${String(cardNumber).padStart(3, '0')}.jpg`;
}

</script>
<template>
	<div class="booster-container">
		<TransitionGroup name="card" tag="div" class="card-row">
			<div v-for="(card, index) in booster.slice(0, 3)"
				:key="card.number + '-' + index"
				:style="{ '--delay': index * 0.15 + 's' }"
				class="card-item">
				<div class="card-flip">
					<img :src="card.path" />
				</div>
				<span class="rarity" :class="card.rarity.toLowerCase().replace(' ', '-')">{{ card.rarity }}</span>
			</div>
		</TransitionGroup>
		<TransitionGroup name="card" tag="div" class="card-row">
			<div v-for="(card, index) in booster.slice(3, 5)"
				:key="card.number + '-' + (index + 3)"
				:style="{ '--delay': (index + 3) * 0.15 + 's' }"
				class="card-item">
				<div class="card-flip">
					<img :src="card.path" />
				</div>
				<span class="rarity" :class="card.rarity.toLowerCase().replace(' ', '-')">{{ card.rarity }}</span>
			</div>
		</TransitionGroup>
	</div>
	<div class="button-container">
		<button class="open-button"
			@mousedown="startHold"
			@mouseup="stopHold"
			@mouseleave="stopHold"
			@touchstart.prevent="startHold"
			@touchend="stopHold"
		>Ouvrir</button>
	</div>
</template>

<style scoped>
.booster-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 10px;
	margin-top: 10%;
	min-height: 60vh;
}

.card-row {
	display: flex;
	justify-content: center;
	gap: 10px;
}

.card-item {
	width: 180px;
	display: flex;
	flex-direction: column;
	align-items: center;
	perspective: 1000px;
}

.card-flip {
	width: 100%;
	transform-style: preserve-3d;
}

.card-flip img {
	width: 100%;
	height: auto;
	backface-visibility: hidden;
}

/* Animation d'entrée */
.card-enter-from {
	opacity: 0;
	transform: rotateY(180deg) scale(0.8);
}

.card-enter-active {
	transition: all 0.8s ease-out;
	transition-delay: var(--delay);
}

.card-enter-to {
	opacity: 1;
	transform: rotateY(0deg) scale(1);
}

/* Animation de sortie (rapide) */
.card-leave-active {
	/* transition: all 0.1s ease-in; */
	position: absolute;
}

.card-leave-to {
	opacity: 0;
	transform: scale(0.5);
}

.rarity {
	font-size: 0.75rem;
	padding: 2px 6px;
	border-radius: 4px;
	margin-top: 4px;
}

.common { background: #888; color: white; }
.uncommon { background: #4a4; color: white; }
.rare { background: #44a; color: white; }
.double-rare { background: #a4a; color: white; }
.art-rare { background: #f90; color: white; }
.super-rare { background: #f09; color: white; }
.special-art-rare { background: #f0f; color: white; }
.immersive-rare { background: #0ff; color: #333; }
.crown-rare { background: gold; color: #333; }

.open-button {
	margin: 1rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	cursor: pointer;
}

.button-container {
	display: flex;
	width: 100%;
	justify-content: center;
}

</style>
