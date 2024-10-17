import { createWebHistory, createRouter } from "vue-router";
import routes from "@/router/routes";

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to) => {
	const { title } = to.meta;
	document.title = title;
});

export default router;
