<script setup>
import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useFileStore } from "@/stores/file";
import Navbar from "@/components/Navbar.vue";
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
	});
}

function deleteModal(file) {
	openModal(file, {
		title: "Delete file",
		form: false,
		message: `"${file.name}" will be deleted forever, are you sure?`,
		button: "Delete forever",
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
	<Navbar />

	<section class="main">
		<div class="container path">
			<div class="mb-3 user-select-none">
				<strong><a href="#">/</a> </strong>
			</div>
		</div>

		<div class="container files text-center">
			<div v-if="loading" class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			<div v-else-if="fileStore.files.length === 0">
				<span>No Files Found...</span>
			</div>
			<div v-else class="row row-cols-lg-5 row-cols-md-3 row-cols-2 g-3">
				<div v-for="file in fileStore.files" :key="file.id" class="div col">
					<FileItem :file="file" :rename="renameModal" :delete="deleteModal" />
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

				<p v-else>{{ modalConfig.message }}</p>
			</template>

			<template #footer>
				<button @click="handleConfirm({ filename: modalConfig.filename })" class="btn btn-primary">{{ modalConfig.button }}</button>
			</template>
		</Dialog>
	</section>
</template>

<style>
.path {
	font-size: 24px;
}

a {
	text-decoration: none;
}

.path a:hover {
	text-decoration: underline;
}

.files > div {
	margin-top: 5rem;
}

.row {
	margin: 0 !important;
}
</style>
