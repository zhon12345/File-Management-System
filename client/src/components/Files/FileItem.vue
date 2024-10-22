<template>
	<i class="bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
	<ul class="dropdown-menu">
		<li><button @click="downloadFile(file)" class="dropdown-item">Download</button></li>
		<li><button @click="onRename" class="dropdown-item">Rename</button></li>
		<li><button @click="onDelete" class="dropdown-item">Delete</button></li>
	</ul>
</template>

<script setup>
import { useFileStore } from "@/stores/FileStore";

const props = defineProps({
	file: Object,
	actions: Object,
});

const fileStore = useFileStore();

async function downloadFile(file) {
	await fileStore.downloadFile(file.id, file.name, file.ext);
}

function onRename() {
	props.actions.rename(props.file);
}

function onDelete() {
	props.actions.delete(props.file);
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
