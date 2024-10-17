<script setup></script>

<template>
	<div class="container not-found text-center">
		<div class="message">
			<h1>Error 404: Page Not Found</h1>
			<p>Uh Oh, we've search high and low but could not find what you're looking for. Let's head back!</p>
			<router-link :to="{ name: 'home' }" class="btn btn-primary">Back to Home</router-link>
		</div>
	</div>
</template>

<style>
.not-found {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 85vh;
}

.message {
	width: 50%;
}

.message > p {
	font-size: 24px;
}
</style>
