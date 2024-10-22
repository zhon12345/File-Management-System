import { ref, computed } from "vue";
import { useFileStore } from "@/stores/FileStore";
import { useScreenStore } from "@/stores/ScreenStore";

const fileStore = useFileStore();
const ScreenStore = useScreenStore();

export let imageLoaded = ref(true);
export let isMobile = computed(() => ScreenStore.isMobile);

const fileTypes = {
	archive: ["zip", "rar", "7z", "tar", "gz"],
	video: [".mp4", ".m4v", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".3g2", ".3gp", ".webm"],
	audio: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".aiff", ".mod", ".mid", ".m4a"],
	image: [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".gif", ".bmp"],
	code: [".html", ".htm", ".xhtml", ".css", ".asm", ".c", ".cpp", ".h", ".cs", ".java", ".py", ".js", ".ts", ".vue", ".rs", ".lua", ".swift", ".r", ".go", ".rb", ".php", ".scala", ".kt", ".dart", ".pl", ".sql", ".m", ".clj", ".coffee", ".svelte"],
	document: [".txt", ".rtf", ".csv", ".md", ".xaml", ".xml", "yaml", "yml", ".json"],
	pdf: [".pdf"],
	excel: [".xls", ".xlsx"],
	powerpoint: [".ppt", ".pptx"],
	word: [".doc", ".docx"],
};

export function isImage(file) {
	return fileTypes.image.includes(file.ext.toLowerCase());
}

export function getPreview(file, mode, imageLoaded) {
	const ext = file.ext.toLowerCase();
	const icons = {
		archive: "bi-file-zip",
		video: "bi-file-earmark-play",
		audio: "bi-file-earmark-music",
		image: "bi-file-earmark-image",
		code: "bi-file-earmark-code",
		document: "bi-file-earmark-text",
		pdf: "bi-file-earmark-pdf",
		excel: "bi-file-earmark-excel",
		powerpoint: "bi-file-earmark-ppt",
		word: "bi-file-earmark-word",
		default: "bi-file-earmark",
	};
	for (const [type, extensions] of Object.entries(fileTypes)) {
		if (extensions.includes(ext)) {
			if (type === "image" && mode === "grid" && imageLoaded) {
				return fileStore.viewFile(file.id);
			} else {
				return icons[type] || icons.default;
			}
		}
	}

	return icons.default;
}

export function formatDate(input, short = false) {
	const date = new Date(input);

	if (short) {
		return date.toLocaleDateString(undefined, {
			month: "short",
			day: "numeric",
		});
	}

	return date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function calcSize(input) {
	const units = ["bytes", "KiB", "MiB", "GiB", "TiB"];

	let index = 0;
	let size = input;

	while (size >= 1024 && ++index) {
		size /= 1024;
	}

	return `${size.toFixed(2)} ${units[index]}`;
}
