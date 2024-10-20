<script setup>
import { ref } from "vue";
import { useFileStore } from "@/stores/FileStore";

const fileStore = useFileStore();
const props = defineProps({
	file: Object,
	rename: Function,
	delete: Function,
});

let imageLoaded = ref(true);

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
	archive: ["zip", "rar", "7z", "tar", "gz"],
	video: [".mp4", ".m4v", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".3g2", ".3gp", ".webm"],
	audio: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".aiff", ".mod", ".mid", ".m4a"],
	image: [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".gif", ".bmp"],
	code: [".html", ".htm", ".xhtml", ".css", ".asm", ".c", ".cpp", ".h", ".cs", ".java", ".py", ".js", ".ts", ".vue", ".rs", ".lua", ".swift", ".r", ".go", ".rb", ".php", ".scala", ".kt", ".dart", ".pl", ".sql", ".m", ".clj", ".coffee", ".svelte"],
	document: [".txt", ".rtf", ".csv", ".md", ".xaml", ".xml", "yaml", "yml", ".json", ".pdf"],
	excel: [".xls", ".xlsx"],
	powerpoint: [".ppt", ".pptx"],
	word: [".doc", ".docx"],
};

function isImage(file) {
	return fileTypes.image.includes(file.ext.toLowerCase());
}

function getPreview(file) {
	const ext = file.ext.toLowerCase();
	const icons = {
		archive: "fa-file-zipper",
		video: "fa-file-video",
		audio: "fa-file-audio",
		image: "fa-file-image",
		code: "fa-file-code",
		document: "fa-file-lines",
		excel: "fa-regular fa-file-excel",
		powerpoint: "fa-file-excel",
		word: "fa-file-word",
		default: "fa-file",
	};

	for (const [type, extensions] of Object.entries(fileTypes)) {
		if (extensions.includes(ext)) {
			if (type === "image" && imageLoaded.value) {
				return fileStore.viewFile(file.id);
			} else {
				return icons[type] || icons.default;
			}
		}
	}

	return icons.default;
}
</script>

<template>
	<div class="card shadow-sm bg-body-secondary">
		<div class="card-body">
			<p class="card-text text-truncate user-select-none">{{ file.name }}{{ file.ext }}</p>
			<div class="dropdown">
				<i class="fa-solid fa-ellipsis-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>

				<ul class="dropdown-menu">
					<li><button @click="downloadFile(file)" class="dropdown-item">Download</button></li>
					<li><button @click="onRename" class="dropdown-item">Rename</button></li>
					<li><button @click="onDelete" class="dropdown-item">Delete</button></li>
				</ul>
			</div>
		</div>

		<div class="card-img" :class="{ 'is-icon': !isImage(file) || !imageLoaded }">
			<img v-if="isImage(file) && imageLoaded" class="card-img-top card-img-bottom user-select-none" draggable="false" :src="getPreview(file)" @load="imageLoaded = true" @error="imageLoaded = false" />
			<i v-else :class="getPreview(file)" class="fa-regular"></i>
		</div>
	</div>
</template>

<style>
.card {
	padding: 0.5rem;
	border: none;
}

.card-body {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	margin-bottom: 0.5rem;
}

.card-body > p {
	margin-bottom: 0;
	font-size: clamp(1rem, 2vw, 1.15rem);
}

.fa-ellipsis-vertical {
	font-size: 20px;
	padding-left: 0.5rem;
	cursor: pointer;
	transition: 0.1s ease-in;
}

.fa-ellipsis-vertical:hover {
	opacity: 0.7;
}

.card-img {
	max-height: 80%;
	min-height: 80%;
	background-color: #d2d8de;
}

.is-icon {
	display: flex;
	justify-content: center;
	align-items: center;
}

.card-img > img {
	height: 100%;
	object-fit: cover;
}

.card-img .fa-regular {
	font-size: clamp(3em, 5vw, 5em);
}
</style>
