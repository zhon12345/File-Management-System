<template>
	<div class="container not-found text-center">
		<div class="message">
			<h1>Error 404: Page Not Found</h1>
			<p>Uh Oh, we've search high and low but could not find what you're looking for. Let's head back!</p>
			<router-link :to="{ name: 'home' }" class="btn btn-primary">Back to Home</router-link>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.not-found {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 85vh;
}

.message {
	width: 50%;
}

.message > h1 {
	font-size: clamp(1.5rem, 5vw, 2.5rem);
}

.message > p {
	font-size: clamp(1rem, 3vw, 1.5rem);
}
</style>
