<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
	<Navbar :disabled="route.meta.disabled" />

	<RouterView />
</template>

<style>
.dropdown-toggle::after {
	content: none;
}
</style>
