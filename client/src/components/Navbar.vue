<template>
	<nav class="navbar navbar-expand-lg sticky-top">
		<div class="container">
			<router-link :to="{ name: 'home' }" class="navbar-brand text-truncate user-select-none">
				File Management System
			</router-link>

			<div class="collapse navbar-collapse">
				<div class="search input-group">
					<input
						v-model="query"
						class="form-control"
						type="search"
						placeholder="Search"
						aria-label="Search"
						:disabled="disabled"
						@keypress.enter="search"
					/>
					<button class="btn btn-outline-primary" type="button" :disabled="disabled" @click="search">
						<i class="bi bi-search"></i>
					</button>
				</div>
			</div>

			<div class="dropdown">
				<button
					:class="['btn btn-primary dropdown-toggle', { 'btn-sm': screenStore.isMobile }]"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					:disabled="disabled"
				>
					<i class="bi bi-plus-lg"></i> New
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<li><button class="dropdown-item disabled" aria-disabled="true" @click="dialog.show">Folder</button></li>

					<li><hr class="dropdown-divider" /></li>

					<input ref="file" type="file" multiple hidden @change="uploadFile" />
					<input ref="folder" type="file" webkitdirectory hidden @change="uploadFolder" />

					<li><button class="dropdown-item" @click="$refs.file.click()">File Upload</button></li>
					<li>
						<button class="dropdown-item disabled" aria-disabled="true" @click="$refs.folder.click()">
							Folder Upload
						</button>
					</li>
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
			<button class="btn btn-primary" @click="newFolder">Create</button>
		</template>
	</Dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";

import { useFileStore } from "@/stores/FileStore";
import { useScreenStore } from "@/stores/ScreenStore";

import Dialog from "@/components/Modal.vue";

const fileStore = useFileStore();
const screenStore = useScreenStore();

defineOptions({
	name: "AppNavbar",
});

defineProps({
	disabled: { type: Boolean, default: false },
});

const dialog = ref(null);
const query = ref("");
const input = ref("");
const valid = ref(true);

async function uploadFile(event) {
	const files = event.target.files;
	if (!files.length) return;

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
	if (query.value.trim()) {
		await fileStore.searchFiles(query.value);
	} else {
		await fileStore.fetchFiles();
	}
}

function newFolder() {
	if (valid.value) {
		// Do something

		dialog.value.hide();
	}
}

watch(input, (value) => {
	valid.value = value.trim() !== "";
});

onMounted(() => {
	dialog.value = new Modal(document.getElementById("newFolder"), {});

	dialog.value._element.addEventListener("hidden.bs.modal", () => {
		input.value = "";
		valid.value = true;
	});
});
</script>

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
