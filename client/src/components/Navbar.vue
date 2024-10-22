<script setup>
import { Modal } from "bootstrap";
import { ref, watch, onMounted } from "vue";

import { useFileStore } from "@/stores/FileStore";
import { useScreenStore } from "@/stores/ScreenStore";

import Dialog from "@/components/Modal.vue";

const fileStore = useFileStore();
const screenStore = useScreenStore();

const props = defineProps({
	disabled: { type: Boolean, default: false },
});

const dialog = ref(null);
const query = ref("");
const input = ref("");
const valid = ref(true);

async function uploadFile(event) {
	const files = event.target.files;
	const formData = new FormData();

	for (let i = 0; i < files.length; i++) {
		formData.append("files", files[i]);
	}

	await fileStore.uploadFiles(formData);
}

async function uploadFolder() {
	// Do something
}

async function search() {
	if (query.value.trim() === "") {
		return;
	}

	await fileStore.searchFiles(query.value);
}

function openModal() {
	dialog.value.show();
}

function newFolder() {
	if (input.value && input.value.trim()) {
		//Do something

		dialog.value.hide();
		input.value = "";
	}

	valid.value = false;
}

watch(input, (value) => {
	if (value.trim()) {
		valid.value = true;
	} else {
		valid.value = false;
	}
});

watch(query, async (value) => {
	if (value.trim() === "") {
		await fileStore.fetchFiles();
	}
});

onMounted(() => {
	dialog.value = new Modal(document.getElementById("newFolder"), {});
});
</script>

<template>
	<nav class="navbar navbar-expand-lg sticky-top">
		<div class="container">
			<router-link :to="{ name: 'home' }" class="navbar-brand text-truncate user-select-none">File Management System</router-link>

			<div class="collapse navbar-collapse">
				<div class="search input-group">
					<input v-model="query" @keypress.enter="search" class="form-control" type="search" placeholder="Search" aria-label="Search" :disabled="disabled" />
					<button @click="search" class="btn btn-outline-primary" type="button" :disabled="disabled"><i class="bi bi-search"></i></button>
				</div>
			</div>

			<div class="dropdown">
				<button :class="['btn btn-primary dropdown-toggle', { 'btn-sm': screenStore.isMobile }]" data-bs-toggle="dropdown" aria-expanded="false" :disabled="disabled"><i class="bi bi-plus-lg"></i> New</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<li><button @click="openModal" class="dropdown-item disabled" aria-disabled="true">Folder</button></li>

					<li><hr class="dropdown-divider" /></li>

					<input @change="uploadFile" ref="file" type="file" multiple hidden />
					<input @change="uploadFolder" ref="folder" type="file" webkitdirectory hidden />

					<li><button @click="$refs.file.click()" class="dropdown-item">File Upload</button></li>
					<li><button @click="$refs.folder.click()" class="dropdown-item disabled" aria-disabled="true">Folder Upload</button></li>
				</ul>
			</div>
		</div>
	</nav>

	<Dialog id="newFolder">
		<template #title>
			<h4 class="modal-title">New Folder</h4>
		</template>

		<template #body>
			<input v-model="input" class="form-control" type="text" :class="{ 'is-invalid': !valid }" />
		</template>

		<template #footer>
			<button @click="newFolder" class="btn btn-primary">Create</button>
		</template>
	</Dialog>
</template>

<style scoped>
.navbar {
	background-color: white;
}

.search {
	width: 20rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.container {
	flex-wrap: nowrap;
}
</style>
