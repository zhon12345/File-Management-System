import { defineStore } from "pinia";
import { ref, onMounted, onUnmounted, computed } from "vue";

export const useScreenStore = defineStore("screen", () => {
	const mobileView = ref(window.innerWidth < 768);

	const updateMobileView = () => {
		mobileView.value = window.innerWidth < 768;
	};

	onMounted(() => {
		window.addEventListener("resize", updateMobileView);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateMobileView);
	});

	return { isMobile: computed(() => mobileView.value) };
});
