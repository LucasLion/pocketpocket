<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('booster')

const emit = defineEmits<{
	(e: 'navigate', page: string): void
}>()

function navigate(page: string) {
	activeTab.value = page
	emit('navigate', page)
}
</script>

<template>
	<nav class="navbar">
		<a href="#"
			class="nav-item"
			:class="{ active: activeTab === 'pokedex' }"
			@click.prevent="navigate('pokedex')">
			<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="7" height="7" rx="1"/>
				<rect x="14" y="3" width="7" height="7" rx="1"/>
				<rect x="3" y="14" width="7" height="7" rx="1"/>
				<rect x="14" y="14" width="7" height="7" rx="1"/>
			</svg>
			<span>Collection</span>
		</a>

		<a href="#"
			class="nav-item booster-btn"
			:class="{ active: activeTab === 'booster' }"
			@click.prevent="navigate('booster')">
			<div class="booster-circle">
				<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
				</svg>
			</div>
			<span>Ouvrir</span>
		</a>

		<a href="#"
			class="nav-item"
			:class="{ active: activeTab === 'settings' }"
			@click.prevent="navigate('settings')">
			<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="3"/>
				<path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
			</svg>
			<span>Options</span>
		</a>
	</nav>
</template>

<style scoped>
.navbar {
	background: rgba(15, 15, 20, 0.95);
	backdrop-filter: blur(10px);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	padding: 0.5rem 1rem 1.5rem;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 0.25rem;
	color: rgba(255, 255, 255, 0.5);
	text-decoration: none;
	font-size: 0.7rem;
	font-weight: 500;
	transition: all 0.2s ease;
	padding: 0.5rem;
}

.nav-item:hover {
	color: rgba(255, 255, 255, 0.8);
}

.nav-item.active {
	color: #ffd700;
}

.icon {
	width: 24px;
	height: 24px;
}

.booster-btn {
	margin-top: -1.5rem;
}

.booster-circle {
	width: 56px;
	height: 56px;
	background: linear-gradient(135deg, #ff6b6b, #ffd700);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
	transition: all 0.2s ease;
}

.booster-btn:hover .booster-circle {
	transform: scale(1.05);
	box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
}

.booster-btn.active .booster-circle {
	background: linear-gradient(135deg, #ffd700, #ffaa00);
	box-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
}

.booster-circle .icon {
	width: 28px;
	height: 28px;
	color: white;
	stroke-width: 2.5;
}

.booster-btn span {
	margin-top: 0.5rem;
}
</style>
