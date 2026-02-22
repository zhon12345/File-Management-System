<template>
	<table class="table table-hover table-fixed user-select-none">
		<thead>
			<tr>
				<th class="col-name">Name</th>
				<th v-if="!screenStore.isMobile" class="col-modified">Last Modified</th>
				<th class="col-size">Size</th>
				<th class="col-option text-end">
					<i class="bi bi-three-dots-vertical"></i>
				</th>
			</tr>
		</thead>
		<tbody class="table-group-divider">
			<tr v-for="file in files" :key="file.id">
				<td class="col-name content">
					<div class="d-flex align-items-center">
						<i :class="getPreview(file, 'list')" class="bi"></i>
						<div class="text">
							<p class="title text-truncate">{{ file.name }}{{ file.ext }}</p>
							<small v-if="screenStore.isMobile" class="subtitle">Modified {{ formatDate(file.updated, true) }}</small>
						</div>
					</div>
				</td>
				<td v-if="!screenStore.isMobile" class="col-modified content">{{ formatDate(file.updated) }}</td>
				<td class="col-size content">{{ calcSize(file.size) }}</td>
				<td class="col-option content dropdown text-end">
					<FileItem :file="file" :open-modal="action"></FileItem>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { getPreview, formatDate, calcSize } from "@/utils/fileUtils";
import { useScreenStore } from "@/stores/ScreenStore";
import FileItem from "@/components/Files/FileItem.vue";

const screenStore = useScreenStore();

defineProps({
	files: {
		type: Array,
		default() {
			return [];
		},
	},
	action: {
		type: Function,
		default: null,
	},
});
</script>

<style scoped>
.table-fixed {
	table-layout: fixed;
	width: 100%;
}

thead .col-name {
	width: 45%;
}

thead .col-option {
	width: 10%;
	font-size: clamp(1.15rem, 2vw, 1.25rem);
}

.col-name,
.col-modified,
.col-size,
.col-option {
	vertical-align: middle;
}

.text {
	overflow: hidden;
}

.col-name.content .bi {
	font-size: 1.5rem;
	margin-right: 0.3rem;
}

.title {
	margin-bottom: 0;
}

@media (max-width: 768px) {
	thead .col-name {
		width: 55%;
	}

	.text {
		display: flex;
		flex-direction: column;
	}
}
</style>
