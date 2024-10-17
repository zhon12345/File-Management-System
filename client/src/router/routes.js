const Home = () => import("@/components/Home.vue");
const NotFound = () => import("@/components/NotFound.vue");

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		meta: {
			title: "Home | File Management System",
		},
	},
	{
		path: "/404",
		name: "notFound",
		component: NotFound,
		meta: {
			title: "Page Not Found | File Management System",
			disabled: true,
		},
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: { name: "notFound" },
	},
];

export default routes;
