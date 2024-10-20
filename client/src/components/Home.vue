<script setup>
import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useFileStore } from "@/stores/FileStore";
import FileItem from "@/components/FileItem.vue";
import Dialog from "@/components/Modal.vue";

const fileStore = useFileStore();
const loading = ref(true);
const dialog = ref(null);
let input = ref(null);
let currFile = ref(null);
const valid = ref(true);

let modalConfig = ref({
	title: "",
	form: false,
	filename: "",
	message: "",
	button: "",
	action: "",
});

function openModal(file, config) {
	currFile.value = file;
	modalConfig.value = { ...config };
	dialog.value.show();
	valid.value = true;
}

function renameModal(file) {
	openModal(file, {
		title: "Rename file",
		form: true,
		filename: file.name,
		button: "Rename",
		action: "rename",
	});
}

function deleteModal(file) {
	openModal(file, {
		title: "Delete file",
		form: false,
		message: `"${file.name}" will be deleted <strong>forever</strong>, are you sure?`,
		button: "Delete forever",
		action: "delete",
	});
}

async function handleConfirm(value) {
	if (modalConfig.value.form) {
		if (value.filename && value.filename.trim()) {
			await fileStore.renameFile(currFile.value.id, value.filename);
			dialog.value.hide();
		}

		valid.value = false;
	} else {
		await fileStore.deleteFile(currFile.value.id);
		dialog.value.hide();
	}
}

watch(
	modalConfig,
	(value) => {
		if (value.filename && value.filename.trim()) {
			valid.value = true;
		} else {
			valid.value = false;
		}
	},
	{ deep: true }
);

onMounted(async () => {
	dialog.value = new Modal(document.getElementById("fileItem"), {});

	await fileStore.fetchFiles();
	loading.value = false;

	dialog.value._element.addEventListener("shown.bs.modal", () => {
		if (input.value) {
			input.value.focus();
			input.value.select();
		}
	});
});
</script>

<template>
	<section class="main">
		<div class="container path user-select-none">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item active" aria-current="page">Home</li>
				</ol>
			</nav>
		</div>

		<div class="container files" :class="{ 'no-content': loading || fileStore.files.length === 0 }">
			<div v-if="loading" class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			<div v-else-if="fileStore.files.length === 0">
				<i class="bi bi-folder2-open"></i>
				<span>No Files Found...</span>
			</div>
			<div v-else class="row row-cols-lg-5 row-cols-md-3 row-cols-2 gx-3">
				<div v-for="file in fileStore.files" :key="file.id" class="col">
					<div class="ratio ratio-1x1">
						<FileItem :file="file" :rename="renameModal" :delete="deleteModal" />
					</div>
				</div>
			</div>
		</div>

		<Dialog id="fileItem">
			<template #title>
				<h4 class="modal-title">{{ modalConfig.title }}</h4>
			</template>

			<template #body>
				<div v-if="modalConfig.form">
					<input v-model="modalConfig.filename" class="form-control" type="text" ref="input" :class="{ 'is-invalid': !valid }" />
				</div>

				<p v-else v-html="modalConfig.message"></p>
			</template>

			<template #footer>
				<button @click="handleConfirm({ filename: modalConfig.filename })" class="btn" :class="modalConfig.action === 'delete' ? 'btn-danger' : 'btn-primary'">{{ modalConfig.button }}</button>
			</template>
		</Dialog>
	</section>
</template>

<style>
.path {
	font-weight: bold;
}

.breadcrumb-item {
	font-size: 24px;
}

.no-content {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 85vh;
}

.spinner-border {
	width: 2.75rem;
	height: 2.75rem;
}

.no-content > div {
	display: flex;
	flex-direction: column;
}

.bi-folder2-open {
	align-self: center;
	margin-bottom: 0.5rem;
	font-size: clamp(2rem, 4vw, 3.5rem);
}

.no-content span {
	font-size: clamp(1rem, 3vw, 1.5rem);
}

.col {
	margin-bottom: 1rem;
}
</style>
