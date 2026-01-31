<script setup>
import { inject, ref } from "vue";

const player = inject("player");
const fileInput = ref(null);
const message = ref("");

function handleExport() {
	player.downloadSave();
	message.value = "Sauvegarde exportée!";
}

function handleImport() {
	fileInput.value.click();
}

function onFileSelected(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = (e) => {
		const success = player.importSave(e.target.result);
		message.value = success ? "Sauvegarde importée!" : "Fichier invalide";
	};
	reader.readAsText(file);
	event.target.value = "";
}

function handleReset() {
	if (confirm("Es-tu sûr de vouloir tout effacer?")) {
		player.reset();
		message.value = "Collection réinitialisée";
	}
}
</script>

<template>
	<div class="settings-container">
		<h1>Paramètres</h1>

		<div class="stats">
			<p>Cartes collectées: {{ player.cardsPossessed.value.length }}</p>
		</div>

		<div class="buttons">
			<button class="btn export" @click="handleExport">Exporter</button>
			<button class="btn import" @click="handleImport">Importer</button>
			<button class="btn reset" @click="handleReset">Réinitialiser</button>
		</div>

		<input
			ref="fileInput"
			type="file"
			accept=".json"
			style="display: none"
			@change="onFileSelected"
		/>

		<p v-if="message" class="message">{{ message }}</p>
	</div>
</template>

<style scoped>
.settings-container {
	padding: 2rem;
	max-width: 400px;
	margin: 0 auto;
}

h1 {
	text-align: center;
	margin-bottom: 2rem;
}

.stats {
	background: #222;
	padding: 1rem;
	border-radius: 8px;
	margin-bottom: 2rem;
	text-align: center;
}

.buttons {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.btn {
	padding: 1rem;
	font-size: 1rem;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-weight: bold;
}

.export {
	background: #4a4;
	color: white;
}

.import {
	background: #44a;
	color: white;
}

.reset {
	background: #a44;
	color: white;
}

.btn:hover {
	opacity: 0.9;
}

.message {
	text-align: center;
	margin-top: 1rem;
	padding: 0.5rem;
	background: #333;
	border-radius: 4px;
}
</style>
