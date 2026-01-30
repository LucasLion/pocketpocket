
<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	possessed: {
		type: Boolean,
		default: false
	}
})
</script>

<template>
	<img v-if="possessed" :src="`/jpg/A1-${String(image).padStart(3, '0')}.jpg`" />
</template>
