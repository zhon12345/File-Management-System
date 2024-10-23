<template>
	<section class="main">
		<div class="container path user-select-none">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item active" aria-current="page">Home</li>
				</ol>
			</nav>

			<div>
				<div :class="['btn-group', { 'btn-group-sm': screenStore.isMobile }]" role="group" aria-label="Grid and List view toggle">
					<input type="radio" class="btn-check" name="View Toggle" id="grid" autocomplete="off" v-model="viewMode" value="grid" />
					<label for="grid" class="btn btn-outline-primary"> <i class="bi bi-grid-fill"></i> Grid </label>

					<input type="radio" class="btn-check" name="View Toggle" id="list" autocomplete="off" v-model="viewMode" value="list" />
					<label for="list" class="btn btn-outline-primary"> <i class="bi bi-list-task"></i> List </label>
				</div>
			</div>
		</div>

		<div class="container files" :class="{ 'no-content': loading || files.length === 0 }">
			<div v-if="loading" class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>

			<div v-else-if="files.length === 0">
				<i class="bi bi-folder2-open"></i>
				<span>No Files Found...</span>
			</div>

			<component v-else :is="viewMode === 'grid' ? GridView : ListView" :files="files" :action="openModal" />
		</div>

		<Dialog id="fileItem">
			<template #title>
				<h4 class="modal-title">{{ modalConfig.title }}</h4>
			</template>

			<template #body>
				<div v-if="modalConfig.form">
					<input v-model="tempFile" class="form-control" type="text" ref="input" :class="{ 'is-invalid': !isValid }" />
				</div>

				<p v-else v-html="modalConfig.message"></p>
			</template>

			<template #footer>
				<button @click="handleConfirm()" class="btn" :class="modalConfig.action === 'delete' ? 'btn-danger' : 'btn-primary'">{{ modalConfig.button }}</button>
			</template>
		</Dialog>
	</section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Modal } from "bootstrap";

import { useFileStore } from "@/stores/FileStore";
import { useScreenStore } from "@/stores/ScreenStore";

import GridView from "@/components/Files/GridView.vue";
import ListView from "@/components/Files/ListView.vue";
import Dialog from "@/components/Modal.vue";

const fileStore = useFileStore();
const screenStore = useScreenStore();

const viewMode = ref("grid");
const loading = ref(true);
const dialog = ref(null);
let input = ref(null);
let tempFile = ref(null);

const files = computed(() => fileStore.files);
const isValid = computed(() => tempFile.value.trim() !== "");

let modalConfig = ref({
	title: "",
	form: false,
	file: null,
	message: "",
	button: "",
	action: "",
});

function openModal(action, file) {
	const config = {
		rename: {
			title: "Rename file",
			form: true,
			button: "Rename",
			action: "rename",
		},
		delete: {
			title: "Delete file",
			form: false,
			message: `"${file.name}" will be deleted <strong>forever</strong>, are you sure?`,
			button: "Delete forever",
			action: "delete",
		},
	};

	modalConfig.value = {
		...config[action],
		file: {
			id: file.id,
			name: file.name,
		},
	};
	tempFile.value = modalConfig.value.file.name;
	dialog.value.show();
}

async function handleConfirm() {
	if (modalConfig.value.form) {
		if (isValid.value) {
			modalConfig.value.file.name = tempFile.value;

			await fileStore.renameFile(modalConfig.value.file.id, modalConfig.value.file.name);
			dialog.value.hide();
		}
	} else {
		await fileStore.deleteFile(modalConfig.value.file.i);
		dialog.value.hide();
	}
}

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

<style scoped>
.path {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.breadcrumb {
	font-weight: bold;
	margin-bottom: 0rem;
}

.breadcrumb-item {
	font-size: clamp(0.5rem, 2vw + 1rem, 1.5rem);
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
</style>
