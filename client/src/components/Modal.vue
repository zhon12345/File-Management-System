<template>
	<teleport to="body">
		<div class="modal fade" :id="props.id" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="title"> </slot>
					</div>

					<div class="modal-body">
						<slot name="body"></slot>
					</div>

					<div class="modal-footer">
						<button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
						<slot name="footer"> </slot>
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
const props = defineProps({
	id: String,
});
</script>

<style scoped>
.modal-header {
	padding-bottom: 0;
}

.modal-body > p {
	margin-bottom: 0;
}

.modal-header,
.modal-footer {
	border: 0;
}

.modal-footer {
	padding-top: 0;
}
</style>
