<script setup>
import { useFileStore } from "@/stores/file";

const fileStore = useFileStore();
const props = defineProps({
	file: Object,
	rename: Function,
	delete: Function,
});

async function downloadFile(file) {
	await fileStore.downloadFile(file.id, file.name, file.ext);
}

function onRename() {
	props.rename(props.file);
}

function onDelete() {
	props.delete(props.file);
}

const fileTypes = {
	archive: ["zip", "rar", "tar", "7z", "gz"],
	video: [".mp4", ".m4v", ".mkv", ".avi", ".mov", "wmv", ".flv", ".3g2", ".3gp"],
	audio: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".aiff", ".sid", ".psf", ".mod", ".mid"],
	image: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff", ".webp", ".ico", ".psd"],
	document: [".txt", ".csv", ".xml", ".json", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"],
};

function isImage(file) {
	return fileTypes.image.includes(file.ext.toLowerCase());
}

function getPreview(file) {
	const ext = file.ext.toLowerCase();
	const path = "/src/assets/icons";

	for (const [type, extensions] of Object.entries(fileTypes)) {
		if (extensions.includes(ext)) {
			switch (type) {
				case "archive":
					return `${path}/archive.png`;
				case "video":
					return `${path}/video.png`;
				case "audio":
					return `${path}/audio.png`;
				case "image":
					return fileStore.viewFile(file.id);
				case "document":
					return `${path}/document.png`;
			}
		}
	}

	return `${path}/file.png`;
}
</script>

<template>
	<div class="card shadow-sm bg-body-secondary">
		<div class="card-body">
			<p class="card-text text-truncate user-select-none">{{ file.name }}{{ file.ext }}</p>
			<div class="dropdown">
				<i class="fa-solid fa-ellipsis-vertical dropdown-toggle px-2" data-bs-toggle="dropdown" aria-expanded="false"></i>

				<ul class="dropdown-menu">
					<li><button @click="downloadFile(file)" class="dropdown-item">Download</button></li>
					<li><button @click="onRename" class="dropdown-item">Rename</button></li>
					<li><button @click="onDelete" class="dropdown-item">Delete</button></li>
				</ul>
			</div>
		</div>
		<div class="card-img" :class="{ 'is-icon': !isImage(file) }">
			<img class="card-img-top card-img-bottom user-select-none" draggable="false" :src="getPreview(file)" />
		</div>
	</div>
</template>

<style>
.card {
	font-size: 18px;
	justify-content: space-between;
	padding: 0.5rem;
	border: none;
}

.card-body {
	display: flex;
	justify-content: space-between;
	padding: 0;
}

.fa-solid {
	font-size: 20px;
	align-self: center;
	cursor: pointer;
	transition: 0.1s ease-in;
}

.fa-solid.dropdown-toggle::after {
	content: none;
}

.fa-solid:hover {
	opacity: 0.7;
}

.card-img {
	max-height: 200px;
	min-height: 200px;
	display: flex;
	justify-content: center;
}

.card-img.is-icon img {
	width: 100px;
	object-fit: contain;
}

.card-img > img {
	object-fit: cover;
}
</style>
