import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'authentication',
		component: () => import(/* webpackChunkName: "authentication" */ '@/views/Authentication')
	},
	{
		path: '/chat',
		name: 'chat',
		component: () => import(/* webpackChunkName: "chat" */ '@/views/Chat')
	}
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes,
	mode: 'history'
});

export default router;
