<template>
	<div class="row row-cols-lg-5 row-cols-md-3 row-cols-2 gx-3">
		<div v-for="file in files" class="col">
			<div class="ratio ratio-1x1">
				<div class="card shadow-sm bg-body-secondary">
					<div class="card-body">
						<p class="card-text text-truncate user-select-none">{{ file.name }}{{ file.ext }}</p>
						<div class="dropdown">
							<FileItem :file="file" :openModal="action"></FileItem>
						</div>
					</div>

					<div class="card-img" :class="{ 'is-icon': !isImage(file) || !imageLoaded }">
						<img v-if="isImage(file) && imageLoaded" class="card-img-top card-img-bottom user-select-none" draggable="false" :src="getPreview(file, 'grid', imageLoaded)" @load="imageLoaded = true" @error="imageLoaded = false" />
						<i v-else :class="getPreview(file, 'grid', imageLoaded)" class="bi"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { imageLoaded, isImage, getPreview } from "@/utils/fileUtils";
import FileItem from "@/components/Files/FileItem.vue";

const props = defineProps({
	files: Array,
	action: Function,
});
</script>

<style scoped>
.col {
	margin-bottom: 1rem;
}

.card {
	padding: 0.5rem;
	border: none;
}

.card-body {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	margin-bottom: clamp(0.25rem, 1vw, 0.5rem);
}

.card-body > p {
	margin-bottom: 0;
	font-size: clamp(1rem, 2vw, 1.15rem);
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

.card-img .bi {
	font-size: clamp(3em, 5vw, 5em);
}
</style>
