<template>
	<table class="table table-hover table-fixed user-select-none">
		<thead>
			<tr>
				<th class="col-name">Name</th>
				<th v-if="!isMobile" class="col-modified">Last Modified</th>
				<th class="col-size">Size</th>
				<th class="col-option text-end">
					<i class="bi bi-three-dots-vertical"></i>
				</th>
			</tr>
		</thead>
		<tbody class="table-group-divider">
			<tr v-for="file in files">
				<td class="col-name content">
					<div class="d-flex align-items-center">
						<i :class="getPreview(file, 'list')" class="bi"></i>
						<div class="text">
							<p class="title text-truncate">{{ file.name }}{{ file.ext }}</p>
							<small v-if="isMobile" class="subtitle">Modified {{ formatDate(file.updated, true) }}</small>
						</div>
					</div>
				</td>
				<td v-if="!isMobile" class="col-modified content">{{ formatDate(file.updated) }}</td>
				<td class="col-size content">{{ calcSize(file.size) }}</td>
				<td class="col-option content dropdown text-end">
					<FileItem :file="file" :openModal="action"></FileItem>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { isMobile, getPreview, formatDate, calcSize } from "@/utils/fileUtils";
import FileItem from "@/components/Files/FileItem.vue";

const props = defineProps({
	files: Array,
	action: Function,
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
