<template>
	<i class="bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
	<ul class="dropdown-menu">
		<li><button class="dropdown-item" @click="downloadFile(file)">Download</button></li>
		<li><button class="dropdown-item" @click="openModal('rename', file)">Rename</button></li>
		<li><button class="dropdown-item" @click="openModal('delete', file)">Delete</button></li>
	</ul>
</template>

<script setup>
import { useFileStore } from "@/stores/FileStore";

defineProps({
	file: {
		type: Object,
		default() {
			return {};
		},
	},
	openModal: {
		type: Function,
		default: null,
	},
});

const fileStore = useFileStore();

async function downloadFile(file) {
	await fileStore.downloadFile(file.id, file.name, file.ext);
}
</script>

<style scoped>
.bi-three-dots-vertical {
	font-size: clamp(1.15rem, 2vw, 1.25rem);
	cursor: pointer;
	transition: 0.1s ease-in;
}

.bi-three-dots-vertical:hover {
	opacity: 0.7;
}
</style>
